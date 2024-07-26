import { FormControl, MenuItem, Select } from "@mui/material";
// import { LoginRegistrationAPI } from "../API";
import { useEffect, useState } from "react";
import { LoginRegistrationAPI } from "src/services/API";

const ModelDropdown = (props: any) => {


    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120, display: "flex", justifyContent: "start" }} className="article_tbl_folder_dropdown">
                <Select

                    size="small"
                    sx={{ fontSize: "12px", padding: "0px" }}
                    value={props.settings[props.id].model}
                    onChange={e => props.handleChange(props.id, e.target.value, 'model')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value='gpt-4o'>GPT-4o (Recommended)</MenuItem>
                    <MenuItem value='gpt-4o-mini'>GPT-4o-Mini</MenuItem>
                    <MenuItem value='gpt-4-turbo'>GPT-4-TURBO</MenuItem>
                    <MenuItem value='gpt-4'>GPT-4</MenuItem>
                    <MenuItem value='gpt-3.5-turbo-1106'>GPT-3.5-TURBO</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default ModelDropdown;