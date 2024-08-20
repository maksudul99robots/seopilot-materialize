import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Icon from 'src/@core/components/icon'
import { LoginRegistrationAPI } from "src/services/API"
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled, Typography } from "@mui/material";
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
        <Box id="gsc-stats-parent" sx={{ display: "flex", justifyContent: "start" }}>
            {
                summary &&
                <>
                    <Box className="gsc-stats" sx={{ borderRadius: "4px", border: "1px solid #E9E9EC", marginRight: "10px", padding: "5px" }}>
                        <Box sx={{ display: "flex", }}>
                            <Box title="Clicks"><Icon icon={!summary?.clicksChange?.startsWith("-") ? "solar:arrow-up-line-duotone" : 'solar:arrow-down-line-duotone'} style={{
                                fontSize: "25px",
                                marginTop: "2px",
                                marginLeft: "5px",
                                marginRight: "5px",
                                color: !summary?.clicksChange?.startsWith("-") ? "green" : 'red'
                            }} ></Icon></Box>
                            <Box sx={{ marginRight: "10px", color: "#F6C002", display: "flex", }}>{summary?.clicks}
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

                        </Box>
                        <Typography variant="subtitle2" sx={{ paddingLeft: "10px" }}>Clicks</Typography>
                    </Box>
                    <Box className="gsc-stats" sx={{ borderRadius: "4px", border: "1px solid #E9E9EC", marginRight: "10px", padding: "5px" }}>
                        <Box sx={{ display: "flex", }}>
                            <Box title="Impressions"><Icon icon={!summary?.impressionsChange?.startsWith("-") ? "solar:arrow-up-line-duotone" : 'solar:arrow-down-line-duotone'} style={{
                                fontSize: "25px",
                                marginTop: "3px",
                                marginLeft: "5px",
                                marginRight: "5px",
                                color: !summary?.impressionsChange?.startsWith("-") ? "green" : 'red'
                            }}></Icon></Box>
                            <Box sx={{ marginRight: "10px", color: "#1B84FF", display: "flex" }}>{summary?.impressions}
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
                        </Box>
                        <Typography variant="subtitle2" sx={{ paddingLeft: "10px" }}>Impressions</Typography>
                    </Box>
                    <Box className="gsc-stats" sx={{ borderRadius: "4px", border: "1px solid #E9E9EC", marginRight: "10px", padding: "5px" }}>
                        <Box sx={{ display: "flex", }}>
                            <Box title="CTR"><Icon icon={!summary?.ctrChange?.startsWith("-") ? "solar:arrow-up-line-duotone" : 'solar:arrow-down-line-duotone'} style={{
                                fontSize: "25px",
                                marginTop: "2px",
                                marginLeft: "5px",
                                marginRight: "5px",
                                color: !summary?.ctrChange?.startsWith("-") ? "green" : 'red'
                            }}></Icon></Box>
                            <Box sx={{ marginRight: "10px", color: "#41007A", display: "flex" }}>{summary ? (summary?.ctr * 100)?.toFixed(2) : ''}
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
                        </Box>
                        <Typography variant="subtitle2" sx={{ paddingLeft: "10px" }}>CTR</Typography>
                    </Box>
                    <Box className="gsc-stats" sx={{ borderRadius: "4px", border: "1px solid #E9E9EC", marginRight: "10px", padding: "5px" }}>
                        <Box sx={{ display: "flex", }}>
                            <Box title="Position"><Icon icon={!summary?.positionChange?.startsWith("-") ? "solar:arrow-up-line-duotone" : 'solar:arrow-down-line-duotone'} style={{
                                fontSize: "25px",
                                marginTop: "2px",
                                marginLeft: "5px",
                                marginRight: "5px",
                                color: !summary?.positionChange?.startsWith("-") ? "green" : 'red'
                            }}></Icon></Box>
                            <Box sx={{ marginRight: "5px", color: "#16C653", display: "flex" }}>{summary?.position?.toFixed(2)}
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
                        </Box>
                        <Typography variant="subtitle2" sx={{ paddingLeft: "10px" }}>Position</Typography>
                    </Box>

                </>
            }
        </Box>
    )
}

export default GSCSummary