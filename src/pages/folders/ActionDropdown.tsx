import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Icon from 'src/@core/components/icon';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from "react-toastify";
import CodeIcon from '@mui/icons-material/Code';
import EditFolderName from './EditFolderName';
import Swal from 'sweetalert2';
import { LoginRegistrationAPI } from 'src/services/API';

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


    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement> | any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteFolder = () => {
        Swal.fire({
            // title: 'Error',
            text: 'Are you sure you want to delete this Folder? All the articles of this folder will be deleted.',
            icon: 'warning',
            confirmButtonText: 'DELETE',
            showCancelButton: true,
            confirmButtonColor: "#BB2124",
            cancelButtonText: "CANCEL"
        }).then(res => {
            if (res.value) {
                LoginRegistrationAPI.deleteFolder({ id: props.row.id }).then(res => {
                    props.setReloadData(props.reloadData + 1);
                }).catch(e => {
                    console.log("error in delete folder")
                })
            }

        }).catch(e => {
            console.log("inside catch", e)
        })
    }

    return (
        <div>

            <Icon
                onClick={handleClick}
                className='add-icon-color'

                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                icon="ph:dots-three-outline" />
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {/* <CopyToClipboard text={props.plainText}
                    onCopy={() => {
                        toast('Text Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                    }}> */}
                <div onClick={() => {

                }}>
                    {/* <MenuItem onClick={handleClose} className='add-icon-color' disableRipple> */}
                    <EditFolderName row={props.row} reloadData={props.reloadData} setReloadData={props.setReloadData} />
                    {/* </MenuItem> */}

                </div>


                {/* </CopyToClipboard> */}
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => {
                    deleteFolder()
                    handleClose()
                }} className='add-icon-color' disableRipple>
                    <Icon icon="ph:trash" />
                    &nbsp;&nbsp;Delete
                </MenuItem>



            </StyledMenu>
        </div>
    );
}