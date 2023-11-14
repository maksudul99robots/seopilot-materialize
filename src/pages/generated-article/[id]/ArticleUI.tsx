import { Box, Button, Card, Grid, Link, Typography } from '@mui/material'
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

    const [copied, setCopied] = useState(false);
    const auth = useAuth()

    useEffect(() => {
        if (auth?.user?.plan == 'free') {
            Swal.fire('401',
                'You don\'t have access to this page. Please Upgrade to enable AI-Article Feature.',
                'error').then(() => {
                    router.push("/")
                })
        }
    }, [auth?.user?.plan])
    // console.log("articleObj", articleObj?.prompt)
    const download = () => {
        exportHtml(props.html)
    }
    // const save = () => {
    //     LoginRegistrationAPI.updateAIArticle({ id: articleObj?.id, output: html }).then((res) => {
    //         if (res.status == 200) {
    //             Swal.fire(
    //                 'Success',
    //                 'A verification email is sent.',
    //                 'success'
    //             )
    //         } else {
    //             Swal.fire(
    //                 'Error',
    //                 'Unable to save changes.',
    //                 'error'
    //             )
    //         }
    //     }).catch(e => {
    //         Swal.fire(
    //             'Error',
    //             'Unable to save changes.',
    //             'error'
    //         )
    //     })
    // }

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
    }, [props.html])

    return (
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
                <Card sx={{ overflow: 'visible', padding: "20px", width: "100%", marginBottom: "10px" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                        <div>
                            {/* <Link sx={{ display: "flex", justifyContent: "end", alignItems: "center" }} href='/articles'>
                                <Icon icon="ic:round-arrow-back-ios-new" style={{ marginRight: "10px" }} />
                                <Typography variant='body1'>Back</Typography>
                            </Link> */}
                            <Typography variant='h5'>
                                AI Generated Article
                            </Typography>
                        </div>


                        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>

                            <CustomizedMenus html={props.html} setCopied={setCopied} copied={copied} save={props.save} download={download} />
                            <Button variant='contained' onClick={e => props.save()} sx={{ marginLeft: "5px" }}>Save Changes</Button>
                            {/* <Button variant='contained' onClick={e => download()}>Download HTML</Button> */}
                        </Box>

                    </div>
                </Card>
                <Card
                    sx={{ overflow: 'visible', padding: "20px", width: "100%" }}
                >

                    <Typography variant='h6' sx={{ marginBottom: "20px" }}>
                        Total Word Count: {props.wordCount} words
                    </Typography>
                    {
                        article &&
                        <EditorControlled data={article} setHtml={props.setHtml} />
                    }


                </Card>
            </Grid>
            <Card
                sx={{ overflow: 'visible', padding: "10px 20px 30px 20px", width: "40%", height: "100%" }}
            >
                <Typography variant='h5' sx={{ paddingTop: "20px" }}>Article Outline</Typography>

                <Outlines outlines={outlines} />

            </Card>
        </Box>

    )

}