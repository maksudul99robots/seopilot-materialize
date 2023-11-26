// ** React Imports
import { Fragment, ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import MuiCard, { CardProps } from '@mui/material/Card'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import { useAuth } from 'src/hooks/useAuth'

// import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import { LoginRegistrationAPI } from 'src/services/API'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { ValidateEmail } from 'src/services/emailValidation'
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))



const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: '',
  email: ''
}


interface FormData {
  email: string
  password: string
}


const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // ** Hooks
  const theme = useTheme()
  const auth = useAuth()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings


  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  useEffect(() => {
    if (email.length > 1)
      setIsEmailValid((ValidateEmail(email)))
    else
      setIsEmailValid(true)


  }, [email])

  const submit = () => {

    if (isEmailValid) {
      if (password.length > 6) {
        if (password == confirmPassword) {
          setLoading(true);
          LoginRegistrationAPI.register({ email, password, confirmPassword, firstName, lastName }).then((res) => {
            console.log("res:", res);
            setLoading(false);

            // Swal.fire(
            //   'Success',
            //   'A verification email is sent.',
            //   'success'
            // ).then(() => {
            //   auth.register({ token: res.data.accessToken, userData: res.data.userData })

            // })

            Swal.fire({
              title: 'Success',
              text: 'A verification email is sent.',
              icon: 'success',
              confirmButtonText: 'Close',
              confirmButtonColor: "#2979FF",
            }).then(() => {
              auth.register({ token: res.data.accessToken, userData: res.data.userData })

            })
          }).catch((e) => {
            console.log(e)
            setLoading(false);
            // Swal.fire(
            //   'Error',
            //   e.response.data,
            //   'error'
            // )

            Swal.fire({
              title: 'Error',
              text: e.response.data,
              icon: 'error',
              confirmButtonText: 'Close',
              confirmButtonColor: "#2979FF",
            })
          })

        } else {
          // Swal.fire(
          //   'Error',
          //   'Password must be at least 7 characters long.',
          //   'error'
          // )

          Swal.fire({
            title: 'Error',
            text: 'Password must be at least 7 characters long.',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: "#2979FF",
          })
        }
      }
    } else {
      // Swal.fire(
      //   'Error',
      //   'Email is not valid',
      //   'error'
      // )
      Swal.fire({
        title: 'Error',
        text: 'Email is not valid',
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: "#2979FF",
      })

    }
  }
  return (


    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logos/SEOPilotLogo256.png' height={54} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>Make your app management easy and fun!</Typography>
          </Box>
          <form noValidate autoComplete='off' >
            <Box sx={{ display: "flex" }}>
              <TextField autoFocus sx={{ mb: 4, mr: 2 }} label='First Name' placeholder='First Name' onChange={e => setFirstname(e.target.value)} />
              <TextField autoFocus sx={{ mb: 4 }} label='Last Name' placeholder='Last Name' onChange={e => setLastname(e.target.value)} />
            </Box>

            <TextField fullWidth label='Email' sx={{ mb: 4 }} placeholder='Email' onChange={e => setEmail(e.target.value)} error={!isEmailValid} />
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                id='auth-login-v2-password'
                type={showPassword ? 'text' : 'password'}
                onChange={e => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                    </IconButton>
                  </InputAdornment>
                }
              />

            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-v2-confirm-password'>Confirm Password</InputLabel>
              <OutlinedInput
                label='Confirm Password'
                id='auth-login-v2-confirm-password'
                type={showPassword ? 'text' : 'password'}
                // sx={{ mt: 4 }}
                onChange={e => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                    </IconButton>
                  </InputAdornment>
                }
              />

            </FormControl>

            <Button fullWidth size='large' variant='contained' sx={{ mb: 7, mt: 5 }} onClick={() => submit()}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
              <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                Sign in instead
              </Typography>
            </Box>

          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 image={`/images/pages/auth-v1-register-mask-${theme.palette.mode}.png`} />
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
