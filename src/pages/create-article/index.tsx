import { Alert, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, styled } from '@mui/material'
// ** MUI Imports
import Icon from 'src/@core/components/icon'
import Switch from '@mui/material/Switch'
import { Ref, useState, forwardRef, ReactElement, useEffect, ChangeEvent } from 'react'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
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
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

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
// interface Links {
//     links: string[];
//   }
// ** Type Import
import { CustomRadioIconsData, CustomRadioIconsProps } from 'src/@core/components/custom-radio/types'
import SwitchesCustomized from 'src/components/SwitchesCustomized'
import CustomChip from 'src/@core/components/mui/chip'
import { TagsInput } from "react-tag-input-component";
import DndForListicle from 'src/services/DND/DNDForListicle';
import Link from 'next/link';
import { checkIfDallEExists } from 'src/services/checkIfDallEExists';
import { isAIModelAllowed } from 'src/services/isAIModelAllowed';
import Folders from './Folders';
import CustomBadge from 'src/@core/components/mui/badge'

// ** Types
import { CustomBadgeProps } from 'src/@core/components/mui/badge/types'
import AssignUsers from './AssignUsers';
import { getDateTime } from 'src/services/utils/DateTimeFormatter';


const ListBadge = styled(CustomBadge)<CustomBadgeProps>(() => ({
    '& .MuiBadge-badge': {
        height: '18px',
        minWidth: '18px',
        transform: 'none',
        position: 'relative',
        transformOrigin: 'none'
    }
}))
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
        title: 'Custom Outline',
        content: 'Specify your own article outline for greater control.'
    },
    {
        value: 'url',
        title: 'Get Outline From a URL',
        content: 'Extract outline from an URL. Add, edit, remove, & reorder sections before generation.'
    }
]
const articleLengthObj: CustomRadioIconsData[] = [
    {
        value: 'short',
        title: 'Normal Article',
        isSelected: true,
        content: 'Approximately 1000-1800 words'
    },
    {
        value: 'long',
        title: 'Long Article',
        content: 'Approximately 2000-3500 words'
    }
    // {
    //     value: 'short-V2',
    //     title: 'Normal Article (Section wise article generation)',
    //     content: 'Approximately 1000-1800 words'
    // },
    // {
    //     value: 'long-V2',
    //     title: 'Long Article (Section wise article generation)',
    //     content: 'Approximately 2000-3500 words'
    // }
]

const icons: IconType[] = [
    { icon: 'eos-icons:machine-learning-outlined', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
    { icon: 'tabler:user-edit', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
    { icon: 'bi:link-45deg', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } }
]
const articleILngthIcons: IconType[] = [
    { icon: 'ooui:article-rtl', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
    { icon: 'ooui:articles-ltr', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } }
    // { icon: 'ooui:articles-ltr', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
    // { icon: 'ooui:articles-ltr', iconProps: { fontSize: '2rem', style: { marginBottom: 8 } } },
]

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


export default function CreateArticle(props: any) {
    // ** States
    const [show, setShow] = useState<boolean>(false)

    const [numberOfLinks, setNumberOfLinks] = useState([1]);
    //Values
    const [articleType, setArticleType] = useState('blog')
    const [topic, setTopic] = useState('')
    const [keywords, setKeywords] = useState<any>([])
    const [tone, setTone] = useState('Clear, Knowledgeable and Confident')
    const [language, setLanguage] = useState('English')
    const [links, setLinks] = useState<Array<string>>([])
    // const [country, setCountry] = useState<string>('United States of America (USA)')
    const [country, setCountry] = useState<string>('Default')
    const [articleLength, setArticleLength] = useState<string>('short')
    const [headings, setHeadings] = useState<any>([]);
    const [tempURLHeadings, setTempURLHeadings] = useState<any>([]);
    const [tempUserHeadings, setTempUserHeadings] = useState<any>([]);
    const [outlineSource, setOutlineSource] = useState<string>('system');
    // const [model, setModel] = useState<string>('gpt-4-1106-preview'); //gpt-3.5-turbo-1106
    const [model, setModel] = useState<string>('gpt-4o'); //gpt-3.5-turbo-1106
    const [imgService, setImgService] = useState<string>('none');
    const [pointOfView, setPointOfView] = useState<string>('Third Person (he, she, it, they)');
    const [outlineURL, setOutlineURL] = useState('');
    const [imgPrompt, setImgPrompt] = useState('');
    const [showOutline, setShowOutline] = useState(false);
    const [faq, setFaq] = useState(false);
    const [toc, setToc] = useState(false);
    const [citation, setCitation] = useState(false);
    const [noOfCitations, setNoOfCitations] = useState('1-10');
    const [introduction, setIntroduction] = useState(true);
    const [conclusion, setConclusion] = useState(true);
    const [loading, setLoading] = useState(false);
    const [fetchOutlineLoading, setFetchOutlineLoading] = useState(false);
    const [showAdditionalSettings, setShowAdditionalSettings] = useState(true);
    const [showFeaturedImg, setShowFeaturedImg] = useState(false);
    const [numberedItem, setNumberedItem] = useState(false);
    const [listicleOutlines, setListicleOutlines] = useState<any>([]);
    const [imgServiceList, setImgServiceList] = useState<any>([
        {
            value: 'none',
            display: 'No Featured Image'
        },
        {
            value: 'unsplash',
            display: 'Unsplash'
        },
        {
            value: 'pexels',
            display: 'Pexels'
        }
    ]);
    const [allModels, setAllModels] = useState<any>([]);
    const [allSites, setAllSites] = useState<any>([]);
    const [apiKey, setApiKey] = useState<string | null>('')
    const [extraPrompt, setExtraPrompt] = useState<string>('')
    const [folder, setFolder] = useState<string | number>('')
    const [isAllowedToCreateArticle, setIsAllowedToCreateArticle] = useState<boolean>(false)
    // const [articleType, setArticleType] = useState('blog')
    const [getArticleFromParams, setGetArticleFromParams] = useState(0); //if updated, useEffect will trigger to get article
    const auth = useAuth();
    const router = useRouter()
    const [retryArticle, setRetryArticle] = useState(false)
    const [user, setUser] = useState(auth?.user?.id);
    const [existingArticle, setExistingArticle] = useState<any>(null);
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [internalLinking, setInternalLinking] = useState(false);
    const [selectedSite, setSelectedSite] = useState('');
    const [hasOpenAiKey, setHasOpenAiKey] = useState('');
    const [hasClaudeAiKey, setHasClaudeAiKey] = useState('');
    const [youtubeURL, setYoutubeURL] = useState('');
    const [youtubeLinkValid, setYoutubeLinkValid] = useState(false);

    useEffect(() => {
        const { id, edit_article } = router.query;

        if (id) {
            setExistingArticle(id)
            setGetArticleFromParams(getArticleFromParams + 1);
        }
        if (edit_article && edit_article == "true") {
            console.log("edit_article:", edit_article)
            setRetryArticle(true)
        }
    }, [router.query])
    useEffect(() => {

        if (getArticleFromParams > 0) {
            LoginRegistrationAPI.getSaasArticleWithoutStatus({ id: existingArticle }).then(async (res) => {
                if (res.status == 212) {
                    setArticleType(res.data.article_type)
                    setArticleLength(res.data.article_length)
                    setCountry(res.data.country)
                    setLanguage(res.data.language)
                    setTone(res.data.tone)
                    if (res.data.keywords) {
                        const keywordArray = separateString(res.data.keywords);
                        setKeywords(keywordArray)
                    }

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
                    setShowFeaturedImg(res.data.show_featured_image)
                    setModel(res.data.model)
                    setPointOfView(res.data.point_of_view)
                    if (res.data.listicle_outlines) {
                        let lo = JSON.parse(res.data.listicle_outlines)
                        setListicleOutlines(lo)

                        // console.log(lo)
                    }

                    // if(res.data.numbered_items){
                    setNumberedItem(res.data.numbered_items)
                    if (!res.data.show_featured_image)
                        setImgService('none')
                    else {
                        setImgService(res.data.img_service)
                    }
                    if (res.data.extra_prompt) {
                        setExtraPrompt(res.data.extra_prompt)
                    } else {
                        setExtraPrompt('')
                    }
                    if (res.data.img_prompt) {
                        setImgPrompt(res.data.img_prompt)
                    } else {
                        setImgPrompt('')
                    }

                    if (res.data.citation) {
                        setCitation(true);
                    }
                    if (res.data.folder_id) {
                        setFolder(res.data.folder_id)
                    }
                    if (res.data.no_of_citations) {
                        setNoOfCitations(res.data.no_of_citations)
                    }
                    if (res.data.internal_linking) {
                        setInternalLinking(res.data.internal_linking)
                    }
                    if (res.data.youtube_url)
                        setYoutubeURL(res.data.youtube_url)
                    // }

                    console.log("res.data.youtube_url:", res.data.youtube_url)
                }
            }).catch(e => {
                console.log(e);
            })
        }

    }, [getArticleFromParams])

    useEffect(() => {

        if (model == 'gpt-4-1106-preview' || model == 'gpt-4-turbo' || model == 'gpt-4' || model == 'gpt-4o' || model == 'gpt-4o-mini' || model == 'claude-3-5-sonnet-20240620') {

        } else {
            setCitation(false)
        }

    }, [model])

    useEffect(() => {
        // console.log("hasClaudeAiKey, hasOpenAiKey:", hasClaudeAiKey, hasOpenAiKey)
        if (hasClaudeAiKey == 'no' && hasOpenAiKey == 'no') {
            Swal.fire({
                title: 'Enter API Key',
                text: 'To start using SEO Pilot, an OpenAI or Claude API Key is required.',
                // icon: 'warning',
                iconHtml: '<img src="/images/inventory.png"/>',
                confirmButtonText: 'Enter API Key',
                confirmButtonColor: "#2979FF",
                customClass: {
                    icon: 'no-border'
                }

            }).then(() => {
                router.push("/add-apikey")
            })
        }

        if (hasClaudeAiKey == 'yes' && hasOpenAiKey == 'no') {
            setModel('claude-3-5-sonnet-20240620')
        }
    }, [hasClaudeAiKey, hasOpenAiKey])

    useEffect(() => {
        if (auth.user?.is_active) {
            LoginRegistrationAPI.getOpenAIAPIKey().then(res => {
                // console.log(res);
                if (res.status == 200) {
                    setApiKey(res.data.apikey)
                    setHasOpenAiKey('yes')
                } else {
                    setApiKey('none')
                    setHasOpenAiKey('no')
                }
                // setApikey(res.data.apikey)
                // setApikeyToShow(res.data.apikey.substring(0, 10) + "*".repeat(res.data.apikey.length - 15) + res.data.apikey.slice(-5))
            }).catch(e => {
                // console.log(e);
                setApiKey('none')
                setHasOpenAiKey('no')
            })

            LoginRegistrationAPI.getClaudeAPIKey({}).then(res => {
                // console.log(res);
                if (res.status == 200) {
                    // setApiKey(res.data.apikey)
                    setHasClaudeAiKey('yes')
                } else {
                    // setApiKey('none')
                    setHasClaudeAiKey('no')
                }
                // setApikey(res.data.apikey)
                // setApikeyToShow(res.data.apikey.substring(0, 10) + "*".repeat(res.data.apikey.length - 15) + res.data.apikey.slice(-5))
            }).catch(e => {
                // console.log(e);
                // setApiKey('none')
                setHasClaudeAiKey('no')
            })

            LoginRegistrationAPI.getAIModels({}).then(res => {
                if (res.status == 200) {
                    setAllModels(res.data.models.data)
                    let checkDallEExists = checkIfDallEExists(res.data.models.data);
                    // console.log("checkDallEExists", checkDallEExists)
                    if (checkDallEExists) {

                        let x = [...imgServiceList]
                        checkDallEExists.map((dallE: any, i: number) => {
                            x.push({
                                value: dallE.id,
                                display: dallE.id == 'dall-e-3' ? "Dall-E-3" : "Dall-E-2"
                            });
                            if (i == checkDallEExists?.length - 1) {
                                setImgServiceList(x);
                            }
                        })


                    }
                } else {

                }
            }).catch(e => {
                console.log(e);
                // if (e?.response?.status == 401) {
                // Swal.fire({
                //     title: 'Error',
                //     text: e.response.data,
                //     icon: 'warning',
                //     confirmButtonText: 'OK',
                //     confirmButtonColor: "#2979FF"
                // }).then(() => {
                //     router.push("/add-apikey")
                // })
                // }else{}
            })
            LoginRegistrationAPI.getAllSites({}).then(res => {
                if (res.status == 200) {
                    setAllSites(res.data)
                    // console.log(res.data[0])
                    if (res.data[0]) {
                        setSelectedSite(res.data[0].id)
                    }
                } else {

                }
            }).catch(e => {
                console.log(e);
                // if (e?.response?.status == 401) {
                // Swal.fire({
                //     title: 'Error',
                //     text: e.response.data,
                //     icon: 'warning',
                //     confirmButtonText: 'OK',
                //     confirmButtonColor: "#2979FF"
                // }).then(() => {
                //     // router.push("/add-apikey")
                // })
                // }else{}
            })

            LoginRegistrationAPI.isAllowedToCreateArticle({}).then(res => {
                setIsAllowedToCreateArticle(res.data)
            }).catch(e => {
                console.log(e)
            })

        } else {
            Swal.fire({
                title: 'Check Your Email',
                text: 'Please Verify Your Account To get Full Access!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: "#2979FF"
            })
            // router.push('/')
        }



    }, [])


    useEffect(() => {
        // console.log(isValidYouTubeLink(youtubeURL))
        if (isValidYouTubeLink(youtubeURL)) {

            setYoutubeLinkValid(true)
        } else {
            setYoutubeLinkValid(false)
        }
        setYoutubeLinkValid(isValidYouTubeLink(youtubeURL))

    }, [youtubeURL])

    function separateString(str: string) {
        // Split the string by commas
        if (str) {
            const parts = str.split(',');

            // Trim each part to remove leading and trailing whitespaces
            const trimmedParts = parts.map((part: any) => part.trim());
            // console.log("trimmedParts:", trimmedParts);
            return trimmedParts;
        } else {
            return []
        }

    }


    const convertArrayToCSV = (array: any) => {
        let csv = '';
        if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                if (csv == '') {
                    csv = array[i];
                } else {
                    csv = csv + ',' + array[i];
                }
            }

        }

        return csv;
    }

    function isValidYouTubeLink(url: string) {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=\n\r]+)(&.*)?$/;
        return regex.test(url);
    }


    const submit = async () => {
        // console.log("isModelAllowed......................", model, allModels)
        // // check if AI model allowed
        // const isModelAllowed = await isAIModelAllowed(model, allModels);
        // console.log("isModelAllowed", isModelAllowed)
        // if (!isModelAllowed) {
        //     Swal.fire({
        //         title: 'Error!',
        //         text: `Your Selected Model ${model} is Not Accessible from Your API Key. Try Another AI Model.`,
        //         icon: 'error',
        //         confirmButtonText: 'Close',
        //         confirmButtonColor: "#2979FF"
        //     })
        //     return ''
        // }
        if (topic == '' && articleType != 'youtube-to-blog') {
            Swal.fire({
                title: '',
                text: `Please Enter Article Topic.`,
                icon: 'warning',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF"
            })
            return ''
        }

        if (keywords.length == 0) {
            Swal.fire({
                title: '',
                text: `Please Enter Target Keyword for the article.`,
                icon: 'warning',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF"
            })
            return ''
        }



        // return
        if (isAllowedToCreateArticle) {
            if (articleType != 'listicle' && articleType != 'youtube-to-blog') {
                if ((imgService == 'dall-e-2' || imgService == 'dall-e-3') && imgPrompt.length < 1) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please Set Image Prompt.',
                        icon: 'error',
                        confirmButtonText: 'Close',
                        confirmButtonColor: "#2979FF"
                    })
                    return;
                } else {

                    setLoading(true)
                    LoginRegistrationAPI.generateSaasArticle({
                        article_type: articleType,
                        topic: topic,
                        keywords: convertArrayToCsvKeywords(keywords),
                        article_length: articleLength,
                        tone: tone,
                        language: language,
                        country: country,
                        links: convertArrayToCSV(links),
                        outlines: headings.length > 0 ? JSON.stringify(headings) : null,
                        outline_source: outlineSource,
                        outline_url: outlineURL,
                        faq: faq,
                        toc: toc,
                        model: model,
                        showFeaturedImg: showFeaturedImg,
                        point_of_view: pointOfView,
                        img_service: showFeaturedImg ? imgService : null,
                        extra_prompt: extraPrompt,
                        img_prompt: imgPrompt,
                        citation: citation,
                        folder_id: folder,
                        retryArticle: retryArticle,
                        article_id: router.query.id,
                        no_of_citations: noOfCitations,
                        user: user,
                        due_date: dateTime,
                        internal_linking: internalLinking,
                    }).
                        then(res => {
                            // console.log("res:", res);
                            setLoading(false)
                            router.push("/generated-article/" + res.data.id)
                        }).catch(e => {
                            setLoading(false)
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

                        })
                }
            } else if (articleType == 'youtube-to-blog') {
                if ((imgService == 'dall-e-2' || imgService == 'dall-e-3') && imgPrompt.length < 1) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please Set Image Prompt.',
                        icon: 'error',
                        confirmButtonText: 'Close',
                        confirmButtonColor: "#2979FF"
                    })
                    return;
                } else {
                    if (youtubeURL == '' || !youtubeLinkValid) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Please Enter a Valid Youtube URL.',
                            icon: 'error',
                            confirmButtonText: 'Close',
                            confirmButtonColor: "#2979FF"
                        })
                        return;
                    }
                    setLoading(true)
                    let isValidYoutubeURL: any = await LoginRegistrationAPI.verifyYoutubeURL({ youtube_url: youtubeURL })
                    isValidYoutubeURL = isValidYoutubeURL.data;
                    if (isValidYoutubeURL?.is_valid) {
                        LoginRegistrationAPI.generateYTB(
                            {
                                youtube_url: youtubeURL,
                                article_type: articleType,
                                topic: topic,
                                keywords: convertArrayToCsvKeywords(keywords),
                                article_length: articleLength,
                                tone: tone,
                                language: language,
                                country: country,
                                links: convertArrayToCSV(links),
                                outlines: headings.length > 0 ? JSON.stringify(headings) : null,
                                outline_source: outlineSource,
                                outline_url: outlineURL,
                                faq: faq,
                                toc: toc,
                                model: model,
                                showFeaturedImg: showFeaturedImg,
                                point_of_view: pointOfView,
                                listicle_outlines: listicleOutlines,
                                numbered_items: numberedItem,
                                img_service: showFeaturedImg ? imgService : null,
                                extra_prompt: extraPrompt,
                                img_prompt: imgPrompt,
                                citation: citation,
                                folder_id: folder,
                                retryArticle: retryArticle,
                                article_id: router.query.id,
                                no_of_citations: noOfCitations,
                                user: user,
                                due_date: dateTime,
                                internal_linking: internalLinking,
                                introduction: introduction,
                                conclusion: conclusion
                            }
                        ).then(res => {
                            console.log("res:", res);
                            setLoading(false)
                            router.push("/generated-article/" + res.data.id)
                        }).catch(e => {
                            setLoading(false)
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

                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            title: 'Error!',
                            text: isValidYoutubeURL.message,
                            icon: 'error',
                            confirmButtonText: 'Close',
                            confirmButtonColor: "#2979FF"
                        })
                        return;
                    }

                }
            } else {
                LoginRegistrationAPI.generateListicles(
                    {
                        article_type: articleType,
                        topic: topic,
                        keywords: convertArrayToCsvKeywords(keywords),
                        article_length: articleLength,
                        tone: tone,
                        language: language,
                        country: country,
                        links: convertArrayToCSV(links),
                        outlines: headings.length > 0 ? JSON.stringify(headings) : null,
                        outline_source: outlineSource,
                        outline_url: outlineURL,
                        faq: faq,
                        toc: toc,
                        model: model,
                        showFeaturedImg: showFeaturedImg,
                        point_of_view: pointOfView,
                        listicle_outlines: listicleOutlines,
                        numbered_items: numberedItem,
                        img_service: showFeaturedImg ? imgService : null,
                        extra_prompt: extraPrompt,
                        img_prompt: imgPrompt,
                        citation: citation,
                        folder_id: folder,
                        retryArticle: retryArticle,
                        article_id: router.query.id,
                        no_of_citations: noOfCitations,
                        user: user,
                        due_date: dateTime,
                        internal_linking: internalLinking
                    }
                ).then(res => {
                    // console.log("res:", res);
                    setLoading(false)
                    router.push("/generated-article/" + res.data.id)
                }).catch(e => {
                    setLoading(false)
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

                })


            }
        } else {
            Swal.fire({
                title: 'Please Upgrade',
                text: 'You Have Reached Your Limit. Please Subscribe to Higher Plan to Increase Your Plan Limit.',
                icon: 'warning',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF"
            })
        }


        // }

    }



    const convertArrayToCsvKeywords = (keywordArray: any) => {
        let csvKeywords = '';
        if (keywordArray.length > 0) {
            for (let i = 0; i < keywordArray.length; i++) {
                if (csvKeywords == '') {
                    csvKeywords = keywordArray[i];
                } else {
                    csvKeywords = csvKeywords + ',' + keywordArray[i];
                }
            }

        }

        return csvKeywords;
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
        newArr.push('H2:');

        let uniqueArr = [...new Set(newArr)];
        setHeadings(uniqueArr);
    }

    //DND settings ends


    // DND for Listicles
    const editListicleOutlineChange = (index: number, heading: string, listicleItem: string) => {

        let obj = JSON.parse(listicleOutlines[index])
        if (listicleItem == 'title')
            obj.title = heading;
        else if (listicleItem == 'url') {
            obj.url = heading;
        }
        listicleOutlines[index] = JSON.stringify(obj)
        // let newArr = [...listicleOutlines];
        // setListicleOutlines(newArr);
        // updateCsvHeadings(index, heading.slice(0))

    }
    const changeListicleOutlineTag = (index: number, tag: string) => {
        // console.log("index:", index)
        // console.log("tag:", tag)
        let obj = JSON.parse(listicleOutlines[index])
        obj.tag = tag;
        listicleOutlines[index] = JSON.stringify(obj)
        let newArr = [...listicleOutlines];
        let uniqueArr = [...new Set(newArr)];

        // console.log("uniqueArr:", uniqueArr)

        setListicleOutlines(uniqueArr);

    }
    const changeListicleOutlineImgSrc = (index: number, imgSrc: string) => {
        let obj = JSON.parse(listicleOutlines[index])
        obj.imgSrc = imgSrc;
        listicleOutlines[index] = JSON.stringify(obj)
        let newArr = [...listicleOutlines];
        let uniqueArr = [...new Set(newArr)];
        setListicleOutlines(uniqueArr);

    }
    const changeListicleOutlineImgSrcUrl = (index: number, imgSrc: string) => {
        let obj = JSON.parse(listicleOutlines[index])
        obj.imgSrcUrl = imgSrc;
        listicleOutlines[index] = JSON.stringify(obj)
        // let newArr = [...listicleOutlines];
        // let uniqueArr = [...new Set(newArr)];
        // setListicleOutlines(uniqueArr);

    }
    const removeListicleOutline = (index: number) => {
        let newArr = [...listicleOutlines];
        setListicleOutlines(newArr);
        newArr = [...listicleOutlines]
        newArr.splice(index, 1);


        let uniqueArr = [...new Set(newArr)];
        setListicleOutlines(uniqueArr);

    }
    const addnewListicleOutline = () => {
        let newArr = [...listicleOutlines];
        setListicleOutlines(newArr);
        newArr = [...listicleOutlines];

        let obj = {
            id: makeid(5),
            tag: 'H2',
            title: '',
            url: '',
            imgSrc: 'none',
            imgSrcUrl: ''
        }
        newArr.push(JSON.stringify(obj));
        let uniqueArr = [...new Set(newArr)];
        setListicleOutlines(uniqueArr);
    }

    // DND for Listicles ends
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
                text: 'Could Not Fetch Outline.',
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
    // useEffect(() => {
    //     console.log("articleType:", articleType)

    // }, [articleType])





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
    const [values, setValues] = useState<DefaultStateType>(defaultState)
    const handleStartDate = (date: Date) => {
        if (date > values.endDate) {
            setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
        }
    }

    return (
        // <Card>
        <>
            {/* {
                (apiKey == 'none') &&
                <Alert severity='warning' sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "20px" }}>
                    You Have to Add API Key to Generate Article. <Link href='/add-apikey/' style={{ textDecoration: "underline", fontSize: "18px", fontWeight: "600", fontStyle: "italic" }} >Click Here to Add API Key</Link>.

                </Alert>

            } */}


            <Box sx={{ padding: "0px" }}>
                <DialogContent
                    sx={{
                        position: 'relative',
                        pb: theme => `${theme.spacing(10)} !important`,
                        px: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(35)} !important`],
                        pt: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(15.5)} !important`]
                    }}
                >
                    <Box sx={{ mb: 9, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                            Create Article
                        </Typography>
                        <Typography variant='body2'>Enter your inputs and watch SEO Pilot research and generate a rank-worthy article for you.</Typography>
                    </Box>

                    <Grid container spacing={6}>
                        <Card sx={{ width: "100%", padding: "30px" }}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    {/* <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> */}
                                    <Typography variant='body1' sx={{ fontSize: "22px", paddingBottom: "10px", fontWeight: 500, marginTop: "0px", marginBottom: "0px", display: "flex" }}>
                                        Basic Settings
                                        {/* <LightTooltip title={
                                    <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                        For improved quality GPT-4-Turbo is recommanded.
                                        <p>We support Citation feature only for GPT-4 & GPT-4-Turbo (Go to ADVANCED SETTINGS to enable Citation)</p>
                                    </p>
                                } placement="top">
                                    <div style={{ height: "100%" }}>
                                        <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                                    </div>
                                </LightTooltip > */}
                                    </Typography>
                                    {/* <iconify-icon icon="ic:baseline-search"></iconify-icon> */}
                                    {/* <Button variant='outlined' size='small' sx={{ mb: 2 }} startIcon={<Icon icon='ic:baseline-search' />}>Find Keywords From the Topic</Button> */}
                                    {/* </Box> */}
                                </Grid>
                                <Grid item sm={6} xs={6}>


                                    <FormControl fullWidth>
                                        <InputLabel id='country-select'>AI Model</InputLabel>
                                        <Select
                                            fullWidth
                                            placeholder='AI Model'
                                            label='AI Model'
                                            labelId='AI Model'
                                            value={model}
                                            onChange={e => {
                                                setModel(e.target.value)
                                            }}
                                        >
                                            <MenuItem value='gpt-4o' disabled={hasOpenAiKey != 'yes'}>GPT-4o (Recommended)</MenuItem>
                                            <MenuItem value='gpt-4o-mini' disabled={hasOpenAiKey != 'yes'}>GPT-4o mini</MenuItem>
                                            <MenuItem value='gpt-4-turbo' disabled={hasOpenAiKey != 'yes'}>GPT-4-TURBO</MenuItem>
                                            <MenuItem value='gpt-4' disabled={hasOpenAiKey != 'yes'}>GPT-4</MenuItem>
                                            <MenuItem value='gpt-3.5-turbo-1106' disabled={hasOpenAiKey != 'yes'}>GPT-3.5-TURBO</MenuItem>
                                            <MenuItem value='claude-3-5-sonnet-20240620' disabled={hasClaudeAiKey != 'yes'}>Claude 3.5 Sonnet</MenuItem>
                                            {/* <MenuItem value='gpt-3.5-turbo-1106'>GPT-3.5-TURBO</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sx={{}}>
                                    <FormControl fullWidth>
                                        <InputLabel id='country-select'>Article Type</InputLabel>
                                        <Select
                                            fullWidth
                                            placeholder='Blog Article'
                                            label='Blog Article'
                                            // labelId='blog'
                                            value={articleType ? articleType : 'blog'}
                                            onChange={e => {
                                                setArticleType(e.target.value);
                                            }}
                                        >
                                            <MenuItem value='blog'>Blog Article</MenuItem>
                                            <MenuItem value='listicle'>Listicle</MenuItem>
                                            <MenuItem value='youtube-to-blog'>Youtube Video To Blog</MenuItem>
                                            {/* <MenuItem value='product'>Amazon Product Review</MenuItem>
                                    <MenuItem value='guest'>Guest Post</MenuItem> */}
                                        </Select>
                                    </FormControl>

                                </Grid>
                                {
                                    articleType == 'youtube-to-blog' &&
                                    <Grid item xs={12}>
                                        <TextField fullWidth label='Youtube URL' placeholder={'Enter Youtube URL'} onChange={e => {
                                            setYoutubeURL(e.target.value)
                                        }} value={youtubeURL} InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                            name='Youtube URL'
                                            error={!youtubeLinkValid}
                                        />
                                        <FormHelperText sx={{ fontSize: "14px", color: "#7CC1F5" }}>
                                            Make sure the youtube video has captions.</FormHelperText>
                                    </Grid>
                                }


                                {
                                    articleType !== 'youtube-to-blog' &&
                                    <Grid item xs={12}>
                                        <TextField fullWidth label='Topic*' placeholder={articleType == 'listicle' ? 'Top 10 Reasons why we should use AI in blog writing.' : 'What is Digital Marketing?'} onChange={e => {
                                            setTopic(e.target.value)
                                        }} value={topic} InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                            name='topic'
                                        />
                                    </Grid>
                                }

                                <Grid item xs={12}>

                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: 500, marginTop: "-5px", marginBottom: "0px", display: "flex" }}>
                                            Target Keyword
                                            <LightTooltip title={
                                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                    The presence of the target keywords in the article multiple times is not assured. However, utilizing the GPT-4 AI model can enhance the likelihood of their occurrence.
                                                </p>
                                            } placement="top">
                                                <div style={{ height: "100%" }}>
                                                    <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                                                </div>
                                            </LightTooltip >
                                        </Typography>
                                        {/* <iconify-icon icon="ic:baseline-search"></iconify-icon> */}
                                        {/* <Button variant='outlined' size='small' sx={{ mb: 2 }} startIcon={<Icon icon='ic:baseline-search' />}>Find Keywords From the Topic</Button> */}
                                    </Box>

                                    <TagsInput
                                        value={keywords}
                                        onChange={setKeywords}
                                        name="Keywords"
                                    />
                                    {/* <em>press enter to add new tag</em> */}
                                    <FormHelperText sx={{ fontSize: "14px" }}>
                                        Press enter to add the keyword. You have to put only one target keyword to rank for.</FormHelperText>
                                </Grid>


                                <Grid item sm={6} xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id='country-select'>Article Tone</InputLabel>
                                        <Select
                                            fullWidth
                                            placeholder='Article Tone'
                                            label='Article Tone'
                                            labelId='Article Tone'
                                            value={tone ? tone : 'Clear, Knowledgeable and Confident'}
                                            onChange={e => {
                                                setTone(e.target.value)
                                            }}
                                        >
                                            <MenuItem value='Clear, Knowledgeable and Confident'>SEO Optimized (Clear, Knowledgeable and Confident)</MenuItem>
                                            <MenuItem value='Informative, Friendly, Casual'>Informative, Friendly, Casual</MenuItem>
                                            {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem> */}
                                            <MenuItem value='Excited'>Excited</MenuItem>
                                            <MenuItem value='Empathetic'>Empathetic</MenuItem>
                                            <MenuItem value='Professional'>Professional</MenuItem>
                                            <MenuItem value='Friendly'>Friendly</MenuItem>
                                            <MenuItem value='Formal'>Formal</MenuItem>
                                            <MenuItem value='Casual'>Casual</MenuItem>
                                            <MenuItem value='Humorous'>Humorous</MenuItem>
                                        </Select>
                                    </FormControl>


                                </Grid>
                                <Grid item sm={6} xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id='country-select'>Point of View of Article</InputLabel>
                                        <Select
                                            fullWidth
                                            placeholder='Point of View of Article'
                                            label='Point of View of Article'
                                            labelId='Point of View of Article'
                                            defaultValue={pointOfView}
                                            onChange={e => {
                                                setPointOfView(e.target.value)
                                            }}
                                        >
                                            <MenuItem value='Third Person (he, she, it, they)'>Third Person (he, she, it, they)</MenuItem>
                                            {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem> */}
                                            <MenuItem value='Second Person (you, your, yours)'>Second Person (you, your, yours)</MenuItem>
                                            <MenuItem value='First Person Plural (we, us, our, ours)'>First Person Plural (we, us, our, ours)</MenuItem>
                                            <MenuItem value='First Person Singular (I, me, my, mine)'>First Person Singular (I, me, my, mine)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}> */}

                                <Grid item sm={6} xs={12} >

                                    <FormControl fullWidth>
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
                                            <MenuItem value='Arabic'>Arabic</MenuItem>
                                            <MenuItem value='Japanese'>Japanese</MenuItem>
                                            <MenuItem value='Chinese'>Chinese</MenuItem>
                                            <MenuItem value='Mandarin Chinese'>Mandarin Chinese</MenuItem>
                                            <MenuItem value='Russian'>Russian</MenuItem>
                                            <MenuItem value='Romanian'>Romanian</MenuItem>
                                            <MenuItem value='Dutch'>Dutch</MenuItem>
                                            <MenuItem value='Portuguese'>Portuguese</MenuItem>
                                            <MenuItem value='Swedish'>Swedish</MenuItem>
                                            <MenuItem value='Hindi'>Hindi</MenuItem>
                                            <MenuItem value='Bengali'>Bengali</MenuItem>
                                            <MenuItem value='Italian'>Italian</MenuItem>
                                            <MenuItem value='Malay'>Malay</MenuItem>


                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} sx={{ paddingLeft: "0px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id='country-select'>Article Country</InputLabel>
                                        <GetCountryList country={country} setCountry={setCountry} />
                                    </FormControl>
                                </Grid>

                                <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: 500, marginLeft: "25px", marginTop: "10px", marginBottom: "10px" }}>
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

                            </Grid>

                        </Card>

                        {
                            articleType !== 'youtube-to-blog' &&
                            <Card sx={{ width: "100%", padding: "30px", marginTop: "20px" }}>
                                <Grid container spacing={6}>
                                    {
                                        articleType != 'listicle' &&
                                        <>
                                            <Typography variant='body1' sx={{ fontSize: "22px", fontWeight: 500, marginLeft: "25px", marginTop: "20px", marginBottom: "20px", display: "flex" }}>
                                                Outline Source
                                                <LightTooltip title={
                                                    <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                        <b>System Generated Outline</b>- Based on the given inputs, SEO Pilot will programmatically generate an outline and produce the article.
                                                        <br></br>
                                                        <b>Create Your Own Outline</b>- Allows you to specify the outline. Add, edit, remove, and re-order headings.
                                                        <br></br>
                                                        <b>Get Outline From a URL</b>- the system will scrape the given URL to extract all Headings to form an outline. Thereafter, you can add, edit, remove, and re-order headings.


                                                    </p>
                                                } placement="top">
                                                    <div style={{ height: "100%" }}>
                                                        <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                                                    </div>
                                                </LightTooltip >
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
                                        </>
                                    }



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
                                        // <Grid item xs={12}>
                                        <DndList
                                            headings={headings}
                                            setHeadings={setHeadings}
                                            editHeadingOnChange={editHeadingOnChange}
                                            removeHeadings={removeHeadings}
                                            changeHeadingTag={changeHeadingTag}
                                            addnewHeading={addnewHeading}
                                        />

                                        // </Grid>

                                    }

                                    {
                                        articleType == 'listicle' ?
                                            <Grid item xs={12}>
                                                {/* <ListicleInputComponent listicleOutlines={listicleOutlines} setListicleOutlines={setListicleOutlines} /> */}
                                                <DndForListicle
                                                    listicleOutlines={listicleOutlines}
                                                    setListicleOutlines={setListicleOutlines}
                                                    editListicleOutlineChange={editListicleOutlineChange}
                                                    removeListicleOutline={removeListicleOutline}
                                                    changeListicleOutlineTag={changeListicleOutlineTag}
                                                    addnewListicleOutline={addnewListicleOutline}
                                                    changeListicleOutlineImgSrc={changeListicleOutlineImgSrc}
                                                    changeListicleOutlineImgSrcUrl={changeListicleOutlineImgSrcUrl}
                                                />
                                            </Grid>
                                            : null
                                    }
                                </Grid>
                            </Card>

                        }



                        {/* </Box> */}

                        {/* <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "25px", marginTop: "20px", marginBottom: "-5px", display: "flex" }}>
                            Point of View of Article

                        </Typography> */}


                        <Card sx={{ width: "100%", padding: "30px", marginTop: "20px" }}>
                            <Grid container spacing={6}>



                                <Grid item xs={12} >
                                    <div style={{ display: "flex", alignItems: "center" }} >
                                        <Typography sx={{ marginRight: "10px", fontWeight: "600", fontSize: "22px" }} >Section Settings</Typography>
                                    </div>

                                </Grid>
                                {/* <Box > */}



                                {/* Additional Settings starts*/}
                                <Grid item xs={12} sx={{ display: "flex" }}>
                                    <SwitchesCustomized label="Include Introduction" isChecked={introduction} onClick={() => setIntroduction(!introduction)} />
                                    <LightTooltip title={
                                        <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                            By default, Introduction sections are always included. You can turn off Introduction by disabling this option.
                                        </p>
                                    } placement="top">
                                        <div style={{ height: "100%" }}>
                                            <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                        </div>
                                    </LightTooltip >

                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex" }}>
                                    <SwitchesCustomized label="Include Conclusion" isChecked={conclusion} onClick={() => setConclusion(!conclusion)} />
                                    <LightTooltip title={
                                        <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                            By default, Conclusion sections are always included. You can turn off Conclusions by disabling this option.
                                        </p>
                                    } placement="top">
                                        <div style={{ height: "100%" }}>
                                            <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                        </div>
                                    </LightTooltip >

                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex" }}>
                                    <SwitchesCustomized label="Table of Contents (TOC)" isChecked={toc} onClick={() => setToc(!toc)} />
                                    <LightTooltip title={
                                        <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                            The table of contents will be added to the top of the article under the title.
                                        </p>
                                    } placement="top">
                                        <div style={{ height: "100%" }}>
                                            <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                        </div>
                                    </LightTooltip >

                                </Grid>

                                {
                                    articleType != 'listicle' &&
                                    <Grid item xs={12} sx={{ display: "flex" }}>
                                        <SwitchesCustomized label="Include FAQ" isChecked={faq} onClick={() => setFaq(!faq)} />
                                        <LightTooltip title={
                                            <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                System will include Frequently Asked Questions (FAQ) at the end of the article.
                                            </p>
                                        } placement="top">
                                            <div style={{ height: "100%" }}>
                                                <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                            </div>
                                        </LightTooltip >


                                    </Grid>
                                }



                                {
                                    articleType == "listicle" ?
                                        <Grid item xs={12} sx={{ display: "flex" }}>
                                            <SwitchesCustomized label="Number Each Listicle Item" isChecked={numberedItem} onClick={() => setNumberedItem(!numberedItem)} />
                                            <LightTooltip title={
                                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                    Each Item of The Listicle Will be Numbered (1, 2, 3, 4 ...)
                                                </p>
                                            } placement="top">
                                                <div style={{ height: "100%" }}>
                                                    <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                                </div>
                                            </LightTooltip >
                                        </Grid>
                                        : null
                                }







                                <Grid item xs={12} sx={{ display: "flex" }}>
                                    <Box sx={{ width: "100%", display: "flex" }}>
                                        <Grid item sm={6} xs={6}>
                                            <FormControl size='medium' fullWidth>
                                                <InputLabel id='img-service'>Select Image Service</InputLabel>
                                                <Select
                                                    fullWidth
                                                    placeholder='Select Image Service'
                                                    label='Select Image Service'
                                                    labelId='Select Image Service'
                                                    value={imgService}
                                                    onChange={e => {
                                                        if (e.target.value == 'none') {
                                                            setImgService(e.target.value)
                                                            setShowFeaturedImg(false)
                                                        } else {
                                                            setImgService(e.target.value)
                                                            setShowFeaturedImg(true)
                                                        }

                                                    }}
                                                >
                                                    {
                                                        imgServiceList.map((imgS: any, k: number) => {
                                                            return (
                                                                <MenuItem key={k} value={imgS.value}>{imgS.display}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <LightTooltip title={
                                            <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                System will select one image from Unsplash, Pexels or DALL-E to use as the featured image. In the future, we will allow choosing from multiple images.
                                            </p>
                                        } placement="top">
                                            <div style={{ height: "100%", display: "flex", alignItems: "center", marginLeft: "10px" }}>
                                                <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                            </div>
                                        </LightTooltip >
                                    </Box>


                                </Grid>

                                {
                                    (imgService == 'dall-e-2' || imgService == 'dall-e-3') &&
                                    <>
                                        <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "25px", marginTop: "20px", display: "flex" }}>
                                            Image Prompt for DALL-E*
                                            <LightTooltip title={
                                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                    Please insert appropriate prompt for the featured image of your article. This prompt will be sent to Dall-E to fetch your desired featured image. <br></br> <strong>Note:</strong> We recommend DALL-E-3 because it produces significantly better images than DALL-E-2.
                                                </p>
                                            } placement="top">
                                                <div style={{ height: "100%" }}>
                                                    <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                                                </div>
                                            </LightTooltip >


                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Visualize a piece of futuristic technology, like ‘a holographic communication device’."
                                            multiline
                                            rows={2}
                                            // maxRows={4}
                                            value={imgPrompt}
                                            onChange={e => {
                                                setImgPrompt(e.target.value)
                                            }}
                                            sx={{ paddingLeft: "24px" }}
                                        />

                                    </>

                                }
                                {
                                    articleType != 'listicle' &&
                                    <>
                                        <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: 500, marginLeft: "25px", marginTop: "20px", display: "flex" }}>
                                            Extra Section Prompt
                                            <LightTooltip title={
                                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                    Additional information that will be applied to EVERY section. You must not give instructions like “Write 1500 words” or anything similar because it will be applied individually to each section, not the whole article at once.
                                                </p>
                                            } placement="top">
                                                <div style={{ height: "100%" }}>
                                                    <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                                                </div>
                                            </LightTooltip >


                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder='ONLY provide a prompt that you’d like to apply to EVERY section. Keep it short. Do NOT give article-level or global prompt like “Write 1500 words”. Example1: Avoid transitional phrases. Example2: Do not use the word “However”.'
                                            multiline
                                            rows={2}
                                            // maxRows={4}
                                            value={extraPrompt}
                                            onChange={e => {
                                                setExtraPrompt(e.target.value)
                                            }}
                                            sx={{ paddingLeft: "24px" }}
                                        />

                                    </>

                                }



                                {/* Additional Settings ends*/}


                            </Grid>
                        </Card>
                        {
                            articleType !== 'youtube-to-blog' &&
                            <Card sx={{ width: "100%", padding: "30px", marginTop: "20px" }}>
                                <Grid item xs={12} sx={{ mb: 5 }}>
                                    <div style={{ display: "flex", alignItems: "center" }} >
                                        <Typography sx={{ marginRight: "10px", fontWeight: "600", fontSize: "22px" }} >Internal and External Linkings</Typography>
                                    </div>

                                </Grid>
                                <Grid container>

                                    <Grid item xs={12} sx={{ display: "flex" }}>
                                        <SwitchesCustomized label="Include Auto Internal Linking" isChecked={internalLinking} onClick={() => {
                                            if (allSites.length > 0)
                                                setInternalLinking(!internalLinking)
                                            else
                                                Swal.fire({
                                                    title: '',
                                                    html: '<p>You have not connected GSC or you do not have any website added to your GSC.</p><b> Go to integrations  page to add GSC</b>',
                                                    icon: 'warning',
                                                    confirmButtonText: 'Close',
                                                    confirmButtonColor: "#2979FF"
                                                })
                                        }} />
                                        <ListBadge color='info' sx={{ ml: 0, mr: 1, alignItems: "center" }} badgeContent='Beta' />
                                        <LightTooltip title={
                                            <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                You have to add your Google Search Console profile with Google OAuth 2.0. We will fetch your connected website information to add internal linking.
                                            </p>
                                        } placement="top">
                                            <div style={{ height: "100%" }}>
                                                <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                            </div>
                                        </LightTooltip >

                                    </Grid>

                                    {

                                        (model == 'gpt-4-1106-preview' || model == 'gpt-4-turbo' || model == 'gpt-4' || model == 'gpt-4o' || model == 'gpt-4o-mini' || model == 'claude-3-5-sonnet-20240620') &&
                                        <Grid item xs={12} sx={{ display: "flex", mt: 5 }}>
                                            <SwitchesCustomized label="Include Citation" isChecked={citation} onClick={() => setCitation(!citation)} />
                                            <ListBadge color='info' sx={{ ml: 0, mr: 1, alignItems: "center" }} badgeContent='Beta' />
                                            <LightTooltip title={
                                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                    Fetches real time search result to cite sources into the article. Currently only available for GPT-4 and GPT-4 Turbo model.
                                                </p>
                                            } placement="top">
                                                <div style={{ height: "100%" }}>
                                                    <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                                </div>
                                            </LightTooltip >

                                        </Grid>
                                    }


                                    <Grid item xs={12} sx={{ display: citation ? "flex" : "none", mt: 5 }}>
                                        <Box sx={{ width: "100%", display: citation ? "flex" : "none" }}>
                                            <Grid item sm={6} xs={6}>
                                                <FormControl size='medium' fullWidth>
                                                    <InputLabel id='Select Number of Citations'>Select Number of Citations</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        placeholder='Select Number of Citations'
                                                        label='Select Number of Citations'
                                                        labelId='Select Number of Citations'
                                                        value={noOfCitations}
                                                        onChange={e => {

                                                            setNoOfCitations(e.target.value)

                                                        }}
                                                    >

                                                        <MenuItem value="1-10">Low (1-10)</MenuItem>
                                                        <MenuItem value="10-20">Medium (10 - 20)</MenuItem>
                                                        <MenuItem value="20+">High (20+)</MenuItem>


                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            {/* <LightTooltip title={
                                    <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                        System will select one image from Unsplash, Pexels or DALL-E to use as the featured image. In the future, we will allow choosing from multiple images.
                                    </p>
                                } placement="top">
                                    <div style={{ height: "100%", display: "flex", alignItems: "center", marginLeft: "10px" }}>
                                        <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                                    </div>
                                </LightTooltip > */}
                                        </Box>


                                    </Grid>

                                    {
                                        articleType != 'listicle' &&
                                        <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "0px", marginTop: "20px", marginBottom: "20px", display: "flex" }}>
                                            Links
                                            <LightTooltip title={
                                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                                    Add links in the article. You can add multiple links as well. <br></br>NOTE: If the generated article DO NOT include any suitable keywords for the URL(s), it may not include the URL(s) as link in the article.
                                                </p>
                                            } placement="top">
                                                <div style={{ height: "100%" }}>
                                                    <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                                                </div>
                                            </LightTooltip >


                                        </Typography>
                                    }

                                    <Grid container>
                                        {
                                            articleType != 'listicle' && numberOfLinks.map((link, index) => {
                                                return (
                                                    <Grid container sx={{ mb: 3 }}>
                                                        <Grid item sm={11} xs={11} sx={{ display: "block" }}>
                                                            <TextField fullWidth label='Links to include in article' placeholder='https://example.com' value={links[index] ? links[index] : ''} onChange={e => {
                                                                // console.log(e.target.value)
                                                                const newArray = [...links];
                                                                newArray[index] = e.target.value
                                                                setLinks(newArray);
                                                            }} InputProps={{
                                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                            }} />
                                                        </Grid>
                                                        <Grid item sm={1} sx={{ display: "flex", alignItems: "center", justifyContent: "start", pl: 1 }}>
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
                                                    </Grid>

                                                )
                                            })


                                        }

                                        {
                                            articleType != 'listicle' &&
                                            <Button variant='text' size="large" sx={{ mr: 2, ml: 0, p: 2, mt: 2, display: showAdditionalSettings ? "flex" : "none" }} onClick={() => {
                                                const newArray = [...numberOfLinks];
                                                newArray.push(1);
                                                setNumberOfLinks(newArray);
                                            }} startIcon={<Icon icon="gg:add" />}>
                                                Add Another Link
                                            </Button>
                                        }
                                    </Grid>


                                </Grid>
                            </Card >
                        }

                        {/* <Divider sx={{ my: theme => `${theme.spacing(2)} !important`, width: "98%", marginBottom: "20px", marginLeft: "2%" }} /> */}

                        <Card sx={{ width: "100%", padding: "30px", marginTop: "20px" }}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <Typography variant='body1' sx={{ fontSize: "22px", paddingBottom: "10px", fontWeight: 500, marginBottom: "00px" }}>
                                        Content Operations
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Folders folder={folder} setFolder={setFolder} />
                                </Grid>
                                <Grid item xs={6}>
                                    <AssignUsers user={user} setUser={setUser} />

                                </Grid>

                                <Grid item xs={6}>
                                    <DatePickerWrapper >
                                        <DatePicker
                                            // style={{ height: "30px" }}
                                            selectsStart
                                            id='create-due-date'
                                            selected={dateTime}
                                            minDate={new Date()}
                                            showTimeSelect={true}
                                            dateFormat={'MM-dd-yyyy hh:mm a'}
                                            customInput={<PickersComponent label='Due date' registername='Due date' />}
                                            onChange={(date: Date) => {
                                                setDateTime(date)
                                                // console.log("date:", date)

                                            }}

                                            onSelect={handleStartDate}
                                        />
                                    </DatePickerWrapper>
                                </Grid>
                            </Grid>
                        </Card>


                    </Grid>




                </DialogContent >
                <DialogActions
                    sx={{
                        justifyContent: 'end',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(32)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
                    }}
                >
                    <Button variant='contained' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }}
                        onClick={
                            () => {
                                if (auth.user?.is_active) {
                                    submit()
                                } else {
                                    Swal.fire({
                                        title: 'Verify Your Account',
                                        text: 'Please Verify Your Account to Generate Article!',
                                        icon: 'warning',
                                        confirmButtonText: 'OK',
                                        confirmButtonColor: "#2979FF"
                                    })
                                }

                            }
                        } startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null}
                        disabled={loading}


                    >
                        Create Article
                    </Button>
                    {/* <Button variant='outlined' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }} color='secondary' >
                        Cancel
                    </Button> */}
                </DialogActions>
            </Box >
        </>

        // </Card >
    )

}