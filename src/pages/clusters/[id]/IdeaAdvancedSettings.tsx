//@ts-ignore
// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
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
import { FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, Tooltip, TooltipProps, tooltipClasses } from '@mui/material'


const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { styled } from '@mui/system'
import { TagsInput } from 'react-tag-input-component'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import { CustomRadioIconsData, CustomRadioIconsProps } from 'src/@core/components/custom-radio/types'
import SwitchesCustomized from 'src/components/SwitchesCustomized'
import DndList from 'src/services/DND/DndList'
import GetCountryList from 'src/pages/create-article/CountryList'
import { isValidURL } from 'src/services/URLChecker'
import { LoginRegistrationAPI } from 'src/services/API'
import Folders from './Folders'

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
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useAuth } from 'src/hooks/useAuth'
import AssignUsers from 'src/pages/create-article/AssignUsers'

const IdeaAdvancedSettings = (props: any) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)

  const [numberOfLinks, setNumberOfLinks] = useState([1]);
  //Values
  const [articleType, setArticleType] = useState('blog')
  const [topic, setTopic] = useState(props.settings[props.idea_id].topic)
  const [oldTopic, setOldTopic] = useState(props.settings[props.idea_id].topic)
  const [keywords, setKeywords] = useState<any>(separateString(props.settings[props.idea_id].keywords))
  const [oldKeywords, setOldKeywords] = useState<any>(separateString(props.settings[props.idea_id].keywords))
  const [tone, setTone] = useState(props.settings[props.idea_id].tone)
  const [language, setLanguage] = useState(props.settings[props.idea_id].language)
  const [links, setLinks] = useState<Array<string>>(separateString(props.settings[props.idea_id].links))
  // const [country, setCountry] = useState<string>('United States of America (USA)')
  const [country, setCountry] = useState<string>(props.settings[props.idea_id].country)
  const [articleLength, setArticleLength] = useState<string>(props.settings[props.idea_id].article_length)
  const [headings, setHeadings] = useState<any>([]);
  const [tempURLHeadings, setTempURLHeadings] = useState<any>([]);
  const [tempUserHeadings, setTempUserHeadings] = useState<any>([]);
  const [outlineSource, setOutlineSource] = useState<string>(props.settings[props.idea_id].outline_source);
  const [model, setModel] = useState<string>(props.settings[props.idea_id].model); //gpt-3.5-turbo-1106
  const [imgService, setImgService] = useState<string>(props.settings[props.idea_id].img_service);
  const [pointOfView, setPointOfView] = useState<string>(props.settings[props.idea_id].point_of_view);
  const [outlineURL, setOutlineURL] = useState(props.settings[props.idea_id].outline_url);
  const [imgPrompt, setImgPrompt] = useState(props.settings[props.idea_id].img_prompt);
  const [showOutline, setShowOutline] = useState(false);
  const [faq, setFaq] = useState(props.settings[props.idea_id].faq);
  const [toc, setToc] = useState(props.settings[props.idea_id].toc);
  const [citation, setCitation] = useState(props.settings[props.idea_id].citation);
  const [noOfCitations, setNoOfCitations] = useState(props.settings[props.idea_id].no_of_citations);
  const [introduction, setIntroduction] = useState(props.settings[props.idea_id].introduction);
  const [conclusion, setConclusion] = useState(props.settings[props.idea_id].conclusion);
  const [loading, setLoading] = useState(false);
  const [fetchOutlineLoading, setFetchOutlineLoading] = useState(false);
  const [showAdditionalSettings, setShowAdditionalSettings] = useState(false);
  const [showFeaturedImg, setShowFeaturedImg] = useState(true);
  const [folder, setFolder] = useState<string | number>(props.settings[props.idea_id].folder_id)
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
    },
    {
      value: 'dall-e-3',
      display: 'Dall-E-3'
    },
    {
      value: 'dall-e-2',
      display: 'Dall-E-2'
    }
  ]);
  const auth = useAuth();
  const [extraPrompt, setExtraPrompt] = useState<string>('')
  const [user, setUser] = useState(auth?.user?.id);
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const handleClose = () => {
    setShow(false);
    props.handleClose();
  }

  // console.log("props.settings[props.idea_id]:", props.settings[props.idea_id])

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
  const handleSubmit = () => {

    props.handleChange(props.idea_id, topic, 'topic')
    props.handleChange(props.idea_id, convertArrayToCsvKeywords(keywords), 'keywords')
    props.handleChange(props.idea_id, articleLength, 'article_length')
    props.handleChange(props.idea_id, tone, 'tone')
    props.handleChange(props.idea_id, language, 'language')
    props.handleChange(props.idea_id, convertArrayToCSV(links), 'links')
    props.handleChange(props.idea_id, headings.length > 0 ? JSON.stringify(headings) : null, 'outlines')
    props.handleChange(props.idea_id, outlineSource, 'outline_source')
    props.handleChange(props.idea_id, outlineURL, 'outline_url')
    props.handleChange(props.idea_id, faq, 'faq')
    props.handleChange(props.idea_id, toc, 'toc')
    props.handleChange(props.idea_id, model, 'model')
    props.handleChange(props.idea_id, pointOfView, 'point_of_view')
    props.handleChange(props.idea_id, imgService, 'img_service')
    props.handleChange(props.idea_id, extraPrompt, 'extra_prompt')
    props.handleChange(props.idea_id, imgPrompt, 'img_prompt')
    props.handleChange(props.idea_id, citation, 'citation')
    props.handleChange(props.idea_id, noOfCitations, 'no_of_citations')
    props.handleChange(props.idea_id, folder, 'folder_id')
    // props.handleChange(props.idea_id, 'idea', 'status')

    LoginRegistrationAPI.saveIdeaLibrarySettings({
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
      article_id: '',
      no_of_citations: noOfCitations,
      cluster_id: props.cluster_id,
      idea_id: props.idea_id,
      folder_id: folder

    }).then(res => {
      if (topic != oldTopic || JSON.stringify(keywords) != JSON.stringify(oldKeywords)) {
        props.updateList()
      }
      props.handleClose()
    }).catch(e => {

    })


  }

  const handleArticleChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setArticleLength(prop)
    } else {
      setArticleLength((prop.target as HTMLInputElement).value)
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
    newArr.push('H2:');

    let uniqueArr = [...new Set(newArr)];
    setHeadings(uniqueArr);
  }

  //DND settings ends

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

  function separateString(str: string) {
    // Split the string by commas
    const parts = str?.split(',');

    // Trim each part to remove leading and trailing whitespaces
    const trimmedParts = parts.map((part: any) => part.trim());
    // console.log("trimmedParts:", trimmedParts);
    return trimmedParts;
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
    <>

      <MenuItem onClick={() => {

        setShow(true);
      }} className='add-icon-color' >
        <Icon icon="material-symbols-light:settings-outline" />
        &nbsp;&nbsp;Article Settings
      </MenuItem>

      <Dialog
        fullWidth
        open={show}
        maxWidth='lg'
        scroll='body'
        onClose={handleClose}
        hideBackdrop={true}
        TransitionComponent={Transition}
        sx={{}}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],

          }}

        >
          <Box className='idea-settings' sx={{ height: "70vh", overflowY: "scroll", p: 5 }}>



            <Box sx={{ mb: 10, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ lineHeight: '2rem' }}>
                Article Advanced Settings
              </Typography>
              <Typography variant='body2'>Enter your inputs and watch SEO Pilot research and generate a rank-worthy article for you.</Typography>
              {/* <Typography variant='body2'>Select a Site to Send Article</Typography> */}
            </Box>
            <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
              <Icon icon='mdi:close' />
            </IconButton>

            <Grid item sm={12} xs={12}>
              <Typography variant='body1' sx={{ fontSize: "22px", paddingBottom: "10px", marginBottom: "35px", fontWeight: 500, marginTop: "10px", borderBottom: "1px solid #dbe0e3" }}>
                Article Optimization

              </Typography>

            </Grid>
            <Grid container spacing={6}>
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
              <Grid item xs={12}>
                <Typography variant='body1' sx={{ paddingBottom: "10px", fontSize: "22px", fontWeight: 500, marginTop: "20px", marginBottom: "10px", display: "flex", borderBottom: "1px solid #dbe0e3" }}>
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
              {/* </Box> */}

              {/* <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginLeft: "25px", marginTop: "20px", marginBottom: "-5px", display: "flex" }}>
                            Point of View of Article

                        </Typography> */}


              {
                articleType != 'listicle' &&
                <>
                  <Grid item xs={12}>
                    <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginTop: "20px", marginBottom: "10px", display: "flex" }}>
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
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4} sx={{}}>
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
                  </Grid>

                </>
              }



              {
                outlineSource == 'url' &&
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", marginTop: "0px" }}>

                  <TextField fullWidth label='Insert URL' sx={{ marginRight: "10px" }} placeholder='https://example.com' onChange={e => {
                    setOutlineURL(e.target.value)
                  }} value={outlineURL} InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  />
                  <Button variant='outlined' size="medium" sx={{ pt: 3, pb: 3, pl: 4, pr: 4, width: fetchOutlineLoading ? "200px" : '150px' }}
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
                <Grid item xs={12}>
                  <DndList
                    headings={headings}
                    setHeadings={setHeadings}
                    editHeadingOnChange={editHeadingOnChange}
                    removeHeadings={removeHeadings}
                    changeHeadingTag={changeHeadingTag}
                    addnewHeading={addnewHeading}
                  />
                </Grid>

              }
              <Grid item xs={12}>
                <Typography variant='body1' sx={{ fontSize: "22px", paddingBottom: "10px", fontWeight: 500, marginTop: "20px", marginBottom: "10px", borderBottom: "1px solid #dbe0e3" }}>
                  Article Operations
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

              <Grid item xs={12} className='add-icon-color' sx={{ marginTop: "20px" }} >
                <div onClick={() => { setShowAdditionalSettings(!showAdditionalSettings) }} style={{ display: "flex", alignItems: "center" }} >
                  <Typography sx={{ marginRight: "10px", fontWeight: "600", fontSize: "22px" }} className='add-icon-color'>Advanced Settings</Typography>
                  {!showAdditionalSettings ? <Icon icon="bxs:down-arrow" fontSize={15} /> : <Icon icon="bxs:up-arrow" fontSize={15} />}
                </div>

              </Grid>
              {/* <Box > */}


              {/* Additional Settings starts*/}
              <Grid item xs={12} sx={{ display: showAdditionalSettings ? "flex" : "none", marginTop: "10px" }}>
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
              <Grid item xs={12} sx={{ display: showAdditionalSettings ? "flex" : "none", marginTop: "5px" }}>
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
              <Grid item xs={12} sx={{ display: showAdditionalSettings ? "flex" : "none", marginTop: "5px" }}>
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
                <Grid item xs={12} sx={{ display: showAdditionalSettings ? "flex" : "none", marginTop: "5px" }}>
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
                (model == 'gpt-4-1106-preview' || model == 'gpt-4' || model == 'gpt-4o') &&
                <Grid item xs={12} sx={{ display: showAdditionalSettings ? "flex" : "none", marginTop: "5px" }}>
                  <SwitchesCustomized label="Include Citation" isChecked={citation} onClick={() => setCitation(!citation)} />
                  <Typography sx={{ display: "flex", alignItems: "center", fontStyle: 'italic', fontSize: "14px", marginRight: "5px" }}>(Beta)</Typography>
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


              <Grid item xs={12} sx={{ display: showAdditionalSettings && citation ? "flex" : "none", marginTop: "20px" }}>
                <Box sx={{ width: "100%", display: showAdditionalSettings && citation ? "flex" : "none" }}>
                  <Grid item sm={6} xs={6} sx={{ width: "50%" }}>
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
                </Box>


              </Grid>
              <Grid item xs={12} sx={{ display: showAdditionalSettings ? "flex" : "none", marginTop: "0px" }}>
                <Box sx={{ width: "100%", display: showAdditionalSettings ? "flex" : "none" }}>
                  <Grid item sm={6} xs={6} sx={{ width: "50%" }}>
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
                showAdditionalSettings && (imgService == 'dall-e-2' || imgService == 'dall-e-3') &&
                <Grid item xs={12}>
                  <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginTop: "0px", display: showAdditionalSettings ? "flex" : "none" }}>
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
                    onKeyDown={(e: KeyboardEvent) => {
                      e.stopPropagation();
                    }}
                  />

                </Grid>

              }
              {
                articleType != 'listicle' && showAdditionalSettings &&
                <Grid item xs={12}>
                  <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginTop: "0px", display: showAdditionalSettings ? "flex" : "none" }}>
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
                    sx={{}}
                  />

                </Grid>

              }


              {/* </Box> */}
              {
                articleType != 'listicle' &&
                <Grid item xs={12}>
                  <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginTop: "0px", display: showAdditionalSettings ? "flex" : "none" }}>
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
                </Grid>
              }


              {
                articleType != 'listicle' && numberOfLinks.map((link, index) => {
                  return (
                    <>
                      <Grid item xs={11} sx={{ display: showAdditionalSettings ? "block" : "none", width: "100%" }}>
                        <TextField fullWidth label='Links to include in article' placeholder='https://example.com' value={links[index] ? links[index] : ''} onChange={e => {
                          // console.log(e.target.value)
                          const newArray = [...links];
                          newArray[index] = e.target.value
                          setLinks(newArray);
                        }} InputProps={{
                          startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }} />
                      </Grid>
                      <Grid item xs={1}>
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

              {
                articleType != 'listicle' &&
                <Grid item xs={5} sx={{ paddingTop: "0 px !important;" }}>
                  <Button variant='text' size="large" sx={{ mr: 2, p: 2, mt: 0, display: showAdditionalSettings ? "flex" : "none" }} onClick={() => {
                    const newArray = [...numberOfLinks];
                    newArray.push(1);
                    setNumberOfLinks(newArray);
                  }} startIcon={<Icon icon="gg:add" />}>
                    Add Another Link
                  </Button>
                </Grid>

              }

            </Grid>

            {/* Additional Settings ends*/}

          </Box>


        </DialogContent>



        <DialogActions
          sx={{

            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            display: "flex",
            justifyContent: "end",
          }}
        >

          <Button variant='contained' startIcon={<Icon icon={loading ? "line-md:loading-twotone-loop" : "ic:outline-save"}></Icon>} onClick={handleSubmit}>Save</Button>


        </DialogActions>

      </Dialog >
    </>
  )
}

export default IdeaAdvancedSettings
