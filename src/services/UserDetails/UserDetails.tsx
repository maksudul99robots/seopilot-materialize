// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent } from 'react'

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
import CircularProgress from '@mui/material/CircularProgress';

// ** Third Party Imports
import Cards, { Focused } from 'react-credit-cards'



// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { LoginRegistrationAPI } from '../API'
import { getDateTime } from '../utils/DateTimeFormatter'
import { Chip } from '@mui/material'
import { UserInfo } from './UserInfo'
import { WorkspaceInfo } from './WorkspaceInfo'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const UserDetails = (props: any) => {
  // ** States
  const [name, setName] = useState<string>('')
  const [userDetails, setUserDetails] = useState<any>(null);
  const [focus, setFocus] = useState<Focused | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const handleBlur = () => setFocus(undefined)


  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'name') {
      // target.value = formatCreditCardNumber(target.value, Payment)
      setName(target.value)
    }
  }

  const handleClose = () => {
    setName('')
    setShow(false)
  }

  const getUserDetails = () => {
    setLoading(true)
    LoginRegistrationAPI.getUserDetails({ id: props.user.id }).then(res => {
      setUserDetails(res.data)
      setLoading(false)

    }).catch(e => {
      setLoading(false)
    })
  }

  return (
    <>
      <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, cursor: "pointer" }} onClick={() => { setShow(true); getUserDetails(); }}>
        {props.user.email}
      </Typography>

      <Dialog
        fullWidth
        open={show}
        maxWidth='lg'
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
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              User Details
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(5)} !important` }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: 7, display: 'flex', justifyContent: loading ? "center" : "space-around" }}>
                  {/* <Box sx={{ display: 'flex' }}> */}
                  {loading ?
                    <CircularProgress />
                    :
                    <>
                      <Box>
                        <UserInfo user={props.user} />
                        <Box>
                          <Typography variant='body1' sx={{ mb: 3, lineHeight: '2rem', mt: 3, fontWeight: 700, fontSize: "18px" }}>
                            User Plan
                          </Typography>
                          {
                            userDetails?.plan_details ?
                              <>
                                <Box sx={{ display: "flex" }}>
                                  <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                    Plan:&nbsp;
                                  </Typography>
                                  <Typography variant='body1' sx={{}}>
                                    <Chip label={userDetails?.plan_details?.plan.toUpperCase()} color='primary' size="small" />
                                  </Typography>

                                </Box>
                                <Box sx={{ display: "flex" }}>
                                  <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                    Token:&nbsp;
                                  </Typography>
                                  <Typography variant='body1' sx={{}}>
                                    {userDetails?.plan_details?.token}
                                  </Typography>

                                </Box>
                              </>

                              :
                              <Box sx={{ display: "flex" }}>
                                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                  Plan:&nbsp;
                                </Typography>
                                <Typography variant='body1' sx={{}}>
                                  <Chip label='FREE' color='primary' size="small" />
                                </Typography>

                              </Box>
                          }
                        </Box>

                        <Box>
                          <Typography variant='body1' sx={{ mb: 3, lineHeight: '2rem', mt: 3, fontWeight: 700, fontSize: "18px" }}>
                            Generated Articles
                          </Typography>


                          <Box sx={{ display: "flex" }}>
                            <Typography variant='body1' sx={{ fontWeight: 600 }}>
                              Total:&nbsp;
                            </Typography>
                            <Typography variant='body1' sx={{}}>
                              {userDetails?.articles?.total}
                            </Typography>

                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography variant='body1' sx={{ fontWeight: 600 }}>
                              Successful:&nbsp;
                            </Typography>
                            <Typography variant='body1' sx={{}}>
                              {userDetails?.articles?.success}
                            </Typography>

                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography variant='body1' sx={{ fontWeight: 600 }}>
                              Error:&nbsp;
                            </Typography>
                            <Typography variant='body1' sx={{}}>
                              {userDetails?.articles?.error}
                            </Typography>

                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography variant='body1' sx={{ fontWeight: 600 }}>
                              On Process:&nbsp;
                            </Typography>
                            <Typography variant='body1' sx={{}}>
                              {userDetails?.articles?.initiated}
                            </Typography>

                          </Box>

                        </Box>

                      </Box>

                      <WorkspaceInfo user={userDetails} />
                    </>
                  }
                  {/* </Box> */}
                </Grid>

              </Grid>
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

          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserDetails
