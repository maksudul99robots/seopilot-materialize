import { Box, Typography } from '@mui/material'
// ** MUI Imports

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import Divider from '@mui/material/Divider';
// ** Icon Imports

export default function Headings(props: any) {
    return (
        <Box sx={{ border: "1px solid #EBEBEF", borderRadius: "10px", marginTop: "10px" }}>
            {
                props.headings ?

                    props?.headings.map((h: string, i: number) => {
                        return (
                            // <>
                            //     <ListItem>
                            //         <ListItemText primary={h} sx={{ fontSize: "14px" }} />

                            //     </ListItem>
                            //     {
                            //         i == props.headings.length - 1 ?
                            //             null :
                            //             <Divider variant="middle" />
                            //     }

                            // </>

                            <Box key={i} sx={{ display: "flex", width: "100%", backgroundColor: i % 2 == 0 ? "#F7F7F9" : "fff", padding: "20px" }}>
                                {/* <Box sx={{ width: "20%" }}> */}
                                <Typography variant='body1' sx={{ width: "10%", fontSize: "13px" }}>
                                    {h?.substring(0, 2)}
                                </Typography>
                                <Typography variant='body1' sx={{ width: "90%", fontSize: "13px" }}>
                                    {h?.substring(3, h.length)}
                                </Typography>
                                {/* </Box> */}
                                {
                                    i == props?.headings.length - 1 ?
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