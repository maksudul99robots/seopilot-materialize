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
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import { TextareaAutosizeProps } from '@mui/base/TextareaAutosize';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'


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
import { useRouter } from 'next/router';
import fetch, { Headers } from "node-fetch"
import Swal from 'sweetalert2'
import Link from 'next/link'
const headers = new Headers()

const RephraseShow = (props: any) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(false)
  // const [cardNumber, setCardNumber] = useState<string>('')
  const [focus, setFocus] = useState<Focused | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const [pointOfView, setPointOfView] = useState<string>('Third Person (he, she, it, they)');
  const [tone, setTone] = useState('Clear, Knowledgeable and Confident')
  const [language, setLanguage] = useState('English')
  const [model, setModel] = useState<string>('gpt-4o');
  const [text, setText] = useState(props.text)
  const [editedText, setEditedText] = useState(props.text)
  const [output, setOutput] = useState('')
  const router = useRouter();
  const [nameOfTheButton, setNameOfTheButton] = useState('Copy to clipboard')
  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (props.text) {
      setText(props.text)
    }
    if (props.output) {
      setOutput(props.output)
    }
    if (props.pov) {
      setPointOfView(props.pov)
    }
    if (props.tone) {
      setTone(props.tone)
    }
    if (props.language) {
      setLanguage(props.language)
    }
    if (props.show) {
      setShow(props.show)
    }
  }, [props])

  return (
    <>
      {/* <Button variant='text' onClick={e => setShow(true)} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="f7:wand-stars-inverse" />}>Rephrase</Button> */}

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={handleClose}
        hideBackdrop={true}
        TransitionComponent={Transition}
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
              Rephrase Text
            </Typography>
            <Typography variant='body2'>Rephrase your selected text. You can edit your text and choose your model, tone, point of view and language for the text.</Typography>
            {/* <Typography variant='body2'>Select a Site to Send Article</Typography> */}
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
          <TextField
            id="outlined-multiline-flexible"
            label="Text"
            multiline
            maxRows={10}
            value={editedText}
            sx={{ width: "100%", marginTop: "20px" }}
            onChange={(e) => {
              setEditedText(e.target.value)
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="AI Output"
            multiline
            maxRows={10}
            value={output}
            sx={{ width: "100%", marginTop: "20px" }}
            onChange={(e) => {
              setOutput(e.target.value)
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
          {
            output != '' &&
            <CopyToClipboard text={output}
              onCopy={() => {
                setNameOfTheButton('Copied!')
                setTimeout(() => {
                  setNameOfTheButton('Copy to clipboard')
                }, 2000)
                // setNameOfTheButton('Copied')
              }}>
              <Button variant='outlined' sx={{ marginTop: "5px" }}>{nameOfTheButton}</Button>
            </CopyToClipboard>
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

          {/* <Button variant='contained' startIcon={<Icon icon={loading ? "line-md:loading-twotone-loop" : "f7:wand-stars-inverse"}></Icon>} onClick={handleSubmit}>Rewrite</Button> */}
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>


        </DialogActions>

      </Dialog>
    </>
  )
}

export default RephraseShow
