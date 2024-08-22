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
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'


import { Focused } from 'react-credit-cards'

// ** Util Import

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material'
import { LoginRegistrationAPI } from './API'
import { ValidateEmail } from './emailValidation'
import Swal from 'sweetalert2'
// import Avatar from 'react-avatar'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

import { SyntheticEvent } from 'react';
// import { getUserAvatarURL } from './getAvatar'
import Avatar from './AvatarComponent'


const InviteTeamMember = (props: any) => {
  // ** States
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<string>('member')
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState<Focused | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const handleBlur = () => setFocus(undefined)

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedIds(isChecked ? props.workspaces.map((w: any) => w.id) : []);
  };

  const isAllSelected = selectedIds.length === props.workspaces.length;

  // const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
  //   if (target.name === 'email') {
  //     // target.value = formatCreditCardNumber(target.value, Payment)
  //     setEmail(target.value)
  //   }
  // }

  const handleInputChange = (
    event: SyntheticEvent,
    value: string
  ) => {
    setEmail(value);
  };

  const handleClose = () => {
    setEmail('')
    setShow(false)
    setLoading(false)
  }

  useEffect(() => {
    if (email.length > 1) {
      if (ValidateEmail(email)) {
        setIsEmailValid(true)
        setDisable(false)
      } else {
        setIsEmailValid(false)
        setDisable(true)
      }

    } else {
      setIsEmailValid(false)
    }


  }, [email])

  const handleSubmit = () => {
    setLoading(true);
    LoginRegistrationAPI.inviteToTeam({ role, email, workspace: selectedIds }).then(res => {
      props.setReRender(!props.reRender);
      setLoading(false);
      // if (res.status == 203) {
      //   Swal.fire({
      //     title: 'Success!',
      //     text: 'The email is added to the team.',
      //     icon: 'success',
      //     confirmButtonText: 'OK',
      //     confirmButtonColor: "#2979FF"
      //   })
      // } else {
      Swal.fire({
        title: res.status == 203 ? 'Sorry' : 'Success!',
        text: res.data,
        icon: res.status == 203 ? 'warning' : 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      })
      // }

    }).catch(e => {
      setLoading(false);
      console.log(e)
      Swal.fire({
        title: 'Error!',
        text: e.response.data,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      })
    })
    setShow(false)
  }

  return (
    <>
      <Button variant='contained' onClick={() => setShow(true)} disabled={props.disabled}>
        + Invite a Team member
      </Button>

      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={handleClose}
        onBackdropClick={handleClose}
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
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '' }}>
              Invite a Team Member to Your Workspace
            </Typography>
            <Typography variant='subtitle2' sx={{ mb: 3, lineHeight: '' }}>
              Existing team members of the owner's other workspaces can be added without email verification
            </Typography>
          </Box>
          <Grid container spacing={6}>



            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Autocomplete
                    freeSolo
                    options={props.emails}
                    getOptionLabel={(option: any) => option.email}
                    inputValue={email}
                    onInputChange={handleInputChange}
                    renderOption={(props, option) => (
                      <Box component="li" {...props} display="flex" alignItems="center">
                        <Avatar email={option.email} bg={option.avatar_bg} />
                        {/* <Avatar src={getUserAvatarURL(option.email, 50)} size={"40"} round="50%" /> */}
                        <Typography variant='body1' sx={{ ml: 2 }}>{option.email}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        name='email'
                        value={email}
                        autoComplete='off'
                        label='Email Address'
                        onBlur={handleBlur}
                        placeholder=''
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                      />
                    )}
                  />
                  {/* <TextField
                    fullWidth
                    name='email'
                    value={email}
                    autoComplete='off'
                    label='Email Address'
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    placeholder=''
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}

                  /> */}
                </Grid>

              </Grid>
            </Grid>
            {/* <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
              <TableContainer >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: "12px", padding: "2px !important;" }}>mtushar78+29@gmail.com</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Grid> */}

            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
              <FormControl fullWidth>
                <InputLabel id='role-select'>Select Role</InputLabel>
                <Select
                  fullWidth
                  placeholder='Select Role'
                  label='Select Role'
                  labelId='Select Role'
                  defaultValue={role}
                  onChange={e => {
                    setRole(e.target.value)
                  }}
                >
                  <MenuItem value='member'>Member</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>

              <Typography variant='h6'>Select Workspace(s)</Typography>
              <FormGroup>
                <FormControlLabel
                  label="All"
                  sx={{ height: "25px" }}
                  control={
                    <Checkbox
                      checked={isAllSelected || selectAll}
                      onChange={handleSelectAllChange}
                    />
                  }
                />
                {props.workspaces.map((w: any) => (
                  <FormControlLabel
                    sx={{ height: "25px" }}
                    key={w.id}
                    label={w.name}
                    control={
                      <Checkbox
                        checked={selectedIds.includes(w.id)}
                        onChange={() => handleCheckboxChange(w.id)}
                      />
                    }
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }}
            onClick={handleSubmit}
            disabled={loading || !isEmailValid || selectedIds.length == 0}
            startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : <Icon icon="bi:send" />}>
            Send Invitation
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default InviteTeamMember
