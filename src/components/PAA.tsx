import { Chip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Icon from "src/@core/components/icon"
import { toast } from "react-toastify";

export const PAA = (props: any) => {
    // console.log("serp:", props.serp)
    return (
        <Box sx={{ width: '100%', marginTop: "10px", }}>
            {
                props.paa ?
                    (props.paa.length > 0 ?
                        props.paa.map((ks: any, index: number) => (
                            <div key={index} style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                padding: "2px",
                                width: "100%"
                            }} className="paa">
                                <Typography variant="body2" sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",

                                }} title={ks.ppa} onClick={() => {
                                    function listener(e: any) {
                                        e.clipboardData.setData("text/html", ks.paa);
                                        e.clipboardData.setData("text/plain", ks.paa);
                                        e.preventDefault();
                                    }
                                    document.addEventListener("copy", listener);
                                    document.execCommand("copy");
                                    document.removeEventListener("copy", listener);
                                    toast('Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                                }}>{ks.paa}</Typography>
                            </div>
                        ))
                        : <Typography variant="body2" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            textAlign: "center"
                        }}>No PAA Found</Typography>
                    )
                    :
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Icon icon="line-md:loading-twotone-loop" />
                    </Box>
            }
        </Box>
    )
}