// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

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


import { LoginRegistrationAPI } from '../../services/API'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/DateTimeFormatter'
import DialogAddCard from 'src/services/DialogAddCard'
import DeleteWordpressConnect from 'src/services/DeleteWordpressConnect'
import EditWordpressConnect from 'src/services/EditWordpressConnect'
import { Chip } from '@mui/material'
import CreateWorkspace from 'src/services/CreateWorkspace'
import InviteTeamMember from 'src/services/InviteTeamMember'

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

const Team = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('asc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('address')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 })
    const [mainData, setMainData] = useState<any>([]);
    const [reRender, setReRender] = useState<any>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [currentWorkspaceRole, setCurrentWorkspaceRole] = useState<string>('member')
    const auth = useAuth()
    const router = useRouter()

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    useEffect(() => {
        LoginRegistrationAPI.getTeam({}).then(res => {
            loadServerRows
            setMainData(res.data);
            // setTotal(res.data.total)
            // setRows(loadServerRows(paginationModel.page, res.data.data))
        })
    }, [reRender])
    useEffect(() => {
        mainData.map((d: any) => {
            if (d.user_id == auth?.user?.id) {
                setCurrentWorkspaceRole(d.role);
            }
        })
    }, [mainData])


    const columns: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 290,
            field: 'email',
            headerName: 'Email',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row?.user?.email}

                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 290,
            field: 'role',
            headerName: 'Role',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {/* <Chip label={row.status.toUpperCase()} color={row.status.toUpperCase() == 'ACTIVE' ? 'success' : 'warning'} variant='outlined' /> */}
                            {row.role.toUpperCase()}
                            {/* <CustomChip
                                size='small'
                                skin='light'
                                color={row.status.toUpperCase() == 'ACTIVE' ? 'success' : 'warning'}
                                label={row.status.toUpperCase()}
                                sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, cursor: "pointer" }}
                            /> */}
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.25,
            minWidth: 290,
            field: 'status',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {/* <Chip label={row.status.toUpperCase()} color={row.status.toUpperCase() == 'ACTIVE' ? 'success' : 'warning'} variant='outlined' /> */}
                            {/* {row.status.toUpperCase()} */}
                            <CustomChip
                                size='small'
                                skin='light'
                                color={row.status.toUpperCase() == 'ACTIVE' ? 'success' : 'warning'}
                                label={row.status.toUpperCase()}
                                sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, cursor: "pointer" }}
                            />
                        </Box>
                    </Box>
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
                            currentWorkspaceRole == 'member' ?
                                null
                                :
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
                        }


                    </>

                )

            }


        }
    ]

    useEffect(() => {
        LoginRegistrationAPI.getTeam({}).then(res => {
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
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: "20px" }}>
                <InviteTeamMember reRender={reRender} setReRender={setReRender} disabled={currentWorkspaceRole == 'member' ? true : false} />
            </Box>
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
                            title: "Team Members",
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

export default Team
