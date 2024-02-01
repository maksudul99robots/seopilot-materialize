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
import { Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
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
  const [status, setStatus] = useState<string>('publish');

  const handleClose = () => {
    setShow(false)
  }



  function insertH1BeforeFirstH2(htmlString: string, title: string) {
    // Create a temporary div element to parse the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Find the first h2 element
    const firstH2 = tempDiv.querySelector('h2');

    if (firstH2) {
      // Create a new h1 element
      const h1 = document.createElement('h1');
      h1.textContent = title;

      // Insert the new h1 before the first h2
      firstH2.parentNode?.insertBefore(h1, firstH2);
    }

    // Return the modified HTML string
    return tempDiv.innerHTML;
  }

  // function getFormatedHtml(str: string) {
  //   // str = insertH1BeforeFirstH2(str, props.title);
  //   if()
  //   str = insertImageAtTheBeginning(str, props.fImg.urls.full)

  //   return str
  // }
  function insertH1AtTheBeginning(htmlString: string, title: string) {
    // Create a temporary div element to parse the HTML string
    const h1 = document.createElement('h1');
    h1.textContent = title;

    const tempDiv = document.createElement('div');
    htmlString = `<h1>${title}</h1>` + htmlString;
    tempDiv.innerHTML = htmlString;

    // Find the first h2 element
    // const firstH2 = tempDiv.querySelector('h2');

    // if (firstH2) {
    //     // Create a new h1 element


    //     // Insert the new h1 before the first h2
    //     firstH2.parentNode?.insertBefore(h1, firstH2);
    // }

    // Return the modified HTML string
    return tempDiv.innerHTML;
  }
  function insertImageAfterFirstH1(htmlString: string, imgSrc: string) {
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    // Find the first h1 element
    const firstH1: any = tempContainer.querySelector('h1');

    if (firstH1) {
      // Create an img element
      const imgElement: any = document.createElement('img');
      // imgElement.width = "500";
      // imgElement.height = "400";
      imgElement.style.width = "100%"
      imgElement.src = imgSrc;

      // Insert the img element after the first h1
      firstH1.parentNode.insertBefore(imgElement, firstH1.nextSibling);
    } else {

    }

    // Return the modified HTML
    return tempContainer.innerHTML;
  }

  function insertImageAtTheBeginning(htmlString: string, imgSrc: string, fImgObj: any) {


    if (fImgObj?.user?.links?.html) {
      htmlString = `<img src="${imgSrc}" width=800 height=450 alt="Featured Image"/> <figcaption>Photo by <a href=${fImgObj.user.links.html + "?utm_source=Seopilot&utm_medium=referral"} target='_blank' className='colorLink'>${fImgObj.user.name}</a> on <a href='https://unsplash.com/?utm_source=Seopilot&utm_medium=referral' target='_blank' className='colorLink'>Unsplash</a></figcaption>` + htmlString;
    } else if (fImgObj?.photos) {
      `<img src="${imgSrc}" width=800 height=450 alt="Featured Image"/> <figcaption>Photo by <a href=${fImgObj.photos[0].photographer_url} target='_blank' className='colorLink'>${fImgObj.photos[0].photographer}</a> on <a href='https://www.pexels.com/' target='_blank' className='colorLink'>Pexels</a></figcaption>` + htmlString;
    } else {
      htmlString = `<img src="${imgSrc}" width=800 height=450 alt="Featured Image" style="object-fit: cover" />` + htmlString;
    }
    // Return the modified HTML
    return htmlString;
  }

  function getFormatedHtml(str: string) {
    let isImgAdded: any = [];
    // str = insertH1AtTheBeginning(str, props?.title);
    if (props?.fImg?.urls?.full)
      str = insertImageAtTheBeginning(str, props?.fImg?.urls?.full, props?.fImg)

    if (props.fImg?.photos) {
      str = insertImageAtTheBeginning(str, props.fImg.photos[0].src.original, props?.fImg)
    }

    if (typeof (props.fImg) == 'string') {
      str = insertImageAtTheBeginning(str, props.fImg, props.fImg)
    }

    if (props.articleType == 'listicle' && props.listicleOutlines?.length > 0) {

      let doc = new DOMParser().parseFromString(str, "text/html");

      for (let i = 0; i < props.listicleOutlines.length; i++) {
        // props.listicleOutlines?.map((x: any, i: number) => {
        let listicle = JSON.parse(props.listicleOutlines[i]);

        // => <a href="#">Link...


        let elements: any = doc.querySelectorAll(listicle.tag);
        elements = Array.from(elements);
        for (let j = 0; j < elements.length; j++) {

          let title = listicle.title;
          if (props.numberedItem) {
            let count = i + 1;
            title = count + '. ' + title;
          }

          if (elements[j].innerText == title && !isImgAdded[title]) {
            let x = isImgAdded;
            x[title] = true;
            isImgAdded = x;
            elements[j].insertAdjacentHTML('afterend', `<img src="${listicle.imgSrcUrl}" style="height: auto; width: 100%;"/>`);
          }

        }

        str = doc.documentElement.outerHTML


      }

    }
    // console.log("str:", str)
    return str
  }

  const handleSubmit = () => {
    setLoading(true)
    headers.set("Content-Type", "application/json")
    headers.set("Authorization", "Basic " + Buffer.from(`${connectSelected.username}:${connectSelected.password}`).toString("base64"))

    fetch(`${connectSelected.address}${process.env.NEXT_PUBLIC_WP_SLUG}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ title: props.title, content: getFormatedHtml(props.html), status: status })
    }).then(res => {
      setShow(false)
      setLoading(false)
      Swal.fire({
        title: 'Success!',
        text: 'The article is posted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      })
    }).catch(e => {
      setShow(false)
      setLoading(false)

      Swal.fire({
        title: 'Error!',
        text: 'Unable to publish article to WordPress',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
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
    // console.log(connectSelected)
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
              display: "block",
              // justifyContent: "center",
              // flexDirection: "column",
              // flexDirection: "row",
              // width: "100%"
            }}>

              <div style={{ paddingLeft: "7%", paddingRight: "7%" }}>
                <FormControl fullWidth sx={{
                  width: "100%", marginBottom: "20px"
                }}>
                  <InputLabel id='address-select'>WordPress Address</InputLabel>
                  <Select
                    fullWidth
                    placeholder='WordPress Address'
                    label='WordPress Address'
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


                  >
                    {
                      connects.map((c: any, i: any) => {
                        return (
                          <MenuItem key={i} value={c.id}>{c.address}</MenuItem>
                        )
                      })

                    }
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ width: "100%" }}>
                  <InputLabel id='Status-select'>Post Status</InputLabel>
                  <Select
                    fullWidth
                    placeholder='Post Status'
                    label='Post Status'
                    labelId='Status-select'
                    defaultValue={status}
                    onChange={e => {
                      setStatus(e.target.value);
                    }}
                  >
                    <MenuItem value='publish'>Publish</MenuItem>
                    <MenuItem value='draft'>Draft</MenuItem>
                  </Select>
                </FormControl>

              </div>




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
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            display: "flex",
            justifyContent: "center",
          }}
        >


          {
            connects.length > 0 ?
              <div style={{ marginTop: "10px" }}>
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
