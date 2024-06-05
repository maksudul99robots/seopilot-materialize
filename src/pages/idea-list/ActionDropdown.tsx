import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CopyAllIcon from '@mui/icons-material/CopyAll';
import Icon from 'src/@core/components/icon';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from "react-toastify";
import CodeIcon from '@mui/icons-material/Code';
import Swal from 'sweetalert2';
import { LoginRegistrationAPI } from 'src/services/API';
import { useRouter } from 'next/router';
// import IdeaAdvancedSettings from './IdeaAdvancedSettings';
import { Box } from '@mui/material';
import IdeaAdvancedSettings from './IdeaAdvancedSettings';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function ActionDropdown(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter()

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement> | any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const deleteIdea = () => {
        Swal.fire({
            // title: 'Error',
            title: "Are you sure you want to delete this Article Idea?",
            icon: 'warning',
            confirmButtonText: 'DELETE',
            showCancelButton: true,
            confirmButtonColor: "#BB2124",
            cancelButtonText: "CANCEL"
        }).then(res => {
            if (res.value) {
                LoginRegistrationAPI.deleteIdea({ idea_id: props.idea_id }).then(res => {
                    props.setResetDataset(props.resetDataset + 1);
                }).catch(e => {
                    console.log("error in delete article")
                })
            }

        }).catch(e => {
            console.log("inside catch", e)
        })
    }

    return (
        <div>
            <Box sx={{ display: "flex", marginLeft: "5px" }}>
                <Icon
                    onClick={handleClick}
                    className='add-icon-color'
                    style={{ alignItems: "center" }}
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    icon="ph:dots-three-outline-vertical" />
            </Box>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >

                <div>
                    <MenuItem onClick={() => {
                        // deleteFolder()
                        deleteIdea()
                        handleClose()
                    }} className='add-icon-color' disableRipple>
                        <Icon icon="ic:outline-delete" />
                        &nbsp;&nbsp;Delete
                    </MenuItem>
                </div>
                <IdeaAdvancedSettings
                    handleClose={handleClose}
                    data={props.data}
                    idea_id={props.idea_id}
                    updateList={props.updateList}
                    isCreateIdea={false}
                />


            </StyledMenu>
        </div>
    );
}