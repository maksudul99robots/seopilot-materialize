import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Headings(props: any) {
    const [headings, setHeadings] = useState([]);
    useEffect(() => {
        if (props.headings) {
            setHeadings(props.headings)
        }
    }, [props.headings])
    console.log(headings)
    return (
        <Box sx={{ border: "1px solid #E6E6EA", borderRadius: "10px" }}>
            {
                headings.length > 0 ?

                    headings.map((h: any, i: any) => {
                        return (
                            <Box key={i} sx={{ display: "flex", width: "100%", backgroundColor: i % 2 == 0 ? "#F7F7F9" : "fff", padding: "20px" }}>
                                {/* <Box sx={{ width: "20%" }}> */}
                                <Typography variant='body2' sx={{ width: "10%" }}>
                                    {h?.tagName}
                                </Typography>
                                <Typography variant='body2' sx={{ width: "90%" }}>
                                    {h?.textContent}
                                </Typography>
                                {/* </Box> */}
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