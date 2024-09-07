import { Box, Grid, LinearProgress, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material"
import ReactSpeedometer from "react-d3-speedometer"
// import ProgressBar from "@ramonak/react-progress-bar";
import { LinearProgressProps } from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import MetricsTabs from "./MetricsTabs";
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

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


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

const Metrics = (props: any) => {

    // const [heading, setHeading] = useState(60)
    const [title, setTitle] = useState(props.titleScore.score)
    const [word, setWord] = useState(props.wordScore.score)
    const [term, setTerm] = useState(props.termScore.score)
    const [link, setLink] = useState(props.linkScore.score)
    const [mainValue, setMainValue] = useState(0);
    // console.log("keywordSuggestions:", props)
    useEffect(() => {
        setTitle(props.titleScore.score);
        setWord(props.wordScore.score);
        setTerm(props.termScore.score)
        setLink(props.linkScore.score)
        let x = parseFloat(((props.titleScore.score * 0.2) + (props.wordScore.score * 0.2) + (props.termScore.score * 0.4)).toFixed(2) + (props.linkScore.score * 0.2).toFixed(2));
        setMainValue(customRound(x))
    }, [props.titleScore.score, props.wordScore.score, props.termScore.score, props.linkScore.score])
    function customRound(number: number) {
        const roundedNumber = Math.round(number * 100) / 100; // Round to two decimal places
        return Math.round(roundedNumber); // Round to the nearest integer
    }
    return (
        <Box sx={{}}>

            <Box sx={{ borderRadius: "4px", border: "1px solid #E9E9EC", padding: "10px", marginTop: "5px" }}>
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
                <Box sx={{ backgroundColor: "#F7F7F9", padding: "5px", borderRadius: "4px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <LightTooltip title={
                            props.titleScore.msg
                        } placement="top">
                            <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>

                                Title</Typography>

                        </LightTooltip>

                        <Box sx={{ width: "75%" }}>

                            {/* <ProgressBar completed={(title).toFixed(0)} bgColor="#2979FF" borderRadius="4px" /> */}
                            <LinearProgressWithLabel value={(title).toFixed(0)} />

                        </Box>

                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <LightTooltip title={
                            <div>{props.wordScore.msg}
                            </div>
                        } placement="top">
                            <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>Words</Typography>

                        </LightTooltip>

                        <Box sx={{ width: "75%" }}>
                            {/* <ProgressBar completed={(word).toFixed(0)} bgColor="#2979FF" borderRadius="4px" /> */}
                            <LinearProgressWithLabel value={(word).toFixed(0)} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <LightTooltip title={
                            <div>{props.termScore.msg}<br></br>
                                Ideally, the target keyword should make up about 2% of the entire article.
                            </div>
                        } placement="top">
                            <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>

                                Terms</Typography>

                        </LightTooltip>
                        <Box sx={{ width: "75%" }}>
                            {/* <ProgressBar completed={(word).toFixed(0)} bgColor="#2979FF" /> */}
                            {/* <ProgressBar completed={(term)?.toFixed(0)} bgColor="#2979FF" borderRadius="4px" /> */}
                            <LinearProgressWithLabel value={(term).toFixed(0)} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <LightTooltip title={
                            <div>{props.linkScore.msg}
                            </div>
                        } placement="top">
                            <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>

                                Links</Typography>

                        </LightTooltip>
                        <Box sx={{ width: "75%" }}>
                            {/* <ProgressBar completed={(word).toFixed(0)} bgColor="#2979FF" /> */}
                            {/* <ProgressBar completed={(link)?.toFixed(0)} bgColor="#2979FF" borderRadius="4px" /> */}
                            <LinearProgressWithLabel value={(link).toFixed(0)} />
                        </Box>
                    </Box>



                </Box>

                <Box sx={{ width: "100%", margin: "20px 0px 10px 0px", display: "flex", justifyContent: "space-between" }}>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar skin='light' sx={{ mr: 1, width: "35px", height: "35px" }} variant='rounded'>
                            <Icon icon='material-symbols:match-word-rounded' style={{ fontSize: "28px" }} />
                        </CustomAvatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='caption'>Word Count</Typography>
                            <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>{props.wordCount}</Typography>
                        </Box>
                    </Box>
                    {(props.tokens != 0 && props?.tokens != undefined && props?.tokens != null) &&
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomAvatar skin='light' sx={{ mr: 1, width: "35px", height: "35px" }} variant='rounded'>
                                    <Icon icon='tabler:hash' style={{ fontSize: "28px" }} />
                                </CustomAvatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='caption'>Tokens Used</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>{props.tokens?.total_tokens}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomAvatar skin='light' sx={{ mr: 1, width: "35px", height: "35px" }} variant='rounded'>
                                    <Icon icon='ri:price-tag-3-line' style={{ fontSize: "28px" }} />
                                </CustomAvatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='caption'>Price</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>${props.price}</Typography>
                                </Box>
                            </Box>
                        </>
                    }

                </Box>

                <MetricsTabs keywordSuggestions={props.keywordSuggestions} serp={props.serp} primaryKeyword={props.primaryKeyword} paa={props.paa} />
            </Box>
        </Box >

    )
}
export default Metrics