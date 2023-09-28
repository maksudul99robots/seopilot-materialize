import { Alert, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useAuth } from "src/hooks/useAuth";
import { LoginRegistrationAPI } from "src/services/API"
import Swal from "sweetalert2"

const Dashboard = () => {
    const auth = useAuth()
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
                    })
                }
            }).catch(e => {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'Close',
                })
            })
        }
    }

    return (
        <div style={{ margin: "0 auto" }}>
            {
                !auth?.user?.is_active &&
                (<Alert severity='warning' sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", }}>
                    Please verify your email to get full access! Didn't receive email? <span onClick={e => resendEmail()} style={{ cursor: "pointer", fontWeight: "bold" }}>Click here</span> to resend email.
                </Alert>)

            }


            <Card sx={{ mb: 10, mt: 25, display: "flex", justifyContent: "center", }}>

                {/* <CardContent> */}
                <Alert variant='filled' severity='info' sx={{ fontSize: "24px", display: "flex", alignItems: "center", width: "100%", justifyContent: "center", padding: "20px" }}>
                    Close the extension and re-open it to get logged in.
                </Alert>
                {/* </CardContent> */}
                {/* <CardActions className='card-action-dense'>
                <Button>Read More</Button>
            </CardActions> */}
            </Card>
        </div>

    )
}
export default Dashboard