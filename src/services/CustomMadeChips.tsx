import { Box } from "@mui/material"

export const CustomMadeChips = ({ name, color, backgroundColor, width = null, height = null }: any) => {
    return (
        <Box
            sx={{ borderRadius: "15px", color: color, backgroundColor: backgroundColor, paddingX: "15px", paddingY: "2px", textTransform: "capitalize", width: width, height: height }}
        >
            {name}
        </Box>
    )
}