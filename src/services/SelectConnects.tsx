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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
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
import { Alert, Divider, FormControl, InputAdornment, InputLabel, Menu, MenuItem, MenuProps, Select, alpha, styled } from '@mui/material'
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
import { EventDateType } from 'src/types/apps/calendarTypes'

const headers = new Headers()

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

interface PickerProps {
  label?: string
  error?: boolean
  registername?: string
}

interface DefaultStateType {
  url: string
  title: string
  allDay: boolean
  calendar: string
  description: string
  endDate: Date | string
  startDate: Date | string
  guests: string[] | string | undefined
}

const capitalize = (string: string) => string && string[0].toUpperCase() + string.slice(1)

const defaultState: DefaultStateType = {
  url: '',
  title: '',
  guests: [],
  allDay: false,
  description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date()
}

const SelectConnects = (props: any) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(false)
  const [connectSelected, setConnectSelected] = useState<any>({})
  const [selectedId, setSelectedId] = useState<any>('')
  // const [cardNumber, setCardNumber] = useState<string>('')
  const [focus, setFocus] = useState<Focused | undefined>()
  // const [expiry, setExpiry] = useState<string | number>('')
  const [show, setShow] = useState<boolean>(false)
  const [showSchedule, setShowSchedule] = useState<boolean>(false)
  const handleBlur = () => setFocus(undefined)
  const [connects, setConnects] = useState<any>([]);
  const [status, setStatus] = useState<string>('publish');
  // const [timeZone, setTimeZone] = useState<string>(props.timezone);
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [values, setValues] = useState<DefaultStateType>(defaultState)

  const handleClose = () => {
    setShow(false)
  }
  const handleCloseSchedule = () => {
    setShowSchedule(false)
  }
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

  function insertImageAtStart(htmlString: string, imgSrc: string) {
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    // Create an img element
    const imgElement = document.createElement('img');
    imgElement.style.width = "100%";
    imgElement.src = imgSrc;

    // Insert the img element at the beginning
    tempContainer.insertBefore(imgElement, tempContainer.firstChild);

    // Return the modified HTML
    return tempContainer.innerHTML;
  }


  function getHtmlFromDocument(str: string) {
    // str = getHtmlFromDocument(str)
    // str = insertH1AtTheBeginning(str, props.title);
    // console.log("props.fImg:", props.fImg)
    // console.log("props.fImg?.urls?.full:", props.fImg?.urls?.full)
    // console.log("props.fImg.photos[0].src.original", props.fImg?.photos[0].src.original)
    // console.log("props.fImg?.urls?.full:",props.fImg?.urls?.full)

    if (props.fImg?.urls?.full) {

      str = insertImageAtStart(str, props.fImg.urls.full)
    }
    if (props.fImg?.photos) {
      str = insertImageAtStart(str, props.fImg.photos[0].src.original)
    }
    if (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') {
      str = insertImageAtStart(str, props.fImg)
    }

    if (props.articleType == 'listicle' && props.listicleOutlines?.length > 0) {

      let doc = new DOMParser().parseFromString(str, "text/html");
      let isImgAdded: any = [];
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
    // getHtmlFromDocument(props.html)
    // return

    setLoading(true)
    headers.set("Content-Type", "application/json")
    // headers.set('Access-Control-Allow-Origin', '*')
    headers.set("Authorization", "Basic " + Buffer.from(`${connectSelected.username}:${connectSelected.password}`).toString("base64"))

    fetch(`${connectSelected.address}${process.env.NEXT_PUBLIC_WP_SLUG}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ title: props.title, content: getHtmlFromDocument(props.html), status: status })
    }).then(res => {
      // console.log(res);
      setShow(false)
      setLoading(false)
      if (res.status == 201) {
        Swal.fire({
          title: 'Success!',
          text: 'The article is posted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: "#2979FF"
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Unable to publish article to WordPress. Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: "#2979FF"
        })
      }

    }).catch(e => {
      console.log(e)
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
  const handleScheduleSubmit = () => {
    setLoading(true)
    LoginRegistrationAPI.saveSchadule({
      article_id: props.article_id,
      date_time: dateTime,
      site: connectSelected.id,
      post_status: status,
      article_content: getHtmlFromDocument(props.html)

    }).then(res => {
      setLoading(false)
      handleCloseSchedule()
      if (res.status == 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Schedule is saved successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: "#2979FF"
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Unable to Save Schedule.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: "#2979FF"
        })
      }
    }).catch(e => {
      setLoading(false)
      handleCloseSchedule()
      Swal.fire({
        title: 'Error!',
        text: 'Unable to Save Schedule',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      })
    })
  }

  function getHtmlFromDocumentPrevious(str: any) {
    // Regular expression to match HTML tags with attributes
    const regex = /<([^>\s]+)(?:\s+([^>]*))?>/g;

    // Function to handle replacement. Replacing all the attributes except anchor tags
    function replaceAttributes(match: any, tag: any, attributes: any) {
      // Check if the tag is an anchor tag
      if (tag.toLowerCase() === 'a') {
        return match; // If it's an anchor tag, leave it as it is
      } else {
        // If it's not an anchor tag, remove all attributes
        return `<${tag}>`;
      }
    }

    // Replace attributes in HTML string
    let sanitizedHtml = str.replace(regex, replaceAttributes);

    sanitizedHtml = sanitizedHtml.replaceAll('<span><span>', '<span>')
    sanitizedHtml = sanitizedHtml.replaceAll('</span></span>', '</span>')

    str = insertH1AtTheBeginning(sanitizedHtml, props.title);
    if (props.fImg?.urls?.full) {

      str = insertImageAfterFirstH1(str, props.fImg.urls.full)
    }
    if (props.fImg?.photos) {
      str = insertImageAfterFirstH1(str, props.fImg.photos[0].src.original)
    }
    if (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') {
      str = insertImageAfterFirstH1(str, props.fImg)
    }

    // if (props?.fImg?.urls?.full)
    //   str = insertImageAtTheBeginning(str, props?.fImg?.urls?.full, props?.fImg)

    // if (props.fImg?.photos) {
    //   str = insertImageAtTheBeginning(str, props.fImg.photos[0].src.original, props?.fImg)
    // }

    // if (typeof (props.fImg) == 'string') {
    //   str = insertImageAtTheBeginning(str, props.fImg, props.fImg)
    // }

    if (props.articleType == 'listicle' && props.listicleOutlines?.length > 0) {

      let doc = new DOMParser().parseFromString(str, "text/html");
      let isImgAdded: any = [];
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

    const regex1 = /<h1\b[^>]*>(.*?)<\/h1>/g; //removing H1 from the top (if we do not use insertH1AtTheBeginning at the top, it creates weird gap after every headings)
    str = str.replace(regex1, '');
    return str;
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDDClose = () => {
    setAnchorEl(null);
  };

  const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const handleStartDate = (date: Date) => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }
  return (
    <div style={{}}>
      {/* <Button variant='contained' onClick={e => setShow(true)} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="ic:round-wordpress" />}>Publish</Button> */}
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          color='primary'
          // className='outlined-btn-color'
          disableElevation
          onClick={handleClick}
          startIcon={<Icon icon="ic:round-wordpress" />}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ marginLeft: "5px" }}
        // startIcon={<Icon icon="icon-park-outline:copy" style={{ color: "#fff", cursor: "pointer", fontSize: "15px" }} />}
        >
          Publish
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleDDClose}
        >
          <div onClick={() => {
            setShow(true)
          }}>
            <MenuItem onClick={handleDDClose} disableRipple>
              {/* <ContentCopyOutlinedIcon /> */}
              <Icon icon="material-symbols-light:published-with-changes" />
              &nbsp;&nbsp;Publish
            </MenuItem>

          </div>


          {/* </CopyToClipboard> */}
          <Divider sx={{ my: 0.5 }} />
          {/* <CopyToClipboard text={
                    getFormatedHtml(props.html)


                }
                    onCopy={() => {
                        // props.setCopied(true)

                        getHtmlFromDocument(document.getElementsByClassName('DraftEditor-editorContainer')[0]?.innerHTML)
                        // setTimeout(() => {
                        //     props.setCopied(false)
                        // }, 5000)
                    }}> */}
          <MenuItem onClick={() => {
            setShowSchedule(true)
            handleDDClose()
          }} disableRipple>
            <Icon icon="carbon:event-schedule" />
            &nbsp;&nbsp;Schedule Post
          </MenuItem>

          {/* </CopyToClipboard> */}

        </StyledMenu>
      </div>
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
      <Dialog
        fullWidth
        open={showSchedule}
        maxWidth='sm'
        scroll='body'
        onClose={handleCloseSchedule}
        onBackdropClick={handleCloseSchedule}
        TransitionComponent={Transition}
        sx={{
          overflowY: "visible", '& .MuiPaper-root': {
            overflowY: "visible",
          }
        }}
      >
        <DialogContent

          sx={{
            overflowY: "visible",
            position: 'relative',
            pb: theme => `${theme.spacing(2)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box sx={{ mb: 7, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 2, lineHeight: '2rem' }}>
              Schedule Post
            </Typography>
            <Typography variant='body2'>Insert you date, time and timezone to set a schedule.</Typography>
          </Box>
          <IconButton size='small' onClick={handleCloseSchedule} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogContent>

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
            <FormControl fullWidth sx={{
              width: "100%", marginBottom: "20px"
            }}>
              <InputLabel id='address-select'></InputLabel>

            </FormControl>
            <DatePickerWrapper>
              <DatePicker
                selectsStart
                id='event-start-date'
                selected={dateTime}
                minDate={new Date()}
                showTimeSelect={true}
                dateFormat={'MM-dd-yyyy hh:mm a'}
                customInput={<PickersComponent label='Schadule date' registername='Schadule date' />}
                onChange={(date: Date) => {
                  setDateTime(date)
                  console.log("date:", date)
                }
                }
                onSelect={handleStartDate}
              />
            </DatePickerWrapper>

            <Alert severity='info' variant='standard' sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", marginTop: "20px" }}>
              Scheduling is based on your local timezone
            </Alert>
          </div>




        </Box>


        <DialogActions
          sx={{

            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            display: "flex",
            justifyContent: "end",
          }}
        >
          <div style={{ marginTop: "10px" }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleScheduleSubmit} disabled={loading} startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null
            }>
              Save
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleCloseSchedule}>
              Cancel
            </Button>
          </div>

        </DialogActions>
      </Dialog>


    </div>
  )
}

export default SelectConnects
