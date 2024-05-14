import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Icon from 'src/@core/components/icon';

import Swal from 'sweetalert2';
import Expand from './Expand';
import Rephrase from './Rephrase';
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import Shorten from './Shorten';
import Bulletize from './Bulletize';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={10}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 150,
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
                marginRight: theme.spacing(0),
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

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));


export default function ToolbarDropdown(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div style={{ display: "flex" }}>

            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="text"
                size='small'
                color='secondary'
                className='outlined-btn-color'
                disableElevation
                onClick={handleClick}
                sx={{ border: "1px solid #B6BBC6", backgroundColor: "#fff" }}
                startIcon={<Icon icon="f7:wand-stars-inverse" />}
                endIcon={<KeyboardArrowDownIcon />}
            // startIcon={<Icon icon="icon-park-outline:copy" style={{ color: "#fff", cursor: "pointer", fontSize: "15px" }} />}
            >
                AI Writing
            </Button>
            <LightTooltip title={
                <p style={{ color: "#606378", fontSize: "12px", zIndex: "100000000", }}>
                    <p>1. Please make sure to save your changes.</p>
                    <p>2. If any links are present within the selected text, they will be removed when the text is regenerated.</p>
                    {/* <p>2. Do Not Use Any New Line on The Selected Text</p> */}
                </p>
            } placement="top">
                <div style={{ height: "100%", marginLeft: "10px" }}>
                    <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "6px" }} />
                </div>
            </LightTooltip >
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            // onClick={(e) => {
            //     console.log(e)
            //     if (props.text.length > 800 || props.text.length < 20) {
            //         Swal.fire({
            //             // title: 'Selected Character Must be Within 20 to 800',
            //             text: 'Selected Character Must be Within 20 to 800',
            //             icon: 'warning',
            //             confirmButtonText: 'OK',
            //             confirmButtonColor: "#2979FF"
            //         })
            //         handleClose();
            //     }
            // }}
            >
                <div onClick={() => {
                }}>
                    <MenuItem disableRipple>
                        <Expand text={props.text}
                            setReloadArticle={props.setReloadArticle}
                            reloadArticle={props.reloadArticle}
                            article_id={props.article_id}
                            replaceText={props.replaceText}
                            handleClose={handleClose}

                        />
                    </MenuItem>

                </div>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem color='#2979FF' onClick={() => {
                    // handleClose()
                }} disableRipple>
                    <Rephrase
                        text={props.text}
                        setReloadArticle={props.setReloadArticle}
                        reloadArticle={props.reloadArticle}
                        article_id={props.article_id}
                        replaceText={props.replaceText}
                        handleClose={handleClose}
                    />
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem color='#2979FF' onClick={() => {
                    // handleClose()
                }} disableRipple>
                    <Shorten
                        text={props.text}
                        setReloadArticle={props.setReloadArticle}
                        reloadArticle={props.reloadArticle}
                        article_id={props.article_id}
                        replaceText={props.replaceText}
                        handleClose={handleClose}
                    />
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem color='#2979FF' onClick={() => {
                    // handleClose()
                }} disableRipple>
                    <Bulletize
                        text={props.text}
                        setReloadArticle={props.setReloadArticle}
                        reloadArticle={props.reloadArticle}
                        article_id={props.article_id}
                        replaceText={props.replaceText}
                        replaceTextWithList={props.replaceTextWithList}
                        handleClose={handleClose}
                    />
                </MenuItem>
            </StyledMenu>
        </div>
    );
}