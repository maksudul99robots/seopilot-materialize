import { Box, Grid, LinearProgress, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material"
import ReactSpeedometer from "react-d3-speedometer"
// import ProgressBar from "@ramonak/react-progress-bar";
import { LinearProgressProps } from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import MetricsTabs from "./MetricsTabs";
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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

import LoadingOverlay from "react-loading-overlay-ts";

const Metrics = (props: any) => {

    // const [heading, setHeading] = useState(60)
    // console.log("wordScore:", props.wordScore)
    // console.log("termScore:", props.termScore)
    // console.log("linkScore:", props.linkScore)
    // console.log("headingScore:", props.headingScore)
    const [title, setTitle] = useState(props.titleScore.score)
    const [word, setWord] = useState(props.wordScore.score)
    const [term, setTerm] = useState(props.termScore.score)
    const [link, setLink] = useState(props.linkScore.score)
    const [heading, setHeading] = useState(props.headingScore.score)
    const [mainValue, setMainValue] = useState(0);
    // console.log("props.linkScore:", props.linkScore)
    useEffect(() => {
        setTitle(props.titleScore.score);
        setWord(props.wordScore.score);
        setTerm(props.termScore.score)
        setLink(props.linkScore.score)
        setHeading(props.headingScore.score)
        let x = (props.headingScore.score * 0.2) + (props.wordScore.score * 0.2) + (props.termScore.score * 0.4) + (props.linkScore.score * 0.2);
        // console.log("x:", x)
        // console.log(props.headingScore.score, props.wordScore.score, props.termScore.score,)
        setMainValue(customRound(x))
    }, [props.headingScore.score, props.wordScore.score, props.termScore.score, props.linkScore.score])
    function customRound(number: number) {
        const roundedNumber = Math.round(number * 100) / 100; // Round to two decimal places
        // console.log("roundedNumber:", roundedNumber)
        return Math.round(roundedNumber); // Round to the nearest integer
    }


    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Box sx={{}}>

            <Box sx={{ borderRadius: "4px", border: "1px solid #E9E9EC", padding: "10px", marginTop: "5px" }}>
                <LoadingOverlay active={props.loading} spinner text="Metrics Loading...">
                    <div >
                        <Box>

                            <ReactSpeedometer
                                value={mainValue}
                                labelFontSize="12px"
                                maxValue={100}
                                segments={10}
                                width={350}
                                ringWidth={20}
                                height={220}
                                needleHeightRatio={0.8}
                                valueTextFontSize="20px"
                            />
                        </Box>
                        <Box sx={{ backgroundColor: "#F7F7F9", padding: "5px", borderRadius: "4px" }}>
                            <Grid container padding={3}>

                                <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "12px", borderRight: "1px solid #e8e8ee" }}>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 400, margin: "5px" }}>Words</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "5px", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>{props.wordCount}</Typography>
                                        <Icon icon={props.wordScore.arrow} style={{ fontSize: "15px", color: props.wordScore.arrow == 'tdesign:arrow-down' ? 'red' : 'green' }} />
                                    </Box>

                                    <LightTooltip title={
                                        <div>
                                            {props.wordScore.msg}
                                            <img src="https://media.giphy.com/media/iPg2OZbNXc7uM/giphy.gif" />
                                        </div>
                                    } placement="top">
                                        <Box>
                                            <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>{props.metricsComp?.avg?.avg_wc ? Math.trunc(props.metricsComp?.avg?.avg_wc) : 0}</Typography>


                                        </Box>

                                    </LightTooltip>

                                </Grid>
                                <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "12px", borderRight: "1px solid #e8e8ee" }}>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 400, margin: "5px" }}>Headings</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "5px", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>{props.headings}</Typography>
                                        <Icon icon={props.headingScore.arrow} style={{ fontSize: "15px", color: props.headingScore.arrow == 'tdesign:arrow-down' ? 'red' : 'green' }} />
                                    </Box>

                                    <LightTooltip title={
                                        <div>
                                            {props.headingScore.msg}
                                        </div>
                                    } placement="top">
                                        <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>{props.metricsComp?.avg?.avg_h ? Math.trunc(props.metricsComp?.avg?.avg_h) : 0}</Typography>

                                    </LightTooltip>

                                </Grid>
                                <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "12px", borderRight: "1px solid #e8e8ee" }}>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 400, margin: "5px" }}>Links</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "5px", alignItems: "center", }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>{props.link}</Typography>
                                        <Icon icon={props.linkScore.arrow} style={{ fontSize: "15px", color: props.linkScore.arrow == 'tdesign:arrow-down' ? 'red' : 'green' }} />
                                    </Box>

                                    <LightTooltip title={
                                        <div>
                                            {props.linkScore.msg}
                                        </div>
                                    } placement="top">
                                        <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>{props.metricsComp?.avg?.avg_urls ? Math.trunc(props.metricsComp?.avg?.avg_urls) : 0}</Typography>

                                    </LightTooltip>

                                </Grid>
                                <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "12px" }}>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 400, margin: "5px" }}>Terms</Typography>
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "5px", alignItems: "center" }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>{Math.trunc(props.keywordCount)}</Typography>
                                        <Icon icon={props.termScore.arrow} style={{ fontSize: "15px", color: props.termScore.arrow == 'tdesign:arrow-down' ? 'red' : 'green' }} />
                                    </Box>

                                    <LightTooltip title={
                                        <div>
                                            {props.termScore?.msg ? props.termScore?.msg : 'Ideally, the target keyword should make up about 2% of the entire article.'}
                                        </div>
                                    } placement="top">
                                        <Typography sx={{ fontWeight: 300, fontSize: "12px" }}>{Math.trunc(props.termScore?.idealPKcount)}</Typography>

                                    </LightTooltip>

                                </Grid>

                            </Grid>
                        </Box>
                    </div>
                </LoadingOverlay>

                {/* <Box sx={{ backgroundColor: "#F7F7F9", padding: "5px", borderRadius: "4px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: "10px" }}>
                        <LightTooltip title={
                            props.titleScore.msg
                        } placement="top">
                            <Typography sx={{ width: "25%", textAlign: "start", paddingLeft: "5px" }}>

                                Title</Typography>

                        </LightTooltip>

                        <Box sx={{ width: "75%" }}>

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
                            <LinearProgressWithLabel value={(link).toFixed(0)} />
                        </Box>
                    </Box>



                </Box> */}

                {/* <Box sx={{ width: "100%", margin: "20px 0px 10px 0px", display: "flex", justifyContent: "space-between" }}>

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
                                    <Icon icon='tabler:heading' style={{ fontSize: "28px" }} />
                                </CustomAvatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='caption'>Headings</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>{props.headings}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomAvatar skin='light' sx={{ mr: 1, width: "35px", height: "35px" }} variant='rounded'>
                                    <Icon icon='tabler:link' style={{ fontSize: "28px" }} />
                                </CustomAvatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='caption'>Links</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>{props.linkScore.links}</Typography>
                                </Box>
                            </Box>
                        </>
                    }

                </Box> */}

                <MetricsTabs
                    keywordSuggestions={props.keywordSuggestions}
                    serp={props.serp}
                    primaryKeyword={props.primaryKeyword}
                    paa={props.paa}
                    metricsComp={props.metricsComp}
                    insertHeader={props.insertHeader}
                    lastSelectionOnePoint={props.lastSelectionOnePoint}
                    lastCurrentStateOnePoint={props.lastCurrentStateOnePoint}
                />
            </Box>
        </Box >

    )
}
export default Metrics