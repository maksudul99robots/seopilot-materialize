import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminDetailsComponent(props: any) {
    const [headings, setHeadings] = useState([]);
    useEffect(() => {
        if (props.headings) {
            setHeadings(props.headings)
        }
    }, [props.headings])
    // console.log("headings:", headings)
    return (
        <Box sx={{ border: "1px solid #E6E6EA", borderRadius: "10px", padding: "20px" }}>
            <Typography variant="h5">Token details</Typography>

            <Box sx={{ display: "flex", marginTop: "5px", padding: "5px" }}>
                <Typography variant="body1">Prompt tokens : </Typography>
                <Typography variant="body1">{props.tokens.prompt_tokens}</Typography>

            </Box>
            <Box sx={{ display: "flex", padding: "5px" }}>
                <Typography variant="body1">Completion tokens : </Typography>
                <Typography variant="body1">{props.tokens.completion_tokens}</Typography>

            </Box>
            <Box sx={{ display: "flex", padding: "5px", marginBottom: "10px" }}>
                <Typography variant="body1">Total tokens : </Typography>
                <Typography variant="body1">{props.tokens.total_tokens}</Typography>

            </Box>
            <Divider sx={{ my: '0 !important' }} />
            <Typography variant="h5" sx={{ marginTop: "px" }}>Keyword Used for Unsplash </Typography>
            {/* <Divider sx={{ my: '0 !important' }} /> */}
            <Box sx={{ display: "flex", width: "100%", backgroundColor: "#fff", padding: "20px", justifyContent: "center" }}>
                <Typography variant='body1' sx={{ width: "84%", fontSize: "13px", fontWeight: "600" }}>
                    Keywords
                </Typography>
                <Typography variant='body1' sx={{ width: "16%", fontSize: "13px", fontWeight: "600" }}>
                    Density
                </Typography>

            </Box>
            {
                props.keywordByKeybert?.length > 0 ?

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

        </Box>
    )
}