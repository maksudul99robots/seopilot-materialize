import { Card, CardHeader, CardContent, Collapse, IconButton, Typography, Link, Box } from '@mui/material';
import { padding } from "@mui/system"
import { CustomMadeChips } from "src/services/CustomMadeChips"
import { toast } from "react-toastify";
import Icon from "src/@core/components/icon"
import { useState } from "react";

export const SerpSuggestions = (props: any) => {
    // console.log("metricsComp:", props.metricsComp)
    const [collapsedIndices, setCollapsedIndices] = useState<{ [key: number]: boolean }>({});

    const toggleCollapse = (index: number) => {
        setCollapsedIndices((prev: any) => ({ ...prev, [index]: !prev[index] }));
    };
    return (
        // <Box sx={{ width: '100%', marginTop: "10px" }}>
        //     {
        //         props.metricsComp ?
        //             (props.metricsComp.serps?.length > 0 ?
        //                 props.metricsComp.serps.map((ks: any, index: number) => (
        //                     ks?.outline.length > 0 &&
        //                     <Accordion key={index} sx={{ width: '100%', justifyContent: "space-between" }}>
        //                         <AccordionSummary expandIcon={<Icon icon='mdi:chevron-down' />} sx={{
        //                             overflow: "hidden",
        //                             textOverflow: "ellipsis",
        //                             whiteSpace: "nowrap",
        //                             width: '100%',
        //                             justifyContent: "space-between",
        //                             padding: "5px 5px 5px 10px"
        //                         }}>
        //                             <Box>
        //                                 <Typography sx={{
        //                                     fontWeight: '500',
        //                                     fontSize: "11px",
        //                                     overflow: "hidden",
        //                                     textOverflow: "ellipsis",
        //                                     whiteSpace: "nowrap",
        //                                     textAlign: 'start',
        //                                     width: '100%'
        //                                 }} title={ks.title}>{ks.title.length > 45 ? `${ks.title.substring(0, 45)}...` : ks.title}</Typography>

        //                             </Box>

        //                         </AccordionSummary>
        //                         <AccordionDetails sx={{ padding: "5px 5px 5px 10px" }}>
        //                             {/* <Typography sx={{
        //                                 color: 'text.secondary', fontSize: "12px", overflow: "hidden",
        //                                 textOverflow: "ellipsis",
        //                                 whiteSpace: "nowrap",
        //                                 }}> */}
        //                             <Link href={ks.url} target="_blank" style={{ marginBottom: "10px", fontSize: "11px" }}>
        //                                 {ks.url.length > 50 ? `${ks.url.substring(0, 50)}...` : ks.url}
        //                             </Link>
        //                             <Box sx={{
        //                                 marginTop: "10px",
        //                                 marginLeft: "0px"
        //                             }}>
        //                                 {ks?.outline?.map((outline: any, ksi: number) => (
        //                                     <Box key={ksi} sx={{
        //                                         display: "flex",
        //                                         justifyContent: "space-between",
        //                                         alignItems: "center",
        //                                         marginLeft:
        //                                             outline.tagName.toLowerCase() == 'h1' ? "0px" :
        //                                                 outline.tagName.toLowerCase() == 'h2' ? "10px" :
        //                                                     outline.tagName.toLowerCase() == 'h3' ? "20px" :
        //                                                         outline.tagName.toLowerCase() == 'h4' ? "30px" :
        //                                                             outline.tagName.toLowerCase() == 'h5' ? "40px" :
        //                                                                 outline.tagName.toLowerCase() == 'h6' ? "50px" : '',
        //                                         border: "1px solid #EBEBEF",
        //                                         borderRadius: "5px",
        //                                         marginBottom: "5px"


        //                                     }}>
        //                                         <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%" }}>
        //                                             <Icon icon={`ci:heading-${outline.tagName.toLowerCase()}`} style={{
        //                                                 padding: "5px 5px 5px 2px",
        //                                                 fontSize: "30px",
        //                                                 color: outline.tagName.toLowerCase() == 'h1' ? "#4A7F21" :
        //                                                     outline.tagName.toLowerCase() == 'h2' ? "#214B7F" :
        //                                                         outline.tagName.toLowerCase() == 'h3' ? "#5DA327" :
        //                                                             outline.tagName.toLowerCase() == 'h4' ? "#A38627" :
        //                                                                 outline.tagName.toLowerCase() == 'h5' ? "#E5BF3F" :
        //                                                                     outline.tagName.toLowerCase() == 'h6' ? "#6C08FF" : '',
        //                                                 // border: "1px solid #EBEBEF",

        //                                             }} />
        //                                             <Typography key={ksi} sx={{
        //                                                 color: 'text.secondary', fontSize: "11px", overflow: "hidden",
        //                                                 textOverflow: "ellipsis",
        //                                                 whiteSpace: "nowrap",
        //                                                 // marginRight: "5px"
        //                                             }} title={outline.textContent}>{outline.textContent.length > 45 ? `${outline.textContent.substring(0, 45)}...` : outline.textContent}</Typography>

        //                                         </Box>

        //                                         <Icon icon={`radix-icons:copy`} className="add-icon-color" style={{
        //                                             padding: "5px 5px 5px 2px",
        //                                             fontSize: "26px",
        //                                             // color: outline.tagName.toLowerCase() == 'h1' ? "#4A7F21" :
        //                                             //     outline.tagName.toLowerCase() == 'h2' ? "#214B7F" :
        //                                             //         outline.tagName.toLowerCase() == 'h3' ? "#5DA327" :
        //                                             //             outline.tagName.toLowerCase() == 'h4' ? "#A38627" :
        //                                             //                 outline.tagName.toLowerCase() == 'h5' ? "#492381" :
        //                                             //                     outline.tagName.toLowerCase() == 'h6' ? "#6C08FF" : '',
        //                                             // // border: "1px solid #EBEBEF",

        //                                         }} onClick={() => {
        //                                             props.insertHeader(
        //                                                 outline.textContent,
        //                                                 props.lastSelectionOnePoint,
        //                                                 props.lastCurrentStateOnePoint,
        //                                                 outline.tagName.toLowerCase() == 'h1' ? "header-one" :
        //                                                     outline.tagName.toLowerCase() == 'h2' ? "header-two" :
        //                                                         outline.tagName.toLowerCase() == 'h3' ? "header-three" :
        //                                                             outline.tagName.toLowerCase() == 'h4' ? "header-four" :
        //                                                                 outline.tagName.toLowerCase() == 'h5' ? "header-five" :
        //                                                                     outline.tagName.toLowerCase() == 'h6' ? "header-six" : ''

        //                                             )

        //                                         }} />

        //                                     </Box>

        //                                 ))}
        //                             </Box>
        //                             {/* </Typography> */}

        //                         </AccordionDetails>
        //                     </Accordion>
        //                     // </Box>



        //                 ))
        //                 : <Typography variant="body2" sx={{
        //                     overflow: "hidden",
        //                     textOverflow: "ellipsis",
        //                     whiteSpace: "nowrap",
        //                     textAlign: "center"
        //                 }}>No SERP Found</Typography>
        //             )
        //             :
        //             <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        //                 <Icon icon="line-md:loading-twotone-loop" />
        //             </Box>
        //     }

        // </Box >

        <Box sx={{ width: '100%', marginTop: "10px" }}>
            {props.metricsComp ? (
                props.metricsComp.serps?.length > 0 ? (
                    props.metricsComp.serps.map((ks: any, index: number) => (
                        ks?.outline.length > 0 && (
                            <Card key={index} sx={{ marginBottom: "5px", marginTop: "5px", padding: "0px" }}>
                                <CardHeader
                                    sx={{ padding: "10px 0px 10px 10px", width: "100%", overflow: "hidden" }}
                                    title={
                                        <Box>
                                            {/* Title */}
                                            <Typography sx={{
                                                fontWeight: '600',
                                                fontSize: "12px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                textAlign: 'start',
                                                width: '100%',
                                                padding: "0px !important"
                                            }} title={ks.title}>
                                                {ks.title.length > 40 ? `${ks.title.substring(0, 40)}...` : ks.title}
                                            </Typography>

                                            {/* URL */}
                                            <Link href={ks.url} target="_blank" sx={{ fontSize: "11px", display: "block", width: "100%" }}>
                                                {ks.url.length > 40 ? `${ks.url.substring(0, 40)}...` : ks.url}
                                            </Link>
                                        </Box>
                                    }
                                    action={
                                        <IconButton
                                            size="small"
                                            aria-label="collapse"
                                            sx={{ color: 'text.secondary' }}
                                            onClick={() => toggleCollapse(index)}
                                        >
                                            <Icon fontSize={20} icon={!collapsedIndices[index] ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                                        </IconButton>
                                    }
                                />

                                <Collapse in={collapsedIndices[index]}>
                                    <CardContent sx={{ padding: "10px 10px 10px 10px" }}>
                                        {/* Outline List */}
                                        <Box sx={{ marginTop: "10px", marginLeft: "0px" }}>
                                            {ks?.outline?.map((outline: any, ksi: number) => (
                                                <Box key={ksi} sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginLeft:
                                                        outline.tagName.toLowerCase() === 'h1' ? "0px" :
                                                            outline.tagName.toLowerCase() === 'h2' ? "10px" :
                                                                outline.tagName.toLowerCase() === 'h3' ? "20px" :
                                                                    outline.tagName.toLowerCase() === 'h4' ? "30px" :
                                                                        outline.tagName.toLowerCase() === 'h5' ? "40px" :
                                                                            outline.tagName.toLowerCase() === 'h6' ? "50px" : '',
                                                    border: "1px solid #EBEBEF",
                                                    borderRadius: "5px",
                                                    marginBottom: "5px"
                                                }}>
                                                    <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%" }}>
                                                        <Icon
                                                            icon={`gridicons:heading-${outline.tagName.toLowerCase()}`}
                                                            style={{
                                                                padding: "3px",
                                                                fontSize: "30px",
                                                                color: outline.tagName.toLowerCase() === 'h1' ? "#4A7F21" :
                                                                    outline.tagName.toLowerCase() === 'h2' ? "#214B7F" :
                                                                        outline.tagName.toLowerCase() === 'h3' ? "#5DA327" :
                                                                            outline.tagName.toLowerCase() === 'h4' ? "#A38627" :
                                                                                outline.tagName.toLowerCase() === 'h5' ? "#E5BF3F" :
                                                                                    outline.tagName.toLowerCase() === 'h6' ? "#6C08FF" : '',
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                color: 'text.secondary',
                                                                fontSize: "11px",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap"
                                                            }}
                                                            title={outline.textContent}
                                                        >
                                                            {outline.textContent.length > 45 ? `${outline.textContent.substring(0, 45)}...` : outline.textContent}
                                                        </Typography>
                                                    </Box>

                                                    <Icon
                                                        icon={`radix-icons:copy`}
                                                        className="add-icon-color"
                                                        style={{ padding: "5px 5px 5px 2px", fontSize: "26px" }}
                                                        onClick={() => {
                                                            props.insertHeader(
                                                                outline.textContent,
                                                                props.lastSelectionOnePoint,
                                                                props.lastCurrentStateOnePoint,
                                                                outline.tagName.toLowerCase() === 'h1' ? "header-one" :
                                                                    outline.tagName.toLowerCase() === 'h2' ? "header-two" :
                                                                        outline.tagName.toLowerCase() === 'h3' ? "header-three" :
                                                                            outline.tagName.toLowerCase() === 'h4' ? "header-four" :
                                                                                outline.tagName.toLowerCase() === 'h5' ? "header-five" :
                                                                                    outline.tagName.toLowerCase() === 'h6' ? "header-six" : ''
                                                            );
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        )
                    ))
                ) : (
                    <Typography variant="body2" sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center"
                    }}>
                        No SERP Found
                    </Typography>
                )
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Icon icon="line-md:loading-twotone-loop" />
                </Box>
            )}
        </Box>
    )
}