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
import IdeaAdvancedSettings from './IdeaAdvancedSettings';
import { Box } from '@mui/material';
import ClusterDrawer from 'src/services/SidebarForCluster';

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
    const deleteArticle = () => {
        Swal.fire({
            // title: 'Error',
            text: 'Are you sure you want to delete this article?',
            icon: 'warning',
            confirmButtonText: 'DELETE',
            showCancelButton: true,
            confirmButtonColor: "#BB2124",
            cancelButtonText: "CANCEL"
        }).then(res => {
            if (res.value) {
                LoginRegistrationAPI.deleteArticle({ article_id: props.article_id }).then(res => {
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
                {/* {
                    props.status == 'idea' &&
                    <MenuItem className='add-icon-color' onClick={() => {
                        props.write(props.idea_id)
                    }}
                        disabled={
                            props.is_error ? props.is_error : (props.status == 'error') ? true : false
                        }>
                        <Icon icon={!props.loading ? "streamline:chat-bubble-square-write" : "line-md:loading-twotone-loop"} />
                        &nbsp;&nbsp;Write

                    </MenuItem >
                }


                {
                    props.status == 'error' &&
                    <div>
                        <MenuItem onClick={() => {
                            // deleteFolder()
                            props.regenerateArticle(props.article_id)
                            handleClose()
                        }} className='add-icon-color' disableRipple disabled={!props.article_type || props.retryLoading == true}>
                            <Icon icon="streamline:arrow-reload-horizontal-2" />
                            &nbsp;&nbsp;Retry
                        </MenuItem>
                        <MenuItem onClick={() => {
                            // deleteFolder()
                            router.push(`/create-article?id=${props.article_id}&edit_article=true`)
                            handleClose()
                        }} className='add-icon-color' disableRipple >
                            <Icon icon="carbon:edit" />
                            &nbsp;&nbsp;Edit
                        </MenuItem>
                    </div>
                } */}

                {/* <IdeaAdvancedSettings handleClose={handleClose} settings={props.settings} setSettings={props.setSettings} idea_id={props.idea_id} handleChange={props.handleChange} updateList={props.updateList} /> */}
                <ClusterDrawer handleClose={handleClose} settings={props.settings} setSettings={props.setSettings} idea_id={props.idea_id} handleChange={props.handleChange} updateList={props.updateList} />

            </StyledMenu>
        </div>
    );
}