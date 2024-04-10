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
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Alert, Divider, FormControl, InputAdornment, InputLabel, Menu, MenuItem, MenuProps, Select, Tooltip, TooltipProps, alpha, styled, tooltipClasses } from '@mui/material'

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
import { LoginRegistrationAPI } from 'src/services/API'

const headers = new Headers()


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

const ChangeImgModal = (props: any) => {
    // ** States

    const [loading, setLoading] = useState<boolean>(false)
    const [service, setService] = useState<string>(props.imgService)
    const [show, setShow] = useState<boolean>(false)
    const [imgPrompt, setImgPrompt] = useState<string>('');
    const [originalResponse, setOriginalResponse] = useState<any>(null);
    const [images, setImages] = useState<any>([])

    const handleClose = () => {
        setShow(false)
    }



    const submit = () => {
        setLoading(true)
        LoginRegistrationAPI.regenerateFeaturedImg({ service: service, id: props.id, img_prompt: imgPrompt }).then((responseImg: any) => {
            setLoading(false)
            // console.log("responseImg:", responseImg.data)
            if (responseImg?.data?.id && (responseImg.data.service == 'unsplash' || responseImg.data.service == 'pexels')) {
                let x = JSON.parse(responseImg?.data?.featured_img)
                // props.setImgService(responseImg.data.service)
                setOriginalResponse(x)
                if (responseImg.data.service == 'pexels') {
                    let y = x.photos;
                    setImages(y)
                } else {
                    setImages(x)
                }

            } else if (responseImg.data.service == 'dall-e-3' || responseImg.data.service == 'dall-e-2') {
                // console.log("got img from ai:", x)
                props.setFImg(responseImg.data.featured_img);
                props.setImgService(responseImg.data.service);
                setShow(false)
            }
            // setShow(false)
        }).catch((e: any) => {
            console.log("error in regenerateFeaturedImg:", e)
            setLoading(false)
        })
    }

    const changeImgIndex = (index: number) => {
        LoginRegistrationAPI.updateIndexFeaturedImg({ index: index, id: props.id, service: service }).then(res => {
            // console.log("res.data:", res.data)
            // console.log("index:", index)
            if ((res.data.service == 'unsplash' || res.data.service == 'pexels')) {
                // console.log("x:", x)
                let x = originalResponse;
                if (res.data.service == 'unsplash') {
                    x = x[res.data.index]
                    props.setImgSrc('')
                }
                else
                    props.setFeaturedImgIndex(res.data.index)
                // console.log("x:......", x)
                props.setImgService(service)
                props.setFImg(x);
                setShow(false)


                // if (responseImg.data.service == 'unsplash') {
                //     x = x[responseImg.data.index]
                //     props.setImgSrc('')
                // }
                // else {
                //     props.setFeaturedImgIndex(responseImg.data.index)
                // }
                // props.setFImg(x);

            } else if (res.data.service == 'dall-e-3' || res.data.service == 'dall-e-2') {
                props.setFImg(res?.data?.featured_img)
            }
        }).catch(e => {

        })
    }


    return (
        <div>
            {/* <Button variant='contained' onClick={e => setShow(true)} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="ic:round-wordpress" />}>Publish</Button> */}
            <div>
                <Button variant='contained' className='img_btn' size='small' onClick={e => setShow(true)} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="ph:images" />}>Change Image</Button>

            </div>
            <Dialog
                fullWidth
                open={show}
                maxWidth='md'
                scroll='body'
                onClose={handleClose}
                onBackdropClick={handleClose}
            // TransitionComponent={Transition}
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
                            Change Featured Image
                        </Typography>
                        <Typography variant='body2'>Select image service to change the feature image</Typography>
                    </Box>
                    <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
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
                            <InputLabel id='Image Service'>Image Service</InputLabel>
                            <Select
                                fullWidth
                                placeholder='Image Service'
                                label='Image Service'
                                defaultValue={service}
                                onChange={e => {
                                    setImages([])
                                    setService(e.target.value);
                                }}

                            >
                                <MenuItem value="unsplash">Unsplash</MenuItem>
                                <MenuItem value="pexels">Pexels</MenuItem>
                                <MenuItem value="dall-e-2">Dall-e 2</MenuItem>
                                <MenuItem value="dall-e-3">Dall-e 3</MenuItem>

                            </Select>
                        </FormControl>
                        {images.length > 0 && (service == 'unsplash' || service == 'pexels') &&
                            <Typography variant='body1' sx={{ fontSize: "14px", fontWeight: 400, marginBottom: "5px" }}>
                                Select Featured image
                            </Typography>
                        }

                        <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                            {
                                images.length > 0 && (service == 'unsplash' || service == 'pexels') && images.map((img: any, i: number) => {
                                    return (
                                        <Grid item key={i}>
                                            <img height={150} width={150} src={
                                                service == 'unsplash' ? img?.urls?.thumb : img?.src?.tiny

                                            } style={{ objectFit: "cover", cursor: "pointer" }} className='suggested_img'
                                                onClick={() => {
                                                    changeImgIndex(i)
                                                }}
                                            ></img>
                                        </Grid>
                                    )
                                })
                            }


                        </Grid>
                        {
                            (service == 'dall-e-2' || service == 'dall-e-3') &&

                            <FormControl fullWidth sx={{ width: "100%" }}>

                                <Box sx={{ mb: 1, textAlign: 'start' }}>
                                    <Typography variant='body1' sx={{ fontSize: "15px", fontWeight: 500, marginTop: "5px" }}>
                                        Image Prompt
                                    </Typography>
                                    <Typography variant='body1' sx={{ fontSize: "13px" }}>For best results, provide detailed instructions. See <a href="https://community.openai.com/t/dalle3-prompt-tips-and-tricks-thread/498040" target='_blank'>URL</a> for more prompting tips.</Typography>
                                </Box>
                                <TextField multiline minRows={3} onChange={e => { setImgPrompt(e.target.value) }} value={imgPrompt} />
                            </FormControl>
                        }

                    </div>




                </Box>



                <DialogActions
                    sx={{

                        px: theme => [`${theme.spacing(0)} !important`, `${theme.spacing(16)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
                        display: "flex",
                        justifyContent: "end",
                    }}
                >

                    <div style={{ marginTop: "10px" }}>
                        <Button variant='contained' sx={{ mr: 4 }} onClick={submit} disabled={loading} startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null
                        } >
                            Get Image
                        </Button>
                        <Button variant='outlined' color='secondary' onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>


                </DialogActions>
            </Dialog>


        </div>
    )
}

export default ChangeImgModal
