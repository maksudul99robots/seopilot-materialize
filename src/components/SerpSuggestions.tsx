import { Chip } from "@mui/material"
import { Box } from "@mui/system"
import { CustomMadeChips } from "src/services/CustomMadeChips"
import { toast } from "react-toastify";
import Link from "next/link";

export const SerpSuggestions = (props: any) => {
    console.log("serp:", props.serp)
    return (
        <Box sx={{ width: '100%', marginTop: "10px" }}>
            {props.serp.length > 0 &&
                props.serp.map((ks: any, index: number) => (
                    <div style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        padding: "5px"
                    }}>
                        <Link key={index}
                            target="_blank"
                            style={{
                                width: '100%',
                                paddingBottom: '15px',
                                fontSize: "12px",
                                textDecoration: "none"
                            }} // Added margin for spacing
                            href={ks}
                            className="links"
                        // onClick={() => {
                        //     function listener(e: any) {
                        //         e.clipboardData.setData("text/html", ks.keyword);
                        //         e.clipboardData.setData("text/plain", ks.keyword);
                        //         e.preventDefault();
                        //     }
                        //     document.addEventListener("copy", listener);
                        //     document.execCommand("copy");
                        //     document.removeEventListener("copy", listener);
                        //     toast('Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                        // }}
                        >
                            {ks}
                        </Link>
                        <br />
                    </div>


                ))
            }
        </Box>
    )
}