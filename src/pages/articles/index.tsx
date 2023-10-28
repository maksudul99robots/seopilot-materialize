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
    2: { title: 'Error', color: 'error' }
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
                            {row.output.replace(/<\/?[^>]+(>|$)/g, "")}
                        </Typography>
                        <Typography noWrap variant='caption'>
                            {row.source}
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
                {params.row.createdAt}
            </Typography>
        )
    },
    {
        flex: 0.175,
        minWidth: 140,
        field: 'is_error',
        headerName: 'Status',
        renderCell: (params: GridRenderCellParams) => {
            const status = statusObj[params.row.is_error ? 2 : 1]
            return (
                <CustomChip
                    size='small'
                    skin='light'
                    color={status.color}
                    label={status.title}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
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
                <Button variant='outlined' href={`/article/${row.id}`} >
                    View
                </Button >
            )

        }


    }
]
import { LoginRegistrationAPI } from '../../services/API'
import { Button } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const TableServerSide = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('asc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('full_name')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const auth = useAuth()
    const router = useRouter()

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    useEffect(() => {
        LoginRegistrationAPI.getAIArticleHistory({}).then(res => {
            loadServerRows
            setMainData(res.data);
            // setTotal(res.data.total)
            // setRows(loadServerRows(paginationModel.page, res.data.data))
        })
    }, [])
    useEffect(() => {
        if (auth?.user?.plan == 'free') {
            Swal.fire('401',
                'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
                'error').then(() => {
                    router.push("/")
                })
        }
    }, [auth?.user?.plan])
    const fetchTableData = (useCallback(
        async (sort: SortType, q: string, column: string) => {


            const queryLowered = q.toLowerCase()
            const dataAsc = mainData.sort((a: any, b: any) => (a[column] < b[column] ? -1 : 1))

            const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
            // console.log("dataAsc", dataAsc)
            const filteredData = dataToFilter.filter(
                (item: any) =>
                    // item.id.toString().toLowerCase().includes(queryLowered) ||
                    item.output.toLowerCase().includes(queryLowered) ||
                    // item.is_error.toLowerCase().includes(queryLowered) ||
                    item.source.toLowerCase().includes(queryLowered) ||
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
    )
}

export default TableServerSide
