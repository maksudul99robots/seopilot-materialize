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
import { Button, FormControl, FormHelperText, MenuItem, Select } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/utils/DateTimeFormatter'
import Icon from 'src/@core/components/icon'
import { makeid } from 'src/services/makeid'
// import sampleIdeas from '../sample'
import { number } from 'yup'
import Link from 'next/link'
import CustomBadge from 'src/@core/components/mui/badge'
import { CustomBadgeProps } from 'src/@core/components/mui/badge/types'

const ListBadge: any = styled(CustomBadge)<CustomBadgeProps>(() => ({
    '& .MuiBadge-badge': {
        height: '18px',
        minWidth: '18px',
        transform: 'none',
        position: 'relative',
        transformOrigin: 'none'
    }
}))

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


const Titles = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const [primaryKeyword, setPrimaryKeyword] = useState<string>('digital marketing');
    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState<any>({})

    const auth = useAuth()
    const router = useRouter()


    useEffect(() => {
        if (auth?.user?.workspace_owner_info?.plan?.plan == 'free' || auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only') {
            // Swal.fire('401',
            //     'You don\'t have access to this page. Please Upgrade to Higher Plan to SEE, EDIT and, PUBLISH your articles.',
            //     'error').then(() => {
            //         router.push("/")
            //     })

            Swal.fire({
                title: '401',
                text: 'You don\'t have access to this page. Please Upgrade to enable Article Cluster Feature.',
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
            flex: 0.18,
            minWidth: 300,
            field: 'title',
            headerName: 'Titles',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "5px !important;" }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: "13px" }} title={row.topic}>
                                {row.title}
                            </Typography>
                            {
                                row.status == 'idea' ?
                                    <ListBadge color='info' sx={{ ml: 5 }} badgeContent='Added to Idea Library' />
                                    :
                                    row.status == 'completed' ?
                                        <ListBadge color='success' sx={{ ml: 5 }} badgeContent='Article Generated' />
                                        : null
                            }

                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.05,
            minWidth: 70,
            field: 'Action',
            sortable: false,
            disableColumnMenu: true,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>

                        <Button variant='outlined' color='secondary' className='outlined-btn-color' size='medium' sx={{ fontSize: "10px", }} startIcon={<Icon icon="ph:plus"></Icon>}
                            onClick={() => {
                                LoginRegistrationAPI.addToIdeaLibrary({ title_id: row.id, title: row.title, keyword_id: router.query.id }).then(res => {
                                    Swal.fire({
                                        title: 'Success',
                                        text: 'Added To Idea Library',
                                        icon: 'success',
                                        confirmButtonText: 'Ok',
                                        confirmButtonColor: "#2979FF",
                                    }).then(() => {
                                        LoginRegistrationAPI.getTitleForKeyword({ keyword_research_id: router.query.id }).then(res => {
                                            setMainData(res.data.titles)
                                            setPrimaryKeyword(res.data.keyword)
                                        }).catch(e => {
                                            console.log("e", e)
                                        })
                                    })
                                }).catch(e => {
                                    Swal.fire({
                                        title: 'Error',
                                        text: 'Unable to add to Idea Library',
                                        icon: 'error',
                                        confirmButtonText: 'Close',
                                        confirmButtonColor: "#2979FF",
                                    })
                                })
                            }}
                            disabled={row.status !== 'suggested'}
                        >
                            Add to Idea Library
                        </Button >

                    </Box>

                )

            }
        }
    ]


    useEffect(() => {
        if (router.query.id) {
            setLoading(true)
            LoginRegistrationAPI.getTitleForKeyword({ keyword_research_id: router.query.id }).then(res => {
                setMainData(res.data.titles)
                setPrimaryKeyword(res.data.keyword)
                setLoading(false)
            }).catch(e => {
                setLoading(false)
            })
        }


    }, [router.query.id])

    useEffect(() => {
        if (auth?.user?.workspace_owner_info?.plan?.plan == 'free' || auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only') {
            // Swal.fire('401',
            //     'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
            //     'error').then(() => {
            //         router.push("/")
            //     })

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
    }, [auth?.user?.plan])
    const fetchTableData = (useCallback(
        async (sort: SortType, q: string, column: string) => {

            const queryLowered = q.toLowerCase()
            const dataAsc = mainData.sort((a: any, b: any) => (a[column] < b[column] ? -1 : 1))

            const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
            // console.log("dataAsc, sort, q, column", dataAsc, sort, q, column)
            const filteredData = dataToFilter.filter(
                (item: any) =>
                    // item.id.toString().toLowerCase().includes(queryLowered) ||
                    // item.output?.toLowerCase().includes(queryLowered) ||
                    item.title?.toLowerCase().includes(queryLowered)
                // item.user_id.toLowerCase().includes(queryLowered) ||
                // item.createdAt.toString().toLowerCase().includes(queryLowered) //||
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

                <Box sx={{ display: "flex", justifyContent: "start", margin: "20px" }}>
                    <Icon icon="ep:back" className='add-icon-color' style={{ alignItems: "center", marginTop: "5px", marginRight: "20px" }}
                        onClick={() => {
                            router.back()
                        }}
                    ></Icon>
                    <Typography variant='h6'>
                        Suggested article titles for keyword : {primaryKeyword}
                    </Typography>
                </Box>

                <DataGrid
                    autoHeight
                    pagination
                    rows={rows}
                    rowCount={total}
                    columns={columns}
                    loading={loading}
                    // checkboxSelection
                    rowSelection={false}
                    sortingMode='server'
                    paginationMode='server'
                    pageSizeOptions={[50]}
                    paginationModel={paginationModel}
                    onSortModelChange={handleSortModel}
                    // slots={{ toolbar: ServerSideToolbar }}
                    onPaginationModelChange={setPaginationModel}
                // slotProps={{
                //     baseButton: {
                //         variant: 'outlined'
                //     },
                //     toolbar: {
                //         title: "Generate Article Ideas on : " + topic,
                //         value: searchValue,
                //         // clearSearch: () => handleSearch(''),
                //         onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                //     }
                // }}
                />
            </Card>
        </Box>

    )
}

export default Titles
