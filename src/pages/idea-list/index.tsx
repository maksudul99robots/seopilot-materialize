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


import { LoginRegistrationAPI } from '../../services/API'
import { Button, FormControl, FormHelperText, MenuItem, Select } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/DateTimeFormatter'
import Icon from 'src/@core/components/icon'
import { makeid } from 'src/services/makeid'
import sampleIdeas from './sample'

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

const IdeaList = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const [retryLoading, setRetryLoading] = useState<any>([]);
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
                text: 'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            }).then(() => {
                router.push("/")
            })
        }
    }, [auth?.user?.plan])

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const columns: GridColDef[] = [
        {
            flex: 0.5,
            minWidth: 320,
            field: 'topic',
            headerName: 'Title',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.topic}
                            </Typography>
                            <Typography noWrap variant='caption'>
                                {row.keyword}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            headerName: 'Volume',
            field: 'volume',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography variant='body2' sx={{ color: row.volume > 1000 ? "#EF4843" : "#F58F4F" }}>
                        {row.volume}
                    </Typography>
                )

            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            headerName: 'Comp',
            field: 'comp',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography variant='body2' sx={{ color: row.comp == 'high' ? "#EF4843" : "#F58F4F" }}>
                        {row.comp.toUpperCase()}
                    </Typography>
                )

            }
        },
        // {
        //     flex: 0.175,
        //     minWidth: 140,
        //     field: 'trend',
        //     headerName: 'Trend',
        //     renderCell: (params: GridRenderCellParams) => {
        //         const { row } = params
        //         return (
        //             <Typography variant='body2' sx={{ color: row.comp == 'high' ? "#EF4843" : "#F58F4F" }}>
        //                 {row.comp.toUpperCase()}
        //             </Typography>
        //         )

        //     }
        // },
        {
            flex: 0.15,
            minWidth: 100,
            field: 'model',
            sortable: false,
            headerName: 'Model',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <>
                        <select style={{ width: "100%", height: "63%", borderRadius: "5px", backgroundColor: "#fff", color: "#333333", border: "1px solid #D8D8DD" }}
                            key={makeid()}
                            value={row.model}
                        >
                            {/* <option value='H1' selected={props.id.substring(0, 2) == 'H1'}>H1</option> */}
                            <option value='gpt-4-1106-preview'>GPT-4-TURBO (Recommended)</option>
                            <option value='gpt-4'>GPT-4</option>
                            <option value='gpt-3.5-turbo-1106'>GPT-3.5-TURBO</option>

                            {/* <option value='ss' >Screenshot Of The Item URL</option> */}
                            {/* <option value='upload' >Upload Image</option> */}

                        </select>

                        <FormControl size='small' sx={{ fontSize: "12px" }}>
                            <Select
                                sx={{ fontSize: "12px", color: "black" }}
                                value={row.tone}
                                // onChange={handleChange}
                                displayEmpty
                            // inputProps={{ 'aria-label': 'Without label' }}

                            >
                                <MenuItem value='gpt-4-1106-preview' sx={{ fontSize: "12px" }}>GPT-4-TURBO (Recommended)</MenuItem>
                                <MenuItem value='gpt-4' sx={{ fontSize: "12px" }}>GPT-4</MenuItem>
                                <MenuItem value='gpt-3.5-turbo-1106' sx={{ fontSize: "12px" }}>GPT-3.5-TURBO</MenuItem>

                            </Select>
                        </FormControl>
                    </>

                )

            }


        },
        {
            flex: 0.15,
            minWidth: 100,
            field: 'tone',
            sortable: false,
            headerName: 'Tone',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    // <select style={{ width: "100%", height: "63%", borderRadius: "5px", backgroundColor: "#fff", color: "#333333", border: "1px solid #D8D8DD" }}
                    //     key={makeid()}
                    //     defaultValue={row.tone}
                    // >
                    //     {/* <option value='H1' selected={props.id.substring(0, 2) == 'H1'}>H1</option> */}
                    //     <option value='Clear, Knowledgeable and Confident'>SEO Optimized (Clear, Knowledgeable and Confident)</option>
                    //     <option value='Informative, Friendly, Casual'>Informative, Friendly, Casual</option>
                    //     <option value='Excited'>Excited</option>
                    //     <option value='Empathetic'>Empathetic</option>
                    //     <option value='Professional'>Professional</option>
                    //     <option value='Friendly'>Friendly</option>
                    //     <option value='Formal'>Formal</option>
                    //     <option value='Casual'>Casual</option>
                    //     <option value='Humorous'>Humorous</option>

                    //     {/* <option value='ss' >Screenshot Of The Item URL</option> */}
                    //     {/* <option value='upload' >Upload Image</option> */}

                    // </select>
                    <FormControl size='small' sx={{ fontSize: "12px" }}>
                        <Select
                            sx={{ fontSize: "12px", color: "black" }}
                            value={row.tone}
                            // onChange={handleChange}
                            displayEmpty
                        // inputProps={{ 'aria-label': 'Without label' }}

                        >
                            <MenuItem value='Clear, Knowledgeable and Confident' sx={{ fontSize: "12px" }}>Clear, Knowledgeable and Confident</MenuItem>
                            <MenuItem value='Informative, Friendly, Casual' sx={{ fontSize: "12px" }}>Informative, Friendly, Casual</MenuItem>
                            <MenuItem value='Excited' sx={{ fontSize: "12px" }}>Excited</MenuItem>
                            <MenuItem value='Empathetic' sx={{ fontSize: "12px" }}>Empathetic</MenuItem>
                            <MenuItem value='Professional' sx={{ fontSize: "12px" }}>Professional</MenuItem>
                            <MenuItem value='Friendly' sx={{ fontSize: "12px" }}>Friendly</MenuItem>
                            <MenuItem value='Formal' sx={{ fontSize: "12px" }}>Formal</MenuItem>
                            <MenuItem value='Casual' sx={{ fontSize: "12px" }}>Casual</MenuItem>
                            <MenuItem value='Humorous' sx={{ fontSize: "12px" }}>Humorous</MenuItem>
                        </Select>
                    </FormControl>

                )

            }


        },
        {
            flex: 0.15,
            minWidth: 100,
            field: 'point_of_view',
            sortable: false,
            headerName: 'Point of View',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <>
                        <select style={{ width: "100%", height: "63%", borderRadius: "5px", backgroundColor: "#fff", color: "#333333", border: "1px solid #D8D8DD" }}
                            key={makeid()}
                            value={row.point_of_view}
                        >
                            <option value='Third Person (he, she, it, they)'>Third Person (he, she, it, they)</option>
                            {/* <option value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</option> */}
                            <option value='Second Person (you, your, yours)'>Second Person (you, your, yours)</option>
                            <option value='First Person Plural (we, us, our, ours)'>First Person Plural (we, us, our, ours)</option>
                            <option value='First Person Singular (I, me, my, mine)'>First Person Singular (I, me, my, mine)</option>

                        </select>
                    </>

                )

            }


        },
        {
            flex: 0.175,
            minWidth: 120,
            field: 'Configuration',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Button variant='outlined' size='small'>
                        Configure
                    </Button >
                )

            }
        },
        {
            flex: 0.175,
            minWidth: 120,
            field: 'Action',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Button variant='contained' size='small'>
                        Write
                    </Button >
                )

            }
        }
    ]
    const regenerateArticle = (id: number) => {
        let retryID: boolean[] = [];
        retryID[id] = true;

        setRetryLoading(retryID)

        LoginRegistrationAPI.regenerateArticle({ id: id }).then(res => {
            retryID[id] = false;

            setRetryLoading(retryID)
            setTimeout(() => {

                LoginRegistrationAPI.getAIArticleHistory({}).then(res => {
                    loadServerRows
                    setMainData(res.data);
                    // console.log("data:", res.data)
                    // setTotal(res.data.total)
                    // setRows(loadServerRows(paginationModel.page, res.data.data))
                })
            }, 3000)


            Swal.fire({
                title: 'Success',
                text: 'Article is Being Re-generated.',
                icon: 'success',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            })
        }).catch(e => {
            retryID[id] = false;

            setRetryLoading(retryID)
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

        // LoginRegistrationAPI.getAIArticleHistory({}).then(res => {
        //     loadServerRows
        //     setMainData(res.data);

        // })
        setMainData(sampleIdeas())
    }, [])
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
                            title: "Create Articles from Ideas",
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

export default IdeaList
