import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { getDateTime } from 'src/services/DateTimeFormatter';
import { LoginRegistrationAPI } from 'src/services/API';
import Link from 'next/link';
import { makeid } from '../makeid';

type CustomRowType = {
    id: number;
    user_id: number;
    output: string;
    is_error: boolean;
    source: string;
    createdAt: string;
    updatedAt: string;
};

type SortType = 'asc' | 'desc' | undefined | null;

const ListofClusters = React.memo((props: any) => {
    const [total, setTotal] = useState<number>(0);
    const [sort, setSort] = useState<SortType>('desc');
    const [rows, setRows] = useState<any>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortColumn, setSortColumn] = useState<string>('createdAt');
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [mainData, setMainData] = useState<any>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [resetDataset, setResetDataset] = useState<number>(0);

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize);
    }

    useEffect(() => {
        LoginRegistrationAPI.getClusters({})
            .then((res) => {
                setMainData(res.data);
            })
            .catch((e) => {
                console.error('Failed to fetch clusters:', e);
            });
    }, []);

    const columns: GridColDef[] = [
        {
            flex: 0.5,
            minWidth: 320,
            field: 'topic',
            headerName: 'Topic',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Link style={{ textDecoration: 'none' }} href={`/clusters/${row.id}`}>
                                <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                    {row.topic}
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                );
            }
        },
        {
            flex: 0.2,
            minWidth: 90,
            headerName: 'Target Audience',
            field: 'target_audience',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return <Typography variant="body2">{row.target_audience}</Typography>;
            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            headerName: 'No. of ideas',
            field: 'number_of_clusters',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return <Typography variant="body2">{row.number_of_clusters}</Typography>;
            }
        },
        {
            flex: 0.2,
            minWidth: 90,
            headerName: 'Created',
            field: 'createdAt',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return <Typography variant="body2">{getDateTime(row.createdAt)}</Typography>;
            }
        },
        {
            flex: 0.2,
            headerName: 'Action',
            field: 'empty',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ width: '100%' }}
                        onClick={() => {
                            addToCluster(row.id);
                        }}
                    >
                        Add to cluster
                    </Button>
                );
            }
        }
    ];

    const addToCluster = (cluster_id: number | string) => {
        setLoading(true);
        LoginRegistrationAPI.createIdeaInsertToCluster({ cluster_id, page: props.page, start: props.start, end: props.end })
            .then((res) => {
                props.setShow(false);
                setLoading(false);
                Swal.fire({
                    title: 'Success',
                    text: 'The article idea is added to the selected cluster.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#2979FF'
                });
            })
            .catch((e) => {
                props.setShow(false);
                setLoading(false);
                Swal.fire({
                    title: 'Error',
                    text: 'Unable to add to the cluster.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#2979FF'
                });
                console.error('Failed to add to the cluster:', e);
            });
    };

    useEffect(() => {
        if (resetDataset > 0) {
            LoginRegistrationAPI.getClusters({})
                .then((res) => {
                    setMainData(res.data);
                })
                .catch((e) => {
                    console.error('Failed to fetch clusters:', e);
                });
        }
    }, [resetDataset]);

    const fetchTableData = useCallback(
        async (sort: SortType, q: string, column: string) => {
            const queryLowered = q.toLowerCase();
            const dataAsc = mainData.sort((a: any, b: any) => (a[column] < b[column] ? -1 : 1));
            const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse();

            const filteredData = dataToFilter.filter(
                (item: any) =>
                    item.topic?.toLowerCase().includes(queryLowered) ||
                    item.target_audience?.toLowerCase().includes(queryLowered) ||
                    item.createdAt.toString().toLowerCase().includes(queryLowered) ||
                    item.updatedAt.toLowerCase().includes(queryLowered)
            );
            setTotal(filteredData.length);
            setRows(loadServerRows(paginationModel.page, filteredData));
        },
        [paginationModel, mainData]
    );

    useEffect(() => {
        fetchTableData(sort, searchValue, sortColumn);
    }, [fetchTableData, searchValue, sort, sortColumn]);

    const handleSortModel = (newModel: GridSortModel) => {
        if (newModel.length) {
            setSort(newModel[0].sort);
            setSortColumn(newModel[0].field);
            fetchTableData(newModel[0].sort, searchValue, newModel[0].field);
        } else {
            setSort('asc');
            setSortColumn('full_name');
        }
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
        fetchTableData(sort, value, sortColumn);
    };

    return (
        <Box>
            <DataGrid
                autoHeight
                pagination
                rows={rows}
                rowCount={total}
                columns={columns}
                key={makeid(4)}
                loading={loading}
                sortingMode="server"
                paginationMode="server"
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
                        title: 'Clusters',
                        value: searchValue,
                        clearSearch: () => handleSearch(''),
                        onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                    }
                }}
            />
        </Box>
    );
});

export default ListofClusters;
