import { FormControl, MenuItem, Select } from "@mui/material";
// import { LoginRegistrationAPI } from "../API";
import { useEffect, useState } from "react";
import { LoginRegistrationAPI } from "src/services/API";

const PointOfViewDropdown = (props: any) => {
    useEffect(() => {

    }, [])

    const handleChange = (e: any) => {
        LoginRegistrationAPI.updateFolderIdForArticle({ folder_id: e.target.value, article_id: props.article_id, source: props.source }).then(res => {
            props.setResetDataset(props.resetDataset + 1)
        }).catch(e => {
            console.log("error:", e)
        })
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120, }} className="article_tbl_folder_dropdown">
                <Select

                    size="small"
                    sx={{ fontSize: "12px", padding: "0px" }}
                    value={props.settings[props.id].point_of_view}
                    onChange={e => props.handleChange(props.id, e.target.value, 'point_of_view')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value='Third Person (he, she, it, they)' sx={{ fontSize: "12px" }}>Third Person (he, she, it, they)</MenuItem>
                    {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem> */}
                    <MenuItem value='Second Person (you, your, yours)' sx={{ fontSize: "12px" }}>Second Person (you, your, yours)</MenuItem>
                    <MenuItem value='First Person Plural (we, us, our, ours)' sx={{ fontSize: "12px" }}>First Person Plural (we, us, our, ours)</MenuItem>
                    <MenuItem value='First Person Singular (I, me, my, mine) ' sx={{ fontSize: "12px" }}>First Person Singular (I, me, my, mine)</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default PointOfViewDropdown;