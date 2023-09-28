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
            // dispatch(setAlert({title:"Success", icon:'success', text:"A verification email is sent."}))
            Swal.fire(
              'Success',
              'A verification email is sent.',
              'success'
            ).then(() => {
              auth.register({ token: res.data.accessToken, userData: res.data.userData })
              // let extensionId = process.env.NEXT_PUBLIC_EXT_ID
              // sendTokenToExtension(res.data.accessToken, extensionId);
              // localStorage.setItem("seo-pilot-token", res.data.accessToken);
              // router.push("/")
            })
          }).catch((e) => {
            console.log(e)
            setLoading(false);
            // dispatch(setAlert({ title: "Error", icon: 'error', text: e.response.data }))
            Swal.fire(
              'Error',
              e.response.data,
              'error'
            )
          })

        } else {
          // dispatch(setAlert({ title: "Error", icon: 'error', text: "Password must be at least 7 characters long." }))
          Swal.fire(
            'Error',
            'Password must be at least 7 characters long.',
            'error'
          )
        }
      }
    } else {
      Swal.fire(
        'Error',
        'Email is not valid',
        'error'
      )
      // dispatch(setAlert({ title: "Error", icon: 'error', text: "Email is not valid" }))
    }
  }
  return (
    // <Box className='content-right'>
    //   {!hidden ? (
    //     <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
    //       <RegisterIllustrationWrapper>
    //         <RegisterIllustration
    //           alt='register-illustration'
    //           src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
    //         />
    //       </RegisterIllustrationWrapper>
    //       <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} />
    //     </Box>
    //   ) : null}
    //   <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
    //     <Box
    //       sx={{
    //         p: 7,
    //         height: '100%',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         backgroundColor: 'background.paper'
    //       }}
    //     >
    //       <BoxWrapper>
    //         <Box
    //           sx={{
    //             top: 30,
    //             left: 40,
    //             display: 'flex',
    //             position: 'absolute',
    //             alignItems: 'center',
    //             justifyContent: 'center'
    //           }}
    //         >
    //           <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
    //             <rect
    //               rx='25.1443'
    //               width='50.2886'
    //               height='143.953'
    //               fill={theme.palette.primary.main}
    //               transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
    //             />
    //             <rect
    //               rx='25.1443'
    //               width='50.2886'
    //               height='143.953'
    //               fillOpacity='0.4'
    //               fill='url(#paint0_linear_7821_79167)'
    //               transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
    //             />
    //             <rect
    //               rx='25.1443'
    //               width='50.2886'
    //               height='143.953'
    //               fill={theme.palette.primary.main}
    //               transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
    //             />
    //             <rect
    //               rx='25.1443'
    //               width='50.2886'
    //               height='143.953'
    //               fill={theme.palette.primary.main}
    //               transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
    //             />
    //             <rect
    //               rx='25.1443'
    //               width='50.2886'
    //               height='143.953'
    //               fillOpacity='0.4'
    //               fill='url(#paint1_linear_7821_79167)'
    //               transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
    //             />
    //             <rect
    //               rx='25.1443'
    //               width='50.2886'
    //               height='143.953'
    //               fill={theme.palette.primary.main}
    //               transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
    //             />
    //             <defs>
    //               <linearGradient
    //                 y1='0'
    //                 x1='25.1443'
    //                 x2='25.1443'
    //                 y2='143.953'
    //                 id='paint0_linear_7821_79167'
    //                 gradientUnits='userSpaceOnUse'
    //               >
    //                 <stop />
    //                 <stop offset='1' stopOpacity='0' />
    //               </linearGradient>
    //               <linearGradient
    //                 y1='0'
    //                 x1='25.1443'
    //                 x2='25.1443'
    //                 y2='143.953'
    //                 id='paint1_linear_7821_79167'
    //                 gradientUnits='userSpaceOnUse'
    //               >
    //                 <stop />
    //                 <stop offset='1' stopOpacity='0' />
    //               </linearGradient>
    //             </defs>
    //           </svg>
    //           <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
    //             {themeConfig.templateName}
    //           </Typography>
    //         </Box>
    //         <Box sx={{ mb: 6 }}>
    //           <TypographyStyled variant='h5'>Adventure starts here 🚀</TypographyStyled>
    //           <Typography variant='body2'>Make your app management easy and fun!</Typography>
    //         </Box>
    //         <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
    //           <TextField autoFocus fullWidth sx={{ mb: 4 }} label='Username' placeholder='johndoe' />
    //           <TextField fullWidth label='Email' sx={{ mb: 4 }} placeholder='user@email.com' />
    //           <FormControl fullWidth>
    //             <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
    //             <OutlinedInput
    //               label='Password'
    //               id='auth-login-v2-password'
    //               type={showPassword ? 'text' : 'password'}
    //               endAdornment={
    //                 <InputAdornment position='end'>
    //                   <IconButton
    //                     edge='end'
    //                     onMouseDown={e => e.preventDefault()}
    //                     onClick={() => setShowPassword(!showPassword)}
    //                   >
    //                     <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
    //                   </IconButton>
    //                 </InputAdornment>
    //               }
    //             />
    //           </FormControl>

    //           <FormControlLabel
    //             control={<Checkbox />}
    //             sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
    //             label={
    //               <>
    //                 <Typography variant='body2' component='span'>
    //                   I agree to{' '}
    //                 </Typography>
    //                 <LinkStyled href='/' onClick={e => e.preventDefault()}>
    //                   privacy policy & terms
    //                 </LinkStyled>
    //               </>
    //             }
    //           />
    //           <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
    //             Sign up
    //           </Button>
    //           <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
    //             <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
    //             <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
    //               Sign in instead
    //             </Typography>
    //           </Box>
    //           <Divider
    //             sx={{
    //               '& .MuiDivider-wrapper': { px: 4 },
    //               mt: theme => `${theme.spacing(5)} !important`,
    //               mb: theme => `${theme.spacing(7.5)} !important`
    //             }}
    //           >
    //             or
    //           </Divider>
    //           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //             <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
    //               <Icon icon='mdi:facebook' />
    //             </IconButton>
    //             <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
    //               <Icon icon='mdi:twitter' />
    //             </IconButton>
    //             <IconButton
    //               href='/'
    //               component={Link}
    //               onClick={e => e.preventDefault()}
    //               sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
    //             >
    //               <Icon icon='mdi:github' />
    //             </IconButton>
    //             <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
    //               <Icon icon='mdi:google' />
    //             </IconButton>
    //           </Box>
    //         </form>
    //       </BoxWrapper>
    //     </Box>
    //   </RightWrapper>
    // </Box>

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

            {/* <FormControlLabel
              control={<Checkbox />}
              sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
              label={
                <>
                  <Typography variant='body2' component='span'>
                    I agree to{' '}
                  </Typography>
                  <LinkStyled href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </LinkStyled>
                </>
              }
            /> */}
            <Button fullWidth size='large' variant='contained' sx={{ mb: 7, mt: 5 }} onClick={() => submit()}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
              <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                Sign in instead
              </Typography>
            </Box>
            {/* <Divider
              sx={{
                '& .MuiDivider-wrapper': { px: 4 },
                mt: theme => `${theme.spacing(5)} !important`,
                mb: theme => `${theme.spacing(7.5)} !important`
              }}
            >
              or
            </Divider> */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                <Icon icon='mdi:facebook' />
              </IconButton>
              <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                <Icon icon='mdi:twitter' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                onClick={e => e.preventDefault()}
                sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
              >
                <Icon icon='mdi:github' />
              </IconButton>
              <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                <Icon icon='mdi:google' />
              </IconButton>
            </Box> */}
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
