import { Chip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CustomMadeChips } from "src/services/CustomMadeChips"
import { toast } from "react-toastify";
import Icon from "src/@core/components/icon"

export const KeywordSuggestions = (props: any) => {
    // console.log("keywordSuggestions:", props.keywordSuggestions)
    return (
        <Box sx={{ wordWrap: "break-word", whiteSpace: "normal", width: '100%', marginTop: "10px" }}>
            {
                props.primaryKeyword &&
                <Box sx={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ marginRight: "5px", fontSize: "12px" }}>Target Keyword:</Typography>
                    <Typography sx={
                        {
                            borderRadius: '5px',
                            color: "#009539",
                            backgroundColor: "#e2feed",
                            width: "fit-content",
                            padding: "5px",
                            fontSize: "14px"
                        }
                    }>{props.primaryKeyword}</Typography>
                </Box>
            }

            <Typography variant="body2" sx={{ marginRight: "5px", fontSize: "12px" }}>Keyword suggestions:</Typography>
            {
                props.keywordSuggestions ?
                    (
                        props.keywordSuggestions.length > 0 ?
                            props.keywordSuggestions.map((ks: any, index: number) => (
                                <p key={index} className={ks.count == 0 ? "keyword-unused" : "keyword-used"}
                                    style={{ display: 'inline-block', marginRight: '8px', marginBottom: '1px', fontSize: "10px" }} // Added margin for spacing
                                    onClick={() => {
                                        function listener(e: any) {
                                            e.clipboardData.setData("text/html", ks.keyword);
                                            e.clipboardData.setData("text/plain", ks.keyword);
                                            e.preventDefault();
                                        }
                                        document.addEventListener("copy", listener);
                                        document.execCommand("copy");
                                        document.removeEventListener("copy", listener);
                                        toast('Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                                    }}
                                >
                                    {ks.keyword} | {ks.count}
                                </p>
                            ))
                            :
                            <Typography variant="body2" sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                textAlign: "center"
                            }}>No Keyword Suggestions Found</Typography>
                    )
                    :
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Icon icon="line-md:loading-twotone-loop" />
                    </Box>
            }
        </Box >
    )
}