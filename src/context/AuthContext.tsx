// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, RegisterParams, RedeemCouponParams, VerifyEmailParams, UpdateUserParams } from './types'
import { LoginRegistrationAPI } from 'src/services/API'
import { sendTokenToExtension } from 'src/services/SendTokenToExtension'
import Swal from 'sweetalert2'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  redeemCoupon: () => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
  resetToken: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [extensionId, setExtensionId] = useState<string | null | undefined>('');
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      let settings = { themeColor: "primary", mode: "semi-dark", skin: "default", direction: "ltr", appBarBlur: true, navCollapsed: false, contentWidth: "boxed", verticalNavToggleType: "accordion" }
      window.localStorage.setItem("settings", JSON.stringify(settings))
      if (window.location.origin == "https://app.seopilot.io") {
        setExtensionId(process.env.NEXT_PUBLIC_EXT_ID)
      } else {
        let extensionIdLocalstorage = window.localStorage.getItem('extensionId')
        if (extensionIdLocalstorage && extensionIdLocalstorage.length > 5) {
          setExtensionId(extensionIdLocalstorage);
        } else {
          Swal.fire({
            html: '<h3>Enter your Extension ID</h3>',
            icon: "info",
            input: 'text',
            inputLabel: 'Chrome Settings > Extensions > Copy SEOPilot Extension ID.',
            inputValue: "",
            // showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            inputValidator: (value) => {
              if (!value) {
                return 'Enter your Extension ID!'

              }
            }
          }).then((res) => {
            if (res?.value?.length > 10) {
              localStorage.setItem("extensionId", res?.value);
              setExtensionId(res?.value);
            }
          })

        }
      }
      const storedToken = window.localStorage.getItem('seo-pilot-token')!
      if (storedToken) {
        setLoading(false)

        let userData = window.localStorage.getItem('userData');
        if (userData) {
          let x = JSON.parse(userData);
          // console.log("userData:", x)
          setUser({ ...x })
        }

        // await axios
        //   .get(authConfig.meEndpoint, {
        //     headers: {
        //       Authorization: storedToken
        //     }
        //   })
        //   .then(async response => {
        //     setLoading(false)
        //     setUser({ ...response.data.userData })
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem('accessToken')
        //     setUser(null)
        //     setLoading(false)
        //     if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //       router.replace('/login')
        //     }
        //   })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    LoginRegistrationAPI.login(params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        response.data.userData.role = "admin"
        setUser({ ...response.data.userData })
        // console.log({ ...response.data })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        sendTokenToExtension(response.data.accessToken, extensionId);
        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        window.location.href = window.location.origin;
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }
  const handleUpdateUser = (params: UpdateUserParams, errorCallback?: ErrCallbackType) => {
    LoginRegistrationAPI.updateUser(params)
      .then(async response => {
        // return
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.userData })
        window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
        sendTokenToExtension(response.data.accessToken, extensionId);
        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        // router.replace(redirectURL as string)
        Swal.fire({
          title: 'Success!',
          text: 'Account info updated.',
          icon: 'success',
          confirmButtonText: 'Ok',
        })

      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }
  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {

    if (params.token) {
      try {
        window.localStorage.setItem(authConfig.storageTokenKeyName, params.token)

        const returnUrl = router.query.returnUrl
        let x: any = params.userData;

        x.role = "admin"
        setUser({ ...x })
        // console.log({ ...response.data })
        window.localStorage.setItem('userData', JSON.stringify(x))
        sendTokenToExtension(params.token, extensionId);
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        // router.replace(redirectURL as string)
        window.location.href = window.location.origin;

      } catch (e: any) {
        if (errorCallback) errorCallback(e)
      }
    }



    //       .catch (err => {
    //   if (errorCallback) errorCallback(err)
    // })
  }
  const handleRedeemCoupon = (params: RedeemCouponParams, errorCallback?: ErrCallbackType) => {
    if (params.coupon) {
      try {

        LoginRegistrationAPI.redeemCouponCode({ coupon: params.coupon }).then(response => {
          if (response.status == 200) {
            console.log(response)
            sendTokenToExtension(response.data.accessToken, extensionId);
            localStorage.setItem("seo-pilot-token", response.data.accessToken);
            window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
            setUser({ ...response.data.userData })

            Swal.fire({
              html: `<h3>Success!</h3>
                <h5>You're upgraded to</h5>
                <h4>Rockethub LTD - Captain</h4> 
                `,
              icon: "success",
              // input: 'text',
              inputLabel: 'Close and reopen your extension to get premium features',
              // inputValue: "",
              // showCancelButton: true,
              // allowOutsideClick: false,
              // allowEscapeKey: false,
            }).then(() => {
              params.setDisable(false);
              params.setLoading(false);
              const redirectURL = router.query.returnUrl && router.query.returnUrl !== '/' ? router.query.returnUrl : '/'

              router.replace(redirectURL as string)

            })
          }
        }).catch(e => {
          params.setDisable(false);
          params.setLoading(false);
          console.log(e);
          Swal.fire({
            html: `<h3>Error</h3>
              <h5>${e.response.data}</h5>
              `,
            icon: "error",
            // input: 'text',
            inputLabel: 'Please try again later.',
            // inputValue: "",
            // showCancelButton: true,
            // allowOutsideClick: false,
            // allowEscapeKey: false,
          })
        })


      } catch (e: any) {
        params.setDisable(false);
        params.setLoading(false);
        if (errorCallback) errorCallback(e)
      }
    }



    //       .catch (err => {
    //   if (errorCallback) errorCallback(err)
    // })
  }
  const handleVerifyEmail = (params: VerifyEmailParams, errorCallback?: ErrCallbackType) => {
    if (params.token) {
      try {
        LoginRegistrationAPI.checkVerification({ token: params.token }).then(res => {
          console.log(res.data.userData)
          if (res.status == 200) {
            // sendTokenToExtension(res.data.accessToken, process.env.NEXT_PUBLIC_EXT_ID);


            Swal.fire({
              title: 'Success!',
              text: 'Registration completed',
              icon: 'success',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
              allowEscapeKey: false,

            }).then(() => {

              localStorage.setItem("seo-pilot-token", res.data.accessToken);
              window.localStorage.setItem('userData', JSON.stringify(res.data.userData))
              setUser({ ...res.data.userData })
              sendTokenToExtension(res.data.accessToken, extensionId);
              window.location.href = window.location.origin
              // router.push("/")
            })
          }
        }).catch(err => {
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: 'Registration failed',
            icon: 'error',
            confirmButtonText: 'Close',
          }).then(res => {
            // router.push('/login')
          })
        })


      } catch (e: any) {

        if (errorCallback) errorCallback(e)
      }
    }



    //       .catch (err => {
    //   if (errorCallback) errorCallback(err)
    // })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)

    chrome?.runtime?.sendMessage(
      extensionId, // Extension ID
      { action: "removeToken" },
      (response) => {
        console.log(response)
        if (response && response.success) {
          console.log("Token stored in extension's local storage.", response);
        } else {
          console.error("Failed to store token in extension.");
        }
      }
    );
    router.push('/login')
  }

  const handleResetToken = () => {
    LoginRegistrationAPI.reloadToken().then((res) => {
      localStorage.setItem("seo-pilot-token", res.data.accessToken);
      // window.localStorage.setItem('userData', JSON.stringify(res.data.userData))
      // setUser({ ...res.data.userData })
      sendTokenToExtension(res.data.accessToken, extensionId);
      window.location.href = window.location.origin
    }).catch((e) => {
      console.log("error:", e)
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    redeemCoupon: handleRedeemCoupon,
    verifyEmail: handleVerifyEmail,
    updateUser: handleUpdateUser,
    resetToken: handleResetToken
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
