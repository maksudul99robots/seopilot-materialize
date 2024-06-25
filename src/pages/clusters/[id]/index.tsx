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


import { LoginRegistrationAPI } from '../../../services/API'
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
import ToneDropdown from './ToneDropdown'
import ModelDropdown from './ModelDropdown'
import PointOfViewDropdown from './PointOfViewDropdown'
import SwitchesCustomized from 'src/components/SwitchesCustomized'
import LengthDropdown from './LengthDropdown'
import ActionDropdown from './ActionDropdown'
import Link from 'next/link'
import ClusterDrawer from 'src/services/SidebarForCluster'

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

const ClusterIdea = () => {
    // ** States
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<CustomRowType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('volume')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const [topic, setTopic] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState<any>({})

    const auth = useAuth()
    const router = useRouter()

    // useEffect(() => {
    //     if (auth.user?.is_active) {
    //         if (auth?.user?.workspace_owner_info?.plan?.plan != 'free') {

    //         } else {
    //             Swal.fire({
    //                 title: 'Access Denied',
    //                 text: 'Please Subscribe to Higher Plan to Get This Feature.',
    //                 icon: 'warning',
    //                 confirmButtonText: 'OK',
    //                 confirmButtonColor: "#2979FF"
    //             }).then(() => {
    //                 router.push('/plan')
    //             })
    //         }

    //     } else {
    //         Swal.fire({
    //             title: 'Check Your Email',
    //             text: 'Please Verify Your Account To get Full Access!',
    //             icon: 'warning',
    //             confirmButtonText: 'OK',
    //             confirmButtonColor: "#2979FF"
    //         })
    //         // 
    //     }

    // }, [])

    useEffect(() => {
        if (auth?.user?.workspace_owner_info?.plan?.plan == 'free' || auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only') {
            // Swal.fire('401',
            //     'You don\'t have access to this page. Please Upgrade to Higher Plan to SEE, EDIT and, PUBLISH your articles.',
            //     'error').then(() => {
            //         router.push("/")
            //     })

            Swal.fire({
                title: '401',
                text: 'You don\'t have access to this page. Please Upgrade to enable Article Cluster Feature.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            }).then(() => {
                router.push("/")
            })
        }
    }, [auth?.user])

    function loadServerRows(currentPage: number, data: CustomRowType[]) {
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const handleChange = (id: number, value: any, property: any) => {
        setSettings((prevSettings: any) => ({
            ...prevSettings,
            [id]: {
                ...prevSettings[id],
                [property]: value
            }
        }));

    }


    const columns: GridColDef[] = [
        {
            flex: 0.05,
            minWidth: 50,
            field: 'icons',
            headerName: '',
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "5px !important;" }}>
                        {
                            settings[row.id].status == 'completed' ?

                                <Icon icon="mdi:tick-circle" color='#2979FF' fontSize="20px"></Icon>
                                : settings[row.id].status == 'idea' ?
                                    <Icon icon="zondicons:minus-outline" color='#626477' fontSize="17px"></Icon>
                                    : settings[row.id].status == 'outlined' || settings[row.id].status == 'initiated' ?
                                        <Icon icon="mdi:tick-circle-outline" color='#2979FF' fontSize="19px"></Icon>
                                        :
                                        <Icon icon="ep:warning-filled" color='#F58F4F' fontSize="19px"></Icon>
                        }
                    </Box >
                )
            }
        },
        {
            flex: 0.18,
            minWidth: 300,
            field: 'topic',
            headerName: 'Title',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "5px !important;" }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                settings[row.id].status == 'completed' ?
                                    <Link style={{ textDecoration: "none" }} href={'/generated-article/' + settings[row.id].article_id}>
                                        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: "13px" }} title={row.topic}>
                                            {row.topic}
                                        </Typography>
                                    </Link> :
                                    <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, fontSize: "13px" }} title={row.topic}>
                                        {row.topic}
                                    </Typography>
                            }
                            <Typography noWrap variant='subtitle2' sx={{ color: 'text.primary', fontWeight: 300, fontSize: "12px" }}>
                                {row.keywords}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.08,
            minWidth: 90,
            headerName: 'Volume',
            field: 'volume',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Typography variant='body2' sx={{ color: row.volume > 1000 ? "#EF4843" : "#F58F4F", display: "flex", justifyContent: "end", textAlign: "right", width: "100%" }}>
                        {row?.volume ? row.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                    </Typography>
                )

            }
        },
        {
            flex: 0.03,
            minWidth: 70,
            headerName: 'Comp',
            field: 'competition',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Typography variant='body2' sx={{ color: row.competition == 'HIGH' ? "#EF4843" : row.competition == 'LOW' ? "#03A61B" : "#F58F4F" }}>
                        {row?.competition == "HIGH" || row?.competition == "LOW" ? row.competition?.toUpperCase() : row?.competition == "MEDIUM" ? 'MED' : ''}
                    </Typography>
                )

            }
        },
        {
            flex: 0.13,
            minWidth: 90,
            headerName: 'AI Model',
            field: 'model',
            sortable: false,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <ModelDropdown settings={settings} id={row.id} handleChange={handleChange} />
                )

            }
        },
        {
            flex: 0.13,
            minWidth: 90,
            headerName: 'Article Tone',
            field: 'tone',
            sortable: false,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <ToneDropdown settings={settings} id={row.id} handleChange={handleChange} />
                )

            }
        },

        {
            flex: 0.13,
            minWidth: 90,
            headerName: 'Point of View',
            field: 'pov',
            sortable: false,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <PointOfViewDropdown settings={settings} id={row.id} handleChange={handleChange} />
                )

            }
        },
        {
            flex: 0.13,
            minWidth: 90,
            headerName: 'Length',
            field: 'length',
            sortable: false,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <LengthDropdown settings={settings} id={row.id} handleChange={handleChange} />
                )

            }
        },
        {
            flex: 0.12,
            minWidth: 120,
            field: 'Action',
            sortable: false,
            disableColumnMenu: true,
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
                        {
                            settings[row.id].status == 'completed' ?
                                <>
                                    <Button variant='contained' size='medium' color='success' sx={{ fontSize: "10px", backgroundColor: "#228B22", marginRight: "3px" }} href={'/generated-article/' + settings[row.id].article_id}>
                                        view
                                    </Button >
                                    <ClusterDrawer settings={settings} setSettings={setSettings} idea_id={row.id} handleChange={handleChange} updateList={updateList} />
                                </>

                                : settings[row.id].status == 'idea' ?
                                    <>
                                        <Button variant='contained' size='medium' onClick={() => {
                                            submit(settings[row.id], row)
                                        }} sx={{ fontSize: "10px", marginRight: "3px" }}>
                                            Write
                                        </Button >
                                        <ClusterDrawer settings={settings} setSettings={setSettings} idea_id={row.id} handleChange={handleChange} updateList={updateList} />
                                    </>
                                    : settings[row.id].status == 'outlined' || settings[row.id].status == 'initiated' ?
                                        <><Button variant='contained' size='medium' disabled startIcon={<Icon icon="line-md:loading-twotone-loop"></Icon>} onClick={() => {
                                            submit(settings[row.id], row)
                                        }} sx={{ fontSize: "10px", marginRight: "3px" }}>
                                            Processing
                                        </Button >
                                            <ClusterDrawer settings={settings} setSettings={setSettings} idea_id={row.id} handleChange={handleChange} updateList={updateList} />
                                        </> :
                                        <>
                                            <Button variant='contained' size='medium' sx={{ fontSize: "10px", marginRight: "3px" }} onClick={() => {
                                                submit(settings[row.id], row)
                                            }}>
                                                Retry
                                            </Button >
                                            <ClusterDrawer settings={settings} setSettings={setSettings} idea_id={row.id} handleChange={handleChange} updateList={updateList} /></>

                        }
                    </Box>

                )

            }
        },
        // {
        //     flex: 0.04,
        //     minWidth: 60,
        //     headerName: '',
        //     field: 'fasq',
        //     valueGetter: params => new Date(params.value),
        //     renderCell: (params: GridRenderCellParams) => {
        //         const { row } = params
        //         return (
        //             // <ActionDropdown loading={loading} setLoading={setLoading} idea_id={row.id} status={settings[row.id].status} settings={settings} setSettings={setSettings} handleChange={handleChange} updateList={updateList} />

        //         )

        //     }
        // },
    ]

    const submit = (data: any, row: any) => {
        setSettings((prevSettings: any) => ({
            ...prevSettings,
            [row.id]: {
                ...prevSettings[row.id],
                status: 'initiated'
            }
        }))
        LoginRegistrationAPI.generateSaasArticleFromIdea({
            article_type: 'blog',
            topic: row.topic,
            keywords: row.keywords,
            article_length: data.article_length,
            tone: data.tone,
            language: data.language,
            country: data.country,
            links: data.links,
            outlines: data.outlines,
            outline_source: data.outline_source,
            outline_url: data.outline_url,
            faq: data.faq,
            toc: true,
            model: data.model,
            showFeaturedImg: data.img,
            point_of_view: data.point_of_view,
            img_service: data.img_service,
            extra_prompt: data.extra_prompt,
            img_prompt: data.citation,
            citation: data.citation,
            folder_id: data.folder_id,
            idea_id: row.id
        }).
            then(res => {
                setSettings((prevSettings: any) => ({
                    ...prevSettings,
                    [row.id]: {
                        ...prevSettings[row.id],
                        status: 'completed'
                    }
                }))
            }).catch(e => {
                // setLoading(false)
                // updateList()
                setSettings((prevSettings: any) => ({
                    ...prevSettings,
                    [row.id]: {
                        ...prevSettings[row.id],
                        status: 'idea'
                    }
                }))
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

    const checkStatus = (idea_id: number) => {
        LoginRegistrationAPI.checkClusterIdeaStatus({ idea_id: idea_id }).then(res => {
            if (res.data.status == 'completed') {
                updateList()
            }
        }).catch(e => {

        })
    }


    const updateList = () => {

        LoginRegistrationAPI.getIdeaList({ cluster_id: router.query.id }).then(res => {
            // console.log("res:.....", res.data)
            setTopic(res.data.topic)
            if (res.data.idea_library) {
                let x: any = {};
                res.data.idea_library.map((il: any, i: number) => {

                    x[il.id] = {
                        topic: il.topic,
                        tone: il.tone,
                        point_of_view: il.point_of_view,
                        model: il.model,
                        article_length: il.article_length,
                        img: il.show_featured_image,
                        faq: il.faq,
                        introduction: true,
                        conclusion: true,
                        toc: il.toc,
                        img_service: il.img_service,
                        citation: il.citation,
                        extra_prompt: il.extra_prompt,
                        img_prompt: il.img_prompt,
                        no_of_citations: il.no_of_citations,
                        keywords: il.keywords,
                        links: il.links,
                        outline_source: il.outline_source,
                        outline_url: "",
                        outlines: il.raw_outline,
                        language: il.language,
                        country: il.country,
                        status: il.status,
                        folder_id: il.folder_id,
                        assign_user: il.assign_user,
                        due_date: il.due_date,
                        article_id: il.article_id
                    }
                    if (i == res.data.idea_library.length - 1) {
                        setSettings(x);
                    }
                })
            }
            setMainData(res.data.idea_library)


        }).catch(e => {
            console.log(e)
        })


    }

    useEffect(() => {
        if (router.query.id) {
            LoginRegistrationAPI.getIdeaList({ cluster_id: router.query.id }).then(res => {
                // console.log("res:", res.data)
                setTopic(res.data.topic)
                if (res.data.idea_library) {
                    let x: any = {};
                    res.data.idea_library.map((il: any, i: number) => {

                        x[il.id] = {
                            topic: il.topic,
                            tone: il.tone,
                            point_of_view: il.point_of_view,
                            model: il.model,
                            article_length: il.article_length,
                            article_id: il.article_id,
                            img: il.show_featured_image,
                            faq: il.faq,
                            introduction: true,
                            conclusion: true,
                            toc: il.toc,
                            img_service: il.img_service,
                            citation: il.citation,
                            extra_prompt: il.extra_prompt,
                            img_prompt: il.img_prompt,
                            no_of_citations: il.no_of_citations,
                            keywords: il.keywords,
                            links: il.links,
                            outline_source: il.outline_source,
                            outline_url: "",
                            outlines: il.raw_outline,
                            language: il.language,
                            country: il.country,
                            status: il.status,
                            folder_id: il.folder_id,
                            assign_user: il.assign_user,
                            due_date: il.due_date
                        }
                        if (i == res.data.idea_library.length - 1) {
                            setSettings(x);
                        }
                    })
                }
                setMainData(res.data.idea_library)


            }).catch(e => {
                console.log("errror:", e)
                Swal.fire({
                    title: '404',
                    text: 'Cluster doesn\'t exist',
                    icon: 'warning',
                    confirmButtonText: 'Close',
                    confirmButtonColor: "#2979FF"
                }).then(() => {
                    router.push("/clusters")
                })
            })
        }


    }, [router.query.id])

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
                    item.keyword?.toLowerCase().includes(queryLowered) ||
                    // item.is_error.toLowerCase().includes(queryLowered) ||
                    item.volume?.toLowerCase().includes(queryLowered)
                // item.user_id.toLowerCase().includes(queryLowered) ||
                // item.createdAt.toString().toLowerCase().includes(queryLowered) //||
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


    const writeAll = () => {
        mainData?.map((d: any, i: number) => {
            if (settings[d.id].status == 'idea') {
                setSettings((prevSettings: any) => ({
                    ...prevSettings,
                    [d.id]: {
                        ...prevSettings[d.id],
                        status: 'initiated'
                    }
                }))
                LoginRegistrationAPI.generateSaasArticleFromIdea({
                    article_type: 'blog',
                    topic: settings[d.id].topic,
                    keywords: settings[d.id].keywords,
                    article_length: settings[d.id].article_length,
                    tone: settings[d.id].tone,
                    language: settings[d.id].language,
                    country: settings[d.id].country,
                    links: settings[d.id].links,
                    outlines: settings[d.id].outlines,
                    outline_source: settings[d.id].outline_source,
                    outline_url: settings[d.id].outline_url,
                    faq: settings[d.id].faq,
                    toc: true,
                    model: settings[d.id].model,
                    showFeaturedImg: settings[d.id].img,
                    point_of_view: settings[d.id].point_of_view,
                    img_service: settings[d.id].img_service,
                    extra_prompt: settings[d.id].extra_prompt,
                    img_prompt: settings[d.id].citation,
                    citation: settings[d.id].citation,
                    folder_id: '',
                    idea_id: d.id
                }).
                    then(res => {
                        setSettings((prevSettings: any) => ({
                            ...prevSettings,
                            [d.id]: {
                                ...prevSettings[d.id],
                                status: 'completed'
                            }
                        }))
                    }).catch(e => {
                        // setLoading(false)
                        // updateList()
                        setSettings((prevSettings: any) => ({
                            ...prevSettings,
                            [d.id]: {
                                ...prevSettings[d.id],
                                status: 'idea'
                            }
                        }))
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
        })
    }



    return (
        <Box >

            <Card>

                <Box sx={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
                    <Typography variant='h6'>
                        Generate Article Ideas on : {topic}
                    </Typography>
                    <Button variant='contained' size="medium" sx={{ pt: 3, pb: 3, pl: 4, pr: 4 }}
                        onClick={
                            () => {
                                writeAll();

                            }
                        } startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : <Icon icon="f7:wand-stars-inverse" />}
                        disabled={loading}


                    >
                        Write All
                    </Button>
                </Box>

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
                //         title: "Generate Article Ideas on : " + topic,
                //         value: searchValue,
                //         // clearSearch: () => handleSearch(''),
                //         onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                //     }
                // }}
                />
            </Card>
        </Box>

    )
}

export default ClusterIdea
