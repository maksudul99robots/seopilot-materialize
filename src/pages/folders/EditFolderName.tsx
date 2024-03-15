//@ts-nocheck
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
import { LoginRegistrationAPI } from 'src/services/API'

const EditFolderName = (props: any) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [isError, setIsError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [name, setName] = useState(props?.row?.name ? props?.row?.name : '')

  const handleClose = () => {
    setShow(false);
  }



  const handleSubmit = () => {
    setLoading(true)
    setIsError(false);
    setErrorText('');

    if (name.length == 0) {
      setErrorText('Please write a name of your folder.')
      setIsError(true);
      return false;
    }

    LoginRegistrationAPI.editFolder({ id: props.row.id, name: name }).then(res => {
      setLoading(false)
      if (res.status == 200) {
        props.setReloadData(props.reloadData + 1);
        handleClose();
      }
    }).catch(e => {
      setLoading(false)
      console.log("unable to update folder");
      handleClose()
    })

  }

  return (
    <>

      <div style={{ height: "100%" }}>
        {/* <Button variant='text' sx={{ width: "100%" }} startIcon={<Icon icon="circum:edit" />} onClick={e => {
          setShow(true);
        }}>Edit</Button> */}
        <MenuItem className='add-icon-color' disableRipple onClick={e => {
          setShow(true);
        }}>
          <Icon icon="circum:edit" />
          &nbsp;&nbsp;Edit
        </MenuItem>
      </div>

      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={handleClose}
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
              Edit Folder
            </Typography>
          </Box>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px", marginBottom: "5px" }}>
            <Typography variant='body1' sx={{ fontWeight: "500", fontSize: "18px" }}>
              Folder Name
            </Typography>

          </Box>
          <TextField
            id="outlined-multiline-flexible"
            error={isError && prompt.length === 0 ? true : false}
            helperText={errorText}
            multiline
            maxRows={10}
            value={name}
            sx={{ width: "100%", }}
            onChange={(e) => {
              setName(e.target.value)
            }}
            onKeyDown={(e: KeyboardEvent) => {
              e.stopPropagation();
            }}


          />

        </DialogContent>

        <DialogActions
          sx={{

            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            display: "flex",
            justifyContent: "end",
          }}
        >

          <Button variant='contained' startIcon={<Icon icon={loading ? "line-md:loading-twotone-loop" : "circum:edit"}></Icon>} onClick={handleSubmit}>Edit</Button>

        </DialogActions>

      </Dialog>
    </>
  )
}

export default EditFolderName
