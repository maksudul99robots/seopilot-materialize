import { Box, Typography } from "@mui/material"
import ReactSpeedometer from "react-d3-speedometer"
const Metrics = () => {
    return (
        <Box sx={{}}>

            <Box sx={{ borderRadius: "10px", border: "1px solid #E9E9EC", padding: "10px", marginTop: "5px" }}>
                <Box>

                    <ReactSpeedometer
                        value={70}
                        labelFontSize="12px"
                        maxValue={100}
                        segments={10}
                        width={350}
                        ringWidth={30}
                        height={220}
                    />
                </Box>
                <Box>
                    <Typography >Title (Ideally 55-60 characters):</Typography>
                    <Typography >Headings: </Typography>
                    <Typography >Words:</Typography>
                </Box>

            </Box>
        </Box>

    )
}
export default Metrics