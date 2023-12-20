import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
// ** MUI Imports
import Icon from 'src/@core/components/icon'
import Switch from '@mui/material/Switch'
import { Ref, useState, forwardRef, ReactElement, useEffect, ChangeEvent } from 'react'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import Fade, { FadeProps } from '@mui/material/Fade'
import GetCountryList from './CountryList'
import { LoginRegistrationAPI } from 'src/services/API'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import Swal from 'sweetalert2'
import DndList from 'src/services/DND/DndList'
import { isValidURL } from 'src/services/URLChecker'
import { number, object } from 'yup'
// import CustomRadioIcons from 'src/components/CustomRadioIcons'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import { makeid } from 'src/services/makeid'
const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})
// interface Links {
//     links: string[];
//   }
// ** Type Import
import { CustomRadioIconsData, CustomRadioIconsProps } from 'src/@core/components/custom-radio/types'


// ** Demo Components Imports

interface IconType {
    icon: CustomRadioIconsProps['icon']
    iconProps: CustomRadioIconsProps['iconProps']
}

const data: CustomRadioIconsData[] = [
    {
        value: 'system',
        title: 'System Generated Outline',
        isSelected: true,
        content: 'Create an automated outline with the help of SEOPilot.'
    },
    {
        value: 'user',
        title: 'Create Your Own Outline',
        content: 'Create your article outline by adding Headings and Heading Texts.'
    },
    {
        value: 'url',
        title: 'Get Outline From a URL',
        content: 'Extracts outline from an article URL. You can Edit/Remove/Reorder outline.'
    }
]
const articleLengthObj: CustomRadioIconsData[] = [
    {
        value: 'short',
        title: 'Normal Article',
        isSelected: true,
        content: 'Approximately 1000-1500 words'
    },
    {
        value: 'long',
        title: 'Long Article',
        content: 'Approximately 2000-3000 words'
    }
]

const icons: IconType[] = [
    { icon: 'eos-icons:machine-learning-outlined', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
    { icon: 'tabler:user-edit', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
    { icon: 'bi:link-45deg', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } }
]
const articleILngthIcons: IconType[] = [
    { icon: 'ooui:article-rtl', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
    { icon: 'ooui:articles-ltr', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
]

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
    const [articleLength, setArticleLength] = useState<string>('short')
    const [headings, setHeadings] = useState<any>([]);
    const [tempURLHeadings, setTempURLHeadings] = useState<any>([]);
    const [tempUserHeadings, setTempUserHeadings] = useState<any>([]);
    const [outlineSource, setOutlineSource] = useState<string>('system');
    const [model, setModel] = useState<string>('gpt-3.5-turbo-1106');
    const [outlineURL, setOutlineURL] = useState('');
    const [showOutline, setShowOutline] = useState(false);
    const [faq, setFaq] = useState(false);
    const [toc, setToc] = useState(false);
    const [fetchOutlineLoading, setFetchOutlineLoading] = useState(false);

    // const [articleType, setArticleType] = useState('blog')
    // const [articleType, setArticleType] = useState('blog')
    const [getArticleFromParams, setGetArticleFromParams] = useState(0); //if updated, useEffect will trigger to get article
    const auth = useAuth();
    const router = useRouter()
    // ** Hooks
    const bgColors = useBgColor()

    const [existingArticle, setExistingArticle] = useState<any>(null);

    useEffect(() => {
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
                    setOutlineSource(res.data.outline_source)
                    if (res.data.outline_url) {
                        setOutlineURL(res.data.outline_url)
                        if (res.data.raw_outline) {
                            let h = JSON.parse(res.data.raw_outline);
                            if (typeof (h) == 'object') {
                                setHeadings(h)
                            }
                        }


                    }
                    if (res.data.outline_source == 'user') {
                        if (res.data.raw_outline) {
                            let h = JSON.parse(res.data.raw_outline);
                            if (typeof (h) == 'object') {
                                setHeadings(h)
                            }
                            setShowOutline(true)
                        }

                    }
                    setToc(res.data.toc)
                    setFaq(res.data.faq)

                    const resultArray = separateString(res.data.links);
                    setLinks(resultArray)
                    let x: any = [];
                    resultArray.map((l, i) => {
                        if (l) {

                            x.push(1)
                            setNumberOfLinks(x);
                        }

                    })
                }
            }).catch(e => {
                console.log(e);
            })
        }

    }, [getArticleFromParams])

    function separateString(str: string) {
        // Split the string by commas
        const parts = str.split(',');

        // Trim each part to remove leading and trailing whitespaces
        const trimmedParts = parts.map((part: any) => part.trim());
        // console.log("trimmedParts:", trimmedParts);
        return trimmedParts;
    }


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
            LoginRegistrationAPI.generateSaasArticle({
                article_type: articleType,
                topic: topic,
                keywords: keywords,
                article_length: articleLength,
                tone: tone,
                language: language,
                country: country,
                links: JSON.stringify(links),
                outlines: headings.length > 0 ? JSON.stringify(headings) : null,
                outline_source: outlineSource,
                outline_url: outlineURL,
                faq: faq,
                toc: toc,
                model: model
            }).
                then(res => {
                    // console.log("res:", res);
                    router.push("/generated-article/" + res.data.id)
                }).catch(e => {
                    console.log("error:", e);
                    if (e.response.status == 400) {
                        Swal.fire({
                            html: `<h3>Error</h3>
                          <h5>${e.response.data}</h5>
                          `,
                            icon: "error",
                            // input: 'text',
                            // inputLabel: 'Please try again later.',
                            confirmButtonColor: "#2979FF"
                        }).then(() => {
                            router.push('/add-apikey')
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
                    // Swal.fire({
                    //     title: 'Error!',
                    //     text: 'Please Subscribe to Higher Plan to Get This Feature.',
                    //     icon: 'error',
                    //     confirmButtonText: 'Close',
                    //     confirmButtonColor: "#2979FF"
                    // })

                })
        }

    }



    //DND settings
    const editHeadingOnChange = (index: number, heading: string) => {

        headings[index] = headings[index].substring(0, 3) + heading;
        // updateCsvHeadings(index, heading.slice(0))

    }
    const changeHeadingTag = (index: number, tag: string) => {
        headings[index] = tag + ":" + headings[index].substring(3, headings[index].length);
        let newArr = [...headings];
        let uniqueArr = [...new Set(newArr)];
        setHeadings(uniqueArr);

    }
    const removeHeadings = (index: number) => {
        let newArr = [...headings];
        setHeadings(newArr);
        newArr = [...headings]
        newArr.splice(index, 1);


        let uniqueArr = [...new Set(newArr)];
        setHeadings(uniqueArr);

    }

    const addnewHeading = () => {
        let newArr = [...headings];
        setHeadings(newArr);
        newArr = [...headings];
        newArr.push('H1:');

        let uniqueArr = [...new Set(newArr)];
        setHeadings(uniqueArr);
    }

    const fetchOutline = () => {
        setFetchOutlineLoading(true)
        LoginRegistrationAPI.fetchOutline({ url: outlineURL }).then((res: any) => {
            // console.log("res:", res.data.outlines)
            setFetchOutlineLoading(false)
            // setHeadings(res.data.outlines)
            fotmatAndSetHeadings(res.data.outlines);
            setShowOutline(true)
        }).catch((e: any) => {
            console.log(e);
            setFetchOutlineLoading(false)
            Swal.fire({
                title: 'Error',
                text: 'Could not fetch outline.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            })
        })
    }

    const fotmatAndSetHeadings = (headingsOutline: any) => {
        let tempHeading: any = [];
        headingsOutline.map((h: any, i: number) => {
            let x = h.tagName + ':';
            x = x + h.textContent;
            tempHeading.push(x)
            if (i == fotmatAndSetHeadings.length - 1) {
                setHeadings(tempHeading)
            }
        })
    }

    useEffect(() => {
        // console.log("headings:", headings)
        if (outlineSource == 'user') {
            setTempUserHeadings(headings)
        } else if (outlineSource == 'url') {
            setTempURLHeadings(headings)
        }
    }, [headings])





    const handleChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
        if (typeof prop === 'string') {
            let val = prop;
            if (val == 'url') {
                setHeadings(tempURLHeadings)
                setShowOutline(false)

            } else if (val == 'user') {
                setHeadings(tempUserHeadings)
                setShowOutline(true)
            }
            setOutlineSource(prop)

        } else {
            let val = (prop.target as HTMLInputElement).value
            if (val == 'url') {
                setHeadings(tempURLHeadings)
                setShowOutline(false)

            } else if (val == 'user') {
                setHeadings(tempUserHeadings)
                setShowOutline(true)
            }
            setOutlineSource((prop.target as HTMLInputElement).value)
        }
    }
    const handleArticleChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
        if (typeof prop === 'string') {
            setArticleLength(prop)
        } else {
            setArticleLength((prop.target as HTMLInputElement).value)
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
                                name='topic'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Target Keyword(s)*' placeholder='Influencer marketing, affiliate marketing' name='keywords' onChange={e => {
                                setKeywords(e.target.value)
                            }} value={keywords} InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }} />
                            <FormHelperText sx={{ fontSize: "14px" }}>Use comma (,) to seperate each keyword</FormHelperText>
                        </Grid>


                        <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "25px", marginTop: "20px", marginBottom: "10px" }}>
                            Article Length
                        </Typography>
                        <Grid container spacing={6} sx={{ paddingLeft: "25px" }}>
                            {articleLengthObj.map((item, index) => (
                                <CustomRadioIcons
                                    key={index}
                                    data={articleLengthObj[index]}
                                    selected={articleLength}
                                    icon={articleILngthIcons[index].icon}
                                    name='custom-radios-icons'
                                    handleChange={handleArticleChange}
                                    gridProps={{ sm: 6, xs: 12 }}
                                    iconProps={articleILngthIcons[index].iconProps}

                                />
                            ))}
                        </Grid>




                        <Grid item xs={12}>
                            <TextField fullWidth label='Article Tone' placeholder='Friendly, Precise, Informative' name='tone' onChange={e => {
                                setTone(e.target.value)
                            }} value={tone} InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }} />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id='country-select'>Article Language</InputLabel>
                                <Select
                                    fullWidth
                                    placeholder='Article Language'
                                    label='Article Language'
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

                        <Grid item sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id='country-select'>AI Model</InputLabel>
                                <Select
                                    fullWidth
                                    placeholder='AI Model'
                                    label='AI Model'
                                    labelId='AI Model'
                                    defaultValue={model}
                                    onChange={e => {
                                        setModel(e.target.value)
                                    }}
                                >
                                    <MenuItem value='gpt-3.5-turbo-1106'>GPT-3.5-TURBO</MenuItem>
                                    {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem>
                                    <MenuItem value='gpt-4'>GPT-4</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl>
                                {/* <FormLabel>Address Type</FormLabel> */}
                                <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 400, marginLeft: "0px", marginTop: "20px", marginBottom: "10px" }}>
                                    Do you want to include FAQ section in this article?
                                </Typography>
                                <RadioGroup
                                    row
                                    defaultValue={true}
                                    aria-label='FAQ'
                                    name='form-layouts-collapsible-address-radio'
                                >
                                    <FormControlLabel value={true} control={<Radio />} label='Yes' checked={faq} onClick={e => setFaq(true)} />
                                    <FormControlLabel value={false} control={<Radio />} label='No' checked={!faq} onClick={e => setFaq(false)} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                {/* <FormLabel>Address Type</FormLabel> */}
                                <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 400, marginLeft: "0px", marginBottom: "10px" }}>
                                    Do you want to include TABLE OF CONTENTS section in this article?
                                </Typography>
                                <RadioGroup
                                    row
                                    defaultValue={true}
                                    aria-label='Table of content'
                                    name='form-layouts-collapsible-address-radio'
                                >
                                    <FormControlLabel value={true} control={<Radio />} label='Yes' checked={toc} onClick={e => setToc(true)} />
                                    <FormControlLabel value={false} control={<Radio />} label='No' checked={!toc} onClick={e => setToc(false)} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "25px", marginTop: "20px", marginBottom: "10px" }}>
                            Outline Source
                        </Typography>
                        <Grid container spacing={4} sx={{ paddingLeft: "25px" }}>
                            {data.map((item, index) => (
                                <CustomRadioIcons
                                    key={index}
                                    data={data[index]}
                                    selected={outlineSource}
                                    icon={icons[index].icon}
                                    name='custom-radios-icons'
                                    handleChange={handleChange}
                                    gridProps={{ sm: 4, xs: 12 }}
                                    iconProps={icons[index].iconProps}

                                />
                            ))}
                        </Grid>


                        {
                            outlineSource == 'url' &&
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>

                                <TextField fullWidth label='Insert URL' placeholder='https://example.com' onChange={e => {
                                    setOutlineURL(e.target.value)
                                }} value={outlineURL} InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                />
                                <Button variant='outlined' size="medium" sx={{ ml: 3, pt: 3, pb: 3, pl: 4, pr: 4, width: fetchOutlineLoading ? "200px" : '150px' }}
                                    disabled={isValidURL(outlineURL) ? false : true}
                                    onClick={() => fetchOutline()}
                                    startIcon={fetchOutlineLoading ? <Icon icon="line-md:loading-twotone-loop" /> : null
                                    }
                                >
                                    Get Outline
                                </Button>
                            </Grid>
                        }

                        {
                            (outlineSource !== 'system' && ((headings?.length > 0) || showOutline)) &&

                            <DndList
                                headings={headings}
                                setHeadings={setHeadings}
                                editHeadingOnChange={editHeadingOnChange}
                                removeHeadings={removeHeadings}
                                changeHeadingTag={changeHeadingTag}
                                addnewHeading={addnewHeading}
                            />
                        }

                        <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "25px", marginTop: "20px" }}>
                            External Links
                        </Typography>
                        {
                            numberOfLinks.map((link, index) => {
                                return (
                                    <>
                                        <Grid item sm={11} xs={12}>
                                            <TextField fullWidth label='Links to include in article' placeholder='https://example.com' value={links[index] ? links[index] : ''} onChange={e => {
                                                // console.log(e.target.value)
                                                const newArray = [...links];
                                                newArray[index] = e.target.value
                                                setLinks(newArray);
                                            }} InputProps={{
                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                            }} />
                                        </Grid>
                                        <Grid item sm={1} sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                                            <Icon icon="carbon:close-outline" className='close-icon-style' onClick={e => {
                                                if (index != 0) {
                                                    const newArray = [...numberOfLinks];
                                                    newArray.splice(index, 1);
                                                    setNumberOfLinks(newArray);

                                                    const newLinks = [...links];
                                                    newLinks.splice(index, 1);
                                                    setLinks(newLinks);
                                                }

                                            }} />

                                        </Grid>
                                    </>

                                )
                            })
                        }
                        <Button variant='text' size="large" sx={{ mr: 2, ml: 6, p: 2, mt: 2, }} onClick={() => {
                            const newArray = [...numberOfLinks];
                            newArray.push(1);
                            setNumberOfLinks(newArray);
                        }} startIcon={<Icon icon="gg:add" />}>
                            Add Another Link
                        </Button>




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
                        Create Article
                    </Button>
                    {/* <Button variant='outlined' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }} color='secondary' >
                        Cancel
                    </Button> */}
                </DialogActions>
            </Card>
        </Card>
    )

}