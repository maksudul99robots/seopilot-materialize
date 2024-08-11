import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Icon from 'src/@core/components/icon'
import { LoginRegistrationAPI } from "src/services/API"
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from "@mui/material";
import { useRouter } from "next/router";
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
import Swal from 'sweetalert2'
const GSCSummary = (props: any) => {
    const [summary, setSummary] = useState<any>()
    const router = useRouter()

    useEffect(() => {
        if (props.start && props.end) {
            LoginRegistrationAPI.getGSCSummaryInRange({ start: props.start, end: props.end }).then(res => {
                setSummary(res.data[0])
            }).catch(e => {
                if (e?.response?.data == 'No GSC Site Added') {
                    Swal.fire({
                        title: 'Error',
                        text: 'Please integrate your GSC in SEO Pilot.',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: "#2979FF"
                    }).then(() => {
                        router.push("/integrations")
                    })
                }

            })
        }

    }, [props.start, props.end])

    return (
        <Box sx={{ display: "flex", justifyContent: "start" }}>
            {
                summary &&
                <>
                    <Box title="Clicks"><Icon icon="mynaui:click" style={{ fontSize: "25px", marginTop: "2px", marginLeft: "5px", marginRight: "5px", color: "#5A69F9" }} ></Icon></Box>
                    <Box sx={{ marginRight: "10px", color: "#5A69F9", display: "flex" }}>{summary?.clicks}
                        <LightTooltip
                            title={
                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999" }}>
                                    {summary ? <><p>{summary?.prevClicks + ' Previous Period'} </p> <p> {!summary?.clicksChange?.startsWith("-") ? "+" : ''}{summary?.clicksChange + ' Clicks'}</p> </> : ''}
                                </p>
                            } placement="top"
                        >
                            <Box sx={{ fontSize: "14px", marginLeft: "5px" }}> {!summary?.clicksChange?.startsWith("-") ? "+" : ''}{summary?.clicksChange}</Box>
                        </LightTooltip>
                    </Box>
                    <Box title="Impressions"><Icon icon="mdi:show-outline" style={{ fontSize: "25px", marginTop: "3px", marginLeft: "5px", marginRight: "5px", color: "#B67C3A" }}></Icon></Box>
                    <Box sx={{ marginRight: "10px", color: "#B67C3A", display: "flex" }}>{summary?.impressions}
                        <LightTooltip
                            title={
                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                                    {summary ? <><p>{summary?.prevImpressions + ' Previous Period'} </p> <p>{!summary?.impressionsChange.includes("-") ? "+" : ''}{summary?.impressionsChange + ' impressions'}</p> </> : ''}
                                </p>
                            } placement="top"
                        >
                            <Box sx={{ fontSize: "14px", marginLeft: "5px" }}> {!summary?.impressionsChange.includes("-") ? "+" : ''}{summary?.impressionsChange}</Box>
                        </LightTooltip>
                    </Box>
                    <Box title="CTR"><Icon icon="ant-design:percentage-outlined" style={{ fontSize: "25px", marginTop: "2px", marginLeft: "5px", marginRight: "5px", color: "#7CC1F5" }}></Icon></Box>
                    <Box sx={{ marginRight: "10px", color: "#7CC1F5", display: "flex" }}>{summary ? (summary?.ctr * 100)?.toFixed(2) : ''}
                        <LightTooltip
                            title={
                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999" }}>
                                    {summary ? <><p>{(summary?.prevCtr * 100).toFixed(2) + '% Previous Period'} </p> <p> {!summary?.ctrChange?.startsWith("-") ? "+" : ''}{summary?.ctrChange + ' CTR'}</p> </> : ''}
                                </p>
                            } placement="top"
                        >
                            <Box sx={{ fontSize: "14px", marginLeft: "5px" }}> {!summary?.ctrChange?.startsWith("-") ? "+" : ''}{summary?.ctrChange}</Box>
                        </LightTooltip>
                    </Box>
                    <Box title="Position"><Icon icon="tdesign:arrow-up-down-2" style={{ fontSize: "25px", marginTop: "2px", marginLeft: "5px", marginRight: "5px", color: "#4E897C" }}></Icon></Box>
                    <Box sx={{ marginRight: "5px", color: "#4E897C", display: "flex" }}>{summary?.position?.toFixed(2)}
                        <LightTooltip
                            title={
                                <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999" }}>
                                    {summary ? <><p>{(summary?.prevPosition).toFixed(2) + ' Previous Period'} </p> <p> {!summary?.positionChange?.startsWith("-") ? "+" : ''}{summary?.positionChange + ' Position'}</p> </> : ''}
                                </p>
                            } placement="top"
                        >
                            <Box sx={{ fontSize: "14px", marginLeft: "5px" }}> {!summary?.positionChange?.startsWith("-") ? "+" : ''}{summary?.positionChange}</Box>
                        </LightTooltip>
                    </Box>
                </>
            }
        </Box>
    )
}

export default GSCSummary