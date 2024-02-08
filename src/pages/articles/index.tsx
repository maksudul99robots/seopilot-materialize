// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
// import IconButton from "@material-ui/core/IconButton";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";
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
    article_length: string,
    article_type: string,
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
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/DateTimeFormatter'
import Icon from 'src/@core/components/icon'
import NotificationDropdown, { NotificationsType } from 'src/@core/layouts/components/shared-components/NotificationDropdown'

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
const notifications: NotificationsType[] = [
    {
        meta: 'Today',
        avatarAlt: 'Flora',
        title: 'Congratulation Flora! 🎉',
        avatarImg: '/images/avatars/4.png',
        subtitle: 'Won the monthly best seller badge'
    },
    {
        meta: 'Yesterday',
        avatarColor: 'primary',
        subtitle: '5 hours ago',
        avatarText: 'Robert Austin',
        title: 'New user registered.'
    },
    {
        meta: '11 Aug',
        avatarAlt: 'message',
        title: 'New message received 👋🏻',
        avatarImg: '/images/avatars/5.png',
        subtitle: 'You have 10 unread messages'
    },
    {
        meta: '25 May',
        title: 'Paypal',
        avatarAlt: 'paypal',
        subtitle: 'Received Payment',
        avatarImg: '/images/misc/paypal.png'
    },
    {
        meta: '19 Mar',
        avatarAlt: 'order',
        title: 'Received Order 📦',
        avatarImg: '/images/avatars/3.png',
        subtitle: 'New order received from John'
    },
    {
        meta: '27 Dec',
        avatarAlt: 'chart',
        subtitle: '25 hrs ago',
        avatarImg: '/images/misc/chart.png',
        title: 'Finance report has been generated'
    }
]

const TableServerSide = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<any>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const [retryLoading, setRetryLoading] = useState<any>([]);
    const [status, setStatus] = useState<string>('all')
    const [type, setType] = useState<string>('all')
    const [length, setLength] = useState<string>('all')
    const [runFilter, setRunFilter] = useState<number>(0)

    function loadServerRows(currentPage: number, data: any) {
        console.log(data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize))
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const columns: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 290,
            field: 'topic',
            headerName: 'AI Article',
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
                                {row.source ? row.source : 'https://app.seopilot.io'}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },

        {
            flex: 0.09,
            type: 'date',
            // minWidth: 120,
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
            // flex: 0.05,
            minWidth: 50,
            field: 'article_type',
            headerName: 'Type',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.article_type ? params.row.article_type?.toUpperCase() : ''}
                </Typography>
            )
        },
        {
            // flex: 0.05,
            // minWidth: 50,
            sortable: false,
            headerName: 'Length',
            field: 'article_length',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.article_length ? params.row.article_length?.toUpperCase() : ''}
                </Typography>
            )
        },
        {
            flex: 0.15,
            minWidth: 140,
            field: 'is_error',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                const status = statusObj[params.row.is_error || params.row?.status == 'error' ? 3 : params.row?.status == 'outlined' || params.row?.status == 'initiated' ? 2 : 1]
                return (

                    <>
                        {
                            status.title == 'Error' ?

                                <LightTooltip title={<p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>ChatGPT API failed to respond, it may be that the ChatGPT API service is unavailable or overloaded. Please Check Your Current API Limits. Try generating your article again.<br></br> Go to <a href="https://status.openai.com/" target="_blank">This Link</a> to see current status of the service.</p>} placement="top">
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
                                }} disabled={!row.article_type || retryLoading[row.id] == true} endIcon={retryLoading[row.id] == true ? <Icon icon="line-md:loading-twotone-loop" /> : null}>
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
    let searchElementField = document.getElementsByClassName("MuiFormControl-root MuiTextField-root")[0];
    useEffect(() => {

        LoginRegistrationAPI.getAIArticleHistory({}).then(res => {
            loadServerRows
            setMainData(res.data);

        })

    }, [])
    useEffect(() => {
        // console.log("searchElementField:", searchElementField)
        // searchElementField?.setAttribute("style", 'display: none')
        // var selectElement = document.createElement('select');
        // selectElement.id = 'mySelect';

        // // Create option elements and add them to the select element
        // var option1 = document.createElement('option');
        // option1.value = 'option1';
        // option1.textContent = 'Option 1';
        // selectElement.appendChild(option1);

        // var option2 = document.createElement('option');
        // option2.value = 'option2';
        // option2.textContent = 'Option 2';
        // selectElement.appendChild(option2);

        // var option3 = document.createElement('option');
        // option3.value = 'option3';
        // option3.textContent = 'Option 3';
        // selectElement.appendChild(option3);
        // selectElement.setAttribute('style', 'width:30%; margin-left:10px; border-radius:8px; border-color:#D8D8DD')

        // searchElementField?.appendChild(selectElement); // Append the new div inside the existing div


    }, [searchElementField])
    const fetchTableData = (useCallback(
        async (sort: SortType, q: string, column: string, type: string = 'all', length: string = 'all', status: string = 'all') => {
            const queryLowered = q.toLowerCase()
            const dataAsc = mainData.sort((a: any, b: any) => (a[column] < b[column] ? -1 : 1))
            console.log("type:", type)
            let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
            if (type != 'all') {
                dataToFilter = dataToFilter.filter((item: any) => item.article_type?.toLowerCase().includes(type))
            }
            if (length != 'all') {
                dataToFilter = dataToFilter.filter((item: any) => item.article_length?.toLowerCase().includes(length))
            }
            if (status != 'all') {
                dataToFilter = dataToFilter.filter((item: any) => item.status?.toLowerCase().includes(status))
            }
            console.log("dataToFilter:", dataToFilter)
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
        fetchTableData(sort, searchValue, sortColumn, type, length, status)
    }, [fetchTableData, searchValue, sort, sortColumn, runFilter])

    const handleSortModel = (newModel: GridSortModel) => {
        if (newModel.length) {
            setSort(newModel[0].sort)
            setSortColumn(newModel[0].field)
            fetchTableData(newModel[0].sort, searchValue, newModel[0].field, type, length, status)
        } else {
            setSort('asc')
            setSortColumn('full_name')
        }
    }

    const handleSearch = (value: string) => {
        setSearchValue(value)
        fetchTableData(sort, value, sortColumn, type, length, status)
    }



    return (
        <Box >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: "20px" }}>
                <Button variant='contained' href='/create-article'>+ Create Article</Button>
            </Box>

            <Card>
                <Box sx={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
                    <Typography variant='h6'>
                        Articles
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        {/* <input type="text" placeholder="Search" className='search' name="search" /> */}
                        <TextField InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <Icon icon="material-symbols:search" />
                            </InputAdornment>,
                        }}
                            size='small'
                            sx={{ marginRight: "10px" }}
                            value={searchValue} onChange={e => handleSearch(e.target.value)}
                        />
                        <NotificationDropdown notifications={notifications} settings={{
                            skin: 'default',
                            mode: 'dark',
                            appBar: undefined,
                            footer: undefined,
                            navHidden: undefined,
                            appBarBlur: false,
                            direction: 'ltr',
                            navCollapsed: false,
                            themeColor: 'primary',
                            contentWidth: 'full',
                            layout: undefined,
                            lastLayout: undefined,
                            verticalNavToggleType: 'collapse',
                            toastPosition: undefined
                        }}
                            status={status} type={type} length={length} setStatus={setStatus} setType={setType}
                            setLength={setLength} runFilter={runFilter} setRunFilter={setRunFilter}
                            handleSearch={handleSearch}
                        />
                    </Box>
                </Box>


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
                    // slots={{ toolbar: ServerSideToolbar }}
                    onPaginationModelChange={setPaginationModel}
                // slotProps={{
                //     baseButton: {
                //         variant: 'outlined'
                //     },
                //     toolbar: {
                //         title: "Articles",
                //         value: searchValue,
                //         clearSearch: () => handleSearch(''),
                //         onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                //     },
                //     // baseTooltip:{

                //     // }
                // }}
                />

            </Card>
        </Box>

    )
}

export default TableServerSide
