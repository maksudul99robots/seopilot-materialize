// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'


// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'


interface StatusObj {
    [key: number]: {
        title: string
        color: ThemeColor
    }
}


type SortType = 'asc' | 'desc' | undefined | null



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
import FilterOptions from '../admin/articles/filterOptions/FilterOptions'
import ActionDropdown from './ActionDropdown'
import CreateFolder from './CreateFolder'

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


const Folders = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<any>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const [reloadData, setReloadData] = useState<any>(0);
    const [status, setStatus] = useState<string>('all')
    const [type, setType] = useState<string>('all')
    const [length, setLength] = useState<string>('all')
    const [runFilter, setRunFilter] = useState<number>(0)


    function loadServerRows(currentPage: number, data: any) {
        // console.log(data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize))
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const columns: GridColDef[] = [
        {
            flex: 0.25,
            minWidth: 290,
            field: 'name',
            headerName: 'Name',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                <Button variant='text' href={`/articles?id=${row.id}`}>{row.name.toUpperCase()}</Button>
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 290,
            field: 'article_count',
            headerName: 'Number of Articles',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.article_count}
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
            flex: 0.06,
            minWidth: 110,
            field: 'action',
            sortable: false,
            headerName: 'Action',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <ActionDropdown row={row} reloadData={reloadData} setReloadData={setReloadData} />
                )

            }
        }
    ]

    let searchElementField = document.getElementsByClassName("MuiFormControl-root MuiTextField-root")[0];
    useEffect(() => {

        LoginRegistrationAPI.getFolders({ get_count: true }).then(res => {
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
        console.log("getting data reload")
        if (reloadData > 0) {
            LoginRegistrationAPI.getFolders({ get_count: true }).then(res => {
                loadServerRows
                setMainData(res.data);
            })
        }
    }, [reloadData])

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
                <CreateFolder reloadData={reloadData} setReloadData={setReloadData} />
            </Box>

            <Card>
                <Box sx={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
                    <Typography variant='h6'>
                        Folders
                    </Typography>
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
                />

            </Card>
        </Box>

    )
}

export default Folders
