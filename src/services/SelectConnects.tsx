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
import { Divider, InputAdornment, MenuItem, Select } from '@mui/material'
import { LoginRegistrationAPI } from './API'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

import fetch, { Headers } from "node-fetch"
import Swal from 'sweetalert2'
import Link from 'next/link'
const headers = new Headers()

const SelectConnects = (props: any) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(false)
  const [connectSelected, setConnectSelected] = useState<any>({})
  const [selectedId, setSelectedId] = useState<any>('')
  // const [cardNumber, setCardNumber] = useState<string>('')
  const [focus, setFocus] = useState<Focused | undefined>()
  // const [expiry, setExpiry] = useState<string | number>('')
  const [show, setShow] = useState<boolean>(false)
  const handleBlur = () => setFocus(undefined)
  const [connects, setConnects] = useState<any>([]);

  const handleClose = () => {
    setShow(false)
  }
  const handleSubmit = () => {
    setLoading(true)
    headers.set("Content-Type", "application/json")
    headers.set("Authorization", "Basic " + Buffer.from(`${connectSelected.username}:${connectSelected.password}`).toString("base64"))

    fetch(`${connectSelected.address}${process.env.NEXT_PUBLIC_WP_SLUG}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ title: props.title, content: props.html, status: "publish" })
    }).then(res => {
      setShow(false)
      setLoading(false)
      Swal.fire({
        title: 'Success!',
        text: 'The article is posted successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
    }).catch(e => {
      setShow(false)
      setLoading(false)

      Swal.fire({
        title: 'Error!',
        text: 'Unable to publish article to WordPress',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    })



  }


  useEffect(() => {
    LoginRegistrationAPI.getConnections({}).then(res => {
      setConnects(res.data)
      if (res.data?.length > 0) {
        setConnectSelected(res.data[0])
        setSelectedId(res.data[0].id)
      }

    }).catch(e => {
      console.log(e)
    })
  }, [])

  useEffect(() => {
    console.log(connectSelected)
  }, [connectSelected])
  return (
    <>
      <Button variant='contained' onClick={e => setShow(true)} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="ic:round-wordpress" />}>Publish to wordpress</Button>

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
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Connect to WordPress
            </Typography>
            <Typography variant='body2'>Select a Site to Send Article</Typography>
          </Box>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogContent>

        {
          connects.length > 0 ?
            <Box sx={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Select
                fullWidth
                placeholder='WordPress Address'
                // label='WordPress Address'
                labelId={connectSelected.id}
                defaultValue={connectSelected.id}
                onChange={e => {
                  setSelectedId(e.target.value)
                  setConnectSelected(e.target.value);
                  connects.map((c: any) => {
                    if (c.id == e.target.value)
                      setConnectSelected(c);
                  })

                }}

                sx={{ width: "90%" }}
              >
                {
                  connects.map((c: any, i: any) => {
                    return (
                      <MenuItem key={i} value={c.id}>{c.address}</MenuItem>
                    )
                  })

                }
              </Select>

            </Box>

            :
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              padding: "20px"
            }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                You don't have any website connected.<br></br> <Link href={"/integrations"}>Click here</Link> to connect to WordPress websites.
              </Typography>

            </Box>

        }


        <DialogActions
          sx={{

            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >


          {
            connects.length > 0 ?
              <div style={{ marginTop: "20px" }}>
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit} disabled={loading} startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null
                }>
                  Send
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </div>
              :
              null
          }

        </DialogActions>
      </Dialog>
    </>
  )
}

export default SelectConnects
