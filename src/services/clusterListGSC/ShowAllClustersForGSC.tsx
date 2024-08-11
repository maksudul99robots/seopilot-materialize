// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'
// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
import { LoginRegistrationAPI } from '../API'
import Clusters from 'src/pages/clusters'
import ListofClusters from './ListofClusters'
import { getDateTime } from '../DateTimeFormatter'



const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
type SortType = 'asc' | 'desc' | undefined | null


const ShowAllClustersForGSC = (props: any) => {
  // ** States

  const [focus, setFocus] = useState<Focused | undefined>()
  // const [expiry, setExpiry] = useState<string | number>('')
  const [show, setShow] = useState<boolean>(false)
  // const [selectedSite, setSelectedSite] = useState<any>(props.sites[0] ? props.sites[0]?.siteUrl : '')
  const handleBlur = () => setFocus(undefined)

  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('desc')
  const [rows, setRows] = useState<any>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('createdAt')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [mainData, setMainData] = useState<any>([]);
  const [loading, setLoading] = useState(false)

  const handleClose = (event: any = null, reason: any = null) => {
    if (reason && reason === "backdropClick")
      return;
    setShow(false)
  }

  useEffect(() => {
    setMainData(props.clusters)
  }, [props.clusters])

  const columns: GridColDef[] = [
    {
      flex: 0.5,
      minWidth: 320,
      field: 'topic',
      headerName: 'Topic',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(params)} */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
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
      headerName: 'Target Audience',
      field: 'target_audience',
      valueGetter: params => new Date(params.value),
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography variant='body2' >
            {row.target_audience}
          </Typography>
        )

      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      headerName: 'No. of ideas',
      field: 'number_of_clusters',
      valueGetter: params => new Date(params.value),
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography variant='body2'>
            {row.number_of_clusters}
          </Typography>
        )

      }
    },
    {
      flex: 0.2,
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
    // {
    //     flex: 0.2,
    //     headerName: 'Action',
    //     field: 'empty',
    //     sortable: false,
    //     disableColumnMenu: true,
    //     valueGetter: params => new Date(params.value),
    //     renderCell: (params: GridRenderCellParams) => {
    //         const { row } = params
    //         return (
    //             <Button variant='outlined' size='small' sx={{ width: "100%" }} onClick={() => {
    //                 addToCluster(row.id)
    //             }}>
    //                 Add to cluster
    //             </Button>
    //         )

    //     }
    // }
  ]

  function loadServerRows(currentPage: number, data: any) {
    return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
  }


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
          item.target_audience?.toLowerCase().includes(queryLowered)
        // item.user_id.toLowerCase().includes(queryLowered) ||
        // item.createdAt.toString().toLowerCase().includes(queryLowered) ||
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
    <>
      <Button variant='outlined' onClick={e => {
        setShow(true)
      }} size='small' sx={{ fontSize: "10px" }}>
        Add to cluster
      </Button>

      <Dialog
        fullWidth
        open={show}
        maxWidth='lg'
        scroll='body'
        onClose={() => { setShow(false) }}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton size='small' onClick={() => { setShow(false) }} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <ListofClusters clusters={props.clusters} page={props.page} setShow={setShow} start={props.start} end={props.end} />

          {/* <Box>
            <DataGrid
              autoHeight
              pagination
              rows={rows}
              rowCount={total}
              columns={columns}
              // checkboxSelection
              loading={loading}
              rowSelection={false}
              sortingMode='server'
              paginationMode='server'
              pageSizeOptions={[50]}
              paginationModel={paginationModel}
              onSortModelChange={handleSortModel}
              // slots={{ toolbar: ServerSideToolbar }}
              onPaginationModelChange={setPaginationModel}
            // slotProps={{
            //   baseButton: {
            //     variant: 'outlined'
            //   },
            //   toolbar: {
            //     title: "Clusters",

            //     value: searchValue,
            //     clearSearch: () => handleSearch(''),
            //     onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            //   }
            // }}
            />
          </Box> */}

        </DialogContent>

      </Dialog>
    </>
  )
}

export default ShowAllClustersForGSC
