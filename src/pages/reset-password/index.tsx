// ** React Imports
"use client"
import { useState, ChangeEvent, ReactNode, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter, useSearchParams } from "next/navigation";

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import { ValidateEmail } from 'src/services/emailValidation'
import { LoginRegistrationAPI } from 'src/services/API'
import Swal from 'sweetalert2'
import { LoadingButton } from '@mui/lab'
import jwt_decode from "jwt-decode";

interface State {
    newPassword: string
    showNewPassword: boolean
    confirmNewPassword: string
    showConfirmNewPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ResetPassword = () => {

    const paramString = useSearchParams();
    const [email, setEmail] = useState('');
    const [param, setParam] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setconPassword] = useState('');
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [showPass, setShowPass] = useState(false)
    const [showConPass, setShowConPass] = useState(false)

    useEffect(() => {
        let token = paramString.get('token');
        // console.log("token:", token)
        if (token)
            setParam(token)
    }, [paramString.get('token')])
    // ** States
    const [values, setValues] = useState<State>({
        newPassword: '',
        showNewPassword: false,
        confirmNewPassword: '',
        showConfirmNewPassword: false
    })

    // ** Hook
    const theme = useTheme()

    // Handle New Password
    const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }
    const handleClickShowNewPassword = () => {
        setShowPass(!showPass);
    }

    // Handle Confirm New Password
    const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setShowConPass(!showConPass)
    }
    const handleClickShowConfirmNewPassword = () => {
        setShowConPass(!showConPass)
    }


    useEffect(() => {

        // console.log("param:", param)
        if (param) {
            try {
                let decoded: any = jwt_decode(param);
                console.log(decoded)
                setEmail(decoded.email)
            } catch (e) {
                // Swal.fire({
                //     title: 'Error!',
                //     text: 'Invalid Token',
                //     icon: 'error',
                //     confirmButtonText: 'Close',
                // }).then(res => {
                //     router.push('/')
                // })
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid Token',
                    icon: 'error',
                    confirmButtonText: 'Close',
                    confirmButtonColor: "#2979FF",
                }).then(res => {
                    router.push('/')
                })
            }

        }


    }, [param])

    const submit = () => {
        if ((email && email.length > 1)) {

            if (ValidateEmail(email)) {
                if (password.length > 6) {
                    if (password == conPassword) {
                        setDisable(true);
                        setLoading(true);
                        LoginRegistrationAPI.resetPassword({ password: password, email: email }).then(response => {
                            if (response.status == 202) {
                                // dispatch(setAlert({ title: "Success", icon: 'success', text: "Password changed successfully" }))
                                Swal.fire({
                                    title: 'success!',
                                    text: 'Password changed successfully',
                                    icon: 'success',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: "#2979FF"
                                }).then(res => {
                                    router.push('/login')
                                })
                            } else {
                                //   dispatch(setAlert({ title: "Error", icon: 'error', text: "Error occured" }))
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Error occured',
                                    icon: 'error',
                                    confirmButtonText: 'Close',
                                    confirmButtonColor: "#2979FF"
                                })
                            }
                            setDisable(false);
                            setLoading(false);
                        }).catch(e => {
                            // dispatch(setAlert({ title: "Error", icon: 'error', text: "Error occured" }));
                            Swal.fire({
                                title: 'Error!',
                                text: 'Error occured',
                                icon: 'error',
                                confirmButtonText: 'Close',
                                confirmButtonColor: "#2979FF"
                            })
                            setDisable(false);
                            setLoading(false);
                        })
                    } else {
                        //   dispatch(setAlert({ title: "Error", icon: 'error', text: "Password should match." }));
                        Swal.fire({
                            title: 'Error!',
                            text: 'Password should match',
                            icon: 'error',
                            confirmButtonText: 'Close',
                            confirmButtonColor: "#2979FF"
                        })
                    }
                } else {
                    //   dispatch(setAlert({ title: "Error", icon: 'error', text: "Password should be longer than 6." }));
                    Swal.fire({
                        title: 'Error!',
                        text: 'Password should be longer than 6.',
                        icon: 'error',
                        confirmButtonText: 'Close',
                        confirmButtonColor: "#2979FF"
                    })
                }


            }
        }
    }

    return (
        <Box className='content-center'>
            <Card sx={{ zIndex: 1 }}>
                <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
                    <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src='/images/logos/SEOPilotLogo256.png' height={54} />
                    </Box>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
                            Reset Password 🔒
                        </Typography>
                        <Typography variant='body2'>Your new password must be different from previously used passwords</Typography>
                    </Box>
                    <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <InputLabel htmlFor='auth-reset-password-new-password'>New Password</InputLabel>
                            <OutlinedInput
                                autoFocus
                                label='New Password'
                                value={password}
                                id='auth-reset-password-new-password'
                                onChange={e => setPassword(e.target.value)}
                                type={showPass ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                        >
                                            <Icon icon={showPass ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <InputLabel htmlFor='auth-reset-password-confirm-password'>Confirm Password</InputLabel>
                            <OutlinedInput
                                label='Confirm Password'
                                value={conPassword}
                                id='auth-reset-password-confirm-password'
                                type={showConPass ? 'text' : 'password'}
                                onChange={e => setconPassword(e.target.value)}
                                // autoFocus
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowConfirmNewPassword}
                                        >
                                            <Icon icon={showConPass ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <LoadingButton
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            // type="submit"
                            style={{ color: disable ? "#595959" : "white", marginTop: "30px", padding: "10px 35px 10px 35px" }}
                            onClick={() => submit()}
                            disabled={disable}
                            loading={loading}
                            loadingPosition="end"

                        >
                            Set New Password
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
            {/* <FooterIllustrationsV1 image={`/images/pages/auth-v1-reset-password-mask-${theme.palette.mode}.png`} /> */}
        </Box>
    )
}

ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
ResetPassword.guestGuard = true;


export default ResetPassword
