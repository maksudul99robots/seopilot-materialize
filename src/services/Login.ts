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

            }
        }
    }
}

