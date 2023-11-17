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
import Headings from '../../generated-article/[id]/Headings';
import { useAuth } from 'src/hooks/useAuth';
import CustomizedMenus from 'src/services/EditorExportOptions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getDateTime } from 'src/services/DateTimeFormatter';
import { getHeadings } from 'src/services/Headings';

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

export default function Page() {
    const router = useRouter()
    const [articleObj, setArticleObj] = useState<ArticleType | null>(null);
    const [articleData, setArticleData] = useState<string>('');
    const [html, setHtml] = useState<string>('');
    const [wordCount, setWordCount] = useState<string | number>('');
    const [copied, setCopied] = useState(false);
    const [headings, setHeadings] = useState([]);
    const auth = useAuth()

    useEffect(() => {


        if (router.query.id?.length && router.query.id.length > 0) {
            LoginRegistrationAPI.getAIArticleSingle({ id: router.query.id }).then(res => {
                setArticleObj(res.data);

                var outputString = res.data.output.replace('<article>', '');
                var outputString1 = outputString.replace('</article>', '');
                setArticleData(outputString1)
            }).catch(e => {

            })
        }
    }, [router.query.id])

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
    const save = () => {
        LoginRegistrationAPI.updateAIArticle({ id: articleObj?.id, output: html }).then((res) => {
            if (res.status == 200) {
                Swal.fire(
                    'Success',
                    'Saved',
                    'success'
                )
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

        let text = html.replace(/<[^>]*>/g, '');
        let words = text.split(/\s+/g)
        if (words?.length) {
            setWordCount(words?.length)
        }
        let h = getHeadings(html)
        // console.log("headings....:", h)
        setHeadings(h);

    }, [html])


    return (
        <>
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
            <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "10px", width: "100%" }}>

                <CustomizedMenus html={html} setCopied={setCopied} copied={copied} save={save} download={download} />
                <Button variant='contained' onClick={e => save()} sx={{ marginLeft: "5px" }}>Save Changes</Button>

            </Box >

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={12} sx={{ width: "70%", marginRight: "10px" }}>

                    <Card
                        sx={{ overflow: 'visible', padding: "20px", width: "100%" }}
                    >
                        <Typography variant='subtitle2' sx={{ marginBottom: "10px" }}>
                            Total Word Count: {wordCount} words
                        </Typography>


                        {
                            articleObj?.output &&
                            <EditorControlled data={articleData} setHtml={setHtml} />
                        }

                    </Card>
                </Grid>
                <Card
                    sx={{ overflow: 'visible', padding: "10px 10px 30px 10px", width: "30%", height: "100%" }}
                >
                    <Box sx={{ marginBottom: "20px" }}>
                        <Typography variant='h5'>Source Website: </Typography>
                        <Link href={articleObj?.source ? 'https://' + articleObj?.source : ''} target='_blank'> {articleObj?.source}</Link>
                    </Box>
                    <Typography variant='h5'>Input Headings:</Typography>

                    {/* <Box >
                        {
                            articleObj?.prompt && JSON.parse(articleObj?.prompt) && <Headings headings={JSON.parse(articleObj?.prompt)} />
                        }

                    </Box> */}
                    <Headings headings={headings} />

                </Card>
            </Box>
        </>


    )

}