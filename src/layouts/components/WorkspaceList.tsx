
import { MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Box, Typography } from '@mui/material'
import { LoginRegistrationAPI } from 'src/services/API'
import { useAuth } from 'src/hooks/useAuth'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const WorkspaceList = (props: any) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [cw, setCw] = useState('');
    const auth = useAuth()
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }



    const handleClose = (id: any) => {
        // console.log("id:", id)
        if (props.current_workspace !== id) {
            LoginRegistrationAPI.checkoutWorkspace({ workspace_id: id }).then(res => {
                auth.setUserData(res);
            }).catch(e => {
                console.log(e);
            });
        }

        // LoginRegistrationAPI
        setAnchorEl(null)
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant='button' sx={{ marginRight: "10px" }}>Current Workspace: </Typography>
            <>
                <Button variant='outlined' color='secondary' className='outlined-btn-color' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
                    {props.cw}
                </Button>
                <Menu onClose={e => { setAnchorEl(null) }} keepMounted id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} sx={{ maxHeight: "500px" }}>
                    {
                        props.workspaces.map((w: any, i: any) => {

                            return (
                                <MenuItem key={i} onClick={e => handleClose(w.id)} sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", }}>{w.name.toUpperCase()}
                                    {

                                        props.current_workspace == w.id &&
                                        <Box sx={{ height: "10px", width: "10px", backgroundColor: "#72E128", borderRadius: "50%", marginLeft: "10px" }}>

                                        </Box>


                                    }
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
            </>

        </div>
    )
}

export default WorkspaceList