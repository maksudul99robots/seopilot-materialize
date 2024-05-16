import { Box, Button, Card, DialogActions, DialogContent, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material"
import { useState } from "react"
import { CustomRadioIconsProps } from "src/@core/components/custom-radio/types"
import Icon from "src/@core/components/icon"
import GetCountryList from "../create-article/CountryList"
import { LoginRegistrationAPI } from "src/services/API"
import { useRouter } from "next/router"

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


const GenerateIdeas = (props: any) => {
    const [topic, setTopic] = useState('')
    const [language, setLanguage] = useState('English')
    const [audience, setAudience] = useState('')
    const [country, setCountry] = useState<string>('Default')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const submit = () => {
        setLoading(true)
        // console.log(topic, language, country, audience)
        // return
        LoginRegistrationAPI.generateIdeas({ topic, language, country, audience }).then(res => {
            setLoading(false)
            router.push('/clusters/' + res.data.id)
        }).catch((e: any) => {
            setLoading(false)
            console.log("e:", e)
        })
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
                        Create Article Cluster (Beta)
                    </Typography>
                    <Typography variant='body2'>Enter your inputs and watch SEO Pilot research and generate a rank-worthy article ideas for you. SEO Pilot will generate 5 article ideas for you.</Typography>
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
                        <TextField fullWidth label='Target Audience*' placeholder={'Career-focused youth in busy settings have minimal personal time for self-indulgence'} InputProps={{
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