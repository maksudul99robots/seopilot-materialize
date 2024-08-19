import { useEffect, useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

type SortType = 'asc' | 'desc' | undefined | null

import { LoginRegistrationAPI } from 'src/services/API'

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { CSVLink } from "react-csv";
import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import GSCSidebar from 'src/services/GSCSidebar'
import { formatDateToYYYYMMDD } from './utils/DateTimeFormatters'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11
    }
}))

const GSCTables = (props: any) => {
    console.log("site:", props.site)
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<any>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('clicks')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([])
    const [reloadData, setReloadData] = useState<any>(0)
    const [status, setStatus] = useState<string>('all')
    const [type, setType] = useState<string>('all')
    const [length, setLength] = useState<string>('all')
    const [runFilter, setRunFilter] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);
    const loadServerRows = (currentPage: number, data: any) => {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const columns: GridColDef[] = [
        {
            flex: 0.20,
            minWidth: 140,
            field: 'keys',
            headerName: 'Query',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 500 }} title={row.keys}>
                                {row.keys}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.06,

            field: 'clicks',
            headerName: 'Clicks',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                                {row.clicks}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.08,
            headerName: 'Clicks Growth',
            field: 'clicksChange',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: params.row.clicksChange.includes('-') ? 'red' : 'green' }}>

                    <LightTooltip
                        title={
                            <p>
                                {params.row.prevClicks} Previous period
                            </p>
                        }
                        placement='top'
                    >
                        <span> {params.row.clicksChange}</span>
                    </LightTooltip>

                </Typography>
            )
        },
        {
            flex: 0.09,
            headerName: 'Impression',
            field: 'impressions',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.impressions}
                </Typography>
            )
        },
        {
            flex: 0.09,
            headerName: 'Impression Growth',
            field: 'impressionsChange',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: params.row.impressionsChange.includes('-') ? 'red' : 'green' }}>
                    <LightTooltip
                        title={
                            <p>
                                {params.row.prevImpressions} Previous period
                            </p>
                        }
                        placement='top'
                    >
                        <span>{params.row.impressionsChange}</span>
                    </LightTooltip>
                </Typography>
            )
        },
        {
            flex: 0.07,
            headerName: 'CTR',
            field: 'ctr',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.ctr}
                </Typography>
            )
        },
        {
            flex: 0.08,
            headerName: 'CTR Growth',
            field: 'ctrChange',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: params.row.impressionsChange.includes('-') ? 'red' : 'green' }}>
                    <LightTooltip
                        title={
                            <p>
                                {params.row.prevCtr} Previous period
                            </p>
                        }
                        placement='top'
                    >
                        <span>{params.row.ctrChange}</span>
                    </LightTooltip>
                </Typography>
            )
        },
        {
            flex: 0.08,
            headerName: 'Position',
            field: 'position',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.position.toFixed(2)}
                </Typography>
            )
        },
        {
            flex: 0.08,
            headerName: 'Position Growth',
            field: 'positionChange',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: params.row.clicksChange.includes('-') ? 'green' : 'red' }}>

                    <LightTooltip
                        title={
                            <p>
                                {params.row.prevPosition.toFixed(2)} Previous period
                            </p>
                        }
                        placement='top'
                    >
                        <span>{params.row.positionChange}</span>
                    </LightTooltip>

                </Typography>
            )
        },
        {
            flex: 0.10,
            headerName: 'Action',
            field: 'action',
            renderCell: (params: GridRenderCellParams) => (
                <GSCSidebar keyword={params.row.keys} />
            )
        }
    ]

    useEffect(() => {
        if (props.start && props.end) {
            setLoading(true)
            LoginRegistrationAPI.getGSCQueryInRange({ start: props.start, end: props.end })
                .then(res => {
                    setLoading(false)
                    setMainData(res.data)
                })
                .catch(e => {
                    setLoading(false)

                })
        }
    }, [props.start, props.end])

    const fetchTableData = useCallback(
        async (sort: SortType, q: string, column: string, type: string = 'all', length: string = 'all', status: string = 'all') => {
            const queryLowered = q.toLowerCase()
            const dataAsc = mainData.sort((a: any, b: any) => (a[column] < b[column] ? -1 : 1))

            let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

            const filteredData = dataToFilter.filter(
                (item: any) =>
                    item.keys[0]?.toLowerCase().includes(queryLowered) ||
                    item.clicks?.toString().toLowerCase().includes(queryLowered) ||
                    item.impressions.toString().toLowerCase().includes(queryLowered) ||
                    item.position.toString().toLowerCase().includes(queryLowered) ||
                    item.prevClicks?.toString().toLowerCase().includes(queryLowered) ||
                    item.prevImpressions?.toString().toLowerCase().includes(queryLowered) ||
                    item.prevPosition?.toString().toLowerCase().includes(queryLowered)
            )
            setTotal(filteredData.length)
            setRows(loadServerRows(paginationModel.page, filteredData))
        },
        [paginationModel, mainData]
    )

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

    let headers = [
        { label: "Key", key: "keys" },
        { label: "Clicks", key: "clicks" },
        { label: "Clicks Previous Period", key: "prevClicks" },
        { label: "Clicks Growth", key: "clicksChange" },
        { label: "Impressions", key: "impressions" },
        { label: "Imp. Previous Period", key: "prevImpressions" },
        { label: "Impressions Growth", key: "impressionsChange" },
        { label: "CTR", key: "ctr" },
        { label: "CTR Previous Period", key: "prevCtr" },
        { label: "CTR Growth", key: "ctrChange" },
        { label: "Position", key: "position" },
        { label: "Position Previous Perios", key: "prevPosition" },
        { label: "Position Growth", key: "positionChange" },

    ];

    function formatDate(date: Date) {
        let d = new Date(date);
        let month = ('0' + (d.getMonth() + 1)).slice(-2);
        let day = ('0' + d.getDate()).slice(-2);
        let year = d.getFullYear();
        return `${month}-${day}-${year}`;
    }

    return (
        <Box>
            <Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
                    <Typography variant='h6'>Queries</Typography>

                    <CSVLink
                        data={mainData}
                        headers={headers}
                        filename={
                            props.site + "-query-" + formatDateToYYYYMMDD(new Date(props.start)) + "-" + formatDateToYYYYMMDD(new Date(props.end)) + ".csv"
                        }
                    >
                        <Button variant='outlined' size='small' startIcon={<Icon icon="ph:download-thin" style={{ marginRight: "5px" }} />}>
                            Download CSV
                        </Button>

                    </CSVLink>
                </Box>
                <DataGrid
                    autoHeight
                    pagination
                    rows={rows}
                    rowCount={total}
                    columns={columns}
                    rowSelection={false}
                    sortingMode='server'
                    paginationMode='server'
                    pageSizeOptions={[50]}
                    paginationModel={paginationModel}
                    onSortModelChange={handleSortModel}
                    onPaginationModelChange={setPaginationModel}
                    loading={loading}
                />
            </Card>
        </Box>
    )
}

export default GSCTables
