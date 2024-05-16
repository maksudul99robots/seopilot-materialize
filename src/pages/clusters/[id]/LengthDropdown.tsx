import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginRegistrationAPI } from "src/services/API";

const LengthDropdown = (props: any) => {
    // console.log(props.settings[props.id].tone)
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120, }} className="article_tbl_folder_dropdown">
                <Select

                    size="small"
                    sx={{ fontSize: "12px", padding: "0px" }}
                    value={props.settings[props.id].article_length}
                    onChange={e => props.handleChange(props.id, e.target.value, 'article_length')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value='short' sx={{ fontSize: "12px" }}>Short</MenuItem>
                    <MenuItem value='long' sx={{ fontSize: "12px" }}>Long</MenuItem>


                </Select>
            </FormControl>
        </>
    )
}

export default LengthDropdown;