import { Box, Button, Card, CardContent, CardHeader, Dialog, Fade, FadeProps, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement, Ref, forwardRef, useEffect, useState } from "react";
import { LoginRegistrationAPI } from "src/services/API";
import { LoadingButton } from '@mui/lab';
import APIKeyInstructions from "src/views/pages/pricing/APIKeyInstructions";
import Icon from "src/@core/components/icon";
import Swal from "sweetalert2";
import { useAuth } from "src/hooks/useAuth";

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

const OpenAiApiKey = (props: any) => {
    const [apikey, setApikey] = useState('');
    const [newApikey, setNewApikey] = useState('');
    const [apikeyTmp, setApikeyTmp] = useState('');
    const [apikeyToShow, setApikeyToShow] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [show, setShow] = useState<boolean>(false)
    const auth = useAuth();
    const router = useRouter()
    const [value, setValue] = useState(0);

    const handleClose = () => {

        setShow(false)
    }

    useEffect(() => {
        LoginRegistrationAPI.getOpenAIAPIKey().then(res => {
            // console.log(res);
            if (res.status == 200)
                setApikey(res.data.apikey)
            // setApikeyToShow(res.data.apikey.substring(0, 10) + "*".repeat(res.data.apikey.length - 15) + res.data.apikey.slice(-5))
        }).catch(e => {
            console.log(e);
        })
    }, [])

    useEffect(() => {

        if (newApikey.length > 5) {
            setDisable(false)
        } else {
            setDisable(true)
        }

    }, [newApikey])

    const submit = async () => {
        if (props.teamObj?.role == 'owner' || props.teamObj?.role == 'admin') {
            if (newApikey.length > 5) {
                setDisable(true)
                setLoading(true)
                LoginRegistrationAPI.verifyOpenAIKey({ api_key: newApikey }).then((responseFronVerification) => {
                    // console.log(responseFronVerification.data)
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
                }).catch(e => {
                    // Swal.fire({
                    //     html: `<h3>Error</h3>
                    //   <h5>${e.response.data}</h5>
                    //   `,
                    //     icon: "error",
                    //     // input: 'text',
                    //     inputLabel: 'Please try again later.',
                    //     confirmButtonColor: "#2979FF"
                    // }).then(() => {
                    //     setDisable(false)
                    //     setLoading(false)
                    // })
                    Swal.fire({
                        title: 'Error',
                        text: e.response.data,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: "#2979FF"
                    }).then(() => {
                        setDisable(false)
                        setLoading(false)
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

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                <Typography variant="h6">
                    OpenAI API Key

                </Typography>
                <Button variant='outlined' onClick={e => {
                    setShow(true)
                }} startIcon={<Icon icon="ph:video-thin" />} >
                    Watch Step-by-Step Instructions
                </Button>
            </Box>
            <Dialog
                fullWidth
                open={show}
                maxWidth='xl'
                sx={{ display: "flex", justifyContent: "center" }}
                onClose={handleClose}
                onBackdropClick={handleClose}
                TransitionComponent={Transition}
            >
                <iframe width="900" height="506" src="https://www.youtube.com/embed/n8AxB_j4naM?si=k_ZZAbvLzi-ivc5k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </Dialog>

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
                        <Typography variant='subtitle2' sx={{ mb: 0, mt: 0, display: "flex", fontSize: "12px" }}>
                            By default this API key will be added for all the workspaces.
                        </Typography>
                        <Typography variant='subtitle2' sx={{ mb: 2, mt: 0, display: "flex", fontSize: "12px" }}>
                            NOTE: You can edit/change the API Key for any individual workspace at any time.
                        </Typography>


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

        </>

    )
}

export default OpenAiApiKey;