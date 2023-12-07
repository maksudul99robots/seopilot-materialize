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

export default function ArticleIU(props: any) {
    const router = useRouter()
    const [article, setArticle] = useState<string>(props.article);
    const [outlines, setOutlines] = useState<string>(props.outlines);
    const [headings, setHeadings] = useState<any>([]);
    const [fImg, setFimg] = useState<any>(props.fImg);
    const [copied, setCopied] = useState(false);
    const auth = useAuth()

    useEffect(() => {
        // if (auth?.user?.plan?.plan == 'free' || auth?.user?.plan?.plan == 'extension_only') {
        if (auth?.user?.workspace_owner_info?.plan?.plan == 'free' || auth?.user?.workspace_owner_info?.plan?.plan == 'extension_only') {
            // Swal.fire('401',
            //     'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
            //     'error').then(() => {
            //         router.push("/")
            //     })

            Swal.fire({
                title: '401',
                text: 'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            }).then(() => {
                router.push("/")
            })
        }
    }, [auth?.user?.plan])
    // console.log("articleObj", articleObj?.prompt)
    const download = () => {
        exportHtml(props.html)
    }


    function exportHtml(str: string) {
        const blob = new Blob([str], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "seopilot-article.html";
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

    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", width: "100%" }}>
                <Box sx={{ width: "50%" }}>
                    <Typography variant='subtitle1' sx={{ width: "100%", marginBottom: "10px" }}>
                        Last Updated: {props.updatedAt}
                    </Typography>
                    <Typography variant='subtitle2' sx={{}}>
                        Word Count: {props.wordCount} words
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "10px", width: "50%" }}>
                    <CustomizedMenus html={props.html} setCopied={setCopied} copied={copied} save={props.save} download={download} plainText={props.plainText} fImg={fImg} />
                    <Button variant='outlined' onClick={e => props.save()} sx={{ marginLeft: "5px" }} startIcon={<Icon icon="mdi:content-save-outline" />}>Save Changes</Button>
                    <SelectConnects html={props.html} title={props.articleTopic} />
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

                    {/* <Card sx={{ overflow: 'visible', padding: "20px", width: "100%", marginBottom: "10px" }}>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

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
                    </Card> */}

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
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                            {
                                fImg &&
                                <div style={{ width: "600px", height: "400px", marginBottom: "40px", }}>
                                    <img
                                        src={fImg.urls.full}
                                        width={600}
                                        height={400}

                                        alt="Featured image"
                                    />
                                    <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                                        Photo by <a href={fImg.user.links.html} target='_blank' className='colorLink'>{fImg.user.name}</a> on <a href='https://unsplash.com/' target='_blank' className='colorLink'>Unsplash</a>
                                    </p>
                                </div>
                            }



                        </div>

                        {
                            article &&
                            <EditorControlled data={article} setHtml={props.setHtml} setPlainText={props.setPlainText} fImg={fImg} />
                        }


                    </Card>
                </Grid>
                <Card
                    sx={{ overflow: 'visible', padding: "10px 20px 30px 20px", width: "40%", height: "100%" }}
                >
                    <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                        <Typography variant='h5' sx={{ paddingTop: "20px", paddingBottom: "20px", marginRight: "10px" }}>Your Input</Typography>
                        <Button variant='outlined' href={`/create-article?id=${props.id}`} sx={{ height: 40 }} startIcon={<Icon icon="lucide:file-input" />}>Show</Button>
                    </Box>

                    <Typography variant='h5' sx={{ paddingTop: "20px", paddingBottom: "20px" }}>Article Outline</Typography>

                    {/* <Outlines outlines={outlines} /> */}
                    <Headings headings={headings} />
                </Card>


            </Box>


        </>


    )

}