// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** ThirdParty Components
import axios from 'axios'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface StatusObj {
    [key: number]: {
        title: string
        color: ThemeColor
    }
}

type CustomRowType = {
    id: number,
    user_id: number,
    output: string,
    is_error: boolean,
    source: string,
    createdAt: string,
    updatedAt: string
}

type SortType = 'asc' | 'desc' | undefined | null

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
    const { row } = params
    console.log("rows:", row)
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]

    if (row.avatar.length) {
        return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
    } else {
        return (
            <CustomAvatar
                skin='light'
                color={color as ThemeColor}
                sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
            >
                {getInitials(row.full_name ? row.full_name : 'John Doe')}
            </CustomAvatar>
        )
    }
}

const statusObj: StatusObj = {
    1: { title: 'Success', color: 'success' },
    2: { title: 'Processing', color: 'info' },
    3: { title: 'Error', color: 'error' }
}


import { LoginRegistrationAPI } from 'src/services/API'
import { Button } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/DateTimeFormatter'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const TableServerSide = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 50 })
    const [mainData, setMainData] = useState<any>([]);

    const auth = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (auth?.user?.approle.role.id !== 2) {

            Swal.fire({
                title: '401',
                text: 'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            }).then(() => {
                router.push("/")
            })
        }
    }, [auth?.user])

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const columns: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 290,
            field: 'output',
            headerName: 'AI Article',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.output ? row.output?.replace(/<\/?[^>]+(>|$)/g, "") : row.topic}
                            </Typography>
                            <Typography noWrap variant='caption'>
                                {row.source ? row.source : 'https://app.seopilot.io'}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.175,
            type: 'date',
            minWidth: 120,
            headerName: 'Created',
            field: 'createdAt',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {getDateTime(params.row.createdAt)}
                </Typography>
            )
        },
        {
            flex: 0.175,
            minWidth: 140,
            field: 'is_error',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                const status = statusObj[params.row.is_error || params.row?.status == 'error' ? 3 : params.row?.status == 'outlined' ? 2 : 1]
                return (

                    <>
                        {
                            status.title == 'Error' ?

                                <LightTooltip title={<p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>ChatGPT API failed to respond, it may be that the ChatGPT API service is unavailable or overloaded. Please try generating your article again.<br></br> Go to <a href="https://status.openai.com/" target="_blank">This Link</a> to see current status of the service.</p>} placement="top">
                                    <div>
                                        <CustomChip
                                            size='small'
                                            skin='light'
                                            color={status.color}
                                            label={status.title}
                                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, cursor: "pointer" }}
                                        />
                                    </div>
                                </LightTooltip >
                                :
                                <CustomChip
                                    size='small'
                                    skin='light'
                                    color={status.color}
                                    label={status.title}
                                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                                />
                        }
                    </>



                )
            }
        },
        {
            flex: 0.175,
            minWidth: 110,
            field: 'action',
            sortable: false,
            headerName: 'Action',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <>
                        {
                            row.status == 'error' ?

                                <Button variant='outlined' onClick={e => {
                                    regenerateArticle(row.id)
                                }} disabled={!row.article_type}>
                                    Retry
                                </Button >
                                :
                                row.status == 'outlined' ?
                                    <Button variant='outlined' href={row.article_type ? `/generated-article/${parseInt(row.id) - 50000}` : `/article/${row.id}`}
                                        disabled={
                                            row.is_error ? row.is_error : false
                                        }>
                                        View
                                    </Button >
                                    :
                                    <Button variant='outlined' href={row.article_type ? `/generated-article/${parseInt(row.id) - 50000}` : `/article/${row.id}`} disabled={
                                        row.is_error ? row.is_error : false
                                    }>
                                        View
                                    </Button >
                        }
                    </>

                )

            }


        }
    ]
    const regenerateArticle = (id: number | string) => {
        LoginRegistrationAPI.regenerateArticle({ id: id }).then(res => {
            setTimeout(() => {
                LoginRegistrationAPI.getAllAIArticleHistory({}).then(res => {
                    loadServerRows
                    setMainData(res.data);
                    // console.log("data:", res.data)
                    // setTotal(res.data.total)
                    // setRows(loadServerRows(paginationModel.page, res.data.data))
                })
            }, 3000)

            // Swal.fire(
            //     'Success',
            //     'Article is Being Re-generated',
            //     'success'
            // )

            Swal.fire({
                title: 'Success',
                text: 'Article is Being Re-generated.',
                icon: 'success',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            })
        }).catch(e => {

            Swal.fire({
                title: 'Error',
                text: 'Unable to Re-generate.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            })
        })
    }
    useEffect(() => {

        LoginRegistrationAPI.getAllAIArticleHistory({}).then(res => {
            loadServerRows
            setMainData(res.data);
            // setTotal(res.data.total)
            // setRows(loadServerRows(paginationModel.page, res.data.data))
        })
    }, [])
    const fetchTableData = (useCallback(
        async (sort: SortType, q: string, column: string) => {


            const queryLowered = q.toLowerCase()
            const dataAsc = mainData.sort((a: any, b: any) => (a[column] < b[column] ? -1 : 1))

            const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
            // console.log("dataAsc", dataAsc)
            const filteredData = dataToFilter.filter(
                (item: any) =>
                    // item.id.toString().toLowerCase().includes(queryLowered) ||
                    item.output?.toLowerCase().includes(queryLowered) ||
                    item.topic?.toLowerCase().includes(queryLowered) ||
                    // item.is_error.toLowerCase().includes(queryLowered) ||
                    item.source?.toLowerCase().includes(queryLowered) ||
                    // item.user_id.toLowerCase().includes(queryLowered) ||
                    item.createdAt.toString().toLowerCase().includes(queryLowered) //||
                // item.updatedAt.toLowerCase().includes(queryLowered)
            )
            setTotal(filteredData.length);
            setRows(loadServerRows(paginationModel.page, filteredData))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [paginationModel, mainData]
    ))

    useEffect(() => {
        fetchTableData(sort, searchValue, sortColumn)
    }, [fetchTableData, searchValue, sort, sortColumn])

    const handleSortModel = (newModel: GridSortModel) => {
        if (newModel.length) {
            setSort(newModel[0].sort)
            setSortColumn(newModel[0].field)
            fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
        } else {
            setSort('asc')
            setSortColumn('full_name')
        }
    }

    const handleSearch = (value: string) => {
        setSearchValue(value)
        fetchTableData(sort, value, sortColumn)
    }



    return (
        <Box >
            <Card>
                <DataGrid
                    autoHeight
                    pagination
                    rows={rows}
                    rowCount={total}
                    columns={columns}
                    // checkboxSelection
                    sortingMode='server'
                    paginationMode='server'
                    pageSizeOptions={[50]}
                    paginationModel={paginationModel}
                    onSortModelChange={handleSortModel}
                    slots={{ toolbar: ServerSideToolbar }}
                    onPaginationModelChange={setPaginationModel}
                    slotProps={{
                        baseButton: {
                            variant: 'outlined'
                        },
                        toolbar: {
                            title: "Articles",
                            value: searchValue,
                            clearSearch: () => handleSearch(''),
                            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                        }
                    }}
                />
            </Card>
        </Box>

    )
}

export default TableServerSide
