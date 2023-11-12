import { Box } from '@mui/material'
// ** MUI Imports

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import Divider from '@mui/material/Divider';
import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled';
import { useEffect, useState } from 'react';
// ** Icon Imports

export default function Outlines(props: any) {
    const [html, setHtml] = useState<string>('');
    const [outlines, setOutlines] = useState<string>('');

    useEffect(() => {

        let x = props.outlines.replace(/<h3>/g, '<li>').replace(/<\/h3>/g, '</li>');

        let lstIndex = x.lastIndexOf("</h1>");
        let txt2 = x.slice(0, lstIndex + 5) + "<ul>" + x.slice(lstIndex + 5);
        let txt3 = txt2 + "</ul>"

        txt3 = txt3.replace(/<h1>/g, '<h2>').replace(/<\/h1>/g, '</h2>');
        setOutlines(txt3)
    }, [props.outlines])

    return (
        <Box sx={{ border: "1px solid #EBEBEF", borderRadius: "10px", marginTop: "10px", padding: '10px' }}>
            {
                outlines.length > 0 &&
                <EditorControlled data={outlines} setHtml={setHtml} readOnly={true} toolbarHidden={true} />

            }
        </Box>
    )

}