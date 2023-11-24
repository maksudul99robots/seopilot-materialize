"use client";

import { Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RedeemCouponCode } from "src/services/RedeemCoupon";

// components
// import { Alert, Box, TextField, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import jwt_decode from "jwt-decode";
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { LoginRegistrationAPI } from "src/services/API";
import { LoadingButton } from '@mui/lab';
import { useAuth } from "src/hooks/useAuth";
import LTDPlan from "src/views/pages/pricing/LTDplan";

interface State {
    password: string
    showPassword: boolean
}
interface State {
    password: string
    showPassword: boolean
}

const RedeemCoupon = () => {
    const router = useRouter();
    const [extensionId, setExtensionId] = useState<string | null | undefined>('')
    const [coupon, setCoupon] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const auth = useAuth()
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })
    const [confirmPassValues, setConfirmPassValues] = useState<State>({
        password: '',
        showPassword: false
    })


    useEffect(() => {

        if (coupon.length > 5) {
            setDisable(false)
        }

    }, [coupon])
    // useEffect(() => {

    //     console.log("auth?.user?.plan:", auth?.user?.plan)

    // }, [auth?.user])

    const submit = async () => {
        if (coupon.length > 5) {
            setDisable(true)
            setLoading(true)
            auth.redeemCoupon({
                coupon: coupon, setDisable: setDisable, setLoading: setLoading
            }, (e) => {
                console.log(e);
            })
        }


    }

    return (
        // <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        //     <DashboardCard title="Redeem Coupon Code" isActionButton={false} >
        //         <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto', ".MuiDataGrid-columnHeader:focus": "outline:0" } }}>

        //             <Box>
        //                 <Typography
        //                     variant="subtitle1"
        //                     fontWeight={600}
        //                     component="label"
        //                     htmlFor="email"
        //                     mb="5px"
        //                     aria-required
        //                 >
        //                     Enter your coupon code to redeem Life Time Deal (LTD).
        //                 </Typography>
        //             </Box>
        //             <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: "5% 0% 2% 0%" }}>
        //                 <Typography
        //                     variant="subtitle1"
        //                     fontWeight={600}
        //                     component="label"
        //                     htmlFor="email"
        //                     mb="5px"
        //                     aria-required
        //                     sx={{ width: "30%" }}
        //                 >
        //                     Coupon Code
        //                 </Typography>
        //                 <Box sx={{ width: "70%" }}>
        //                     <TextField
        //                         id="outlined-multiline-static"
        //                         multiline
        //                         rows={1}
        //                         variant="outlined"
        //                         fullWidth
        //                         onChange={e => { setCoupon(e.target.value) }}
        //                     />
        //                 </Box>
        //             </Box>
        //             <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", padding: "5% 0% 2% 0%" }}>
        //                 <LoadingButton
        //                     color="primary"
        //                     variant="contained"
        //                     size="large"
        //                     // fullWidth
        //                     type="submit"
        //                     style={{ color: loading ? "#595959" : "white" }}
        //                     onClick={() => submit()}
        //                     disabled={loading}
        //                     loading={loading}
        //                     loadingPosition="end"
        //                 >
        //                     Submit
        //                 </LoadingButton>
        //             </Box>
        //         </Box>
        //     </DashboardCard>
        // </Box>
        <>
            <LTDPlan plan={auth?.user?.plan} />
            <Card>

                <CardHeader title='Redeem Coupon code for LTD plan' />
                <CardContent>

                    <form >

                        <Grid container spacing={5}>
                            <Typography variant='subtitle1' sx={{ mb: 2, pl: 5, mt: 10 }}>
                                Enter your coupon code to redeem Life Time Deal (LTD).
                            </Typography>
                            <Grid item xs={12}>
                                <TextField fullWidth label='Coupon code' placeholder='Coupon code' onChange={e => setCoupon(e.target.value)} />
                            </Grid>

                        </Grid>
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            size="large"
                            type="submit"
                            style={{ color: disable ? "#595959" : "white", marginTop: "30px", padding: "10px 35px 10px 35px" }}
                            onClick={() => submit()}
                            disabled={disable}
                            loading={loading}
                            loadingPosition="end"

                        >
                            Submit
                        </LoadingButton>
                    </form>

                </CardContent>
            </Card>
        </>

    );
};
export default RedeemCoupon;


