"use client";

import { Box, Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material";
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
import { LoginRegistrationAPI } from "src/services/API";
import { LoadingButton } from '@mui/lab';
import APIKeyInstructions from "src/views/pages/pricing/APIKeyInstructions";
import { useAuth } from "src/hooks/useAuth";
import Icon from "src/@core/components/icon";

interface State {
    password: string
    showPassword: boolean
}
interface State {
    password: string
    showPassword: boolean
}
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const AddApiKey = () => {
    const [apikey, setApikey] = useState('');
    const [newApikey, setNewApikey] = useState('');
    const [apikeyTmp, setApikeyTmp] = useState('');
    const [apikeyToShow, setApikeyToShow] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [teamObj, setTeamObj] = useState<any>(null);
    const auth = useAuth();
    const router = useRouter()
    // const formattedString = originalString.substring(0, 10) + "*".repeat(originalString.length - 15) + originalString.slice(-5);
    useEffect(() => {
        if (auth.user?.is_active) {
            LoginRegistrationAPI.getOpenAIAPIKey().then(res => {
                // console.log(res);
                if (res.status == 200)
                    setApikey(res.data.apikey)
                // setApikeyToShow(res.data.apikey.substring(0, 10) + "*".repeat(res.data.apikey.length - 15) + res.data.apikey.slice(-5))
            }).catch(e => {
                console.log(e);
            })

            LoginRegistrationAPI.getMyTeamObject({}).then(res => {
                setTeamObj(res.data);
            }).catch(e => {
                console.log(e)
            })
        } else {
            Swal.fire({
                title: 'Check Your Email',
                text: 'Please Verify Your Account To get Full Access!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: "#2979FF"
            })
            // router.push('/')
        }

    }, [])
    useEffect(() => {

        if (newApikey.length > 5) {
            setDisable(false)
        } else {
            setDisable(true)
        }

    }, [newApikey])

    const submit = async () => {
        if (teamObj?.role == 'owner' || teamObj?.role == 'admin') {
            if (newApikey.length > 5) {
                setDisable(true)
                setLoading(true)
                LoginRegistrationAPI.addOpenAIApiKey({ openai_apikey: newApikey }).then((res) => {
                    if (res.status == 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'OpenAI API Key is added Successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: "#2979FF"
                        })
                        auth.resetToken({});

                    }
                    setDisable(false)
                    setLoading(false)
                }).catch(e => {
                    console.log(e);
                    setDisable(false)
                    setLoading(false)
                    Swal.fire({
                        html: `<h2>Error</h2>
                      <h5>${e.response.data.message}</h5>
                      `,
                        icon: "error",
                        // input: 'text',
                        // inputLabel: 'Please try again later.',
                        confirmButtonColor: "#2979FF"
                    })
                })

            }
        } else {
            Swal.fire({
                html: `<h3>Error</h3>
              <h5>You Don't Have Permission to Change OpenAI API Key.</h5>
              `,
                icon: "error",
                // input: 'text',
                inputLabel: 'Please try again later.',
                confirmButtonColor: "#2979FF"
            })
        }



    }
    const [iconColor, setIconColor] = useState('#999999')

    return (
        <>

            <Card>
                <CardHeader title='OpenAI API Key' />
                <CardContent>
                    <APIKeyInstructions />
                    <form>

                        <Grid sx={{ width: "100%", padding: "0px" }}>

                            {
                                apikey &&
                                <Typography variant='subtitle1' sx={{ mb: 2, mt: 10, display: "flex" }}>
                                    Your API Key: &nbsp;<strong style={{ backgroundColor: "#ECECEF", color: "#0C0C0D" }}>{apikey}</strong>
                                </Typography>
                            }

                            <Typography variant='subtitle1' sx={{ mb: 2, mt: 5, display: "flex" }}>
                                Please Enter your API Key:
                            </Typography>
                            <Box sx={{ alignItems: "center", width: "100%" }}>
                                <Grid item xs={11} >
                                    <TextField fullWidth label='Open-AI API Key' value={newApikey} placeholder={apikey} onChange={e => { setNewApikey(e.target.value); }} />
                                </Grid>


                            </Box>



                        </Grid>
                        <LoadingButton
                            color="primary"
                            variant="contained"
                            size="large"
                            // type="submit"
                            style={{ marginTop: "30px", padding: "10px 35px 10px 35px" }}
                            onClick={() => submit()}
                            disabled={disable}
                            loading={loading}
                            loadingPosition="end"

                        >
                            Submit
                        </LoadingButton>
                    </form>

                </CardContent>
            </Card >
        </>

    );
};
export default AddApiKey;


