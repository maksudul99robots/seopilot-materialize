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
import CircularProgress from '@mui/material/CircularProgress';

// ** Third Party Imports
import Cards, { Focused } from 'react-credit-cards'



// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { LoginRegistrationAPI } from 'src/services/API'
import Swal from 'sweetalert2'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const ChangeUserPlan = (props: any) => {
  // ** States
  const [name, setName] = useState<string>('')
  const [userDetails, setUserDetails] = useState<any>(null);
  const [focus, setFocus] = useState<Focused | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const handleBlur = () => setFocus(undefined)

  const [plan, setPlan] = useState("monthly - passenger");


  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'name') {
      // target.value = formatCreditCardNumber(target.value, Payment)
      setName(target.value)
    }
  }

  const handleClose = () => {
    setName('')
    setShow(false)
  }
  const handleSubmit = () => {
    // console.log(plan)
    setShow(false)
    LoginRegistrationAPI.changeUserPlan({ id: props.row.id, plan: plan }).then(res => {
      Swal.fire({
        title: 'Success!',
        text: 'Plan is updated successfully!',
        icon: 'success',
        confirmButtonText: 'Close',
        confirmButtonColor: "#2979FF"
      })
    }).catch(e => {
      Swal.fire({
        title: 'Error',
        text: 'Failed to change plan.',
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: "#2979FF"
      })
      console.log(e)
    })
  }


  return (
    <>
      <Button variant='outlined' sx={{ color: 'text.primary', fontWeight: 600, cursor: "pointer" }} onClick={() => { setShow(true); }}>
        {/* {props.user.email} */}
        Change Plan
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
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            overflow: "hidden"
          }}
        >

          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Change user plan
            </Typography>
            <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>
          </Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Plan</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="monthly - passenger" control={<Radio onChange={(e) => setPlan(e.target.value)} />} label="Monthly Passenger" />
              <FormControlLabel value="monthly - copilot" control={<Radio onChange={(e) => setPlan(e.target.value)} />} label="Monthly Co-Pilot" />
              <FormControlLabel value="monthly - captain" control={<Radio onChange={(e) => setPlan(e.target.value)} />} label="Monthly Captain" />
              <FormControlLabel value="yearly - passenger" control={<Radio onChange={(e) => setPlan(e.target.value)} />} label="Yearly Passenger" />
              <FormControlLabel value="yearly - copilot" control={<Radio onChange={(e) => setPlan(e.target.value)} />} label="Yearly Co-Pilot" />
              <FormControlLabel value="yearly - captain" control={<Radio onChange={(e) => setPlan(e.target.value)} />} label="Yearly Captain" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >

          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangeUserPlan
