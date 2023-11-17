import { Box } from '@mui/material'
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
                        return <>
                            <ListItem>
                                <ListItemText primary={h} sx={{ fontSize: "14px" }} />

                            </ListItem>
                            {
                                i == props.headings.length - 1 ?
                                    null :
                                    <Divider variant="middle" />
                            }

                        </>
                    })
                    : null
            }
        </Box>
    )

}