import { Chip } from "@mui/material"
import { Box } from "@mui/system"
import { CustomMadeChips } from "src/services/CustomMadeChips"
import { toast } from "react-toastify";

export const KeywordSuggestions = (props: any) => {
    // console.log("keywordSuggestions:", props.keywordSuggestions)
    return (
        <Box sx={{ wordWrap: "break-word", whiteSpace: "normal", width: '300px', marginTop: "10px" }}>
            {props.keywordSuggestions.length > 0 &&
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
            }
        </Box>
    )
}