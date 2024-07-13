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
import Icon from 'src/@core/components/icon';
// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'


const contentStatusObj: any = {

    1: { title: 'idea', color: '#6D788D', backgroundColor: "#E6E8EA" },
    2: { title: 'Outlined', color: '#26C6F9', backgroundColor: "#DEF1F7" },
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

// import { LoginRegistrationAPI } from 
import { Button, FormControl, FormHelperText, MenuItem, Select } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getDateTime } from 'src/services/DateTimeFormatter'
import { makeid } from 'src/services/makeid'
// import sampleIdeas from '../sample'
import { number } from 'yup'
import { LoginRegistrationAPI } from 'src/services/API'
import Link from 'next/link'
import ActionDropdown from './ActionDropdown'
import IdeaAdvancedSettings from './IdeaAdvancedSettings'
import { CustomMadeChips } from 'src/services/CustomMadeChips'
import IdeaLibraryDrawer from 'src/services/SidebarForIdeaLibrary'

const IdeaList = () => {
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
    const [allSites, setAllSites] = useState<any>([]);

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
            flex: 0.45,
            minWidth: 300,
            field: 'topic',
            headerName: 'Topic',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }} title={row.topic}>
                                {row.topic}
                            </Typography>


                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 90,
            headerName: 'Keyword',
            field: 'keywords',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        {row.keywords}
                    </Typography>
                )

            }
        },
        {
            flex: 0.07,
            minWidth: 140,
            field: 'status',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                const status = contentStatusObj[params.row?.status == 'outlined' ? 2 : params.row?.status == 'idea' ? 1 : 1]
                return (
                    <CustomMadeChips name={status.title} color={status.color} backgroundColor={status.backgroundColor} />
                    // <>
                    //     {
                    //         status.title == 'Error' ?

                    //             // <LightTooltip title={<p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>ChatGPT API failed to respond, it may be that the ChatGPT API service is unavailable or overloaded. Please Check Your Current API Limits. Try generating your article again.<br></br> Go to <a href="https://status.openai.com/" target="_blank">This Link</a> to see current status of the service.</p>} placement="top">
                    //             <div>
                    //                 <CustomChip
                    //                     size='small'
                    //                     skin='light'
                    //                     color={status.color}
                    //                     label={status.title}
                    //                     sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, cursor: "pointer" }}
                    //                 />
                    //                 {/* <CustomMadeChips name={status.title} color="#FD7E7B" backgroundColor="#F8E2E2" /> */}
                    //             </div>
                    //             // </LightTooltip >
                    //             :
                    //             <CustomMadeChips name={status.title} color="#6D788D" backgroundColor="#E6E8EA" />
                    //     }
                    // </>



                )
            }
        },
        {
            flex: 0.15,
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
            flex: 0.12,
            minWidth: 100,
            field: 'Action',
            sortable: false,
            disableColumnMenu: true,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>

                        {/* <IdeaAdvancedSettings
                            data={row}
                            idea_id={row.id}
                            updateList={updateList}
                            isCreateIdea={false}
                        /> */}
                        <IdeaLibraryDrawer data={row}
                            idea_id={row.id}
                            updateList={updateList}
                            isCreateIdea={false}
                            allSites={allSites}
                        />
                        <Button variant='outlined' color='secondary' className='outlined-btn-color' size='small' onClick={e => {
                            submit(row)
                        }} sx={{ fontSize: "12px", padding: "5px", marginRight: "5px" }}>
                            Write
                        </Button >
                    </>

                )

            }
        },
        {
            flex: 0.06,
            minWidth: 20,
            headerName: '',
            field: 'empty',
            sortable: false,
            disableColumnMenu: true,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <ActionDropdown
                        resetDataset={resetDataset}
                        setResetDataset={setResetDataset}
                        idea_id={row.id}
                        updateList={updateList}
                        data={row}
                    />
                )

            }
        }
    ]

    useEffect(() => {

        if (auth.user?.is_active && auth?.user?.workspace_owner_info?.plan?.plan != 'free') {
            LoginRegistrationAPI.getAllSites({}).then(res => {
                if (res.status == 200) {
                    // console.log(res.data)
                    setAllSites(res.data)
                    // console.log(res.data[0])
                    // if (res.data[0]) {
                    //     setSelectedSite(res.data[0].id)
                    // }
                } else {

                }
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

            LoginRegistrationAPI.getIdeasWithoutCluster({}).then(res => {
                // console.log("res:", res.data)
                setMainData(res.data.idea_library)

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
                    }).then(() => {
                        router.push('/add-apikey')
                    })
                } else {
                    Swal.fire({
                        html: `<h3>Error</h3>
                      <h5>Unable to Get Ideas</h5>
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
            LoginRegistrationAPI.getIdeasWithoutCluster({}).then(res => {
                // console.log("res:", res.data)
                setMainData(res.data.idea_library)


            }).catch(e => {
                console.log("unable to get ideas")
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
                    item.keywords?.toLowerCase().includes(queryLowered) ||
                    // item.user_id.toLowerCase().includes(queryLowered) ||
                    item.createdAt.toString().toLowerCase().includes(queryLowered)
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

    const submit = (row: any) => {
        LoginRegistrationAPI.generateSaasArticleFromIdeaOnIdeaPage({
            article_type: 'blog',
            topic: row.topic,
            keywords: row.keywords,
            article_length: row.article_length,
            tone: row.tone,
            language: row.language,
            country: row.country,
            links: row.links,
            outlines: row.outlines,
            outline_source: row.outline_source,
            outline_url: row.outline_url,
            faq: row.faq,
            toc: true,
            model: row.model,
            showFeaturedImg: row.img,
            point_of_view: row.point_of_view,
            img_service: row.img_service,
            extra_prompt: row.extra_prompt,
            img_prompt: row.citation,
            citation: row.citation,
            folder_id: row.folder_id,
            idea_id: row.id
        }).
            then(res => {
                // console.log("res:", res)
                Swal.fire({
                    title: 'Success',
                    text: 'You can see the article on My Articles page. Click ok to see the current status.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: "#2979FF",
                }).then(() => {
                    router.push(`/generated-article/${parseInt(row.article_id)}`)
                })
            }).catch(e => {

                console.log("error:", e);
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
              <h5>Unable to Generate Article</h5>
              `,
                        icon: "error",
                        // input: 'text',
                        inputLabel: 'Please try again later.',
                        confirmButtonColor: "#2979FF"
                    })
                }

            })
    }

    const updateList = () => {

        LoginRegistrationAPI.getIdeasWithoutCluster({}).then(res => {
            setMainData(res.data.idea_library)


        }).catch(e => {
            console.log("unable to get ideas")
        })


    }

    return (
        <Box >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end", marginBottom: "20px" }}>
                {/* <IdeaAdvancedSettings isCreateIdea={true} settings={[]} updateList={updateList} /> */}
                <IdeaLibraryDrawer isCreateIdea={true} settings={[]} updateList={updateList} />
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
                            title: "Article Ideas",
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
