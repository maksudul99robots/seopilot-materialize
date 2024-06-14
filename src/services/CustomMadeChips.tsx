import { Box } from "@mui/material"

export const CustomMadeChips = ({ name, color, backgroundColor }: any) => {
    return (
        <Box
            sx={{ borderRadius: "15px", color: color, backgroundColor: backgroundColor, paddingX: "15px", paddingY: "2px", textTransform: "capitalize" }}
        >
            {name}
        </Box>
    )
}