import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export const AssignedTo = () => {
    return <Box sx={{ padding: "5px" }}>
        <Box sx={{ display: "flex", }}>
            <Typography sx={{ fontWeight: "400", fontSize: "11px" }}>Assigned to:</Typography>
            <Typography sx={{ fontWeight: "500", fontSize: "11px" }}>&nbsp;Maksudul Hasan</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: "400", fontSize: "11px" }}>Due Date:</Typography>
            <Typography sx={{ fontWeight: "500", fontSize: "11px" }}>&nbsp;6/14/2024, 3:13 AM</Typography>
        </Box>

    </Box>
}