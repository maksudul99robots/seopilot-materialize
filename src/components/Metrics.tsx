import { Box, LinearProgress, Typography } from "@mui/material"
import ReactSpeedometer from "react-d3-speedometer"
import ProgressBar from "@ramonak/react-progress-bar";

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
                        valueTextFontSize="23px"
                    />
                </Box>
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#F7F7F9" }}>
                        <Typography sx={{ width: "30%", textAlign: "start", paddingLeft: "5px" }}>Title</Typography>
                        <Box sx={{ width: "70%" }}>
                            <ProgressBar completed={70} bgColor="#2979FF" />
                        </Box>

                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ width: "30%", textAlign: "start", paddingLeft: "5px" }}>Headings </Typography>
                        <Box sx={{ width: "70%" }}>
                            <ProgressBar completed={80} bgColor="#2979FF" />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#F7F7F9" }}>
                        <Typography sx={{ width: "30%", textAlign: "start", paddingLeft: "5px" }}>Words</Typography>
                        <Box sx={{ width: "70%" }}>
                            <ProgressBar completed={60} bgColor="#2979FF" />
                        </Box>
                    </Box>



                </Box>

            </Box>
        </Box>

    )
}
export default Metrics