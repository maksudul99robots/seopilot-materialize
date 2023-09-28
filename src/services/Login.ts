import Swal from "sweetalert2"
export const Login = (extensionId: string, email: string, password: string, setLoading: any, router: any, auth: any, setError: any, rememberMe: any) => {


    if (extensionId && extensionId.length > 1) {
        if ((email && email.length > 1)) {

            if (password && password.length < 7) {
                // dispatch(setAlert({ title: "Error", icon: 'error', text: "Password must be at least 6 characters long." }))
                Swal.fire({
                    title: 'Error!',
                    text: 'Password should be at least 7 characters long.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                })
            }
            else {

                auth.login({ email, password, rememberMe }, () => {
                    setError('email', {
                        type: 'manual',
                        message: 'Email or Password is invalid'
                    })
                })


                // setLoading(true)
                // LoginRegistrationAPI.login({ email, password }).then((res) => {
                //     console.log("res:", res.data)
                //     if (res.status == 200) {
                //         setLoading(false)
                //         sendTokenToExtension(res.data.accessToken, extensionId);
                //         localStorage.setItem("seo-pilot-token", res.data.accessToken);
                //         // res.data.userData.role = 'admin'
                //         // res.data.userData.username = 'admin'
                //         // res.data.userData.fullName = 'admin'
                //         // res.data.userData.avatar = 'admin'
                //         localStorage.setItem("userData", JSON.stringify(res.data.userData));
                //         // setUserValue(res.data.accessToken)
                //         router.push('/')
                //     }
                // }).catch((error) => {
                //     console.log("error:", error)
                //     setLoading(false)
                //     // dispatch(setAlert({ title: "Error", icon: 'error', text: error?.response?.data }))
                //     Swal.fire({
                //         title: 'Error',
                //         text: error?.response?.data,
                //         icon: 'error',
                //         confirmButtonText: 'Close',
                //     })
                // })

            }
        }
    }
}

