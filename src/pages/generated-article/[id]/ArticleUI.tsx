import { Box, Button, Card, Grid, InputAdornment, Link, TextField, Typography } from '@mui/material'
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

export default function ArticleIU(props: any) {
    const router = useRouter()
    const [article, setArticle] = useState<string>(props.article);
    const [headings, setHeadings] = useState<any>([]);
    const [fImg, setFimg] = useState<any>(props.fImg);
    const [imgSrc, setImgSrc] = useState('');
    const [copied, setCopied] = useState(false);
    const [keywords, setKeywords] = useState<any>(JSON.parse(props.keywordByKeybert));
    const [isKeybert, setIsKeybert] = useState(true)
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
    const auth = useAuth()

    // useEffect(() => {

    //     // if (auth?.user?.plan?.plan == 'free' || auth?.user?.plan?.plan == 'extension_only') {
    //     if (auth?.user?.approle.role.id == 1) {
    //         if (auth?.user?.workspace_owner_info?.plan?.plan == 'free' || auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only') {
    //             // Swal.fire('401',
    //             //     'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
    //             //     'error').then(() => {
    //             //         router.push("/")
    //             //     })

    //             Swal.fire({
    //                 title: '401',
    //                 text: 'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
    //                 icon: 'error',
    //                 confirmButtonText: 'Close',
    //                 confirmButtonColor: "#2979FF",
    //             }).then(() => {
    //                 router.push("/")
    //             })
    //         }
    //     }

    // }, [auth?.user?.plan])

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

        console.log(props.fImg, props.imgService)
    }, [props.fImg])

    function exportHtml(str: string, fileName: string) {
        console.log("fileName:", fileName)
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
        if (url && imgSrc == '') {
            let img = await axios.get(url + '?client_id=' + process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID)
            setImgSrc(img.data.url);
        }
    }
    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", width: "100%" }}>
                <Box sx={{ width: "50%" }}>
                    <Typography variant='subtitle1' sx={{ width: "100%", marginBottom: "10px" }}>
                        Last Updated: {props.updatedAt}
                    </Typography>

                    <Typography variant='subtitle2' sx={{}}>
                        Word Count: {props.wordCount} words
                        {
                            (props.tokens != 0 && props?.tokens != undefined && props?.tokens != null) ?
                                ` | Tokens Used: ${props?.tokens?.total_tokens} 
                                | Cost: ~$${props.price}` : ''

                        }
                    </Typography>


                </Box>
                <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "10px", width: "50%" }}>
                    <CustomizedMenus
                        id={props.id}
                        title={props.articleTopic}
                        html={props.html}
                        setCopied={setCopied}
                        copied={copied}
                        save={props.save}
                        download={download}
                        plainText={props.plainText}
                        fImg={fImg}
                        listicleOutlines={props.listicleOutlines}
                        articleType={props.articleType}
                        numberedItem={props.numberedItem}
                        imgService={props.imgService} />
                    <Button variant='outlined' onClick={e => props.save()} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="mdi:content-save-outline" />}>Save Changes</Button>
                    <SelectConnects html={props.html} title={props.articleTopic} fImg={fImg} imgService={props.imgService} />
                </Box>
            </Box >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <ToastContainer
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
                />
                <Grid item xs={12} sx={{ width: "60%", marginRight: "10px" }}>
                    <Card
                        sx={{ overflow: 'visible', padding: "20px", width: "100%" }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>

                            <div style={{ width: "100%" }}>

                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%" }}>
                                    <TextField fullWidth value={props.articleTopic}
                                        inputProps={{ style: { fontSize: 20, padding: 10, fontWeight: 600, width: "100%" } }}
                                        onChange={e => {
                                            props.setTopic(e.target.value)
                                        }}
                                    />
                                </div>


                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", overflow: "hidden" }}>
                            {
                                props.imgService == 'unsplash' && fImg?.user?.links &&
                                <div style={{ width: "800px", height: "450px", marginBottom: "40px", }}>
                                    <img
                                        src={imgSrc}
                                        width={800}
                                        height={450}
                                        style={{ objectFit: "cover" }}
                                        alt="Featured image"
                                    />
                                    <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                                        Photo by <a href={fImg.user.links.html + "?utm_source=Seopilot&utm_medium=referral"} target='_blank' className='colorLink'>{fImg.user.name}</a> on <a href='https://unsplash.com/?utm_source=Seopilot&utm_medium=referral' target='_blank' className='colorLink'>Unsplash</a>
                                    </p>
                                </div>
                            }

                            {
                                props.imgService == 'pexels' && fImg?.photos &&
                                <div style={{ width: "800px", height: "450px", marginBottom: "40px", }}>
                                    <img
                                        src={fImg.photos[0].src.original}
                                        width={800}
                                        height={450}
                                        style={{ objectFit: "cover" }}
                                        alt="Featured image"
                                    />
                                    <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                                        Photo by <a href={fImg.photos[0].photographer_url} target='_blank' className='colorLink'>{fImg.photos[0].photographer}</a> on <a href='https://www.pexels.com/' target='_blank' className='colorLink'>Pexels</a>
                                    </p>
                                </div>
                            }
                            {
                                (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') &&
                                <div style={{ width: "800px", height: "450px", marginBottom: "40px", }}>
                                    <img
                                        src={fImg}
                                        width={800}
                                        height={450}
                                        style={{ objectFit: "cover" }}
                                        alt="Featured image"
                                    />
                                    {/* <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                                        Photo by <a href={fImg.photos[0].photographer_url} target='_blank' className='colorLink'>{fImg.photos[0].photographer}</a> on <a href='https://www.pexels.com/' target='_blank' className='colorLink'>Pexels</a>
                                    </p> */}
                                </div>
                            }



                        </div>

                        {
                            article &&
                            <EditorControlled data={article} setHtml={props.setHtml} setPlainText={props.setPlainText} fImg={fImg} listicleOutlines={props.listicleOutlines} numberedItem={props.numberedItem} />
                        }


                    </Card>
                </Grid>

                <div style={{ width: "40%", }}>
                    <Card
                        sx={{ overflow: 'visible', padding: "10px 20px 30px 20px", marginBottom: "10px" }}
                    >

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant='h5' sx={{ paddingTop: "20px", paddingBottom: "20px" }}>Article Outline</Typography>
                            <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                <Button variant='outlined' color='secondary' href={`/create-article?id=${props.id}`} sx={{ height: 40 }} startIcon={<Icon icon="lucide:file-input" />}>Show Inputs</Button>
                            </Box>
                        </Box>


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