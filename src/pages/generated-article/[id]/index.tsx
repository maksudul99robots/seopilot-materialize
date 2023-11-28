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
import { getDateTime } from 'src/services/DateTimeFormatter';
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
    const [articleTopic, setArticleTopic] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [outlines, setOutlines] = useState('');
    const [callTracker, setCallTracker] = useState(false);
    const [showOutlines, setShowOutlines] = useState(false);
    const [html, setHtml] = useState<string>('');
    const [plainText, setPlainText] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const router = useRouter()

    useEffect(() => {
        if (router.query.id)
            setCallTracker(true)
    }, [router.query.id])
    useEffect(() => {
        // console.log("outlines:", outlines)
    }, [outlines])
    useEffect(() => {
        if (router.query.id) {
            LoginRegistrationAPI.getSaasArticle({ id: router.query.id }).then(async (res) => {
                // console.log("res:", res.data)
                if (res.status == 210) {
                    setCurrentStep(2);
                } else if (res.status == 211) {

                    setTimeout(() => {
                        setCurrentStep(3);;
                    }, 1000)

                    // setOutlines(res?.data.outline ? res.data.outline : '')
                    if (res.data.article_length == "long") {
                        let outlineFromResp = res?.data.outline;
                        try {
                            outlineFromResp = outlineFromResp.replace(/,(?=\s*[\]}])/, '');
                            outlineFromResp = JSON.parse(outlineFromResp);
                            let x = '';
                            outlineFromResp((o: any, i: any) => {
                                x = x + o;
                                if (i == outlineFromResp.length - 1) {
                                    setOutlines(x);
                                }
                            })
                        } catch (e) {
                            console.log("e:", e)
                        }
                    } else {
                        setOutlines(res?.data.outline ? res.data.outline : '')
                    }
                    setShowOutlines(true)
                } else if (res.status == 212) {
                    // console.log("returned value:", res.data)
                    setCurrentStep(5);
                    setTimeout(function () {   //  call a 3s setTimeout when the loop is called
                        setShowArticleEditor(true);               //  ..  setTimeout()
                        // console.log("inside interval cancel 212")

                        /////

                        if (res.data.article_length == "long") {
                            let outlineFromResp = res?.data.outline;
                            try {
                                outlineFromResp = outlineFromResp.replace(/,(?=\s*[\]}])/, '');
                                outlineFromResp = JSON.parse(outlineFromResp);
                                let x = '';
                                outlineFromResp.map((o: any, i: any) => {
                                    x = x + o;
                                    if (i == outlineFromResp.length - 1) {
                                        setOutlines(x);
                                    }
                                })
                            } catch (e) {
                                console.log("e:", e)
                            }
                        } else {
                            setOutlines(res?.data.outline ? res.data.outline : '')
                        }

                        /////
                        var outputString = res?.data?.content.replace('<article>', '');
                        var outputString1 = outputString.replace('</article>', '');
                        setArticle(res?.data.content ? outputString1 : '')
                        setArticleTopic(res?.data?.topic)
                        setCreatedAt(res?.data?.createdAt)
                        setUpdatedAt(res?.data?.updatedAt)
                        // setOutlines(res?.data.outline ? res.data.outline : '')
                    }, 1000)
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

                                // setArticle(res?.data.content ? res.data.content : '')
                                // setOutlines(res?.data.outline ? res.data.outline : '')
                                var outputString = res?.data?.content.replace('<article>', '');
                                var outputString1 = outputString.replace('</article>', '');
                                setArticle(res?.data.content ? outputString1 : '')
                                setArticleTopic(res?.data?.topic)
                                setCreatedAt(res?.data?.createdAt)
                                setUpdatedAt(res?.data?.updatedAt)
                            }, 3000)
                        } else {
                            console.log("inside interval cancel 400")
                            Swal.fire({
                                html: '<h3>Invalid Article ID</h3>',
                                icon: "error",
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonColor: "#2979FF"
                            }).then((res) => {
                                clearInterval(interval)
                                router.push("/create-article")
                            })
                        }
                    }).catch(e => {
                        console.log(e);
                        clearInterval(interval)
                        Swal.fire({
                            html: e.response.data?.message ? e.response.data?.message : 'Error from ChatGPT API. Please Try again later.',
                            icon: "error",
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonColor: "#2979FF"
                        }).then((res) => {

                            router.push("/create-article")
                        })
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
                    confirmButtonColor: "#2979FF"
                }).then((res) => {
                    router.push("/create-article")
                })
            }).catch(e => {

            })
        }

    }, [callTracker])

    const save = () => {

        LoginRegistrationAPI.updateSaasAIArticle({ id: router.query.id, article: html, topic: articleTopic }).then((res) => {
            if (res.status == 200) {
                // Swal.fire(
                //     'Success',
                //     'Saved!',
                //     'success'
                // )
                Swal.fire({
                    title: 'Success',
                    text: 'Saved!',
                    icon: 'success',
                    confirmButtonText: 'Close',
                    confirmButtonColor: "#2979FF",
                })
            } else {
                Swal.fire(
                    'Error',
                    'Unable to save changes.',
                    'error'
                )
            }
        }).catch(e => {
            Swal.fire(
                'Error',
                'Unable to save changes.',
                'error'
            )
        })
    }

    return (
        <>
            {
                showArticleEditor ?

                    <ArticleIU
                        article={article}
                        id={router.query.id}
                        outlines={outlines}
                        setHtml={setHtml}
                        html={html}
                        save={save}
                        wordCount={wordCount}
                        setWordCount={setWordCount}
                        articleTopic={articleTopic}
                        setTopic={setArticleTopic}
                        createdAt={getDateTime(createdAt)}
                        updatedAt={getDateTime(updatedAt)}
                        setPlainText={setPlainText}
                        plainText={plainText}
                    />
                    :
                    <Card sx={{ padding: "20px" }}>
                        <Box sx={{ mb: 9, mt: 10, textAlign: 'center' }}>
                            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                                Creating Your Article...
                            </Typography>
                            <Typography variant='body2'>It may take 5-10 minutes. You can leave this page anytime. Article generation will continue in background.</Typography>
                            <Typography variant='body1'> {articleTopic ? 'Topic: ' + articleTopic : ''}</Typography>
                        </Box>
                        <Stepper activeStep={currentStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <Icon icon="eos-icons:three-dots-loading" fontSize={80} color='#2979FF' />
                        </Box>

                    </Card>
            }
        </>



    )

}