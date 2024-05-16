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
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [mainData, setMainData] = useState<any>([]);
    const [topic, setTopic] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState<any>({})

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
            flex: 0.1,
            minWidth: 320,
            field: 'topic',
            headerName: 'Title',
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "5px !important;" }}>
                        {/* {renderClient(params)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }} title={row.topic}>
                                {row.topic}
                            </Typography>
                            <Typography noWrap variant='subtitle2' sx={{ color: 'text.primary', fontWeight: 300 }}>
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
                    <Typography variant='body2' sx={{ color: row.volume > 1000 ? "#EF4843" : "#F58F4F" }}>
                        {row?.volume ? row.volume : 0}
                    </Typography>
                )

            }
        },
        {
            flex: 0.06,
            minWidth: 90,
            headerName: 'Comp',
            field: 'competition',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <Typography variant='body2' sx={{ color: row.comp == 'high' ? "#EF4843" : "#F58F4F" }}>
                        {row?.competition ? row.competition?.toUpperCase() : ''}
                    </Typography>
                )

            }
        },
        {
            flex: 0.13,
            minWidth: 90,
            headerName: 'Article Tone',
            field: 'tone',
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
            headerName: 'AI Model',
            field: 'model',
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
            headerName: 'Point of View',
            field: 'pov',
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
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <LengthDropdown settings={settings} id={row.id} handleChange={handleChange} />
                )

            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            headerName: 'Featured Image',
            field: 'img',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <SwitchesCustomized isChecked={settings[row.id].img} onClick={() =>
                        handleChange(row.id, !settings[row.id].img, 'img')
                    } size="large" />
                )

            }
        },
        {
            flex: 0.05,
            minWidth: 90,
            headerName: 'FAQ',
            field: 'faq',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <SwitchesCustomized isChecked={settings[row.id].faq} onClick={() =>
                        handleChange(row.id, !settings[row.id].faq, 'faq')
                    } size="large" />
                )

            }
        },

        {
            flex: 0.1,
            minWidth: 120,
            field: 'Action',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>
                        {
                            settings[row.id].status == 'completed' ?
                                <Button variant='contained' size='small' color='success' onClick={() => {
                                    router.push('/generated-article/' + settings[row.id].article_id)
                                }}>
                                    View
                                </Button >
                                : settings[row.id].status == 'error' || settings[row.id].status == 'idea' ?
                                    <Button variant='contained' size='small' onClick={() => {
                                        submit(settings[row.id], row)
                                    }}>
                                        Write
                                    </Button > :
                                    <Button variant='contained' size='small' disabled startIcon={<Icon icon="line-md:loading-twotone-loop"></Icon>} onClick={() => {
                                        submit(settings[row.id], row)
                                    }}>
                                        Processing
                                    </Button >
                        }

                        <ActionDropdown loading={loading} setLoading={setLoading} idea_id={row.id} status="idea" settings={settings} setSettings={setSettings} handleChange={handleChange} updateList={updateList} />
                    </>

                )

            }
        }
    ]

    const submit = (data: any, row: any) => {
        LoginRegistrationAPI.generateSaasArticleFromIdea({
            article_type: 'blog',
            topic: row.topic,
            keywords: row.keywords,
            article_length: data.article_length,
            tone: data.tone,
            language: 'English',
            country: 'USA',
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
            folder_id: '',
            idea_id: row.id
        }).
            then(res => {
                console.log("res:..........", res);
                // setLoading(false)
                // router.push("/generated-article/" + res.data.id)
            }).catch(e => {
                // setLoading(false)
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
                    }).then(() => {
                        router.push('/add-apikey')
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
    const updateList = (obj: any) => {

        LoginRegistrationAPI.getIdeaList({ cluster_id: router.query.id }).then(res => {
            console.log("res:.....", res.data)
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
                        country: il.country

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
                console.log("res:", res.data)
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
                            status: il.status

                        }
                        if (i == res.data.idea_library.length - 1) {
                            setSettings(x);
                        }
                    })
                }
                setMainData(res.data.idea_library)


            }).catch(e => {

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
                            title: "Generate Article Ideas on : " + topic,
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

export default ClusterIdea
