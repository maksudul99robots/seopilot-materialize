import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { getDateTime } from "../DateTimeFormatter"

export const WorkspaceInfo = (props: any) => {
    return (
        <Box>
            <Typography variant='body1' sx={{ mb: 3, lineHeight: '2rem', fontWeight: 700, fontSize: "18px" }}>
                Workspaces
            </Typography>
            {
                props.user?.workspaces.map((w: any, i: number) => {
                    return (
                        <div style={{ border: "1px solid #F2F2F5", padding: "10px", margin: "5px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                {/* <Box> */}
                                <Typography variant='body1' sx={{ mb: 3, mr: 2, fontWeight: "600" }}>
                                    {i + 1}.
                                </Typography>
                                <Typography variant='body1' sx={{ mb: 3, mr: 2, fontWeight: "600" }}>
                                    Workspace Name: <span style={{ fontWeight: "400" }}>{w.name}</span>
                                </Typography>
                                <Typography variant='body1' sx={{ mb: 3, fontWeight: "600" }}>
                                    Created At: <span style={{ fontWeight: "400" }}>{getDateTime(w.createdAt)}</span>
                                </Typography>
                                {/* </Box> */}
                            </Box>
                            {
                                w.team.length > 0 &&
                                <Typography variant='body1' sx={{ mb: 3, fontWeight: 700, fontSize: "18px" }}>
                                    Team
                                </Typography>
                            }
                            {

                                w.team.map((t: any, j: number) => {
                                    return (
                                        <div style={{ marginLeft: "20px" }}>

                                            <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
                                                {/* <Box> */}
                                                <Typography variant='body1' sx={{ mb: 3, mr: 2, fontWeight: "600" }}>
                                                    {j + 1}.
                                                </Typography>
                                                <Typography variant='body1' sx={{ mb: 3, mr: 2, fontWeight: "600" }}>
                                                    Email: <span style={{ fontWeight: "400" }}>{t.user.email}</span>
                                                </Typography>
                                                <Typography variant='body1' sx={{ mb: 3, fontWeight: "600" }}>
                                                    Role: <span style={{ fontWeight: "400" }}>{t.role}</span>
                                                </Typography>
                                                {/* </Box> */}
                                            </Box>
                                        </div>
                                    )
                                })
                            }
                            {
                                w.wp_connects.length > 0 &&
                                <Typography variant='body1' sx={{ mb: 3, fontWeight: 700, fontSize: "18px" }}>
                                    Integrations
                                </Typography>
                            }
                            {

                                w.wp_connects.map((t: any, j: number) => {
                                    return (
                                        <div style={{ marginLeft: "20px" }}>

                                            <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
                                                {/* <Box> */}
                                                <Typography variant='body1' sx={{ mb: 3, mr: 2, fontWeight: "600" }}>
                                                    {j + 1}.
                                                </Typography>
                                                <Typography variant='body1' sx={{ mb: 3, mr: 2, fontWeight: "600" }}>
                                                    Address: <span style={{ fontWeight: "400" }}>{t.address}</span>
                                                </Typography>

                                            </Box>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    )
                })
            }
        </Box>
    )
}