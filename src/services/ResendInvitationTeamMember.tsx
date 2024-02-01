// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect } from 'react'

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
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { LoginRegistrationAPI } from './API'
import { ValidateEmail } from './emailValidation'
import Swal from 'sweetalert2'
import SendIcon from '@mui/icons-material/Send';
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const ResendInvitationTeamMember = (props: any) => {
  // ** States
  const [email, setEmail] = useState<string>(props.email)
  const [role, setRole] = useState<string>(props.role)
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const [focus, setFocus] = useState<Focused | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const handleBlur = () => setFocus(undefined)

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'email') {
      // target.value = formatCreditCardNumber(target.value, Payment)
      setEmail(target.value)
    }
  }

  const handleClose = () => {
    setEmail('')
    setShow(false)
    setLoading(false)
  }

  useEffect(() => {
    if (email.length > 1) {
      if (ValidateEmail(email)) {
        setIsEmailValid(true)
        setDisable(false)
      } else {
        setIsEmailValid(false)
        setDisable(true)
      }

    } else {
      setIsEmailValid(false)
    }


  }, [email])

  const handleSubmit = () => {
    setLoading(true);

    LoginRegistrationAPI.inviteToTeam({ role: props.role, email: props.email }).then(res => {
      props.setReRender(!props.reRender);
      setLoading(false);

      Swal.fire({
        title: 'Success!',
        text: 'An Invitation Mail is Sent',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      })
    }).catch(e => {
      setLoading(false);
      console.log(e)
      Swal.fire({
        title: 'Error!',
        text: e.response.data,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      })
    })
    setShow(false)
  }

  return (
    <>


      <IconButton aria-label="Edit" sx={{ marginRight: "10px" }} onClick={e => {
        setShow(props.showResend)
      }}>
        <LightTooltip title={
          <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
            Resend Invitation
          </p>
        } placement="top">
          <SendIcon />
        </LightTooltip>

      </IconButton>




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
              Resend Invitation
            </Typography>
            {/* <Typography variant='body2'>Send Article to WordPress</Typography> */}
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important`, }}>
              <Grid container spacing={1} sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                Are you sure you want to resend invitation to {props.email}?
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
            Resend
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ResendInvitationTeamMember
