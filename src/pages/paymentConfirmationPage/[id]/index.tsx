import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import { LoginRegistrationAPI } from 'src/services/API'

const PaymentConfirmationPage = () => {
    const router = useRouter()
    const [isSent, setIsSent] = useState(false)
    const auth = useAuth()
    useEffect(() => {
        // // console.log()
        if (router.query.id && !isSent) {
            setIsSent(true)
            LoginRegistrationAPI.completeCalculation({ token: router.query.id }).then((result) => {
                // console.log("result:", result)
                LoginRegistrationAPI.updateUser({}).then(res => {
                    console.log("res:", res)
                    auth.setUserDataWithToken(res)
                }).catch(e => {

                })

                // router.push("/")
            }).catch((e) => {
                console.log(e)

            })
        }
        return () => {
            // console.log("unmounting")
        };
    }, [router.query.id])
    return (
        <div style={{ display: "flex", alignItems: "center", height: "100%", width: "100%", justifyContent: "center" }}>
            <div>
                <Typography sx={{ textAlign: "center" }} variant='h5'>Verifying</Typography>
                <Typography sx={{ textAlign: "center", display: "flex", alignItems: "center", mt: 5 }}>Please Wait <Icon icon="line-md:loading-twotone-loop" style={{ marginLeft: "5px" }}></Icon></Typography>
            </div>

        </div>
    )
}

export default PaymentConfirmationPage;