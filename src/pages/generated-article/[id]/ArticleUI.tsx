import { Box, Button, Card, Grid, InputAdornment, Link, TextField, Typography, Tooltip, TooltipProps, styled, tooltipClasses, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LoginRegistrationAPI } from 'src/services/API'
import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import CustomizedMenus from 'src/services/EditorExportOptions';
// ** Third Party Importss
import { Icon } from '@iconify/react';
// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Swal from 'sweetalert2';
// import Headings from './headings';
import { useAuth } from 'src/hooks/useAuth';
import Outlines from './Outlines';
import { getHeadings } from 'src/services/Headings';
import Headings from './Headings';
import SelectConnects from 'src/services/SelectConnects';
import Image from 'next/image'

type ArticleType = {
    id: number,
    user_id: number,
    prompt: string,
    output: string,
    is_error: boolean,
    source: string,
    createdAt: string,
    updatedAt: string
}
import axios from 'axios';
import AiScoreComponent from 'src/components/ArticleScoreComponent';
import AdminDetailsComponent from './AdminDetailsComponent';
import { PromptComponent } from 'src/components/PromptComponent';
import ReWritenTxtTable from 'src/services/ToolbarOptions/ReWritenTxtTable';
import Metrics from 'src/components/Metrics';
import { getTitleCalculation, getWordCountCalculations } from 'src/services/MetricsCalculator';
import ImageSection from './ImageSection';
import { CustomMadeChips } from 'src/services/CustomMadeChips';
import { getDateTime } from 'src/services/DateTimeFormatter';

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



export default function ArticleIU(props: any) {
    // console.log("content status:", props.contentStatus)
    const [article, setArticle] = useState<string>(props.article);
    const [headings, setHeadings] = useState<any>([]);
    const [fImg, setFimg] = useState<any>(props.fImg);
    const [imgSrc, setImgSrc] = useState('');
    const [copied, setCopied] = useState(false);
    const [keywords, setKeywords] = useState<any>(JSON.parse(props.keywordByKeybert));
    const [isKeybert, setIsKeybert] = useState(true)
    const [reloadUnsplashRequest, setReloadUnsplashRequest] = useState(0)
    const [wordScore, setWordScore] = useState({ score: 0, msg: "" })
    const [titleScore, setTitleScore] = useState({ score: 0, msg: "" })
    const [saveBtnStyle, setSaveBtnStyle] = useState({
        marginLeft: "5px",
        position: "relative",
        backgroundColor: "#fff",
    })
    const [scoreObj, setScoreObj] = useState<any>({
        words_score: 0,
        style_score: 0,
        factual_score: 0,
        h_structure_score: 0,
        bulletting_score: 0,
        keywords_score: 0,
        links_score: 0,
        length_score: 0
    });
    const [statusDropdown, setStatusDropdown] = useState<any>([])

    useEffect(() => {
        if (props.status == 'completed') {
            setStatusDropdown(['completed', 'review'])
        } else if (props.status == 'review' || props.status == 'ready_to_publish') {
            setStatusDropdown(['review', 'ready_to_publish'])
        } else {
            setStatusDropdown([props.status])
        }

    }, [props.status])

    const auth = useAuth()

    window.addEventListener('scroll', function () {
        var div = document.getElementById('custom-actions');
        var rect = div?.getBoundingClientRect();

        if (rect?.bottom && (rect?.bottom < 0 || rect?.top > window?.innerHeight)) {
            // console.log('Div is out of view');
            setSaveBtnStyle({
                marginLeft: "5px",
                position: "fixed",
                backgroundColor: "#fff",

            })
        } else {
            // console.log('Div is in view');
            setSaveBtnStyle({
                marginLeft: "5px",
                position: "relative",
                backgroundColor: "#fff",
            })
        }
    });

    useEffect(() => {
        if (auth?.user?.approle.role.id == 2) {
            LoginRegistrationAPI.getArticleScore({
                id: props.id
            }).then((res: any) => {
                // console.log("response from api:", res.data)
                let x = {
                    words_score: res.data.words_score ? res.data.words_score : 0,
                    style_score: res.data.style_score ? res.data.style_score : 0,
                    factual_score: res.data.factual_score ? res.data.factual_score : 0,
                    h_structure_score: res.data.h_structure_score ? res.data.h_structure_score : 0,
                    bulletting_score: res.data.bulletting_score ? res.data.bulletting_score : 0,
                    keywords_score: res.data.keywords_score ? res.data.keywords_score : 0,
                    links_score: res.data.links_score ? res.data.links_score : 0,
                    length_score: res.data.length_score ? res.data.length_score : 0
                }
                setScoreObj(x);
            })
        }
    }, [props.id])
    // console.log("articleObj", articleObj?.prompt)
    const download = (html: string, title: string, id: any) => {
        title = title.replaceAll(' ', '-')
        title = title + id + '.html'
        exportHtml(html, title)
    }

    useEffect(() => {
        if (props.keywords && props.keywords.length > 0) {
            setKeywords(props.keywords);
            setIsKeybert(false);
        }
    }, [props.keywords])

    useEffect(() => {
        if (props.imgService == 'unsplash')
            getImgFromLocation(props.fImg?.links?.download_location);

    }, [props.fImg])

    function exportHtml(str: string, fileName: string) {
        const blob = new Blob([str], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = fileName;
        link.href = url;
        link.click();
    }

    useEffect(() => {
        // console.log(props.html)

        let text = props.html.replace(/<[^>]*>/g, '');
        let words = text.split(/\s+/g)
        if (words?.length) {
            props.setWordCount(words?.length)
        }
        let h = getHeadings(props.html)
        setHeadings(h);
    }, [props.html])

    const getImgFromLocation = async (url: string) => {
        // console.log("requesting to unsplash:", url)
        if ((url && imgSrc == '')) {
            let img = await axios.get(url + '?client_id=' + process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID)
            setImgSrc(img.data.url);
        }
    }

    useEffect(() => {
        setWordScore(getWordCountCalculations(props.wordCount))
    }, [props.wordCount])
    useEffect(() => {
        setTitleScore(getTitleCalculation(props.articleTopic))
    }, [props.articleTopic])
    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", width: "100%" }}>
                <Box sx={{ width: "50%" }}>
                    {props.schedule ?
                        <Typography variant='subtitle1' sx={{ width: "100%", marginBottom: "10px" }}>
                            Publish Date: {getDateTime(props.schedule)}
                        </Typography>
                        : <Typography variant='subtitle1' sx={{ width: "100%", marginBottom: "10px" }}>
                            Last Updated: {getDateTime(props.updatedAt)}
                        </Typography>
                    }
                    <Typography variant='subtitle2' sx={{}}>
                        Word Count: {props.wordCount} words
                        {
                            (props.tokens != 0 && props?.tokens != undefined && props?.tokens != null) ?
                                ` | Tokens Used: ${props?.tokens?.total_tokens} 
                                | Cost: ~$${props.price}` : ''

                        }
                    </Typography>


                </Box>
                <Box id="custom-actions" sx={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "10px", width: "50%" }}>
                    {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ fontWeight: "600" }}>Content Status:</Typography>
                        <FormControl sx={{ marginX: "5px" }}>
                            <Select
                                placeholder='Content Status'
                                value={props.status}
                                sx={{ height: "38px", backgroundColor: "#fff", width: "100%" }}
                                onChange={(e: any) => {
                                    if (e.target.value && e.target.value != props.contentStatus) {
                                        props.setStatus(e.target.value)
                                        LoginRegistrationAPI.updateArticleStatus({ id: props.id, status: e.target.value }).then((res) => {
                                            Swal.fire({
                                                title: 'Success',
                                                text: e.target.value == 'review' ? 'Marked as REVIEW REQUIRED' : 'Marked as READY TO PUBLISH' + " !",
                                                icon: 'success',
                                                confirmButtonText: 'Close',
                                                confirmButtonColor: "#2979FF",
                                            })
                                        }).catch((error: any) => {
                                            Swal.fire(
                                                'Error',
                                                'Unable to changes status',
                                                'error'
                                            )
                                        })
                                    }

                                }}
                            >
                                {statusDropdown.map((s: any) => {
                                    return <MenuItem value={s}>
                                        <Box sx={{ display: "flex", }}>
                                            <Box sx={{
                                                height: "10px",
                                                width: "10px",
                                                backgroundColor:
                                                    s == 'completed' ? "#BFC4CC" :
                                                        s == 'review' ? "#41C9E2" :
                                                            s == 'published' ? "#72E128" :
                                                                s == 'ready_to_publish' ? "#2979FF" : "#3ABEF9",
                                                borderRadius: "50%",
                                                marginRight: "10px",
                                                marginTop: "8px",
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                            </Box>
                                            <Typography>{
                                                s == 'completed' ? 'GENERATED' :
                                                    s == 'review' ? 'REVIEW REQUIRED' :
                                                        s == 'published' ? 'PUBLISHED' :
                                                            s == 'scheduled' ? 'SCHEDULED' :
                                                                s == 'ready_to_publish' ? 'READY TO PUBLISH' : ''
                                            }</Typography>
                                        </Box>
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box> */}

                    <CustomizedMenus
                        id={props.id}
                        title={props.articleTopic}
                        html={props.html}
                        setCopied={setCopied}
                        copied={copied}
                        save={props.save}
                        download={download}
                        plainText={props.plainText}
                        fImg={props.fImg}
                        listicleOutlines={props.listicleOutlines}
                        articleType={props.articleType}
                        numberedItem={props.numberedItem}
                        imgService={props.imgService}
                        featuredImgIndex={props.featuredImgIndex}
                    />
                    <SelectConnects timezone={props.timezone} html={props.html} title={props.articleTopic} fImg={props.fImg} imgService={props.imgService} article_id={props.id} />
                </Box>
            </Box >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                /> */}
                <Grid item xs={12} sx={{ width: "70%", marginRight: "10px" }}>
                    <Card
                        sx={{ overflow: 'visible', padding: "20px", width: "100%" }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>

                            <div style={{ width: "100%" }}>

                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%" }}>
                                    <TextField fullWidth value={props.articleTopic}
                                        inputProps={{ style: { fontSize: 20, padding: 10, fontWeight: 600, width: "100%" } }}
                                        onChange={(e: any) => {
                                            props.setTopic(e.target.value)
                                        }}
                                    />
                                </div>


                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", overflow: "hidden" }}>
                            {

                                props.imgService == 'unsplash' && props.fImg?.user?.links ?
                                    <div style={{ width: "950px", height: "534px", marginBottom: "40px", }}>


                                        <ImageSection
                                            src={imgSrc}
                                            url={props?.fImg?.user?.links?.html}
                                            username={props?.fImg?.user?.name}
                                            id={props.id}
                                            setFImg={props.setFImg}
                                            setReloadUnsplashRequest={setReloadUnsplashRequest}
                                            service="Unsplash"
                                            imgService={props.imgService}
                                            referral="https://unsplash.com/?utm_source=Seopilot&utm_medium=referral"
                                            featuredImgIndex={props.featuredImgIndex}
                                            setFeaturedImgIndex={props.setFeaturedImgIndex}
                                            setImgSrc={setImgSrc}
                                            setImgService={props.setImgService}
                                            topic={props.articleTopic}
                                        />
                                    </div>
                                    :
                                    props.imgService == 'pexels' && props.fImg?.photos ?
                                        <div style={{ width: "950px", height: "534px", marginBottom: "40px", }}>
                                            <ImageSection
                                                src={props?.fImg?.photos[props.featuredImgIndex].src.original}
                                                url={props?.fImg?.photos[props.featuredImgIndex].photographer_url}
                                                username={props?.fImg?.photos[props.featuredImgIndex].photographer}
                                                id={props.id}
                                                setFImg={props.setFImg}
                                                setReloadUnsplashRequest={setReloadUnsplashRequest}
                                                service="Pexels"
                                                imgService={props.imgService}
                                                referral="https://www.pexels.com/"
                                                featuredImgIndex={props.featuredImgIndex}
                                                setFeaturedImgIndex={props.setFeaturedImgIndex}
                                                setImgSrc={setImgSrc}
                                                setImgService={props.setImgService}
                                                topic={props.articleTopic}
                                            />

                                        </div>
                                        :
                                        (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') && props.fImg ?
                                            <div style={{ width: "950px", height: "534px", marginBottom: "40px", }}>

                                                <ImageSection
                                                    src={props.fImg}
                                                    id={props.id}
                                                    setFImg={props.setFImg}
                                                    setReloadUnsplashRequest={setReloadUnsplashRequest}
                                                    imgService={props.imgService}
                                                    featuredImgIndex={props.featuredImgIndex}
                                                    setFeaturedImgIndex={props.setFeaturedImgIndex}
                                                    setImgSrc={setImgSrc}
                                                    setImgService={props.setImgService}
                                                />
                                                {/* <img
                                                    src={props.fImg}
                                                    width={800}
                                                    height={450}
                                                    style={{ objectFit: "cover" }}
                                                    alt="Featured image"
                                                /> */}
                                                {/* <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                                        Photo by <a href={fImg.photos[0].photographer_url} target='_blank' className='colorLink'>{fImg.photos[0].photographer}</a> on <a href='https://www.pexels.com/' target='_blank' className='colorLink'>Pexels</a>
                                    </p> */}
                                            </div>
                                            :
                                            // <LightTooltip title={
                                            //     <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                            //         Add Featured Image in Your Article

                                            //     </p>
                                            // } placement="top">
                                            //     <div style={{ height: "100%" }}>
                                            //         <Icon icon="gg:add" className='add-icon-color' fontSize="30px" />
                                            //     </div>
                                            // </LightTooltip >
                                            null


                            }


                        </div>

                        {
                            article &&
                            <EditorControlled
                                data={props.article}
                                setHtml={props.setHtml}
                                setPlainText={props.setPlainText}
                                fImg={fImg}
                                listicleOutlines={props.listicleOutlines}
                                numberedItem={props.numberedItem}
                                setReloadArticle={props.setReloadArticle}
                                reloadArticle={props.reloadArticle}
                                article_id={props.id}
                                save={props.save}
                            />
                        }


                    </Card>
                </Grid>

                <div style={{ width: "30%", }}>
                    <Card
                        sx={{ overflow: 'visible', padding: "10px 20px 30px 20px", marginBottom: "10px" }}
                    >

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant='h5' sx={{ paddingTop: "20px", paddingBottom: "20px" }}>Metrics</Typography>
                            <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                <Button variant='outlined' color='secondary' className='outlined-btn-color' href={`/create-article?id=${props.id}`} sx={{ height: 40 }} startIcon={<Icon icon="lucide:file-input" />}>Show Inputs</Button>
                            </Box>
                        </Box>
                        <Metrics titleScore={titleScore} wordScore={wordScore} keywordSuggestions={props.keywordSuggestions} serp={props.serp} />

                        {/* <Outlines outlines={outlines} /> */}
                        <Headings headings={headings} />
                    </Card>
                    {
                        auth?.user?.approle.role.id == 2 &&
                        <>
                            <PromptComponent id={props.id} articleType={props.articleType} listicleOutlines={props.listicleOutlines} />
                            {/* <Card sx={{ marginBottom: "10px" }}> */}
                            <AdminDetailsComponent tokens={props.tokens} keywordByKeybert={keywords} isKeybert={isKeybert} />
                            {/* </Card> */}
                        </>

                    }

                    {
                        auth?.user?.approle.role.id == 2 &&
                        <AiScoreComponent id={props.id} scoreObj={scoreObj} />
                    }

                </div>



            </Box>


        </>


    )

}