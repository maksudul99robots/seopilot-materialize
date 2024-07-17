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


// import { LoginRegistrationAPI } from 
import { Button, FormControl, FormHelperText, MenuItem, Select } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/DateTimeFormatter'
import Icon from 'src/@core/components/icon'
import { makeid } from 'src/services/makeid'
// import sampleIdeas from '../sample'
import { number } from 'yup'
import { LoginRegistrationAPI } from 'src/services/API'
import Link from 'next/link'
import ActionDropdown from './ActionDropdown'
import KeywordResearch from './KeywordResearchModal'

const Clusters = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const [topic, setTopic] = useState<string>('');
    const [retryLoading, setRetryLoading] = useState<any>([]);
    const auth = useAuth()
    const router = useRouter()
    const [resetDataset, setResetDataset] = useState<number>(0);

    useEffect(() => {
        if (auth?.user?.workspace_owner_info?.plan?.plan == 'free' || auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only') {
            // Swal.fire('401',
            //     'You don\'t have access to this page. Please Upgrade to Higher Plan to SEE, EDIT and, PUBLISH your articles.',
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

    useEffect(() => {

    }, [])

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const columns: GridColDef[] = [
        {
            flex: 0.5,
            minWidth: 320,
            field: 'topic',
            headerName: 'Topic',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {/* <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.topic}
                            </Typography> */}
                            <Link style={{ textDecoration: "none" }} href={`/clusters/${row.id}`}>
                                <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                    {row.topic}
                                </Typography>
                            </Link>

                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.3,
            minWidth: 90,
            headerName: 'Target Audience',
            field: 'target_audience',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography variant='body2' >
                        {row.target_audience}
                    </Typography>
                )

            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            headerName: 'No. of ideas',
            field: 'number_of_clusters',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography variant='body2'>
                        {row.number_of_clusters}
                    </Typography>
                )

            }
        },
        {
            flex: 0.2,
            minWidth: 90,
            headerName: 'Created',
            field: 'createdAt',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography variant='body2'>
                        {getDateTime(row.createdAt)}
                    </Typography>
                )

            }
        },

        {
            flex: 0.175,
            minWidth: 120,
            field: 'Action',
            sortable: false,
            disableColumnMenu: true,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Button variant='outlined' color='secondary' className='outlined-btn-color' size='medium' onClick={e => {
                        router.push(`/clusters/${row.id}`)
                    }}>
                        View Ideas
                    </Button >
                )

            }
        },
        {
            flex: 0.08,
            minWidth: 50,
            headerName: '',
            field: 'empty',
            sortable: false,
            disableColumnMenu: true,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <ActionDropdown resetDataset={resetDataset} setResetDataset={setResetDataset} cluster_id={row.id} />
                )

            }
        }
    ]

    useEffect(() => {

        if (auth.user?.is_active) {

            LoginRegistrationAPI.getAIModels({}).then(res => {
            }).catch(e => {
                console.log(e);
                // if (e?.response?.status == 401) {
                Swal.fire({
                    title: 'Error',
                    text: e.response.data,
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#2979FF"
                }).then(() => {
                    router.push("/add-apikey")
                })
                // }else{}
            })

            LoginRegistrationAPI.getClusters({}).then(res => {
                // console.log("res:", res.data)
                setMainData(res.data)

            }).catch((e: any) => {
                if (e?.response?.status == 400) {
                    Swal.fire({
                        html: `<h3>Error</h3>
                      <h5>${e?.response?.data}</h5>
                      `,
                        icon: "error",
                        // input: 'text',
                        // inputLabel: 'Please try again later.',
                        confirmButtonColor: "#2979FF"
                    })
                } else {
                    Swal.fire({
                        html: `<h3>Error</h3>
                      <h5>Unable to Get Clusters</h5>
                      `,
                        icon: "error",
                        // input: 'text',
                        inputLabel: 'Please try again later.',
                        confirmButtonColor: "#2979FF"
                    })
                }
            })
        }

    }, [])

    useEffect(() => {

        if (auth.user?.is_active) {
            if (auth?.user?.workspace_owner_info?.plan?.plan != 'free' && auth?.user?.workspace_owner_info?.plan?.plan != 'extension_only') {
            } else {
                Swal.fire({
                    title: 'Access Denied',
                    text: 'Please Subscribe to Higher Plan to Get Article Cluster Feature.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#2979FF"
                }).then(() => {
                    router.push('/plans')
                })
            }

        } else {
            Swal.fire({
                title: 'Check Your Email',
                text: 'Please Verify Your Account To get Full Access!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: "#2979FF"
            })
            // 
        }

    }, [auth?.user])

    useEffect(() => {
        if (resetDataset > 0) {
            // if (getArticleFromParams > 0) {
            LoginRegistrationAPI.getClusters({}).then(res => {
                // console.log("res:", res.data)
                setMainData(res.data)

            }).catch(e => {
                console.log("unable to get")
            })

        }
    }, [resetDataset])

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
                    item.topic?.toLowerCase().includes(queryLowered) ||
                    // item.is_error.toLowerCase().includes(queryLowered) ||
                    item.number_of_clusters?.toLowerCase().includes(queryLowered) ||
                    item.target_audience?.toLowerCase().includes(queryLowered) ||
                    // item.user_id.toLowerCase().includes(queryLowered) ||
                    item.createdAt.toString().toLowerCase().includes(queryLowered) ||
                    item.updatedAt.toLowerCase().includes(queryLowered)
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
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: "20px" }}>
                <KeywordResearch />
            </Box>
            <Card>
                <DataGrid
                    autoHeight
                    pagination
                    rows={rows}
                    rowCount={total}
                    columns={columns}
                    // checkboxSelection
                    rowSelection={false}
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
                            title: "Clusters",
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

export default Clusters
