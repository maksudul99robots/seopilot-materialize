import { Box, Button, Card, DialogActions, DialogContent, Fade, FadeProps, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material"
import { ReactElement, Ref, forwardRef, useEffect, useState } from "react"
import { CustomRadioIconsProps } from "src/@core/components/custom-radio/types"
import Icon from "src/@core/components/icon"
import GetCountryList from "./CountryList";
import { LoginRegistrationAPI } from "src/services/API"
import { useRouter } from "next/router"
// ** Custom Components Imports
import CustomBadge from 'src/@core/components/mui/badge'
import Dialog from '@mui/material/Dialog'
// ** Types
import { CustomBadgeProps } from 'src/@core/components/mui/badge/types'
import Swal from "sweetalert2"
import { useAuth } from "src/hooks/useAuth"

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


const KeywordResearch = (props: any) => {
    const [keyword, setkeyword] = useState('')
    const [language, setLanguage] = useState('English')
    const [country, setCountry] = useState<string>('2840')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const auth = useAuth();
    const [show, setShow] = useState<boolean>(false)

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
        if (keyword.length > 0) {
            LoginRegistrationAPI.researchKeyword({ keyword, language, country }).then(res => {
                setLoading(false)
                router.push('/keyword-research/' + res.data.primary_research_id)
            }).catch((e: any) => {
                setLoading(false)
                setShow(false);
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
          <h5>Keyword Research Faild. Please Communicate to Our Support Team.</h5>
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
                text: 'Please insert primary keyword.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF"
            })
        }

    }

    const handleClose = () => {
        setShow(false);
        // props.handleClose();
    }


    return (
        <>

            <Button variant='contained' onClick={() => {

                setShow(true);
            }} startIcon={<Icon icon="ph:plus"></Icon>}>Keyword Research</Button>

            <Dialog
                fullWidth
                open={show}
                maxWidth='md'
                scroll='body'
                onClose={handleClose}
                hideBackdrop={true}
                TransitionComponent={Transition}
                sx={{}}
            >
                <DialogContent
                    sx={{
                        position: 'relative',
                        pb: theme => `${theme.spacing(5)} !important`,
                        px: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(10)} !important`],
                        pt: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(10)} !important`]
                    }}
                >
                    <Box sx={{ mb: 9, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                            Keyword Research <ListBadge color='info' sx={{ ml: 1 }} badgeContent='Beta' />
                        </Typography>
                        <Typography variant='body2'>Enter your primary keyword. SEO Pilot will list related keywords and suggested titles.</Typography>
                    </Box>

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Primary Keyword*' placeholder={'Digital Marketing'} InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                                name='Primary Keyword'
                                onChange={e => {
                                    setkeyword(e.target.value)
                                }} value={keyword}
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
                            px: 0,
                            marginTop: "20px"
                        }}
                    >
                        <Button variant='contained' size="large"
                            onClick={() => submit()}
                            startIcon={<Icon icon="ri:menu-search-line" />}
                            endIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null}
                            disabled={loading}


                        >
                            Research
                        </Button>
                        {/* <Button variant='outlined' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }} color='secondary' >
                        Cancel
                    </Button> */}
                    </DialogActions>





                </DialogContent>
            </Dialog >

        </>

    )
}

export default KeywordResearch