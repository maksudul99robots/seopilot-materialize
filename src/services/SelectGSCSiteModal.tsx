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

const SelectGSCSiteModal = (props: any) => {
  // ** States

  const [focus, setFocus] = useState<Focused | undefined>()
  // const [expiry, setExpiry] = useState<string | number>('')
  const [show, setShow] = useState<boolean>(props.showSites)
  const [selectedSite, setSelectedSite] = useState<any>(props.sites[0] ? props.sites[0].siteUrl : '')
  const handleBlur = () => setFocus(undefined)

  useEffect(() => {
    setSelectedSite(props.sites[0].siteUrl)
  }, [props.sites])

  const handleClose = () => {
    props.setShowSites(false)
  }
  const handleSubmit = () => {
    LoginRegistrationAPI.addSite({ site_url: selectedSite }).then(res => {
      LoginRegistrationAPI.addWebsiteAnalytics({}).then(res3 => {
        props.setReRender(!props.reRender);
        handleClose()
      }).catch(e => {
        console.log("unable to get connections")
      })

    }).catch(e => {
      console.log("error:", e)
    })
    setShow(false)
  }

  return (
    <>
      {/* <Button variant='outlined' onClick={e => {
        setShow(props.showDelete)
      }} startIcon={<Icon icon="material-symbols-light:delete-outline" />}>
        delete
      </Button> */}

      <Dialog
        fullWidth
        open={props.showSites}
        maxWidth='sm'
        scroll='body'
        onClose={handleClose}
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
            <Typography variant='h5' sx={{ mb: 0, lineHeight: '2rem' }}>
              Google Search Console Sites
            </Typography>
            <Typography variant='subtitle2' sx={{}}>
              Select One Site for this Workspace. We will use this site for the article internal linking.
            </Typography>
            {/* <Typography variant='body2'>Send Article to WordPress</Typography> */}
          </Box>
          <FormControl fullWidth sx={{
            width: "100%", marginTop: "20px"
          }}>
            <InputLabel id='address-select'>Select a Website Domain</InputLabel>
            <Select
              fullWidth
              placeholder='Select a Website Domain'
              label='Select a Website Domain'
              labelId='address-select'
              value={selectedSite}
              onChange={e => {
                setSelectedSite(e.target.value)
              }}
            >
              {
                props.sites.map((c: any, i: any) => {
                  return (
                    <MenuItem key={i} value={c.siteUrl}>{c.siteUrl}</MenuItem>
                  )
                })

              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'end',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
            Add
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SelectGSCSiteModal
