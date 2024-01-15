import { Box, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Icon from "src/@core/components/icon";
import { LoginRegistrationAPI } from "src/services/API"

export const PromptComponent = (props: any) => {
    const [outlinePrompt, setOutlinePrompt] = useState('');
    const [articlePrompt, setArticlePrompt] = useState('');
    const [outlines, setOutlines] = useState('');
    const [collapsed, setCollapsed] = useState<boolean>(false)

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
        <Card sx={{ padding: "10px", marginBottom: "10px" }}>

            <CardHeader
                title='Prompts to generate Article'
                action={
                    <IconButton
                        size='small'
                        aria-label='collapse'
                        sx={{ color: 'text.secondary' }}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <Icon fontSize={20} icon={!collapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                    </IconButton>
                }
            />


            <Collapse in={collapsed}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>Outline Prompt</Typography>
                    <Typography id="modal-description" sx={{ whiteSpace: 'pre-line' }}>
                        {outlinePrompt}
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>Generated Outlines</Typography>
                    <Typography id="modal-description" sx={{ whiteSpace: 'pre-line' }}>
                        {outlines}
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "10px" }}>Article Prompt</Typography>
                    <Typography id="modal-description" sx={{ whiteSpace: 'pre-line' }}>
                        {articlePrompt}
                    </Typography>
                </CardContent>
            </Collapse>

            {/* <Typography variant="h5" sx={{ marginBottom: "10px" }}>Outline Prompt</Typography> */}

        </Card>
    )
}