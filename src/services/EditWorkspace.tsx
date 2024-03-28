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
import { FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
import { LoginRegistrationAPI } from './API'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const EditWorkspace = (props: any) => {
  // ** States
  const [name, setName] = useState<string>(props.name)

  const [focus, setFocus] = useState<Focused | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const [timezone, setTimezone] = useState<string>(props.timezone);


  const handleBlur = () => setFocus(undefined)

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'name') {
      // target.value = formatCreditCardNumber(target.value, Payment)
      setName(target.value)
    }
  }

  const handleClose = () => {
    // setName('')
    setShow(false)
  }
  const handleSubmit = () => {

    LoginRegistrationAPI.editWorkspace({ name, id: props.id, timezone }).then(res => {
      // props.setReRender(!props.reRender);
      window.location.href = window.location.href;
    }).catch(e => {
      console.log("error:", e)
    })
    setShow(false)
  }

  return (
    <>
      <Button variant='outlined' sx={{ marginRight: "10px" }} onClick={e => {
        setShow(props.showEdit)
      }} startIcon={<Icon icon="tabler:edit" />} disabled={props.disabled}>
        Edit
      </Button >

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
              Edit Workspace Name
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: 7 }}>
                  <TextField
                    fullWidth
                    name='name'
                    defaultValue={name}
                    autoComplete='off'
                    label='Workspace Name'
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder=''
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}

                  />
                </Grid>

              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <FormControl fullWidth sx={{
                    width: "100%",
                  }}>

                    <InputLabel id='address-select'>Time Zone</InputLabel>
                    <Select
                      fullWidth
                      placeholder='Time Zone'
                      label='Time Zone'
                      defaultValue={timezone}
                      onChange={e => {
                        setTimezone(e.target.value)
                      }}
                    >
                      <MenuItem value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</MenuItem>
                      <MenuItem value="-11:00">(GMT -11:00) Midway Island, Samoa</MenuItem>
                      <MenuItem value="-10:00">(GMT -10:00) Hawaii</MenuItem>
                      <MenuItem value="-09:50">(GMT -9:30) Taiohae</MenuItem>
                      <MenuItem value="-09:00">(GMT -9:00) Alaska</MenuItem>
                      <MenuItem value="-08:00">(GMT -8:00) Pacific Time (US &amp; Canada)</MenuItem>
                      <MenuItem value="-07:00">(GMT -7:00) Mountain Time (US &amp; Canada)</MenuItem>
                      <MenuItem value="-06:00">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</MenuItem>
                      <MenuItem value="-05:00">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</MenuItem>
                      <MenuItem value="-04:50">(GMT -4:30) Caracas</MenuItem>
                      <MenuItem value="-04:00">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</MenuItem>
                      <MenuItem value="-03:50">(GMT -3:30) Newfoundland</MenuItem>
                      <MenuItem value="-03:00">(GMT -3:00) Brazil, Buenos Aires, Georgetown</MenuItem>
                      <MenuItem value="-02:00">(GMT -2:00) Mid-Atlantic</MenuItem>
                      <MenuItem value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</MenuItem>
                      <MenuItem value="+00:00">(GMT) Western Europe Time, London, Lisbon, Casablanca</MenuItem>
                      <MenuItem value="+01:00">(GMT +1:00) Brussels, Copenhagen, Madrid, Paris</MenuItem>
                      <MenuItem value="+02:00">(GMT +2:00) Kaliningrad, South Africa</MenuItem>
                      <MenuItem value="+03:00">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</MenuItem>
                      <MenuItem value="+03:50">(GMT +3:30) Tehran</MenuItem>
                      <MenuItem value="+04:00">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</MenuItem>
                      <MenuItem value="+04:50">(GMT +4:30) Kabul</MenuItem>
                      <MenuItem value="+05:00">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</MenuItem>
                      <MenuItem value="+05:50">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</MenuItem>
                      <MenuItem value="+05:75">(GMT +5:45) Kathmandu, Pokhara</MenuItem>
                      <MenuItem value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</MenuItem>
                      <MenuItem value="+06:50">(GMT +6:30) Yangon, Mandalay</MenuItem>
                      <MenuItem value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</MenuItem>
                      <MenuItem value="+08:00">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</MenuItem>
                      <MenuItem value="+08:75">(GMT +8:45) Eucla</MenuItem>
                      <MenuItem value="+09:00">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</MenuItem>
                      <MenuItem value="+09:50">(GMT +9:30) Adelaide, Darwin</MenuItem>
                      <MenuItem value="+10:00">(GMT +10:00) Eastern Australia, Guam, Vladivostok</MenuItem>
                      <MenuItem value="+10:50">(GMT +10:30) Lord Howe Island</MenuItem>
                      <MenuItem value="+11:00">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</MenuItem>
                      <MenuItem value="+11:50">(GMT +11:30) Norfolk Island</MenuItem>
                      <MenuItem value="+12:00">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</MenuItem>
                      <MenuItem value="+12:75">(GMT +12:45) Chatham Islands</MenuItem>
                      <MenuItem value="+13:00">(GMT +13:00) Apia, Nukualofa</MenuItem>
                      <MenuItem value="+14:00">(GMT +14:00) Line Islands, Tokelau</MenuItem>
                    </Select>
                  </FormControl>

                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'end',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditWorkspace
