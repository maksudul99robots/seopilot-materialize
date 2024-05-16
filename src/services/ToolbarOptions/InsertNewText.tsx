// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'

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

// ** Third Party Imports
import { Focused } from 'react-credit-cards'



// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { LoginRegistrationAPI } from '../API'

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

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
import { toast } from 'react-toastify'

const InsertNewText = (props: any) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [pointOfView, setPointOfView] = useState<string>('Third Person (he, she, it, they)');
  const [tone, setTone] = useState('Clear, Knowledgeable and Confident')
  const [language, setLanguage] = useState('English')
  const [model, setModel] = useState<string>('gpt-4o');
  const [isError, setIsError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')

  const handleClose = () => {
    setShow(false);
    setOutput('')
  }



  const handleSubmit = () => {
    // props.setReloadArticle(props.reloadArticle + 1)
    setIsError(false);
    setErrorText('');
    if (prompt.length < 20) {
      if (prompt.length == 0) {
        setErrorText('Please write a prompt to generate a text.')
        setIsError(true);

      } else {
        setErrorText('Prompt cannot be smaller than 20 characters.')
        setIsError(true);
      }
      return false;
    }
    setLoading(true)
    // return
    LoginRegistrationAPI.reWriteText({
      tone: tone,
      point_of_view: pointOfView,
      language: language,
      model: model,
      text: null,
      original_text: null,
      prompt: prompt,
      article_id: props.article_id,
      type: 'insert'
    }).then((res: any) => {
      setLoading(false)
      if (res.status == 200) {
        setOutput(res.data)
      }
    }).catch(e => {
      setLoading(false)
      console.log("error on reWriteText:", e)
    })
  }

  return (
    <>
      <LightTooltip title={
        <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
          Insert Text inside the editor.
          <p>Click here to create AI article with your own prompt.</p>
        </p>
      } placement="top">
        <div style={{ height: "100%" }}>
          <Icon icon="pixelarticons:text-add" className='add-icon-color' style={{ padding: "5px", border: "1px solid #E9E9EC" }}
            onClick={e => {

              setShow(true);

            }}
          />
        </div>
      </LightTooltip >
      {/* <Button variant='outlined' onClick={e => {

        setShow(true);

      }} startIcon={<Icon icon="pixelarticons:text-add" />} size='small' sx={
        {
          marginLeft: "10px", marginBottom: "5px",
        }}>Insert</Button> */}

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={handleClose}
      // hideBackdrop={true}
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
          <Box sx={{ mb: 10, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ lineHeight: '2rem' }}>
              Insert Text
            </Typography>
            <Typography variant='body2'>Choose your model, tone, point of view and language to create AI Generated text to insert your article.</Typography>
          </Box>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item sm={12} xs={12} sx={{ width: "49%", marginRight: "5px" }}>

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
                  <MenuItem value='gpt-4o'>GPT-4o (Recommended)</MenuItem>
                  <MenuItem value='gpt-4-1106-preview'>GPT-4-TURBO</MenuItem>
                  <MenuItem value='gpt-4'>GPT-4</MenuItem>
                  <MenuItem value='gpt-3.5-turbo-1106'>GPT-3.5-TURBO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12} sx={{ width: "49%", marginLeft: "5px" }}>
              <FormControl fullWidth>
                <InputLabel id='country-select'>Point of View of Article</InputLabel>
                <Select
                  fullWidth
                  placeholder='Point of View of Article'
                  label='Point of View of Article'
                  labelId='Point of View of Article'
                  value={pointOfView}
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


          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item sm={12} xs={12} sx={{ width: "49%", marginRight: "5px", marginTop: "20px" }}>
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
            <Grid item sm={12} xs={12} sx={{ width: "49%", marginLeft: "5px", marginTop: "20px" }}>

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


          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px", marginBottom: "5px" }}>
            <Typography variant='body1' sx={{ fontWeight: "500", fontSize: "18px" }}>
              Prompt
            </Typography>

          </Box>
          <TextField
            id="outlined-multiline-flexible"
            // label="Text"
            error={isError && prompt.length === 0 ? true : false}
            helperText={errorText}
            multiline
            maxRows={10}
            value={prompt}
            sx={{ width: "100%", }}
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
          // InputProps={{
          //   startAdornment: <InputAdornment position="start"></InputAdornment>,
          // }}
          />
          {
            output != '' &&
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px", marginBottom: "5px" }}>
                <Typography variant='body1' sx={{ fontWeight: "500", fontSize: "18px" }}>
                  Output Text
                </Typography>
                <Icon icon="clarity:copy-line" style={{ cursor: "pointer" }} onClick={e => {
                  navigator.clipboard.writeText(output)
                  toast('Output Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                }} />
              </Box>
              <TextField
                id="outlined-multiline-flexible"
                // label="AI Output"
                multiline
                maxRows={10}
                value={output}
                sx={{ width: "100%", }}
                onChange={(e) => {
                  setOutput(e.target.value)
                }}
              // InputProps={{
              //   startAdornment: <InputAdornment position="start"></InputAdornment>,
              // }}
              />
            </>

          }

        </DialogContent>



        <DialogActions
          sx={{

            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            display: "flex",
            justifyContent: "end",
          }}
        >

          <Button variant='contained' startIcon={<Icon icon={loading ? "line-md:loading-twotone-loop" : "f7:wand-stars-inverse"}></Icon>} onClick={handleSubmit}>Write</Button>
          <Button variant='outlined' sx={{ marginLeft: "5px" }} onClick={e => {
            if (output.length > 0) {
              props.insertText(output)
            }
          }}
            startIcon={<Icon icon="dashicons:insert" />}
          >Insert</Button>


        </DialogActions>

      </Dialog>
    </>
  )
}

export default InsertNewText
