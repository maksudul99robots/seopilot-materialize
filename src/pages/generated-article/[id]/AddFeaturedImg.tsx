// import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
// import Icon from "src/@core/components/icon";

// const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
//     <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//         backgroundColor: "#fff",
//         color: 'rgba(0, 0, 0, 0.87)',
//         boxShadow: theme.shadows[1],
//         fontSize: 11,
//     },
// }));

// const AddFeaturedImg = (props: any) => {

//     return (
//         <>
//             <LightTooltip title={
//                 <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
//                     Add Featured Image in Your Article

//                 </p>
//             } placement="top">
//                 <div style={{ height: "100%" }}>
//                     <Icon icon="gg:add" className='add-icon-color' fontSize="30px" />
//                 </div>
//             </LightTooltip >

//         </>
//     )
// }

// export default AddFeaturedImg;


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
import { useRouter } from 'next/router'

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

type indicesType =
    {
        unsplash: number,
        pexels: number,
        dallE2: number,
        dallE3: 0,
    }

const AddFeaturedImg = (props: any) => {
    // ** States
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [service, setService] = useState<string>('unsplash-pexels')
    const [searchKeyword, setSearchKeyword] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const [aiImgLoading, setAiImgLoading] = useState<boolean>(false)
    const [imgPrompt, setImgPrompt] = useState<string>('');
    const [originalResponse, setOriginalResponse] = useState<any>(null);
    const [images, setImages] = useState<any>([])
    const [unsplashImages, setUnsplashImages] = useState<any>([])
    const [pexelsImages, setPexelsImages] = useState<any>([])
    const [dallE2Images, setDallE2Images] = useState<any>([])
    const [dallE3Images, setDallE3Images] = useState<any>([])
    const [selectedImg, setSelectedImg] = useState<any>(null)
    const [indices, setIndices] = useState<any>({
        unsplash: 0,
        pexels: 0,
        dallE2: 0,
        dallE3: 0,
    })


    const handleClose = () => {
        setShow(false)
        setSelectedImg(null)
    }

    // useEffect(() => {
    //     console.log(indices)
    //     console.log(selectedImg)
    // }, [indices, selectedImg])

    const getAllImages = async () => {
        LoginRegistrationAPI.getAllImages({ id: props.id }).then((responseImg: any) => {
            //store images into their respective states
            // console.log("response:", responseImg)
            responseImg.data?.map((imgObj: any, i: any) => {
                if (imgObj.service == 'unsplash') {
                    let x = JSON.parse(imgObj?.featured_img)
                    setUnsplashImages(x)
                    let index = indices;
                    index.unsplash = imgObj.index
                    setIndices(index)
                } else if (imgObj.service == 'pexels') {
                    let x = JSON.parse(imgObj?.featured_img)
                    x = x.photos;
                    setPexelsImages(x);
                    let index = indices;
                    index.pexels = imgObj.index
                    setIndices(index)
                } else if (imgObj.service == 'dall-e-2') {
                    let x = JSON.parse(imgObj?.featured_img)
                    setDallE2Images(x)
                    let index = indices;
                    index.dallE2 = imgObj.index
                    setIndices(index)
                } else {
                    let x = JSON.parse(imgObj?.featured_img)
                    setDallE3Images(x)
                    let index = indices;
                    index.dallE3 = imgObj.index
                    setIndices(index)
                }
            })
        }).catch((e: any) => {
            console.log("error in regenerateFeaturedImg:", e)
            setLoading(false)
        })
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
                setService(responseImg.data.service)
                setShow(false)
            }
            // setShow(false)
        }).catch((e: any) => {
            console.log("error in regenerateFeaturedImg:", e)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllImages()
    }, [])

    const changeImgIndex = () => {


        LoginRegistrationAPI.updateIndexFeaturedImg({ index: selectedImg.index, id: props.id, service: selectedImg.service }).then(res => {
            // console.log("res.data:", res.data)
            // // console.log("index:", index)
            // router.reload()
            if ((res.data.service == 'unsplash' || res.data.service == 'pexels')) {
                // console.log("x:", x)
                let x = res.data.featured_img;
                x = JSON.parse(x)
                if (res.data.service == 'unsplash') {
                    x = x[res.data.index]
                    // props.setImgSrc('')

                    let y = indices;
                    y.unsplash = res.data.index;
                    setIndices(y)
                }
                else {
                    props.setFeaturedImgIndex(res.data.index)
                    let y = indices;
                    y.pexels = res.data.index;
                    setIndices(y)
                }

                // console.log("x:......", x)
                props.setImgService(res.data.service)
                props.setFImg(x);

                handleClose()


            } else if (res.data.service == 'dall-e-3' || res.data.service == 'dall-e-2') {
                let x = res.data.featured_img;
                x = JSON.parse(x)
                props.setFImg(x[res.data.index])
                props.setImgService(res.data.service)
                if (res.data.service == 'dall-e-3') {
                    let y = indices;
                    y.dallE3 = res.data.index;
                    setIndices(y)
                } else {
                    let y = indices;
                    y.dallE2 = res.data.index;
                    setIndices(y)
                }

                handleClose()
            }
        }).catch(e => {
            console.log(e)
        })
    }


    const getAIImage = () => {
        setAiImgLoading(true)
        if (service == 'unsplash-pexels') {
            console.log("service:", service, searchKeyword)
            LoginRegistrationAPI.generateFeaturedImagesUP({ search_keyword: searchKeyword, article_id: props.id }).then(res => {
                getAllImages()
                setAiImgLoading(false)
            }).catch(e => {
                console.log(e)
                setAiImgLoading(false)
            })
        } else {
            LoginRegistrationAPI.generateAIImage({ img_prompt: imgPrompt, id: props.id, img_service: service }).then(res => {
                getAllImages()
                setAiImgLoading(false)
            }).catch(e => {
                console.log(e)
                setAiImgLoading(false)
            })
        }

    }


    return (
        <div>
            {/* <Button variant='contained' onClick={e => setShow(true)} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="ic:round-wordpress" />}>Publish</Button> */}
            <LightTooltip title={
                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                    Add Featured Image in Your Article

                </p>
            } placement="top">
                <div style={{ height: "100%" }}>
                    <Button variant='outlined' size='small' startIcon={<Icon icon="material-symbols-light:imagesmode-outline-rounded" fontSize="30px" />} onClick={e => setShow(true)} >Add Featured Image</Button>
                </div>
            </LightTooltip >
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
                            Create Featured Image
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
                            width: "100%", marginBottom: "10px"
                        }}>
                            <InputLabel id='Image Service'>Image Service</InputLabel>
                            <Select
                                fullWidth
                                placeholder='Image Service'
                                label='Image Service'
                                defaultValue={service}
                                onChange={e => {
                                    setService(e.target.value);
                                    setSelectedImg(null)
                                    // submit();
                                }}

                            >
                                <MenuItem value="unsplash-pexels">Unsplash & Pexels</MenuItem>
                                {/* <MenuItem value="pexels">Pexels</MenuItem> */}
                                <MenuItem value="dall-e-2">Dall-e 2</MenuItem>
                                <MenuItem value="dall-e-3">Dall-e 3</MenuItem>

                            </Select>
                        </FormControl>
                        {(

                            (service == 'dall-e-3' && dallE3Images.length > 0) ||
                            (service == 'dall-e-2' && dallE2Images.length > 0) ||
                            (service == 'pexels' && pexelsImages.length > 0) ||
                            (service == 'unsplash' && unsplashImages.length > 0)) &&
                            <Typography variant='body1' sx={{ fontSize: "14px", fontWeight: 400 }}>
                                Select Featured image
                            </Typography>
                        }
                        {
                            service == 'unsplash-pexels' &&
                            <Typography variant='body1' sx={{ fontSize: "14px", fontWeight: 400 }}>
                                Unsplash
                            </Typography>
                        }
                        {/* unsplash */}
                        <Grid container spacing={1.5} sx={{ display: "flex", justifyContent: "start", marginTop: "5px" }}>

                            {
                                unsplashImages.length > 0 && (service == 'unsplash-pexels') && unsplashImages.map((img: any, i: number) => {
                                    // console.log("img:", service, i, img)
                                    return (
                                        <Grid item key={i}>
                                            <img height={150} width={150} src={
                                                img?.urls?.thumb

                                            } style={{
                                                objectFit: "cover",
                                                cursor: "pointer",
                                                border:
                                                    (selectedImg && selectedImg.service == 'unsplash' && i == selectedImg.index) ? "5px solid #2979FF" : props.imgService == 'unsplash' && i == indices.unsplash ? "5px solid #92B65D" : 'none'
                                            }} className='suggested_img'
                                                onClick={() => {
                                                    // changeImgIndex(i)
                                                    let x = {
                                                        service: 'unsplash',
                                                        index: i
                                                    }
                                                    setSelectedImg(x)
                                                }}
                                            ></img>
                                        </Grid>
                                    )
                                })
                            }


                        </Grid>
                        {
                            service == 'unsplash-pexels' &&
                            <Typography variant='body1' sx={{ fontSize: "14px", fontWeight: 400 }}>
                                Pexels
                            </Typography>
                        }

                        {/* pexels */}
                        <Grid container spacing={1.5} sx={{ display: "flex", justifyContent: "start", marginTop: "1px" }}>
                            {
                                pexelsImages.length > 0 && (service == 'unsplash-pexels') && pexelsImages.map((img: any, i: number) => {
                                    // console.log("img:", service, i, img)
                                    return (
                                        <Grid item key={i}>
                                            <img height={150} width={150} src={
                                                img?.src?.tiny

                                            } style={{
                                                objectFit: "cover",
                                                cursor: "pointer",
                                                border:
                                                    (selectedImg && selectedImg.service == 'pexels' && i == selectedImg.index) ? "5px solid #2979FF" :
                                                        (!selectedImg && props.imgService == 'pexels' && i == indices.pexels) ? "5px solid  #92B65D" :
                                                            'none'
                                            }} className='suggested_img'
                                                onClick={() => {
                                                    // changeImgIndex(i)
                                                    let x = {
                                                        service: 'pexels',
                                                        index: i
                                                    }
                                                    setSelectedImg(x)
                                                }}
                                            ></img>
                                        </Grid>
                                    )
                                })
                            }


                        </Grid>
                        {/* dall-e-2 */}
                        {
                            dallE2Images.length > 0 &&
                            <Grid container spacing={1.5} sx={{ display: "flex", justifyContent: "start" }}>
                                {
                                    dallE2Images.length > 0 && (service == 'dall-e-2') && dallE2Images.map((img: any, i: number) => {
                                        // console.log("img:", service, i, img)
                                        return (
                                            <Grid item key={i}>
                                                <img height={150} width={150} src={
                                                    img
                                                } style={{
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                    border:
                                                        (selectedImg && selectedImg.service == 'dall-e-2' && i == selectedImg.index) ? "5px solid #2979FF" :
                                                            (!selectedImg && props.imgService == 'dall-e-2' && i == indices.dallE2) ? "5px solid #92B65D" :
                                                                'none'
                                                }} className='suggested_img'
                                                    onClick={() => {
                                                        // changeImgIndex(i)
                                                        let x = {
                                                            service: 'dall-e-2',
                                                            index: i
                                                        }
                                                        setSelectedImg(x)
                                                    }}
                                                ></img>
                                            </Grid>
                                        )
                                    })
                                }


                            </Grid>
                        }

                        {/* dall-e-3 */}
                        {
                            dallE3Images.length > 0 &&

                            <Grid container spacing={1.5} sx={{ display: "flex", justifyContent: "start" }}>
                                {
                                    dallE3Images.length > 0 && (service == 'dall-e-3') && dallE3Images.map((img: any, i: number) => {
                                        // console.log("img:", service, i, img)
                                        return (
                                            <Grid item key={i}>
                                                <img height={150} width={150} src={
                                                    img
                                                } style={{
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                    border:
                                                        (selectedImg && selectedImg.service == 'dall-e-3' && i == selectedImg.index) ? "5px solid #2979FF" :
                                                            (!selectedImg && props.imgService == 'dall-e-3' && i == indices.dallE3) ? "5px solid #92B65D" :
                                                                'none'
                                                }} className='suggested_img'
                                                    onClick={() => {
                                                        // changeImgIndex(i)
                                                        let x = {
                                                            service: 'dall-e-3',
                                                            index: i
                                                        }
                                                        setSelectedImg(x)
                                                    }}
                                                ></img>
                                            </Grid>
                                        )
                                    })
                                }


                            </Grid>
                        }



                        <FormControl fullWidth sx={{ width: "100%" }}>

                            <Box sx={{ mb: 1, textAlign: 'start' }}>
                                <Typography variant='body1' sx={{ fontSize: "15px", fontWeight: 500, marginTop: "5px" }}>
                                    {
                                        service == "dall-e-2" || service == "dall-e-3" ?
                                            'Image Prompt' :
                                            'Search keyword'
                                    }
                                </Typography>
                                {
                                    service == "dall-e-2" || service == "dall-e-3" &&
                                    <Typography variant='body1' sx={{ fontSize: "13px" }}>For best results, provide detailed instructions. See <a href="https://community.openai.com/t/dalle3-prompt-tips-and-tricks-thread/498040" target='_blank'>URL</a> for more prompting tips.</Typography>
                                }
                            </Box>
                            {
                                service == "dall-e-2" || service == "dall-e-3" ?
                                    <TextField multiline minRows={3} onChange={e => { setImgPrompt(e.target.value) }} value={imgPrompt} />
                                    :
                                    <TextField onChange={e => { setSearchKeyword(e.target.value) }} value={searchKeyword} />

                            }

                            <div style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}>
                                <Button variant='outlined' size='medium' sx={{ mr: 0, width: "150px" }} disabled={aiImgLoading ? true : imgPrompt.length > 3 ? false : (service == 'unsplash-pexels' && searchKeyword.length > 0) ? false : true}
                                    onClick={getAIImage}
                                    startIcon={aiImgLoading ? <Icon icon="line-md:loading-twotone-loop" /> : null}

                                >
                                    Get Image
                                </Button>
                            </div>

                        </FormControl>


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
                        <Button variant='contained' sx={{ mr: 0 }} disabled={loading || !selectedImg} startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null
                        }
                            onClick={changeImgIndex}
                        >
                            Insert
                        </Button>
                    </div>


                </DialogActions>
            </Dialog>


        </div>
    )
}

export default AddFeaturedImg
