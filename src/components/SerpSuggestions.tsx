import { Chip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CustomMadeChips } from "src/services/CustomMadeChips"
import { toast } from "react-toastify";
import Link from "next/link";
import Icon from "src/@core/components/icon"

export const SerpSuggestions = (props: any) => {
    // console.log("serp:", props.serp)
    return (
        <Box sx={{ width: '100%', marginTop: "10px" }}>
            {props.serp.length > 0 ?
                props.serp.map((ks: any, index: number) => (
                    <div style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        padding: "5px"
                    }} >
                        <Typography variant="body1" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}>{ks.title}</Typography>
                        <Link key={index}
                            target="_blank"
                            style={{
                                width: '100%',
                                paddingBottom: '20px',
                                fontSize: "12px",
                                textDecoration: "none"
                            }} // Added margin for spacing
                            href={ks.url}
                            className="links"
                        >
                            {ks.url}
                        </Link>
                        <br />
                    </div>


                ))
                : <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Icon icon="line-md:loading-twotone-loop" />
                </Box>
            }
        </Box>
    )
}