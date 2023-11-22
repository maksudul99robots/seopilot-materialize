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
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { InputAdornment } from '@mui/material'
import { LoginRegistrationAPI } from './API'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogAddCard = (props: any) => {
  // ** States
  const [address, setAddress] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [appPassword, setAppPassword] = useState<string>('')
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
    LoginRegistrationAPI.addConnectWP({ address: address, username: username, password: appPassword }).then(res => {
      props.setReRender(!props.reRender);
    })
    setShow(false)
  }

  return (
    <>
      <Button variant='contained' onClick={() => setShow(true)}>
        + Add a connection
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
              Connect to WordPress
            </Typography>
            <Typography variant='body2'>Send Article to WordPress</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: 7 }}>
                  <TextField
                    fullWidth
                    name='address'
                    value={address}
                    autoComplete='off'
                    label='WordPress Address (URL)'
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder=''
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='username'
                    value={username}
                    autoComplete='off'
                    onBlur={handleBlur}
                    label='Username'
                    placeholder='Admin'
                    onChange={e => setUsername(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='appPassword'
                    label='App Password'
                    value={appPassword}
                    onBlur={handleBlur}
                    placeholder='*********'
                    onChange={handleInputChange}
                    onFocus={e => setFocus(e.target.name as Focused)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  />
                </Grid>

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
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogAddCard
