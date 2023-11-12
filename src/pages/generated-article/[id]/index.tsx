import { Box, Button, Card, Typography } from '@mui/material'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect, useState } from 'react';
import Icon from 'src/@core/components/icon';
import ArticleIU from './ArticleUI';
import { LoginRegistrationAPI } from 'src/services/API';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import Outlines from './Outlines';
const steps = [
    'Researching Keywords',
    'Web Researching',
    'Creating Outline',
    'Generating Article',
    'Optimizing Output'
];

export default function Page() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showArticleEditor, setShowArticleEditor] = useState(false);
    const [article, setArticle] = useState('');
    const [outlines, setOutlines] = useState('');
    const [callTracker, setCallTracker] = useState(false);
    const [showOutlines, setShowOutlines] = useState(false);

    const router = useRouter()

    useEffect(() => {
        if (router.query.id)
            setCallTracker(true)
    }, [router.query.id])
    useEffect(() => {
        if (router.query.id) {
            LoginRegistrationAPI.getSaasArticle({ id: router.query.id }).then(async (res) => {
                if (res.status == 210) {
                    setCurrentStep(2);
                } else if (res.status == 211) {
                    // setCurrentStep(3);
                    setOutlines(res?.data.outline ? res.data.outline : '')
                    setShowOutlines(true)
                } else if (res.status == 212) {
                    setCurrentStep(5);
                    setTimeout(function () {   //  call a 3s setTimeout when the loop is called
                        setShowArticleEditor(true);               //  ..  setTimeout()
                        console.log("inside interval cancel 212")

                        setArticle(res?.data.content ? res.data.content : '')
                        setOutlines(res?.data.outline ? res.data.outline : '')
                    }, 3000)
                } else {

                }
            }).catch(e => {
                console.log(e);
            })
        }
        let counter = 0;
        if (callTracker) {
            let interval = setInterval(async () => {
                counter = counter + 15000;
                if (counter < 1200000) {
                    await LoginRegistrationAPI.getSaasArticle({ id: router.query.id }).then(async (res) => {

                        if (res.status == 210) {
                            setCurrentStep(2);
                        } else if (res.status == 211) {
                            setCurrentStep(3);
                            // setTimeout(function () {   //  call a 3s setTimeout when the loop is called
                            //     setShowArticleEditor(true);               //  ..  setTimeout()
                            //     clearInterval(interval)
                            //     setArticle(res?.data.content ? res.data.content : '')
                            // }, 3000)
                        } else if (res.status == 212) {
                            setCurrentStep(5);
                            setTimeout(function () {   //  call a 3s setTimeout when the loop is called
                                setShowArticleEditor(true);               //  ..  setTimeout()
                                clearInterval(interval)
                                console.log("inside interval cancel 212")

                                setArticle(res?.data.content ? res.data.content : '')
                                setOutlines(res?.data.outline ? res.data.outline : '')
                            }, 3000)
                        } else {
                            console.log("inside interval cancel 400")
                            Swal.fire({
                                html: '<h3>Invalid Article ID</h3>',
                                icon: "error",
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                            }).then((res) => {
                                clearInterval(interval)
                                router.push("/create-article")
                            })
                        }
                    }).catch(e => {
                        console.log(e);
                    })
                }


            }, 15000)
        }

        if (counter > 1200000) {
            LoginRegistrationAPI.setStatusToError({ id: router.query.id }).then((res) => {
                Swal.fire({
                    html: '<h3>Unfortunately ChatGPT API is having some trouble.</h3>',
                    icon: "error",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((res) => {
                    router.push("/create-article")
                })
            }).catch(e => {

            })
        }

    }, [callTracker])
    const editOutline = () => {

    }
    return (
        <>
            {
                showArticleEditor ?
                    <ArticleIU article={article} outlines={outlines} />
                    :
                    <Card sx={{ padding: "20px" }}>
                        <Box sx={{ mb: 9, mt: 10, textAlign: 'center' }}>
                            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                                Creating Your Article...
                            </Typography>
                            <Typography variant='body2'>It may take 5-10 minutes. You can leave this page anytime. Article generation will continue in background.</Typography>
                        </Box>
                        <Stepper activeStep={currentStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {
                            showOutlines ?
                                <>
                                    <Outlines outlines={outlines} />
                                    <Button variant='contained' size="large" sx={{ mr: 3, ml: 3, pt: 3, pb: 3, pl: 4, pr: 4 }} onClick={() => editOutline()} endIcon={<Icon icon="solar:arrow-right-outline" />
                                    }>
                                        Continue
                                    </Button>
                                </>
                                :
                                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                    <Icon icon="eos-icons:three-dots-loading" fontSize={80} color='#2979FF' />
                                </Box>
                        }

                    </Card>
            }
        </>



    )

}