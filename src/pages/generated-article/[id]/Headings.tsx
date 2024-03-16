import { Box, Card, CardContent, CardHeader, Collapse, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Icon from "src/@core/components/icon";

export default function Headings(props: any) {
    const [headings, setHeadings] = useState([]);
    const [collapsed, setCollapsed] = useState<boolean>(false)
    useEffect(() => {
        if (props.headings) {
            setHeadings(props.headings)
        }
    }, [props.headings])
    // console.log("headings:", headings)
    return (

        <Card sx={{ marginBottom: "10px", marginTop: "20px", padding: "5px" }}>

            <CardHeader
                title='Article Outline'
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
                    {
                        headings.length > 0 ?

                            headings.map((h: any, i: any) => {
                                return (
                                    <Box key={i} sx={{ display: "flex", width: "100%", backgroundColor: i % 2 == 0 ? "#F7F7F9" : "fff", padding: "15px" }}>
                                        {/* <Box sx={{ width: "20%" }}> */}
                                        <Typography variant='body1' sx={{ width: "10%", fontSize: "12px" }}>
                                            {h?.tagName}
                                        </Typography>
                                        <Typography variant='body1' sx={{ width: "90%", fontSize: "12px" }}>
                                            {h?.textContent}
                                        </Typography>

                                    </Box>
                                )
                            })
                            : null
                    }
                </CardContent>
            </Collapse>

            {/* <Typography variant="h5" sx={{ marginBottom: "10px" }}>Outline Prompt</Typography> */}

        </Card>


        // <Box sx={{ border: "1px solid #E6E6EA", borderRadius: "10px" }}>


        // </Box>
    )
}