"use client";

import { Box, Button, Card, CardContent, CardHeader, Dialog, Fade, FadeProps, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement, Ref, forwardRef, useEffect, useState } from "react";
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
import ReactPlayer from "react-player";
import { width } from "@mui/system";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OpenAiApiKey from "./OpenAiApiKey";
import ClaudeAiApiKey from "./ClaudeAiApiKey";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


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

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

const AddApiKey = () => {
    const [apikey, setApikey] = useState('');
    const [newApikey, setNewApikey] = useState('');
    const [apikeyTmp, setApikeyTmp] = useState('');
    const [apikeyToShow, setApikeyToShow] = useState('');
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [teamObj, setTeamObj] = useState<any>(null);
    const [show, setShow] = useState<boolean>(false)
    const auth = useAuth();
    const router = useRouter()
    const [value, setValue] = useState(0);
    const [claudeApikey, setNewClaudeApikey] = useState('')
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
    const [iconColor, setIconColor] = useState('#999999')
    const handleClose = () => {

        setShow(false)
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            // sx: 'font-size:12px',
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                style={{ padding: "0px !important;" }}
                {...other}
            >
                {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
            </div>
        );
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // if (auth?.user?.workspace_owner_info?.plan?.plan == "yearly - captain" ||
        //     auth?.user?.workspace_owner_info?.plan?.plan == "monthly - captain" ||
        //     auth?.user?.workspace_owner_info?.plan?.plan == "captain"
        // ) {
        setValue(newValue);
        // } else {
        //     Swal.fire({
        //         title: '',
        //         html: '<p>Please Upgrade to <strong>CAPTAIN</strong> plan to add your GSC integration</p>',
        //         icon: 'warning',
        //         confirmButtonText: 'OK',
        //         confirmButtonColor: "#2979FF",
        //         showCancelButton: true,
        //         cancelButtonText: 'CANCEL',
        //         cancelButtonColor: "#ccc"
        //     }).then((res) => {
        //         if (res.isConfirmed) {
        //             router.push("/plans")
        //         }
        //         // console.log(res)
        //     })
        // }

    };

    return (
        <>


            <Card sx={{ width: '100%', }}>
                {/* <Typography variant='body1'>Keywords</Typography> */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Open AI API Key" {...a11yProps(0)} sx={{}} />
                        {/* <LightTooltip title={
                            <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>

                                Google Search Console is a powerful tool for enhancing your SEO strategy. It helps you optimize internal linking, analyze keywords, and find better keyword suggestions. Using GSC with SEO Pilot will ensure your articles are perfectly optimized for search engines.
                            </p>
                        } placement="top"> */}
                        <Tab label="Claude AI API Key" {...a11yProps(1)} sx={{}} />
                        {/* </LightTooltip > */}

                        {/* <Tab label="PAA" {...a11yProps(2)} sx={{ fontSize: "12px !important;", padding: "0px" }} /> */}
                        {/* <Tab label="Item Three" {...a11yProps(2)} sx={{ fontSize: "12px !important;" }} /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <OpenAiApiKey teamObj={teamObj} apikey={apikey} setNewApikey={setNewApikey} newApikey={newApikey} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ClaudeAiApiKey teamObj={teamObj} />
                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={2}>
                <PAA paa={props.paa} />
            </CustomTabPanel> */}
            </Card>



        </>

    );
};
export default AddApiKey;


