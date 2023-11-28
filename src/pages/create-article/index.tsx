import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
// ** MUI Imports
import Icon from 'src/@core/components/icon'
import Switch from '@mui/material/Switch'
import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import Fade, { FadeProps } from '@mui/material/Fade'
import GetCountryList from './CountryList'
import { LoginRegistrationAPI } from 'src/services/API'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})
// interface Links {
//     links: string[];
//   }

export default function CreateArticle(props: any) {
    // ** States
    const [show, setShow] = useState<boolean>(false)

    const [numberOfLinks, setNumberOfLinks] = useState([1]);
    //Values
    const [articleType, setArticleType] = useState('blog')
    const [topic, setTopic] = useState('')
    const [keywords, setKeywords] = useState('')
    const [tone, setTone] = useState('')
    const [language, setLanguage] = useState('English')
    const [links, setLinks] = useState<Array<string>>([])
    const [country, setCountry] = useState<string>('United States of America (USA)')
    const [articleLength, setArticleLength] = useState<'short' | 'long'>('short')
    // const [articleType, setArticleType] = useState('blog')
    // const [articleType, setArticleType] = useState('blog')
    // const [articleType, setArticleType] = useState('blog')
    const [getArticleFromParams, setGetArticleFromParams] = useState(0); //if updated, useEffect will trigger to get article
    const auth = useAuth();
    const router = useRouter()
    // ** Hooks
    const bgColors = useBgColor()

    const [existingArticle, setExistingArticle] = useState<any>(null);

    useEffect(() => {
        console.log("router:", router.query)
        const { id } = router.query;

        if (id) {
            setExistingArticle(id)
            setGetArticleFromParams(getArticleFromParams + 1);
        }
    }, [router.query])
    useEffect(() => {

        if (getArticleFromParams > 0) {
            LoginRegistrationAPI.getSaasArticle({ id: existingArticle }).then(async (res) => {
                if (res.status == 212) {
                    setArticleType(res.data.article_type)
                    setArticleLength(res.data.article_length)
                    setCountry(res.data.country)
                    setLanguage(res.data.language)
                    setTone(res.data.tone)
                    setKeywords(res.data.keywords)
                    setTopic(res.data.topic)

                }
            }).catch(e => {
                console.log(e);
            })
        }

    }, [getArticleFromParams])
    const sumbit = () => {
        if (auth?.user?.workspace_owner_info?.plan?.plan == 'free' || auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only') {
            Swal.fire({
                title: 'Error!',
                text: 'Please Subscribe to Higher Plan to Get This Feature.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF"
            })
        } else {
            LoginRegistrationAPI.generateSaasArticle({ article_type: articleType, topic: topic, keywords: keywords, article_length: articleLength, tone: tone, language: language, country: country, links: JSON.stringify(links) }).
                then(res => {
                    // console.log("res:", res);
                    router.push("/generated-article/" + res.data.id)
                }).catch(e => {
                    console.log("error:", e);
                })
        }

    }
    return (
        <Card>
            <Card>
                <DialogContent
                    sx={{
                        position: 'relative',
                        pb: theme => `${theme.spacing(15)} !important`,
                        px: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(35)} !important`],
                        pt: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(32.5)} !important`]
                    }}
                >
                    <Box sx={{ mb: 9, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                            Create Article
                        </Typography>
                        <Typography variant='body2'>Enter your topic and target keywords, and watch Seopilot research and generate article for you</Typography>
                    </Box>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id='country-select'>Article Type</InputLabel>
                                <Select
                                    fullWidth
                                    placeholder='Blog Article'
                                    label='Blog Article'
                                    labelId='blog'
                                    defaultValue='blog'
                                    onChange={e => {
                                        setArticleType(e.target.value);
                                    }}
                                >
                                    <MenuItem value='blog'>Blog Article</MenuItem>
                                    <MenuItem value='product'>Amazon Product Review</MenuItem>
                                    <MenuItem value='guest'>Guest Post</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Topic*' placeholder='10 Reasons why we should use AI in blog writing' onChange={e => {
                                setTopic(e.target.value)
                            }} value={topic} InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Target Keyword(s)*' placeholder='Influencer marketing, affiliate marketing' onChange={e => {
                                setKeywords(e.target.value)
                            }} value={keywords} InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }} />
                            <FormHelperText>Use comma (,) to seperate each keyword</FormHelperText>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box
                                onClick={() => setArticleLength('short')}
                                sx={{
                                    py: 3,
                                    px: 4,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    ...(articleLength === 'short' ? { ...bgColors.primaryLight } : { backgroundColor: 'action.hover' }),
                                    border: theme =>
                                        `1px solid ${articleLength === 'short' ? theme.palette.primary.main : theme.palette.secondary.main}`,
                                    ...(articleLength === 'short'
                                        ? { ...bgColors.primaryLight }
                                        : { backgroundColor: bgColors.secondaryLight.backgroundColor })
                                }}
                            >
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }} >
                                    {/* <Icon icon='mdi:home-outline' /> */}
                                    <Typography variant='h6' sx={{ ...(articleLength === 'short' ? { color: 'primary.main' } : {}) }}>
                                        Normal Article
                                    </Typography>
                                </Box>
                                <Typography variant='body2' sx={{ ...(articleLength === 'short' ? { color: 'primary.main' } : {}) }}>
                                    Approximately 1000-1500 words
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box
                                onClick={() => setArticleLength('long')}
                                sx={{
                                    py: 3,
                                    px: 4,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    ...(articleLength === 'long' ? { ...bgColors.primaryLight } : { backgroundColor: 'action.hover' }),
                                    border: theme =>
                                        `1px solid ${articleLength === 'long' ? theme.palette.primary.main : theme.palette.secondary.main}`,
                                    ...(articleLength === 'long'
                                        ? { ...bgColors.primaryLight }
                                        : { backgroundColor: bgColors.secondaryLight.backgroundColor })
                                }}
                            >
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                                    <Typography variant='h6' sx={{ ...(articleLength === 'long' ? { color: 'primary.main' } : {}) }}>
                                        Long Article
                                    </Typography>
                                </Box>
                                <Typography variant='body2' sx={{ ...(articleLength === 'long' ? { color: 'primary.main' } : {}) }}>
                                    Approximately 2000-3000 words
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Article Tone' placeholder='Friendly, Precise, Informative' onChange={e => {
                                setTone(e.target.value)
                            }} value={tone} InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }} />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id='country-select'>Language</InputLabel>
                                <Select
                                    fullWidth
                                    placeholder='Language'
                                    label='Language'
                                    labelId='English'
                                    defaultValue={language}
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id='country-select'>Article Country</InputLabel>
                                <GetCountryList country={country} setCountry={setCountry} />
                            </FormControl>
                        </Grid>


                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'end',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(32)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(32.5)} !important`]
                    }}
                >
                    <Button variant='contained' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }} onClick={() => sumbit()}>
                        Submit
                    </Button>
                    {/* <Button variant='outlined' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }} color='secondary' >
                        Cancel
                    </Button> */}
                </DialogActions>
            </Card>
        </Card>
    )

}