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
import { CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Select, Table } from '@mui/material'
import { LoginRegistrationAPI } from '../API'
import Clusters from 'src/pages/clusters'
import ListofClusters from './ListofClusters'
import { getDateTime } from '../DateTimeFormatter'

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
type SortType = 'asc' | 'desc' | undefined | null
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const ShowAllClustersForGSCRefined = (props: any) => {
  // ** States

  const [show, setShow] = useState<boolean>(false)
  // const [selectedSite, setSelectedSite] = useState<any>(props.sites[0] ? props.sites[0]?.siteUrl : '')

  const [mainData, setMainData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false)


  const handleClose = (event: any = null, reason: any = null) => {
    if (reason && reason === "backdropClick")
      return;
    setShow(false)
  }

  useEffect(() => {
    setMainData(props.clusters)
  }, [props.clusters])

  const addToCluster = (cluster_id: number | string) => {
    // setLoading([...loading, { loading[cluster_id]= true }])
    setLoading(true)
    LoginRegistrationAPI.createIdeaInsertToCluster({ cluster_id, page: props.page, start: props.start, end: props.end }).then(res => {
      setShow(false)
      setLoading(false)
      Swal.fire({
        title: 'Success',
        text: 'The article idea is added to the selected cluster.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      }).then(() => {

      })
    }).catch(e => {
      setShow(false)
      setLoading(false)
      Swal.fire({
        title: 'Error',
        text: 'Unable to add to the cluster.',
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: "#2979FF"
      }).then(() => {

      })
      console.log(e)
    })
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

          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {/* <ListofClusters clusters={props.clusters} page={props.page} setShow={setShow} start={props.start} end={props.end} />
           */}
          <Box sx={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
            <Typography variant='h5'>
              Select a Cluster to Add Article Idea
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ border: "1px solid #0000" }}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "#F5F5F7" }}>
                <TableRow>
                  <TableCell>Topic</TableCell>
                  <TableCell >Target Audience</TableCell>
                  <TableCell align="right">No. of ideas</TableCell>
                  <TableCell align="right">Created</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.clusters.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.topic}
                    </TableCell>
                    <TableCell >{row.target_audience}</TableCell>
                    <TableCell align="right">{row.number_of_clusters}</TableCell>
                    <TableCell align="right">{getDateTime(row.createdAt)}</TableCell>
                    <TableCell align="right">  <Button variant='outlined' size='small' sx={{ width: "100%", fontSize: "12px" }} onClick={() => {
                      addToCluster(row.id)
                    }}>
                      Add to cluster
                    </Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default ShowAllClustersForGSCRefined
