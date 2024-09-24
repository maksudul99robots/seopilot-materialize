import { Card, CardHeader, CardContent, Collapse, IconButton, Typography, Link, Box } from '@mui/material';
import Icon from "src/@core/components/icon"
import { useState } from "react";

export const PaaSuggestions = (props: any) => {
    // const [collapsedIndices, setCollapsedIndices] = useState<{ [key: number]: boolean }>({});

    return (


        <Box sx={{ width: '100%', marginTop: "10px" }}>
            {props.paa ? (
                props.paa?.length > 0 ? (
                    props.paa.map((q: any, index: number) => (
                        q.length > 0 && (
                            <Card key={index} sx={{ marginBottom: "5px", marginTop: "5px", padding: "5px" }}>
                                <Box key={index} sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    // border: "1px solid #EBEBEF",
                                    // borderRadius: "5px",
                                    // marginBottom: "5px"
                                }}>
                                    <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%" }}>

                                        <Typography
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: "12px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                paddingLeft: "10px"
                                            }}
                                            title={q}
                                        >
                                            {q.length > 45 ? `${q.substring(0, 45)}...` : q}
                                        </Typography>
                                    </Box>

                                    <Icon
                                        icon={`radix-icons:copy`}
                                        className="add-icon-color"
                                        style={{ padding: "5px 5px 5px 2px", fontSize: "26px" }}
                                        onClick={() => {
                                            props.insertHeader(
                                                q,
                                                props.lastSelectionOnePoint,
                                                props.lastCurrentStateOnePoint,
                                                'header-two'
                                            );
                                        }}
                                    />
                                </Box>

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