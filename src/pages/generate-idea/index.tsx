import { Box, Button, Card, DialogActions, DialogContent, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material"
import { useEffect, useState } from "react"
import { CustomRadioIconsProps } from "src/@core/components/custom-radio/types"
import Icon from "src/@core/components/icon"
import GetCountryList from "../create-article/CountryList"
import { LoginRegistrationAPI } from "src/services/API"
import { useRouter } from "next/router"
// ** Custom Components Imports
import CustomBadge from 'src/@core/components/mui/badge'

// ** Types
import { CustomBadgeProps } from 'src/@core/components/mui/badge/types'
import Swal from "sweetalert2"
import { useAuth } from "src/hooks/useAuth"

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

interface IconType {
    icon: CustomRadioIconsProps['icon']
    iconProps: CustomRadioIconsProps['iconProps']
}

const ListBadge = styled(CustomBadge)<CustomBadgeProps>(() => ({
    '& .MuiBadge-badge': {
        height: '18px',
        minWidth: '18px',
        transform: 'none',
        position: 'relative',
        transformOrigin: 'none'
    }
}))


const GenerateIdeas = (props: any) => {
    const [topic, setTopic] = useState('')
    const [language, setLanguage] = useState('English')
    const [audience, setAudience] = useState('')
    const [country, setCountry] = useState<string>('Default')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const auth = useAuth();

    // useEffect(() => {
    //     if (auth.user?.is_active && auth?.user?.workspace_owner_info?.plan?.plan != 'free') {

    //     } else {
    //         Swal.fire({
    //             title: 'Access Denied',
    //             text: 'Please Subscribe to Higher Plan to Get This Feature.',
    //             icon: 'warning',
    //             confirmButtonText: 'OK',
    //             confirmButtonColor: "#2979FF"
    //         }).then(() => {
    //             router.push('/plan')
    //         })
    //         // 
    //     }

    // }, [])

    useEffect(() => {

        if (auth.user?.is_active) {
            if (auth?.user?.workspace_owner_info?.plan?.plan != 'free' && auth?.user?.workspace_owner_info?.plan?.plan != 'extension_only') {

                LoginRegistrationAPI.isAllowedToCreateCluster({}).then(res => {
                    if (!res.data) {
                        Swal.fire({
                            title: 'Limit Reached',
                            text: 'You\'ve reached your cluster limit.',
                            icon: 'warning',
                            confirmButtonText: 'CLOSE',
                            confirmButtonColor: "#2979FF"
                        }).then(() => {
                            router.push('/plans')
                        })
                    }
                }).catch(e => {

                })

            } else {

            }

        } else {
            Swal.fire({
                title: 'Check Your Email',
                text: 'Please Verify Your Account To get Full Access!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: "#2979FF"
            })
            // 
        }

    }, [auth?.user])

    const submit = () => {
        setLoading(true)
        // console.log(topic, language, country, audience)
        // return
        if (topic.length > 0 && audience.length > 0) {
            LoginRegistrationAPI.generateIdeas({ topic, language, country, audience }).then(res => {
                setLoading(false)
                router.push('/clusters/' + res.data.id)
            }).catch((e: any) => {
                setLoading(false)
                console.log("e:", e)
                if (e?.response?.status == 400) {
                    Swal.fire({
                        html: `<h3>Error</h3>
          <h5>${e?.response?.data}</h5>
          `,
                        icon: "error",
                        // input: 'text',
                        // inputLabel: 'Please try again later.',
                        confirmButtonColor: "#2979FF"
                    })
                } else {
                    Swal.fire({
                        html: `<h3>Error</h3>
          <h5>Unable to Generate Article</h5>
          `,
                        icon: "error",
                        // input: 'text',
                        inputLabel: 'Please try again later.',
                        confirmButtonColor: "#2979FF"
                    })
                }
            })
        } else {

            setLoading(false)
            Swal.fire({
                title: 'Error!',
                text: 'Please insert the required fields.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF"
            })
        }

    }
    return (
        <Card>
            <DialogContent
                sx={{
                    position: 'relative',
                    pb: theme => `${theme.spacing(15)} !important`,
                    px: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(35)} !important`],
                    pt: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(15.5)} !important`]
                }}
            >
                <Box sx={{ mb: 9, textAlign: 'center' }}>
                    <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                        Create Article Cluster <ListBadge color='info' sx={{ ml: 1 }} badgeContent='Beta' />
                    </Typography>
                    <Typography variant='body2'>Enter your keyword and SEO Pilot will research and present rank-worthy article ideas related to the topic. Then select the articles you want to generate and edit their settings.</Typography>
                </Box>

                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Topic*' placeholder={'Health & Fitness'} InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                            name='topic'
                            onChange={e => {
                                setTopic(e.target.value)
                            }} value={topic}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Target Audience*' placeholder={'Fitness experts and physical therapists'} InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                            name='Target Audience'
                            onChange={e => {
                                setAudience(e.target.value)
                            }} value={audience}
                        />
                    </Grid>



                </Grid>
                <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginTop: "20px", marginBottom: "15px", display: "flex" }}>
                    Language & Country
                    <LightTooltip title={
                        <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                            If the country ID is set to "Default," the article will be intended for a global audience, encompassing all countries worldwide.
                        </p>
                    } placement="top">
                        <div style={{ height: "100%" }}>
                            <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                        </div>
                    </LightTooltip >
                </Typography>
                <Grid >

                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                        {/* <Grid item sm={6} xs={12} sx={{ paddingLeft: "25px", paddingRight: "5px" }}> */}

                        <FormControl fullWidth sx={{ paddingRight: "5px" }}>
                            <InputLabel id='country-select'>Article Language</InputLabel>
                            <Select
                                fullWidth
                                placeholder='Article Language'
                                label='Article Language'
                                labelId='English'
                                value={language ? language : 'English'}
                                onChange={e => {
                                    setLanguage(e.target.value)
                                }}
                            >
                                <MenuItem value='English'>English</MenuItem>
                                <MenuItem value='French'>French</MenuItem>
                                <MenuItem value='German'>German</MenuItem>
                                <MenuItem value='Spanish'>Spanish</MenuItem>
                                <MenuItem value='Japanese'>Japanese</MenuItem>
                                <MenuItem value='Chinese'>Chinese</MenuItem>
                                <MenuItem value='Russian'>Russian</MenuItem>
                                <MenuItem value='Italian'>Italian</MenuItem>
                                <MenuItem value='Arabic'>Arabic</MenuItem>
                                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                                <MenuItem value='Swedish'>Swedish</MenuItem>
                            </Select>
                        </FormControl>
                        {/* </Grid> */}

                        {/* <Grid item xs={6} sm={6} sx={{ paddingLeft: "5px" }}> */}
                        {/* <Grid item xs={12} sm={6} sx={{ paddingLeft: "5px" }}> */}
                        <FormControl fullWidth>
                            <InputLabel id='country-select'>Article Country</InputLabel>
                            <GetCountryList country={country} setCountry={setCountry} />
                        </FormControl>
                        {/* </Grid> */}
                        {/* </Grid> */}
                    </Box>
                </Grid>




                <DialogActions
                    sx={{
                        justifyContent: 'end',
                        px: 0
                    }}
                >
                    <Button variant='contained' size="large"
                        onClick={() => submit()}
                        startIcon={<Icon icon="icons8:idea" />}
                        endIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null}
                        disabled={loading}


                    >
                        Generate Ideas
                    </Button>
                    {/* <Button variant='outlined' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }} color='secondary' >
                        Cancel
                    </Button> */}
                </DialogActions>





            </DialogContent>
        </Card>
    )
}

export default GenerateIdeas