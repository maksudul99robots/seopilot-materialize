import { Alert, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { LoginRegistrationAPI } from "src/services/API"
import Swal from "sweetalert2"
import CreateArticle from "../create-article";

const Dashboard = () => {
    const auth = useAuth();
    const [userData, setUserData] = useState<any>(auth.user)
    const [email, setEmail] = useState(auth?.user?.email ? auth?.user?.email : '');

    const resendEmail = () => {
        if (email.length > 4) {
            LoginRegistrationAPI.resendVerificationEmail({ email }).then((res) => {
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Sent!',
                        text: 'A Verification email is sent',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: "#2979FF"
                    })
                }
            }).catch(e => {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'Close',
                    confirmButtonColor: "#2979FF"
                })
            })
        }
    }

    useEffect(() => {
        if (userData?.last_login) {
            console.log(new Date(userData?.last_login) < new Date('2023-11-26T11:11:18.360Z'), userData?.last_login, new Date(userData?.last_login), new Date('2023-11-26T11:11:18.360Z'))
            if (new Date(userData?.last_login) < new Date('2023-11-26T11:11:18.360Z')) {
                auth.logout()
            }
        } else {
            console.log("else!!!!!!!")
        }


    })

    return (
        <div style={{ margin: "0 auto" }}>
            {
                !auth?.user?.is_active &&
                (<Alert severity='warning' sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "20px" }}>
                    Please verify your email to get full access! Didn't receive email? <span onClick={e => resendEmail()} style={{ cursor: "pointer", fontWeight: "bold" }}>Click here</span> to resend email.
                </Alert>)

            }


            {/* <Card sx={{ mb: 10, mt: 25, display: "flex", justifyContent: "center", }}>

                <Alert variant='filled' severity='info' sx={{ fontSize: "24px", display: "flex", alignItems: "center", width: "100%", justifyContent: "center", padding: "20px", textAlign: "center" }}>
                    <span style={{ fontSize: "26px", fontWeight: "600" }}>Thanks for registering and logging into our app.</span>  <br></br><br></br>If you don't see the features included in your plan enabled inside the extension, you may need to close any existing extension windows and reopen them to enable those features on the selected page.
                </Alert>

            </Card> */}
            <CreateArticle />
        </div>

    )
}
export default Dashboard