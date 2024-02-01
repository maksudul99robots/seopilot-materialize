// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent } from 'react'

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

// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Util Import

// ** Styled Component Imports

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { InputAdornment } from '@mui/material'
import { LoginRegistrationAPI } from './API'
import Swal from 'sweetalert2'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DeleteWorkspace = (props: any) => {
  // ** States
  const [address, setAddress] = useState<string>(props.address)
  const [username, setUsername] = useState<string>(props.username)
  const [appPassword, setAppPassword] = useState<string>(props.appPassword)
  // const [cardNumber, setCardNumber] = useState<string>('')
  const [focus, setFocus] = useState<Focused | undefined>()
  // const [expiry, setExpiry] = useState<string | number>('')
  const [show, setShow] = useState<boolean>(false)
  const handleBlur = () => setFocus(undefined)

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'address') {
      // target.value = formatCreditCardNumber(target.value, Payment)
      setAddress(target.value)
    } else if (target.name === 'username') {
      // target.value = formatExpirationDate(target.value)
      setUsername(target.value)
    } else if (target.name === 'appPassword') {
      setAppPassword(target.value)
    }
  }

  const handleClose = () => {
    setAddress('')
    setUsername('')
    setAppPassword('')
    setShow(false)
  }
  const handleSubmit = () => {
    if (props.id == props.currentWorkspace) {
      Swal.fire({
        title: 'Sorry!',
        text: 'You Cannot Delete The Current Workspace. Please Checkout to Another Workspace to Delete This Workspace.',
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: "#2979FF"
      })
    } else {
      LoginRegistrationAPI.deleteWorkspace({ id: props.id }).then(res => {
        // props.setReRender(!props.reRender);
        window.location.href = window.location.href;
      }).catch(e => {
        console.log("error:", e)
        Swal.fire({
          title: 'Error!',
          text: 'Cannot Delete! There Must be at Least One Workspace on the Owner\'s Account.',
          icon: 'warning',
          confirmButtonText: 'Close',
          confirmButtonColor: "#2979FF"
        })
      })

    }
    setShow(false)
  }

  return (
    <>
      <Button variant='outlined' onClick={e => {
        setShow(props.showDelete)
      }} startIcon={<Icon icon="material-symbols-light:delete-outline" />} disabled={props.disabled}>
        delete
      </Button>

      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={handleClose}
        onBackdropClick={handleClose}
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
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Delete Workspace
            </Typography>
            {/* <Typography variant='body2'>Send Article to WordPress</Typography> */}
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important`, }}>
              <Grid container spacing={1} sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                <p>Are you sure you want to delete this Workspace?</p>
                <p><b>Note:</b> All your articles, integrations, and saved API Key will be removed permanently.</p>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
            Delete
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteWorkspace
