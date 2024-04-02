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
import { getDateTime } from 'src/services/DateTimeFormatter'
import DialogAddCard from 'src/services/DialogAddCard'
import Icon from 'src/@core/components/icon'
import DeleteWordpressConnect from 'src/services/DeleteWordpressConnect'
import EditWordpressConnect from 'src/services/EditWordpressConnect'

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
const data = [
    {
        id: 1,
        site: 'https://seopilot.io'
    },
    {
        id: 2,
        site: 'https://99robots.com'
    },
    {
        id: 3,
        site: 'https://rockethub.com'
    }
]
const GSCIntegrations = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('asc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('site')
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

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    useEffect(() => {
        // LoginRegistrationAPI.getConnections({}).then(res => {
        // console.log("integrations:", res)
        loadServerRows
        setMainData(data);
        setTotal(3)
        // setTotal(res.data.total)
        // setRows(loadServerRows(paginationModel.page, res.data.data))
        // })

    }, [reRender])



    const columns: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 290,
            field: 'site',
            headerName: 'Sites',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.site}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        }
    ]

    useEffect(() => {
        if (auth.user?.is_active) {

            loadServerRows
            setMainData(data);


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
                    item.site?.toLowerCase().includes(queryLowered)
                // item.is_error.toLowerCase().includes(queryLowered) ||
                // item.user_id.toLowerCase().includes(queryLowered) ||

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
            setSortColumn('site')
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
        <Box >

            {/* <Dialog
                fullWidth
                open={show}
                maxWidth='lg'
                sx={{ display: "flex", justifyContent: "center", height: "900", width: "506" }}
                onClose={handleClose}
                onBackdropClick={handleClose}
                TransitionComponent={Transition}
            >

                <ReactPlayer url='https://vimeo.com/908440876/4a42c699f8?share=copy' controls style={{ height: "900", width: "506" }} />
            </Dialog> */}



            {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: "20px" }}>
                <Button variant='contained' onClick={() => setShow(true)} disabled={props.disabled}>
                    + Add a connection
                </Button>
            </Box> */}
            <Card sx={{ marginTop: "20px" }}>
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
                            title: "Google Search Console",
                            value: searchValue,
                            clearSearch: () => handleSearch(''),
                            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                        }
                    }}
                />
            </Card>

        </Box >

    )
}

export default GSCIntegrations
