import { Box, Card, CardContent, CardHeader, Collapse, Divider, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import Icon from "src/@core/components/icon";

export default function AdminDetailsComponent(props: any) {
    const [headings, setHeadings] = useState([]);
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [collapsedKeybert, setCollapsedKeybert] = useState<boolean>(false)

    useEffect(() => {
        if (props.headings) {
            setHeadings(props.headings)
        }
    }, [props.headings])
    // console.log("headings:", headings)
    return (
        <>
            <Card sx={{ padding: "10px", marginBottom: "10px" }}>

                <CardHeader
                    title='Token details'
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
                        <Box sx={{ display: "flex", marginTop: "5px", padding: "5px" }}>
                            <Typography variant="body1">Prompt tokens : </Typography>
                            <Typography variant="body1">{props?.tokens?.prompt_tokens}</Typography>

                        </Box>
                        <Box sx={{ display: "flex", padding: "5px" }}>
                            <Typography variant="body1">Completion tokens : </Typography>
                            <Typography variant="body1">{props?.tokens?.completion_tokens}</Typography>

                        </Box>
                        <Box sx={{ display: "flex", padding: "5px", marginBottom: "10px" }}>
                            <Typography variant="body1">Total tokens : </Typography>
                            <Typography variant="body1">{props?.tokens?.total_tokens}</Typography>

                        </Box>
                    </CardContent>
                </Collapse>
            </Card>

            <Card sx={{ padding: "10px", marginBottom: "10px" }}>

                <CardHeader
                    title='Keyword Used for Unsplash'
                    action={
                        <IconButton
                            size='small'
                            aria-label='collapse'
                            sx={{ color: 'text.secondary' }}
                            onClick={() => setCollapsedKeybert(!collapsedKeybert)}
                        >
                            <Icon fontSize={20} icon={!collapsedKeybert ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                        </IconButton>
                    }
                />
                <Collapse in={collapsedKeybert}>
                    <CardContent>
                        <Box sx={{ display: "flex", width: "100%", backgroundColor: "#fff", padding: "20px", justifyContent: "center" }}>
                            <Typography variant='body1' sx={{ width: "84%", fontSize: "13px", fontWeight: "600" }}>
                                Keywords
                            </Typography>
                            <Typography variant='body1' sx={{ width: "16%", fontSize: "13px", fontWeight: "600" }}>
                                Density
                            </Typography>

                        </Box>
                        {
                            props.isKeybert && props.keywordByKeybert?.length > 0 ?

                                props.keywordByKeybert.map((h: any, i: any) => {
                                    return (
                                        <Box key={i} sx={{ display: "flex", width: "100%", backgroundColor: i % 2 == 0 ? "#F7F7F9" : "fff", padding: "10px" }}>
                                            <Typography variant='body1' sx={{ width: "90%", fontSize: "13px" }}>
                                                {h[0]} {i == 0 ? "(Used)" : ''}
                                            </Typography>
                                            <Typography variant='body1' sx={{ width: "10%", fontSize: "13px" }}>
                                                {h[1]}
                                            </Typography>
                                            {
                                                i == headings.length - 1 ?
                                                    null :
                                                    <Divider variant="middle" />
                                            }
                                        </Box>
                                    )
                                })
                                : null
                        }
                        {
                            !props.isKeybert && props.keywordByKeybert?.length > 0 ?

                                props.keywordByKeybert.map((h: any, i: any) => {
                                    return (
                                        <Box key={i} sx={{ display: "flex", width: "100%", backgroundColor: i % 2 == 0 ? "#F7F7F9" : "fff", padding: "10px" }}>
                                            <Typography variant='body1' sx={{ width: "90%", fontSize: "13px" }}>
                                                {h} {i == 0 ? "(Used)" : ''}
                                            </Typography>
                                            <Typography variant='body1' sx={{ width: "10%", fontSize: "13px" }}>

                                            </Typography>
                                            {
                                                i == headings.length - 1 ?
                                                    null :
                                                    <Divider variant="middle" />
                                            }
                                        </Box>
                                    )
                                })
                                : null
                        }
                    </CardContent>
                </Collapse>
            </Card>





        </>
    )
}