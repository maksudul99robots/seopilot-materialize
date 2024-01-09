import { Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { LoginRegistrationAPI } from "src/services/API"

export const PromptComponent = (props: any) => {
    const [outlinePrompt, setOutlinePrompt] = useState('');
    const [articlePrompt, setArticlePrompt] = useState('');
    const [outlines, setOutlines] = useState('');
    useEffect(() => {
        LoginRegistrationAPI.getPrompt({ id: props.id }).then(res => {
            setOutlinePrompt(res.data.outline_prompt)
            setArticlePrompt(res.data.article_prompt)
            setOutlines(res.data.generated_outlines)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <Card sx={{ padding: "20px", marginBottom: "10px" }}>
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>Outline Prompt</Typography>
            <Typography id="modal-description" sx={{ whiteSpace: 'pre-line' }}>
                {outlinePrompt}
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>Generated Outlines</Typography>
            <Typography id="modal-description" sx={{ whiteSpace: 'pre-line' }}>
                {outlines}
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: "10px", marginTop: "10px" }}>Article Prompt</Typography>
            <Typography id="modal-description" sx={{ whiteSpace: 'pre-line' }}>
                {articlePrompt}
            </Typography>
        </Card>
    )
}