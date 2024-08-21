// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'
import ReactPlayer from 'react-player/lazy'
// ** ThirdParty Components
import axios from 'axios'
import Dialog from '@mui/material/Dialog'
// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
    const { row } = params
    // console.log("rows:", row)
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
import { Button, Fade, FadeProps } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/utils/DateTimeFormatter'
import DialogAddCard from 'src/services/DialogAddCard'
import Icon from 'src/@core/components/icon'
import DeleteWordpressConnect from 'src/services/DeleteWordpressConnect'
import EditWordpressConnect from 'src/services/EditWordpressConnect'
import GSCIntegrations from './GSCIntegrations'

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
const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})
const TableServerSide = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('asc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [rowsGSC, setRowsGSC] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('address')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 })
    const [mainData, setMainData] = useState<any>([]);
    const [reRender, setReRender] = useState<any>([]);
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const auth = useAuth()
    const router = useRouter()
    const [integrationCount, setIntegrationCount] = useState<number>(0);
    const [teamObj, setTeamObj] = useState<any>(null);
    const [show, setShow] = useState<boolean>(false)
    const [value, setValue] = useState(0);

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            // sx: 'font-size:12px',
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                style={{ padding: "0px !important;" }}
                {...other}
            >
                {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
            </div>
        );
    }


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (auth?.user?.workspace_owner_info?.plan?.plan == "yearly - captain" ||
            auth?.user?.workspace_owner_info?.plan?.plan == "monthly - captain" ||
            auth?.user?.workspace_owner_info?.plan?.plan == "captain"
        ) {
            setValue(newValue);
        } else {
            Swal.fire({
                title: '',
                html: '<p>Please Upgrade to <strong>CAPTAIN</strong> plan to add your GSC integration</p>',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: "#2979FF",
                showCancelButton: true,
                cancelButtonText: 'CANCEL',
                cancelButtonColor: "#ccc"
            }).then((res) => {
                if (res.isConfirmed) {
                    router.push("/plans")
                }
                // console.log(res)
            })
        }

    };

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    useEffect(() => {
        LoginRegistrationAPI.getConnections({}).then(res => {
            // console.log("integrations:", res)
            loadServerRows
            setMainData(res.data);
            // setTotal(res.data.total)
            // setRows(loadServerRows(paginationModel.page, res.data.data))
        }).catch(e => {
            console.log("unable to get connections")
        })

    }, [reRender])



    const columns: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 290,
            field: 'address',
            headerName: 'WordPress URL',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.address}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 290,
            field: 'username',
            headerName: 'User Name',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.username}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        // {
        //     flex: 0.25,
        //     minWidth: 290,
        //     field: 'password',
        //     headerName: 'App Password',
        //     renderCell: (params: GridRenderCellParams) => {
        //         const { row } = params

        //         return (
        //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //                 {/* {renderClient(params)} */}
        //                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        //                     <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
        //                         {row.password}
        //                     </Typography>
        //                 </Box>
        //             </Box>
        //         )
        //     }
        // },
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
            minWidth: 110,
            field: 'action',
            sortable: false,
            headerName: 'Action',
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;

                return (
                    <>


                        <EditWordpressConnect
                            showEdit={true}
                            id={row.id}
                            reRender={reRender}
                            setReRender={setReRender}
                            address={row.address}
                            username={row.username}
                            appPassword={row.password}
                        />

                        <DeleteWordpressConnect showDelete={true} id={row.id} reRender={reRender} setReRender={setReRender} />

                    </>

                )

            }


        }
    ]

    useEffect(() => {
        if (auth.user?.is_active) {
            LoginRegistrationAPI.getConnections({}).then(res => {
                loadServerRows
                setMainData(res.data);
                // console.log("data:", res.data)
                // setTotal(res.data.total)
                // setRows(loadServerRows(paginationModel.page, res.data.data))
            }).catch(e => {
                console.log("unable to get")
            })

            LoginRegistrationAPI.getMyTeamObject({}).then(res => {
                // console.log("res.data", res.data)
                setTeamObj(res.data);
            }).catch(e => {
                console.log(e)
            })
        } else {
            Swal.fire({
                title: 'Check Your Email',
                text: 'Please Verify Your Account To get Full Access!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: "#2979FF"
            })
            // router.push('/')
        }
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

    // console.log((teamObj?.role !== 'owner' && teamObj?.role !== 'admin') || ((auth?.user?.workspace_owner_info?.plan?.plan == 'free' && integrationCount > 0) ||
    //     (auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only' && integrationCount > 0) ||
    //     (auth?.user?.workspace_owner_info?.plan?.plan == 'passenger' && integrationCount > 0) ||
    //     (auth?.user?.workspace_owner_info?.plan?.plan == 'copilot' && integrationCount > 4) ||
    //     (auth?.user?.workspace_owner_info?.plan?.plan == 'captain' && integrationCount > 24)))
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

    useEffect(() => {
        setIntegrationCount(mainData.length)
    }, [mainData])
    const handleClose = () => {

        setShow(false)
    }


    return (


        <>
            {
                showAlert && value == 0 ?

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#DEF1F9", color: "#22B2E0", borderRadius: "10px", paddingX: "10px", marginBottom: "20px" }}>
                        <p>Review this <a href='https://seopilot.io/docs/connecting-wordpress-to-seopilot/' style={{ textDecoration: "underline", fontSize: "18px", fontWeight: "600", fontStyle: "italic", color: "#22B2E0" }} target='_blank'>Step By Step Guide to Connect a WordPress</a> Website and Publish an Article on Your Website.</p> <Button variant='outlined' onClick={e => {
                            setShow(true)
                        }} startIcon={<Icon icon="ph:video-thin" />} >
                            Watch Step-by-Step Instructions
                        </Button>
                    </Box>
                    : showAlert && value == 1 ?
                        <Box sx={{ display: "flex", textAlign: "center", alignItems: "center", justifyContent: "space-between", backgroundColor: "#DEF1F9", color: "#22B2E0", borderRadius: "10px", paddingX: "10px", marginBottom: "20px" }}>
                            <p style={{ width: "100%" }}>We use Google OAuth 2.0 to get access to your Google Search Console. The connected sites are used for analysis and internal linking.</p>
                        </Box> : null
            }


            <Dialog
                fullWidth
                open={show}
                maxWidth='lg'
                sx={{ display: "flex", justifyContent: "center", height: "900", width: "506" }}
                onClose={handleClose}
                onBackdropClick={handleClose}
                TransitionComponent={Transition}
            >

                <ReactPlayer url='https://vimeo.com/908440876/4a42c699f8?share=copy' controls style={{ height: "900", width: "506" }} />
            </Dialog>

            <Card sx={{ width: '100%', }}>
                {/* <Typography variant='body1'>Keywords</Typography> */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="WordPress Connections" {...a11yProps(0)} sx={{}} />
                        <LightTooltip title={
                            <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>

                                Google Search Console is a powerful tool for enhancing your SEO strategy. It helps you optimize internal linking, analyze keywords, and find better keyword suggestions. Using GSC with SEO Pilot will ensure your articles are perfectly optimized for search engines.
                            </p>
                        } placement="top">
                            <Tab label="Google Search Console" {...a11yProps(1)} sx={{}} />
                        </LightTooltip >

                        {/* <Tab label="PAA" {...a11yProps(2)} sx={{ fontSize: "12px !important;", padding: "0px" }} /> */}
                        {/* <Tab label="Item Three" {...a11yProps(2)} sx={{ fontSize: "12px !important;" }} /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box >

                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                            <Box sx={{ margin: "20px" }}>
                                <Typography variant='h6'>
                                    WordPress Connections
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", marginRight: "15px" }}>
                                <DialogAddCard reRender={reRender} setReRender={setReRender}
                                    disabled={
                                        // (teamObj?.role !== 'owner' && teamObj?.role !== 'admin') || ((auth?.user?.workspace_owner_info?.plan?.plan == 'free' && integrationCount > 0) ||
                                        //     (auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only' && integrationCount > 0) ||
                                        //     (auth?.user?.workspace_owner_info?.plan?.plan == 'passenger' && integrationCount > 0) ||
                                        //     (auth?.user?.workspace_owner_info?.plan?.plan == 'copilot' && integrationCount > 4) ||
                                        //     (auth?.user?.workspace_owner_info?.plan?.plan == 'captain' && integrationCount > 24))
                                        //     ? true : false

                                        mainData?.length != 0
                                    }
                                />
                            </Box>
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
                                // slots={{ toolbar: ServerSideToolbar }}
                                onPaginationModelChange={setPaginationModel}
                            // slotProps={{
                            //     baseButton: {
                            //         variant: 'outlined'
                            //     },
                            //     toolbar: {
                            //         title: "WordPress Connections",
                            //         value: searchValue,
                            //         clearSearch: () => handleSearch(''),
                            //         onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                            //     }
                            // }}
                            />
                        </Card>

                    </Box >
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {/* <SerpSuggestions serp={props.serp} /> */}
                    <GSCIntegrations />
                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={2}>
                <PAA paa={props.paa} />
            </CustomTabPanel> */}
            </Card>



        </>




    )
}

export default TableServerSide
