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
import { LoginRegistrationAPI } from "src/services/API";
import { LoadingButton } from '@mui/lab';
import APIKeyInstructions from "src/views/pages/pricing/APIKeyInstructions";
import { useAuth } from "src/hooks/useAuth";

interface State {
    password: string
    showPassword: boolean
}
interface State {
    password: string
    showPassword: boolean
}

const AddApiKey = () => {
    const [apikey, setApikey] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        LoginRegistrationAPI.getOpenAIAPIKey().then(res => {
            console.log(res);
            if (res.status == 200)
                setApikey(res.data.apikey)
        }).catch(e => {
            console.log(e);
        })
    }, [])
    useEffect(() => {

        if (apikey.length > 5) {
            setDisable(false)
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
                })
            })

        }


    }

    return (
        <>

            <Card>
                <CardHeader title='OpenAI API Key' />
                <CardContent>
                    <APIKeyInstructions />
                    <form >

                        <Grid container spacing={5}>
                            <Typography variant='subtitle1' sx={{ mb: 2, pl: 5, mt: 10 }}>
                                Please Enter your API Key:
                            </Typography>
                            <Grid item xs={12}>
                                <TextField fullWidth label='Open-AI API Key' value={apikey} placeholder='Open-AI API Key' onChange={e => setApikey(e.target.value)} />
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
export default AddApiKey;


