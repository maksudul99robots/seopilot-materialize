import { Box, LinearProgress, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material"
import ReactSpeedometer from "react-d3-speedometer"
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";


const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

const Metrics = (props: any) => {

    // const [heading, setHeading] = useState(60)
    const [title, setTitle] = useState(props.titleScore.score)
    const [word, setWord] = useState(props.wordScore.score)
    const [mainValue, setMainValue] = useState(0);

    useEffect(() => {
        setTitle(props.titleScore.score);
        setWord(props.wordScore.score);
        let x = parseFloat(((props.titleScore.score * 0.4) + (props.wordScore.score * 0.6)).toFixed(2));
        setMainValue(x)
    }, [props.titleScore.score, props.wordScore.score])

    return (
        <Box sx={{}}>

            <Box sx={{ borderRadius: "10px", border: "1px solid #E9E9EC", padding: "10px", marginTop: "5px" }}>
                <Box>

                    <ReactSpeedometer
                        value={mainValue}
                        labelFontSize="12px"
                        maxValue={100}
                        segments={10}
                        width={350}
                        ringWidth={30}
                        height={220}
                        valueTextFontSize="23px"
                    />
                </Box>
                <Box sx={{ backgroundColor: "#F7F7F9", padding: "5px", borderRadius: "10px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <LightTooltip title={
                            props.titleScore.msg
                        } placement="top">
                            <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>

                                Title</Typography>

                        </LightTooltip>

                        <Box sx={{ width: "75%" }}>

                            <ProgressBar completed={(title).toFixed(0)} bgColor="#2979FF" />


                        </Box>

                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>Words</Typography>
                        <Box sx={{ width: "75%" }}>
                            <ProgressBar completed={(word).toFixed(0)} bgColor="#2979FF" />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>Keyword</Typography>
                        <Box sx={{ width: "75%" }}>
                            {/* <ProgressBar completed={(word).toFixed(0)} bgColor="#2979FF" /> */}
                            <Typography variant="caption" sx={{ fontStyle: "italic" }}>Coming soon</Typography>
                        </Box>
                    </Box>



                </Box>

            </Box>
        </Box >

    )
}
export default Metrics