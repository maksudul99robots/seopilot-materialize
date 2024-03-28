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

    function insertImageAfterFirstH1(htmlString: string, imgSrc: string) {
        // Create a temporary container element
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = htmlString;

        // Find the first h1 element
        const firstH1: any = tempContainer.querySelector('h1');

        if (firstH1) {
            // Create an img element
            const imgElement: any = document.createElement('img');
            imgElement.width = "800";
            imgElement.height = "450";
            // imgElement.style.width = "100%"
            imgElement.src = imgSrc;
            imgElement.style.objectFit = "cover"
            // Insert the img element after the first h1
            firstH1.parentNode.insertBefore(imgElement, firstH1.nextSibling);
        } else {

        }

        // Return the modified HTML
        return tempContainer.innerHTML;
    }

    function insertH1AtTheBeginning(htmlString: string, title: string) {
        // Create a temporary div element to parse the HTML string
        const h1 = document.createElement('h1');
        h1.textContent = title;

        const tempDiv = document.createElement('div');
        htmlString = `<h1>${title}</h1>` + htmlString;
        tempDiv.innerHTML = htmlString;

        // Find the first h2 element
        // const firstH2 = tempDiv.querySelector('h2');

        // if (firstH2) {
        //     // Create a new h1 element


        //     // Insert the new h1 before the first h2
        //     firstH2.parentNode?.insertBefore(h1, firstH2);
        // }

        // Return the modified HTML string
        return tempDiv.innerHTML;
    }

    // Example usage


    function copyToClip(str: any) {
        // console.log("props.fImg?.photos:", props.fImg?.photos)
        str = insertH1AtTheBeginning(str, props.title);
        if (props.fImg?.urls?.full) {

            str = insertImageAfterFirstH1(str, props.fImg.urls.full)
        }
        if (props.fImg?.photos) {
            str = insertImageAfterFirstH1(str, props.fImg.photos[0].src.original)
        }
        if (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') {
            str = insertImageAfterFirstH1(str, props.fImg)
        }

        function listener(e: any) {
            e.clipboardData.setData("text/html", str);
            e.clipboardData.setData("text/plain", str);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    };

    function getFormatedHtml(str: string) {
        let isImgAdded: any = [];
        str = insertH1AtTheBeginning(str, props?.title);
        if (props?.fImg?.urls?.full)
            str = insertImageAfterFirstH1(str, props?.fImg?.urls?.full)

        if (props.fImg?.photos) {
            str = insertImageAfterFirstH1(str, props.fImg.photos[0].src.original)
        }
        if (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') {
            str = insertImageAfterFirstH1(str, props.fImg)
        }
        if (props.articleType == 'listicle' && props.listicleOutlines?.length > 0) {

            let doc = new DOMParser().parseFromString(str, "text/html");

            for (let i = 0; i < props.listicleOutlines.length; i++) {
                // props.listicleOutlines?.map((x: any, i: number) => {
                let listicle = JSON.parse(props.listicleOutlines[i]);

                // => <a href="#">Link...


                let elements: any = doc.querySelectorAll(listicle.tag);
                elements = Array.from(elements);
                for (let j = 0; j < elements.length; j++) {

                    let title = listicle.title;
                    if (props.numberedItem) {
                        let count = i + 1;
                        title = count + '. ' + title;
                    }

                    if (elements[j].innerText == title && !isImgAdded[title]) {
                        let x = isImgAdded;
                        x[title] = true;
                        isImgAdded = x;
                        elements[j].insertAdjacentHTML('afterend', `<img src="${listicle.imgSrcUrl}" style="height: 450px; width: 800px;"/>`);
                    }

                }

                str = doc.documentElement.outerHTML


            }

        }
        // console.log("str:", str)
        return str
    }
    function copy(str: string) {
        // str = getHtmlFromDocument(str)
        str = insertH1AtTheBeginning(str, props.title);
        if (props.fImg?.urls?.full) {

            str = insertImageAfterFirstH1(str, props.fImg.urls.full)
        }
        if (props.fImg?.photos) {
            str = insertImageAfterFirstH1(str, props.fImg.photos[0].src.original)
        }
        if (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') {
            str = insertImageAfterFirstH1(str, props.fImg)
        }

        if (props.articleType == 'listicle' && props.listicleOutlines?.length > 0) {

            let doc = new DOMParser().parseFromString(str, "text/html");
            let isImgAdded: any = [];
            for (let i = 0; i < props.listicleOutlines.length; i++) {
                // props.listicleOutlines?.map((x: any, i: number) => {
                let listicle = JSON.parse(props.listicleOutlines[i]);

                // => <a href="#">Link...


                let elements: any = doc.querySelectorAll(listicle.tag);
                elements = Array.from(elements);
                for (let j = 0; j < elements.length; j++) {

                    let title = listicle.title;
                    if (props.numberedItem) {
                        let count = i + 1;
                        title = count + '. ' + title;
                    }

                    if (elements[j].innerText == title && !isImgAdded[title]) {
                        let x = isImgAdded;
                        x[title] = true;
                        isImgAdded = x;
                        elements[j].insertAdjacentHTML('afterend', `<img src="${listicle.imgSrcUrl}" style="height: auto; width: 100%;"/>`);
                    }

                }

                str = doc.documentElement.outerHTML


            }

        }
        function listener(e: any) {
            e.clipboardData.setData("text/html", str);
            e.clipboardData.setData("text/plain", str);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
        toast('HTML Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    }
    function download(str: string) {
        // str = getHtmlFromDocument(str)
        str = insertH1AtTheBeginning(str, props.title);
        if (props.fImg?.urls?.full) {

            str = insertImageAfterFirstH1(str, props.fImg.urls.full)
        }
        if (props.fImg?.photos) {
            str = insertImageAfterFirstH1(str, props.fImg.photos[0].src.original)
        }
        if (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') {
            str = insertImageAfterFirstH1(str, props.fImg)
        }

        if (props.articleType == 'listicle' && props.listicleOutlines?.length > 0) {

            let doc = new DOMParser().parseFromString(str, "text/html");
            let isImgAdded: any = [];
            for (let i = 0; i < props.listicleOutlines.length; i++) {
                // props.listicleOutlines?.map((x: any, i: number) => {
                let listicle = JSON.parse(props.listicleOutlines[i]);

                // => <a href="#">Link...


                let elements: any = doc.querySelectorAll(listicle.tag);
                elements = Array.from(elements);
                for (let j = 0; j < elements.length; j++) {

                    let title = listicle.title;
                    if (props.numberedItem) {
                        let count = i + 1;
                        title = count + '. ' + title;
                    }

                    if (elements[j].innerText == title && !isImgAdded[title]) {
                        let x = isImgAdded;
                        x[title] = true;
                        isImgAdded = x;
                        elements[j].insertAdjacentHTML('afterend', `<img src="${listicle.imgSrcUrl}" style="height: auto; width: 100%;"/>`);
                    }

                }

                str = doc.documentElement.outerHTML


            }

        }

        let title = props.title.replaceAll(' ', '-')
        title = title + props.id + '.html'

        const blob = new Blob([str], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = title;
        link.href = url;
        link.click();
    }

    function getHtmlFromDocument(str: any) {
        // Regular expression to match HTML tags with attributes
        const regex = /<([^>\s]+)(?:\s+([^>]*))?>/g;

        // Function to handle replacement
        function replaceAttributes(match: any, tag: any, attributes: any) {
            // Check if the tag is an anchor tag
            if (tag.toLowerCase() === 'a') {
                return match; // If it's an anchor tag, leave it as it is
            } else {
                // If it's not an anchor tag, remove all attributes
                return `<${tag}>`;
            }
        }

        // Replace attributes in HTML string
        let sanitizedHtml = str.replace(regex, replaceAttributes);
        sanitizedHtml = sanitizedHtml.replaceAll('<span><span>', '<span>')
        sanitizedHtml = sanitizedHtml.replaceAll('</span></span>', '</span>')

        str = insertH1AtTheBeginning(sanitizedHtml, props.title);
        if (props.fImg?.urls?.full) {

            str = insertImageAfterFirstH1(str, props.fImg.urls.full)
        }
        if (props.fImg?.photos) {
            str = insertImageAfterFirstH1(str, props.fImg.photos[0].src.original)
        }
        if (props.imgService == 'dall-e-3' || props.imgService == 'dall-e-2') {
            str = insertImageAfterFirstH1(str, props.fImg)
        }

        if (props.articleType == 'listicle' && props.listicleOutlines?.length > 0) {

            let doc = new DOMParser().parseFromString(str, "text/html");
            let isImgAdded: any = [];
            for (let i = 0; i < props.listicleOutlines.length; i++) {
                // props.listicleOutlines?.map((x: any, i: number) => {
                let listicle = JSON.parse(props.listicleOutlines[i]);

                // => <a href="#">Link...


                let elements: any = doc.querySelectorAll(listicle.tag);
                elements = Array.from(elements);
                for (let j = 0; j < elements.length; j++) {

                    let title = listicle.title;
                    if (props.numberedItem) {
                        let count = i + 1;
                        title = count + '. ' + title;
                    }

                    if (elements[j].innerText == title && !isImgAdded[title]) {
                        let x = isImgAdded;
                        x[title] = true;
                        isImgAdded = x;
                        elements[j].insertAdjacentHTML('afterend', `<img src="${listicle.imgSrcUrl}" style="height: auto; width: 100%;"/>`);
                    }

                }

                str = doc.documentElement.outerHTML


            }

        }

        return str;
    }

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                color='secondary'
                className='outlined-btn-color'
                disableElevation
                onClick={handleClick}
                startIcon={<Icon icon="entypo:export" />}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ backgroundColor: "#fff" }}
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
                    toast('Rich Text Copied to Clipboard', { hideProgressBar: true, autoClose: 2000, type: 'success' })
                }}>
                    <MenuItem onClick={handleClose} disableRipple>
                        <ContentCopyOutlinedIcon />
                        Copy Rich Text
                    </MenuItem>

                </div>


                {/* </CopyToClipboard> */}
                <Divider sx={{ my: 0.5 }} />
                {/* <CopyToClipboard text={
                    getFormatedHtml(props.html)


                }
                    onCopy={() => {
                        // props.setCopied(true)

                        getHtmlFromDocument(document.getElementsByClassName('DraftEditor-editorContainer')[0]?.innerHTML)
                        // setTimeout(() => {
                        //     props.setCopied(false)
                        // }, 5000)
                    }}> */}
                <MenuItem onClick={() => {
                    // copy(document.getElementsByClassName('DraftEditor-editorContainer')[0]?.innerHTML)
                    copy(props.html)
                    handleClose()
                }} disableRipple>
                    {/* <Icon icon="clarity:code-line" /> */}
                    <CodeIcon />
                    Copy HTML
                </MenuItem>

                {/* </CopyToClipboard> */}
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={(e: any) => {
                    download(props.html);
                    setAnchorEl(null);
                }} disableRipple>
                    <FileDownloadOutlinedIcon />
                    Download HTML
                </MenuItem>


            </StyledMenu>
        </div >
    );
}