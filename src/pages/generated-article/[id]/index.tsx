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
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from 'src/hooks/useAuth';
// import 'react-toastify/dist/ReactToastify.css';
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
    const [articleType, setArticleType] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [outlines, setOutlines] = useState('');
    const [fImg, setFImg] = useState<any>(null);
    const [callTracker, setCallTracker] = useState(false);
    const [showOutlines, setShowOutlines] = useState(false);
    const [html, setHtml] = useState<string>('');
    const [imgService, setImgService] = useState<string>('');
    const [plainText, setPlainText] = useState<string>('');
    const [timezone, setTimezone] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const [featuredImgIndex, setFeaturedImgIndex] = useState<number>(0);
    const [reloadArticle, setReloadArticle] = useState<number>(0);
    const [tokens, setTokens] = useState<any>(null);
    const [keywordByKeybert, setKeywordsByKeyBert] = useState<any>(null);
    const [price, setPrice] = useState<number | string>(0);
    const [keywords, setKeywords] = useState<any>([])
    const [listicleOutlines, setListicleOutlines] = useState<any>([]);
    const [numberedItem, setNumberedItem] = useState(false);
    const [alreadyLoaded, setAlreadyLoaded] = useState(false);

    const router = useRouter()

    useEffect(() => {
        if (router.query.id)
            setCallTracker(true)


    }, [router.query.id])

    useEffect(() => {
        let counter = 0;
        let interval: any = null
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
                                outlineFromResp = outlineFromResp?.replace(/,(?=\s*[\]}])/, '');
                                outlineFromResp = JSON.parse(outlineFromResp);
                                let x = '';
                                outlineFromResp.map((o: any, i: any) => {
                                    x = x + o;
                                    if (i == outlineFromResp.length - 1) {
                                        setOutlines(x);
                                    }
                                })
                            } catch (e) {
                                // console.log("e:", e)
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
                        setImgService(res.data.img_service)
                        // setOutlines(res?.data.outline ? res.data.outline : '')
                        LoginRegistrationAPI.getFeaturedImg({ id: router.query.id }).then(responseImg => {

                            if (responseImg?.data?.id && (responseImg.data.service == 'unsplash' || responseImg.data.service == 'pexels')) {
                                let x = JSON.parse(responseImg?.data?.featured_img)
                                if (responseImg.data.service == 'unsplash')
                                    x = x[responseImg.data.index]
                                else
                                    setFeaturedImgIndex(responseImg.data.index)
                                setFImg(x);

                            } else if (responseImg.data.service == 'dall-e-3' || responseImg.data.service == 'dall-e-2') {
                                setFImg(responseImg?.data?.featured_img)
                            } else {
                                setFImg(res?.data?.featured_img)
                            }
                        }).catch(error => {
                            console.log("errors:", error)
                            if (res?.data?.featured_img && (res.data.img_service == 'unsplash' || res.data.img_service == 'pexels')) {

                                setFImg(JSON.parse(res?.data?.featured_img))
                            } else {
                                setFImg(res?.data?.featured_img)
                            }

                        })
                        // if (res?.data?.featured_img && (res.data.img_service == 'unsplash' || res.data.img_service == 'pexels')) {
                        //     setFImg(JSON.parse(res?.data?.featured_img))
                        // } else {
                        //     setFImg(res?.data?.featured_img)
                        // }
                        // console.log("res.data.token_used:", res.data.token_used)
                        // console.log("price:", res.data.price)
                        if (res.data.token_used) {
                            let tokenUsed = JSON.parse(res.data.token_used)
                            setTokens(tokenUsed)
                            setPrice(res.data?.price?.toFixed(4))
                        }

                        setKeywordsByKeyBert(res.data.keyword_by_keybert)

                        if (res.data.keywords) {
                            const keywordArray = separateString(res.data.keywords);
                            setKeywords(keywordArray)
                        }

                        if (res.data.listicle_outlines) {
                            let lo = JSON.parse(res.data.listicle_outlines)
                            setListicleOutlines(lo)
                            // console.log(lo)
                        }

                        // if(res.data.numbered_items){
                        setNumberedItem(res.data.numbered_items)
                        setArticleType(res.data.article_type)

                        if ((res.data.img_service == 'dall-e-3' || res.data.img_service == 'dall-e-2') && !res?.data?.featured_img) {
                            // Swal.fire({
                            //     title: 'Unable to Generate Image',
                            //     text: 'Your given image prompt is not accepted by DALL-E. DALL-E responded with: "Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system."',
                            //     icon: 'warning',
                            //     confirmButtonText: 'OK',
                            //     confirmButtonColor: "#2979FF"
                            // })
                            toast.warning('Your given image prompt is not accepted by DALL-E. It responded with: "Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system."', {
                                autoClose: 5000,
                            })
                        }
                        setAlreadyLoaded(true)

                    }, 1000)
                }
            }).catch(e => {
                // console.log(e);
                counter = 1200000;
                if (interval) {
                    clearInterval(interval)
                }
                Swal.fire({
                    html: e.response?.data?.message ? e.response?.data?.message : 'Error from ChatGPT API. Please Try again later.',
                    icon: "error",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: "#2979FF"
                }).then((res) => {

                    router.push("/create-article")
                })
            })
        }

        if (callTracker) {
            interval = setInterval(async () => {
                // console.log("interval is running....")
                counter = counter + 15000;
                if (counter < 1200000) {
                    if (!alreadyLoaded) {
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
                                    setArticle('')
                                    // setArticle(res?.data.content ? res.data.content : '')
                                    // setOutlines(res?.data.outline ? res.data.outline : '')
                                    let outputString = res?.data?.content.replace('<article>', '');
                                    let outputString1 = outputString.replace('</article>', '');
                                    setArticle(res?.data.content ? outputString1 : '')
                                    setArticleTopic(res?.data?.topic)
                                    setCreatedAt(res?.data?.createdAt)
                                    setUpdatedAt(res?.data?.updatedAt)

                                    LoginRegistrationAPI.getFeaturedImg({ id: router.query.id }).then(responseImg => {
                                        // console.log("responseImg:", responseImg.data)
                                        if (responseImg?.data?.id && (responseImg.data.service == 'unsplash' || responseImg.data.service == 'pexels')) {
                                            let x = JSON.parse(responseImg?.data?.featured_img)
                                            // console.log("x:", x)
                                            if (responseImg.data.service == 'unsplash')
                                                x = x[responseImg.data.index]
                                            else
                                                setFeaturedImgIndex(responseImg.data.index)
                                            // console.log("x:......", x)
                                            setFImg(x);

                                        } else if (responseImg.data.service == 'dall-e-3' || responseImg.data.service == 'dall-e-2') {
                                            setFImg(responseImg?.data?.featured_img)
                                        } else {
                                            setFImg(res?.data?.featured_img)
                                        }
                                    }).catch(error => {
                                        console.log("errors:", error)
                                        if (res?.data?.featured_img && (res.data.img_service == 'unsplash' || res.data.img_service == 'pexels')) {
                                            setFImg(JSON.parse(res?.data?.featured_img))
                                        } else {
                                            setFImg(res?.data?.featured_img)
                                        }

                                    })

                                    if (res.data.token_used) {
                                        let tokenUsed = JSON.parse(res.data.token_used)
                                        setTokens(tokenUsed)
                                        setPrice(res.data?.price?.toFixed(4))
                                    }

                                    setKeywordsByKeyBert(res.data.keyword_by_keybert)

                                    if (res.data.keywords) {
                                        const keywordArray = separateString(res.data.keywords);
                                        setKeywords(keywordArray)
                                    }
                                    if (res.data.listicle_outlines) {
                                        let lo = JSON.parse(res.data.listicle_outlines)
                                        setListicleOutlines(lo)
                                        // console.log(lo)
                                    }

                                    // if(res.data.numbered_items){
                                    setNumberedItem(res.data.numbered_items)
                                    setArticleType(res.data.article_type)
                                    setImgService(res.data.img_service)


                                }, 3000)
                            } else {
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
                            // console.log(e);
                            clearInterval(interval)
                            Swal.fire({
                                html: e.response?.data?.message ? e.response?.data?.message : 'Error from ChatGPT API. Please Try again later.',
                                icon: "error",
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonColor: "#2979FF"
                            }).then((res) => {

                                router.push("/create-article")
                            })
                        })
                    }

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

    // useEffect(() => {
    //     LoginRegistrationAPI.getTimezone({}).then(res => {
    //         setTimezone(res.data)
    //     })
    // }, [])
    function separateString(str: string) {
        // Split the string by commas
        const parts = str.split(',');

        // Trim each part to remove leading and trailing whitespaces
        const trimmedParts = parts.map((part: any) => part.trim());
        // console.log("trimmedParts:", trimmedParts);
        return trimmedParts;
    }

    const save = () => {
        console.log("inside save...")
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
            <ToastContainer style={{ width: "400px" }} />
            {
                showArticleEditor ?

                    <ArticleIU
                        timezone={timezone}
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
                        fImg={fImg}
                        setFImg={setFImg}
                        price={price}
                        tokens={tokens}
                        keywordByKeybert={keywordByKeybert}
                        keywords={keywords}
                        listicleOutlines={listicleOutlines}
                        numberedItem={numberedItem}
                        articleType={articleType}
                        imgService={imgService}
                        setImgService={setImgService}
                        reloadArticle={reloadArticle}
                        setReloadArticle={setReloadArticle}
                        featuredImgIndex={featuredImgIndex}
                        setFeaturedImgIndex={setFeaturedImgIndex}
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