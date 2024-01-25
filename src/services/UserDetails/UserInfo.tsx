import { Box, Chip, Typography } from "@mui/material"
import { getDateTime } from "../DateTimeFormatter"

export const UserInfo = (props: any) => {
    return (
        <Box >
            <Typography variant='body1' sx={{ mb: 3, lineHeight: '2rem', fontWeight: 700, fontSize: "18px" }}>
                User Info
            </Typography>
            <Box sx={{ display: "flex" }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                    Email:&nbsp;
                </Typography>
                <Typography variant='body1' sx={{}}>
                    {props.user.email}
                </Typography>

            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                    Name:&nbsp;
                </Typography>
                <Typography variant='body1' sx={{}}>
                    {props.user.first_name} {props.user.last_name}
                </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                    Last Login:&nbsp;
                </Typography>
                <Typography variant='body1' sx={{}}>
                    {getDateTime(props.user.last_login)}
                </Typography>

            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                    Status:&nbsp;
                </Typography>
                <Typography variant='body1' sx={{}}>
                    {props.user.is_active ? <Chip label='Active' color='primary' size="small" /> : <Chip label='Inactive' color='warning' size="small" />}
                </Typography>

            </Box>
        </Box>
    )
}