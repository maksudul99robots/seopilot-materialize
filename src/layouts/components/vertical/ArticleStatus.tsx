import { FormControl, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { LoginRegistrationAPI } from "src/services/API"
import Swal from "sweetalert2"

export const ArticleStatus = (props: any) => {
    const [statusDropdown, setStatusDropdown] = useState<any>([])
    // console.log("props.articleStatus:", props.articleStatus)
    useEffect(() => {
        if (props.articleStatus.status == 'completed') {
            setStatusDropdown(['completed', 'review'])
        } else if (props.articleStatus.status == 'review' || props.articleStatus.status == 'ready_to_publish') {
            setStatusDropdown(['review', 'ready_to_publish'])
        } else {
            setStatusDropdown([props.articleStatus.status])
        }

    }, [props])
    return (
        <Box sx={{}}>
            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>Article Status:</Typography>
            <FormControl sx={{ marginRight: "10px" }}>
                <Select
                    placeholder='Article Status'
                    value={props.articleStatus.status}
                    sx={{ height: "30px", backgroundColor: "#fff", width: "100%", fontSize: "12px" }}
                    onChange={(e: any) => {
                        if (e.target.value && e.target.value != "") {
                            // props.setStatus(e.target.value)
                            props.updateArticleStatus({
                                status: e.target.value,
                                id: props.articleStatus.id
                            })
                            LoginRegistrationAPI.updateArticleStatus({ id: props.articleStatus.id, status: e.target.value }).then((res) => {
                                Swal.fire({
                                    title: 'Success',
                                    text: e.target.value == 'review' ? 'Marked as REVIEW REQUIRED' : 'Marked as READY TO PUBLISH' + " !",
                                    icon: 'success',
                                    confirmButtonText: 'Close',
                                    confirmButtonColor: "#2979FF",
                                })
                            }).catch((error: any) => {
                                Swal.fire(
                                    'Error',
                                    'Unable to changes status',
                                    'error'
                                )
                            })
                        }

                    }}
                >
                    {statusDropdown.map((s: any) => {
                        return <MenuItem value={s}>
                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                <Box sx={{
                                    height: "10px",
                                    width: "10px",
                                    backgroundColor: //"#72E128"
                                        s == 'completed' ? "#BFC4CC" :
                                            s == 'review' ? "#FA701C" :
                                                s == 'published' ? "#72E128" :
                                                    s == 'ready_to_publish' ? "#ECDB23" :
                                                        s == 'scheduled' ? "#D4E725" : "",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                    marginTop: "4px",
                                    display: "flex",
                                    alignItems: "center",

                                }}>
                                </Box>
                                <Typography sx={{ fontSize: "12px" }}>{
                                    s == 'completed' ? 'GENERATED' :
                                        s == 'review' ? 'REVIEW REQUIRED' :
                                            s == 'published' ? 'PUBLISHED' :
                                                s == 'scheduled' ? 'SCHEDULED' :
                                                    s == 'ready_to_publish' ? 'READY TO PUBLISH' : ''
                                }</Typography>
                            </Box>
                        </MenuItem>
                    })}
                    {/* <MenuItem value='incomplete'>
                                    <Box sx={{ display: "flex", }}>
                                        <Box sx={{ height: "10px", width: "10px", backgroundColor: "#2979FF", borderRadius: "50%", marginRight: "10px", marginTop: "8px", display: "flex", alignItems: "center" }}>
                                        </Box>
                                        <Typography>INCOMPLETE</Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem value='complete'>
                                    <Box sx={{ display: "flex", }}>
                                        <Box sx={{ height: "10px", width: "10px", backgroundColor: "#72E128", borderRadius: "50%", marginRight: "10px", marginTop: "8px", display: "flex", alignItems: "center" }}>
                                        </Box>
                                        <Typography>COMPLETE</Typography>
                                    </Box>
                                </MenuItem> */}
                </Select>
            </FormControl>
        </Box>
    )
}