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

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { LoginRegistrationAPI } from '../API'


const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const Simplify = (props: any) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(false)

  const [show, setShow] = useState<boolean>(false)
  const [length, setLength] = useState<string>('1 paragraph');
  const [finalLength, setFinalLength] = useState<number>((props.text?.length * 80) / 100);
  const [model, setModel] = useState<string>('gpt-4o-mini');
  const [text, setText] = useState(props.text)
  const [editedText, setEditedText] = useState(props.text)
  const [output, setOutput] = useState('')
  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (props.text) {
      setText(props.text)
    }
    if (props.output_text) {
      setOutput(props.output_text)
    }
    if (props.length) {
      setLength(props.length)
    }
    if (props.show) {
      setShow(props.show)
    }
  }, [props])

  useEffect(() => {

    if (props.hasClaudeAiKey == 'yes' && props.hasOpenAiKey == 'no') {
      setModel('claude-3-5-sonnet-20240620')
    }
  }, [props.hasClaudeAiKey, props.hasOpenAiKey])


  const handleSubmit = () => {
    // props.setReloadArticle(props.reloadArticle + 1)
    setLoading(true)
    LoginRegistrationAPI.reWriteText({
      model: model,
      text: editedText,
      original_text: text,
      article_id: props.article_id,
      type: 'simplify',
      length: length
    }).then((res: any) => {
      setLoading(false)
      if (res.status == 200) {
        // router.reload();
        props.setReloadArticle(props.reloadArticle + 1)
        setOutput(res.data)
        // handleClose()
      }
    }).catch(e => {
      setLoading(false)
      console.log("error on reWriteText:", e)
      // handleClose()
    })
  }

  return (
    <>
      <Button variant='text' onClick={e => {
        if (text.length > 3000 || text.length < 200) {
          Swal.fire({
            // title: 'Selected Character Must be Within 20 to 800',
            text: 'Selected Character Must be Within 200 to 3000',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: "#2979FF"
          })
          props.handleClose()
        } else {
          setShow(true);
        }
      }} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="hugeicons:blush-brush-02" />}>Simplify</Button>

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
              Simplify Text
            </Typography>
            <Typography variant='body2'>Simplify your selected text. You can edit your text and choose your model.</Typography>
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
                  <MenuItem value='gpt-4o' disabled={props.hasOpenAiKey != 'yes'}>GPT-4o (Recommended)</MenuItem>
                  <MenuItem value='gpt-4o-mini' disabled={props.hasOpenAiKey != 'yes'}>GPT-4o mini</MenuItem>
                  <MenuItem value='gpt-4-turbo' disabled={props.hasOpenAiKey != 'yes'}>GPT-4-TURBO</MenuItem>
                  <MenuItem value='gpt-4' disabled={props.hasOpenAiKey != 'yes'}>GPT-4</MenuItem>
                  <MenuItem value='gpt-3.5-turbo-1106' disabled={props.hasOpenAiKey != 'yes'}>GPT-3.5-TURBO</MenuItem>
                  <MenuItem value='claude-3-5-sonnet-20240620' disabled={props.hasClaudeAiKey != 'yes'}>Claude 3.5 Sonnet</MenuItem>
                </Select >
              </FormControl >
            </Grid >

          </Box >


          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px", marginBottom: "5px" }}>
            <Typography variant='body1' sx={{ fontWeight: "500", fontSize: "18px" }}>
              Text
            </Typography>
            <Icon icon="clarity:copy-line" style={{ cursor: "pointer" }} onClick={e => {
              navigator.clipboard.writeText(editedText)
              toast('Text Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
            }} />
          </Box>
          <TextField
            id="outlined-multiline-flexible"
            // label="Text"
            multiline
            maxRows={10}
            value={editedText}
            sx={{ width: "100%", }}
            onChange={(e) => {
              setEditedText(e.target.value)
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

              />
            </>

          }

        </DialogContent >



        <DialogActions
          sx={{

            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            display: "flex",
            justifyContent: "end",
          }}
        >

          <Button variant='contained' startIcon={<Icon icon={loading ? "line-md:loading-twotone-loop" : "f7:wand-stars-inverse"}></Icon>} onClick={handleSubmit}>Simplify</Button>
          <Button variant='outlined' sx={{ marginLeft: "5px" }} onClick={e => {
            props.replaceText(output)
          }}
            startIcon={<Icon icon="tabler:replace" />}
          >Replace</Button>


        </DialogActions>

      </Dialog >
    </>
  )
}

export default Simplify
