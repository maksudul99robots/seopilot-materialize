import { Box, Button, Card, Grid, Link, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LoginRegistrationAPI } from 'src/services/API'
import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    const [html, setHtml] = useState<string>('');
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
        exportHtml(html)
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
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                            <CopyToClipboard text={html}
                                onCopy={() => {
                                    setCopied(true)
                                    setTimeout(() => {
                                        setCopied(false)
                                    }, 5000)
                                }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}> <Icon icon="icon-park-outline:copy" style={{ color: "#2979FF", cursor: "pointer", marginRight: "20px" }} />{copied && <span style={{ fontSize: "16px", fontWeight: "700", color: "#2979FF", paddingLeft: "5px", paddingRight: "5px" }}>Copied!</span>}</div>

                            </CopyToClipboard>
                            {/* <Button variant='outlined' onClick={e => save()} sx={{ marginRight: "5px" }}>Save Changes</Button> */}
                            <Button variant='contained' onClick={e => download()}>Download HTML</Button>
                        </Box>

                    </div>
                </Card>
                <Card
                    sx={{ overflow: 'visible', padding: "20px", width: "100%" }}
                >


                    {
                        article &&
                        <EditorControlled data={article} setHtml={setHtml} />
                    }

                </Card>
            </Grid>
            <Card
                sx={{ overflow: 'visible', padding: "10px 20px 30px 20px", width: "40%", height: "100%" }}
            >
                {/* <Typography variant='h5'>Input Headings:</Typography> */}

                <Outlines outlines={outlines} />

            </Card>
        </Box>

    )

}