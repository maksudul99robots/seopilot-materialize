// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import { ValidateEmail } from 'src/services/emailValidation'
import { LoadingButton } from '@mui/lab'
import { LoginRegistrationAPI } from 'src/services/API'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'



const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  // ** Styled Components
  const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: 450 }
  }))

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if (email.length > 1) {
      if (ValidateEmail(email)) {
        setIsEmailValid(true)
        setDisable(false)
      } else {
        setIsEmailValid(false)
        setDisable(true)
      }

    }


  }, [email])

  const submit = () => {
    if ((email && email.length > 1)) {

      if (isEmailValid) {
        setLoading(true);
        setDisable(true)
        LoginRegistrationAPI.sendForgotPasswordEmail({ email: email }).then(response => {
          if (response.status == 201) {
            Swal.fire({
              html: `<h3>Please Check your email.</h3>`,
              icon: "success",
              // input: 'text',
              // inputLabel: 'Close and reopen your extension to get premium features',
              // inputValue: "",
              // showCancelButton: true,
              // allowOutsideClick: false,
              // allowEscapeKey: false,
              confirmButtonColor: "#2979FF"
            }).then(() => {
              setDisable(false);
              setLoading(false);
              const redirectURL = router.query.returnUrl && router.query.returnUrl !== '/' ? router.query.returnUrl : '/'

              router.replace(redirectURL as string)

            })
          } else {
            Swal.fire({
              html: `<h3>Error occured</h3>`,
              icon: "error",
              // input: 'text',
              // inputLabel: 'Close and reopen your extension to get premium features',
              // inputValue: "",
              // showCancelButton: true,
              // allowOutsideClick: false,
              // allowEscapeKey: false,
              confirmButtonColor: "#2979FF"
            }).then(() => {
              setDisable(false);
              setLoading(false);
              const redirectURL = router.query.returnUrl && router.query.returnUrl !== '/' ? router.query.returnUrl : '/'

              router.replace(redirectURL as string)

            })
            // dispatch(setAlert({title:"Error", icon:'error', text:"Error occured"}))
          }
          setLoading(false);
          setDisable(false)
        }).catch(e => {
          // dispatch(setAlert({title:"Error", icon:'error', text:e.message}))
          Swal.fire({
            html: `<h3>${e.message}</h3>`,
            icon: "error",
            // input: 'text',
            // inputLabel: 'Close and reopen your extension to get premium features',
            // inputValue: "",
            // showCancelButton: true,
            // allowOutsideClick: false,
            // allowEscapeKey: false,
            confirmButtonColor: "#2979FF"
          }).then(() => {
            setDisable(false);
            setLoading(false);
            const redirectURL = router.query.returnUrl && router.query.returnUrl !== '/' ? router.query.returnUrl : '/'

            router.replace(redirectURL as string)

          })
          setLoading(false);
          setDisable(false)
        })
      }
    }
  }

  return (
    // <Box className='content-right'>
    //   {!hidden ? (
    //     <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
    //       <ForgotPasswordIllustrationWrapper>
    //         <ForgotPasswordIllustration
    //           alt='forgot-password-illustration'
    //           src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
    //         />
    //       </ForgotPasswordIllustrationWrapper>
    //       <FooterIllustrationsV2 image={`/images/pages/auth-v2-forgot-password-mask-${theme.palette.mode}.png`} />
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
    //           <TypographyStyled variant='h5'>Forgot Password? 🔒</TypographyStyled>
    //           <Typography variant='body2'>
    //             Enter your email and we&prime;ll send you instructions to reset your password
    //           </Typography>
    //         </Box>
    //         <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
    //           <TextField autoFocus type='email' label='Email' sx={{ display: 'flex', mb: 4 }} />
    //           <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
    //             Send reset link
    //           </Button>
    //           <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //             <LinkStyled href='/login'>
    //               <Icon icon='mdi:chevron-left' fontSize='2rem' />
    //               <span>Back to login</span>
    //             </LinkStyled>
    //           </Typography>
    //         </form>
    //       </BoxWrapper>
    //     </Box>
    //   </RightWrapper>
    // </Box>

    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logos/SEOPilotLogo256.png' height={54} />
          </Box>
          <Box sx={{ mb: 6.5 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              Forgot Password? 🔒
            </Typography>
            <Typography variant='body2'>
              Enter your email and we&prime;ll send you instructions to reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete='off'>
            {/* <Box sx={{ display: "flex" }}> */}
            <TextField key="sdfhjsadhfjhsd" fullWidth autoFocus sx={{ mb: 4, mr: 2 }} label='Email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            {/* <TextField autoFocus sx={{ mb: 4 }} label='Last Name' placeholder='Last Name' onChange={e => setLastname(e.target.value)} /> */}
            {/* </Box> */}

            {/* <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
              Send reset link
            </Button> */}

            <LoadingButton
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              // type="submit"
              style={{ color: (!isEmailValid && disable) ? "#595959" : "white", marginTop: "30px", padding: "10px 35px 10px 35px" }}
              onClick={() => submit()}
              disabled={!isEmailValid && disable}
              loading={loading}
              loadingPosition="end"

            >
              Send Verification Code
            </LoadingButton>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                component={Link}
                href='/login'
                sx={{
                  display: 'flex',
                  '& svg': { mr: 1.5 },
                  alignItems: 'center',
                  color: 'primary.main',
                  textDecoration: 'none',
                  justifyContent: 'center'
                }}
              >
                <Icon icon='mdi:chevron-left' fontSize='2rem' />
                <span>Back to login</span>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 image={`/images/pages/auth-v1-forgot-password-mask-${theme.palette.mode}.png`} />
    </Box>
  )
}

ForgotPassword.guestGuard = true
ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
