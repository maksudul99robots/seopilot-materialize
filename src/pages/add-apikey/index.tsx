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
    const [apikeyTmp, setApikeyTmp] = useState('');
    const [apikeyToShow, setApikeyToShow] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
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
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Please Verify Your Account To get Full Access!',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: "#2979FF"
            })
            // router.push('/')
        }

    }, [])
    useEffect(() => {

        if (apikey.length > 5 && isEditable) {
            setDisable(false)
        } else {
            setDisable(true)
        }

    }, [apikey])

    const submit = async () => {
        if (apikey.length > 5) {
            setDisable(true)
            setLoading(true)
            LoginRegistrationAPI.addOpenAIApiKey({ openai_apikey: apikey }).then((res) => {
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'OpenAI API Key is added Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
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
                    html: `<h3>Error</h3>
                      <h5>${e.response.data.message}</h5>
                      `,
                    icon: "error",
                    // input: 'text',
                    inputLabel: 'Please try again later.',
                    confirmButtonColor: "#2979FF"
                })
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
                    <form >

                        <Grid container spacing={5} >


                            <Typography variant='subtitle1' sx={{ mb: 2, pl: 5, mt: 10, display: "flex" }}>
                                Please Enter your API Key:
                                <LightTooltip title={
                                    <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                        Click on Edit Icon to Enable the Input Field
                                    </p>
                                } placement="top">
                                    <div style={{ height: "100%" }}>
                                        <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                                    </div>
                                </LightTooltip>
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <Grid item xs={11} sx={{ paddingLeft: "20px" }}>
                                    <TextField fullWidth label='Open-AI API Key' value={apikey} placeholder='Open-AI API Key' onChange={e => { setApikey(e.target.value); }} disabled={!isEditable} />
                                </Grid>
                                <Grid item xs={1} sx={{ paddingLeft: "20px" }} >
                                    <Tooltip title={<p style={{ color: "white", fontSize: "15px" }}>Edit API Key</p>} placement="top-start">
                                        {/* <Button>top</Button> */}
                                        <div>
                                            <Icon icon="akar-icons:edit" color={iconColor} onMouseOver={e => setIconColor("#2979FF")} onMouseOut={e => setIconColor("#999999")} cursor="pointer" fontSize={40} xlinkTitle="Edit"
                                                onClick={e => {
                                                    if (!isEditable) {
                                                        // setApikeyToShow(apikey)
                                                        setIsEditable(true)
                                                        setApikeyTmp(apikey)
                                                        setApikey('')
                                                    } else {
                                                        setIsEditable(false)
                                                        setApikey(apikeyTmp)
                                                        // setApikeyToShow(apikey.substring(0, 10) + "*".repeat(apikey.length - 15) + apikey.slice(-5))
                                                    }
                                                }} />
                                        </div>

                                    </Tooltip>

                                </Grid>

                            </Box>



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
export default AddApiKey;


