
import { MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Box, FormControl, InputLabel, Select, Typography } from '@mui/material'
import { LoginRegistrationAPI } from 'src/services/API'
import { useAuth } from 'src/hooks/useAuth'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Swal from 'sweetalert2'

const WorkspaceList = (props: any) => {
    console.log("workspace props:", props)
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
        // <div style={{ display: "flex", flexDirection: "column" }}>
        //     {/* <Typography variant='button' sx={{ marginLeft: "10px", fontSize: "10px", textAlign: "start" }}>Current Workspace: </Typography> */}
        //     <>
        //         <Button variant='outlined' sx={{ marginLeft: "10px", marginBottom: "5px" }} color='secondary' size='small' className='outlined-btn-color' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        //             {props.cw}
        //         </Button>
        //         <Menu onClose={e => { setAnchorEl(null) }} keepMounted id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} sx={{ maxHeight: "500px" }}>
        //             {
        //                 props.workspaces.map((w: any, i: any) => {

        //                     return (
        //                         <MenuItem key={i} onClick={e => handleClose(w.id)} sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", }}>{w.name.toUpperCase()}
        //                             {

        //                                 props.current_workspace == w.id &&
        //                                 <Box sx={{ height: "10px", width: "10px", backgroundColor: "#72E128", borderRadius: "50%", marginLeft: "10px" }}>

        //                                 </Box>


        //                             }
        //                         </MenuItem>
        //                     )
        //                 })
        //             }
        //         </Menu>
        //     </>

        // </div>
        <Box sx={{ display: "flex", }}>
            {/* <Typography sx={{ fontWeight: "400", fontSize: "11px" }}>Assigned to:</Typography>
            <Typography sx={{ fontWeight: "500", fontSize: "11px" }}>&nbsp;{props.assignedTo.user.first_name} {props.assignedTo.user.last_name}</Typography> */}

            <FormControl fullWidth sx={{ marginBottom: "0px", marginTop: "0px", marginLeft: "10px" }}>
                <InputLabel id="Current Workspace">Current Workspace</InputLabel>
                <Select
                    fullWidth
                    placeholder='Current Workspacefghjfghfdgh'
                    label='Current Workspace dfdsf'
                    labelId='Current Workspace'
                    value={
                        props.current_workspace
                    }
                    sx={{ height: "35px", fontSize: "12px" }}
                    onChange={e => {
                        console.log("e:", e.target)
                        if (props.current_workspace !== e.target.value) {
                            LoginRegistrationAPI.checkoutWorkspace({ workspace_id: e.target.value }).then(res => {
                                auth.setUserData(res);
                            }).catch(e => {
                                console.log(e);
                            });
                        }
                        // LoginRegistrationAPI.assignArticle({
                        //     assigned_to: e.target.value,
                        //     article_id: props.assignedTo.article_id,
                        //     due_date: dateTime
                        // }).then(res => {
                        //     setUserId(e.target.value)
                        //     props.updaateAssignedTo(res.data)
                        //     Swal.fire({
                        //         title: 'Success',
                        //         text: 'User Assigned Successfully!',
                        //         icon: 'success',
                        //         confirmButtonText: 'Close',
                        //         confirmButtonColor: "#2979FF",
                        //     })
                        // }).catch(e => {
                        //     Swal.fire(
                        //         'Error',
                        //         'Unable to changes status',
                        //         'error'
                        //     )
                        // })

                    }}
                >
                    {
                        props.workspaces.map((w: any) => {
                            return <MenuItem sx={{ fontSize: "12px" }} value={w.id}>{w.name.toUpperCase()}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Box>
    )
}

export default WorkspaceList