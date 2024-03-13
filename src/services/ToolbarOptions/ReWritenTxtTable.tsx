// ** React Imports
import { useEffect, useState, useCallback, forwardRef, ReactElement, Ref } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'


type SortType = 'asc' | 'desc' | undefined | null

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

import { LoginRegistrationAPI } from '../../services/API'
import { Button, Dialog, DialogContent, Divider, Fade, FadeProps, IconButton, InputAdornment, TextField } from '@mui/material'
import Icon from 'src/@core/components/icon'

import { toast } from 'react-toastify'


const ReWritenTxtTable = (props: any) => {

    const [show, setShow] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [sort, setSort] = useState<SortType>('desc')
    const [rows, setRows] = useState<any>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [sortColumn, setSortColumn] = useState<string>('createdAt')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
    const [mainData, setMainData] = useState<any>([]);
    const [status, setStatus] = useState<string>('all')
    const [type, setType] = useState<string>('all')
    const [length, setLength] = useState<string>('all')
    const [runFilter, setRunFilter] = useState<number>(0)

    const [tblStyle, setTblStyle] = useState<any>({
        width: "100%",
    })
    const [infoStyle, setInfoStyle] = useState<any>({
        width: "0%",
        display: "none",
        height: "70vh", overflowY: "auto"
    })
    const [selected, setSelected] = useState<any>({})
    const [totaTokens, setTotalTokens] = useState<any>('')

    {/* <Rephrase show={true} text={text} output={output} pov={pointOfView} tone={tone} language={language}/> */ }
    function loadServerRows(currentPage: number, data: any) {
        // console.log(data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize))
        return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
    }

    const columns: GridColDef[] = [
        {
            flex: 0.09,
            // minWidth: 120,
            headerName: 'Text',
            field: 'text',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.text}
                </Typography>
            )
        },
        {
            flex: 0.09,
            minWidth: 50,
            field: 'output_text',
            headerName: 'Output',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.output_text}
                </Typography>
            )
        },
        {
            flex: 0.05,
            // minWidth: 50,
            sortable: false,
            headerName: 'Type',
            field: 'type',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.type ? params.row.type?.toUpperCase() : ''}
                </Typography>
            )
        }
    ]

    useEffect(() => {

        LoginRegistrationAPI.getRewrites({ article_id: props.article_id }).then(res => {
            loadServerRows

            setMainData(res.data);

        })
        return () => {

        }


    }, [show])

    const fetchTableData = (useCallback(
        async (sort: SortType, q: string, column: string, type: string = 'all', length: string = 'all', status: string = 'all') => {
            const queryLowered = q.toLowerCase()
            const dataAsc = mainData.sort((a: any, b: any) => (a[column] < b[column] ? -1 : 1))

            let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
            if (type != 'all') {
                dataToFilter = dataToFilter.filter((item: any) => item.text?.toLowerCase().includes(type))
            }
            if (length != 'all') {
                dataToFilter = dataToFilter.filter((item: any) => item.original_text?.toLowerCase().includes(length))
            }
            if (status != 'all') {
                dataToFilter = dataToFilter.filter((item: any) => item.type?.toLowerCase().includes(status))
            }
            const filteredData = dataToFilter.filter(
                (item: any) =>
                    // item.id.toString().toLowerCase().includes(queryLowered) ||
                    // item.output?.toLowerCase().includes(queryLowered) ||
                    item.text?.toLowerCase().includes(queryLowered) ||
                    // item.is_error.toLowerCase().includes(queryLowered) ||
                    item.original_text?.toLowerCase().includes(queryLowered) ||
                    // item.user_id.toLowerCase().includes(queryLowered) ||
                    item.type.toString().toLowerCase().includes(queryLowered) //||
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
            setSort('desc')
            setSortColumn('createdAt')
        }
    }


    const handleClose = () => {
        setShow(false)
        // setShowRephrase(false)
        // setShowExpand(false)
        setInfoStyle({
            width: "0%",
            display: "none",

            overflowY: "auto",
            // transform: "translateX(100%)", transition: "transform 1s ease"
        })
        setTblStyle({
            width: "100%",

        })
    }

    const handleStyle = (open: boolean) => {
        if (open) {
            setInfoStyle({ width: "40%", borderLeft: "1px solid #E9E9EC", padding: "20px", margin: "0 auto", height: "60vh", overflowY: "auto" })
            setTblStyle({ width: "60%" })
        } else {
            setInfoStyle({
                width: "0%",
                display: "none",

            })
            setTblStyle({
                width: "100%"
            })
        }

    }



    return (
        <>
            <Button variant='outlined' color='secondary' className='outlined-btn-color' size='small' onClick={e => setShow(true)} sx={{ marginLeft: "10px", marginBottom: "5px", backgroundColor: "#fff" }} startIcon={<Icon icon="oui:index-edit" />}>AI Edits</Button>

            <Dialog
                fullWidth
                open={show}
                maxWidth='lg'
                scroll='body'
                onClose={handleClose}
                hideBackdrop={true}
                TransitionComponent={Transition}
                sx={{ margin: "0px", padding: "0px" }}
            >
                <DialogContent

                    sx={{
                        position: 'relative',
                        ml: 5,
                        mr: 5,
                        mb: 10,
                        height: "65vh",
                        padding: "10px 0px 10px 10px",
                        overflowY: "hidden"
                    }}

                >
                    <Box sx={{ position: 'relative', display: "flex", justifyContent: "end", width: "100%", marginBottom: "10px", paddingRight: "10px", zIndex: "1000000000" }}>
                        <Icon icon='mdi:close' onClick={handleClose} style={{ cursor: "pointer" }} />
                    </Box>
                    <Box sx={{ display: "flex", }}>
                        <Box sx={tblStyle} className='rewrite-info' >

                            <Box sx={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
                                <Typography variant='h6'>
                                    AI Edits
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
                                onCellClick={e => {
                                    handleStyle(true);
                                    setSelected(e.row)
                                    if (e.row?.token_used) {
                                        let x = JSON.parse(e.row?.token_used);
                                        setTotalTokens(x.total_tokens)
                                    }
                                }}
                            />

                            {/* </Card> */}
                        </Box>
                        <Box sx={infoStyle} className="rewrite-info">
                            <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
                                <Icon icon='mingcute:arrow-to-right-line' style={{ cursor: "pointer" }} onClick={e => handleStyle(false)} />
                            </Box>

                            <Box sx={{ marginBottom: "10px", fontSize: "11px" }}>
                                {/* <Box sx={{ display: "flex" }}> */}
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant='body1' sx={{ fontSize: "14px" }}>Type:</Typography>
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>&nbsp;{selected?.type?.toUpperCase()}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant='body1' sx={{ fontSize: "14px" }}>Model:</Typography>
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>&nbsp;{selected?.model}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant='body1' sx={{ fontSize: "14px" }}>Point Of View:</Typography>
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>&nbsp;{selected?.point_of_view}</Typography>
                                </Box>
                                {/* </Box> */}

                                <Box sx={{ display: "flex" }}>
                                    <Typography variant='body1' sx={{ fontSize: "14px" }}>Tone:</Typography>
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>&nbsp;{selected?.tone}</Typography>
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant='body1' sx={{ fontSize: "14px" }}>Language:</Typography>
                                    <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>&nbsp;{selected?.language}</Typography>
                                </Box>
                                {
                                    selected?.token_used &&
                                    <Box sx={{ display: "flex" }}>
                                        <Typography variant='body1' sx={{ fontSize: "14px" }}>Tokens Used: </Typography>
                                        <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>&nbsp;{totaTokens}</Typography>
                                    </Box>
                                }
                                {
                                    selected?.price &&
                                    <Box sx={{ display: "flex" }}>
                                        <Typography variant='body1' sx={{ fontSize: "14px" }}>Price: </Typography>
                                        <Typography variant='body1' sx={{ fontWeight: "bold", fontSize: "14px" }}>&nbsp; ${selected?.price.toFixed(5)}</Typography>
                                    </Box>
                                }



                            </Box>
                            <Divider />
                            {
                                selected.type == 'insert' ?
                                    <>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                            <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: 500 }}>
                                                Prompt
                                            </Typography>
                                            <Icon icon="clarity:copy-line" style={{ cursor: "pointer" }} onClick={e => {
                                                navigator.clipboard.writeText(selected.prompt)
                                                toast('Prompt Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                                            }} />
                                        </Box>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            // label="AI Output"
                                            multiline
                                            maxRows={10}
                                            value={selected.prompt}
                                            sx={{ width: "100%", marginTop: "5px" }}
                                            onChange={(e) => {
                                                // setOutput(e.target.value)
                                            }}
                                        // InputProps={{
                                        //     startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        // }}
                                        />

                                    </>
                                    :
                                    <>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                            <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: 500 }}>
                                                Text
                                            </Typography>
                                            <Icon icon="clarity:copy-line" style={{ cursor: "pointer" }} onClick={e => {
                                                navigator.clipboard.writeText(selected.text)
                                                toast('Text Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                                            }} />

                                        </Box>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            // label="AI Output"
                                            multiline
                                            maxRows={10}
                                            value={selected.text}
                                            sx={{ width: "100%", marginTop: "5px" }}
                                            onChange={(e) => {
                                                // setOutput(e.target.value)
                                            }}
                                        // InputProps={{
                                        //     startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        // }}
                                        />
                                    </>


                            }

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: 500 }}>
                                    Output Text
                                </Typography>
                                <Icon icon="clarity:copy-line" style={{ cursor: "pointer" }} onClick={e => {
                                    navigator.clipboard.writeText(selected.output_text)
                                    toast('Output Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                                }} />
                                {/* <CopyToClipboard text={selected.output_text}
                                    onCopy={() => {
                                        setNameOfTheOutputCpyButton('Copied!')
                                        setTimeout(() => {
                                            setNameOfTheOutputCpyButton('Copy to clipboard')
                                        }, 2000)
                                        // setNameOfTheButton('Copied')
                                    }}>
                                    <Button variant='outlined' sx={{ marginTop: "5px" }} size='small'>{nameOfTheOutputCpyButton}</Button>
                                </CopyToClipboard> */}
                            </Box>
                            <TextField
                                id="outlined-multiline-flexible"
                                // label="AI Output"
                                multiline
                                maxRows={10}
                                value={selected.output_text}
                                sx={{ width: "100%", marginTop: "5px" }}
                                onChange={(e) => {
                                    // setOutput(e.target.value)
                                }}
                            // InputProps={{
                            //     startAdornment: <InputAdornment position="start"></InputAdornment>,
                            // }}
                            />
                        </Box>

                    </Box>

                </DialogContent>



                {/* <DialogActions
                    sx={{

                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
                        display: "flex",
                        alignItems: "center",
                        mt: 5,
                        justifyContent: "end",
                    }}
                >

                    <Button variant='outlined' onClick={handleClose}>Close</Button>


                </DialogActions> */}

            </Dialog>
            {/* {
                showRephrase ?
                    <RephraseShow show={showRephrase} text={text} output={output} pov={pointOfView} tone={tone} language={language} />
                    : showExpand ?
                        <ExpandShow show={showExpand} text={text} output={output} pov={pointOfView} tone={tone} language={language} />
                        : null
            } */}
        </>


    )
}

export default ReWritenTxtTable
