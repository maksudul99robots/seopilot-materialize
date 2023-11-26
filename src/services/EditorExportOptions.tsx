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

export default function CustomizedMenus(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    function copyToClip(str: any) {
        console.log("str:", str)
        function listener(e: any) {
            e.clipboardData.setData("text/html", str);
            e.clipboardData.setData("text/plain", str);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            // startIcon={<Icon icon="icon-park-outline:copy" style={{ color: "#fff", cursor: "pointer", fontSize: "15px" }} />}
            >
                Export
            </Button>
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
                    copyToClip(document.getElementsByClassName('DraftEditor-editorContainer')[0]?.innerHTML);

                }}>
                    <MenuItem onClick={handleClose} disableRipple>
                        <ContentCopyOutlinedIcon />
                        Copy Rich Text
                    </MenuItem>

                </div>


                {/* </CopyToClipboard> */}
                <Divider sx={{ my: 0.5 }} />
                <CopyToClipboard text={props.html}
                    onCopy={() => {
                        // props.setCopied(true)
                        toast('HTML Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                        // setTimeout(() => {
                        //     props.setCopied(false)
                        // }, 5000)
                    }}>
                    <MenuItem onClick={handleClose} disableRipple>
                        <CopyAllIcon />
                        Copy HTML
                    </MenuItem>

                </CopyToClipboard>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={e => {
                    props.download();
                    setAnchorEl(null);
                }} disableRipple>
                    <FileDownloadOutlinedIcon />
                    Download HTML
                </MenuItem>


            </StyledMenu>
        </div>
    );
}