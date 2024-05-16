import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginRegistrationAPI } from "src/services/API";

const ToneDropdown = (props: any) => {
    // console.log(props.settings[props.id].tone)
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120, }} className="article_tbl_folder_dropdown">
                <Select

                    size="small"
                    sx={{ fontSize: "12px", padding: "0px" }}
                    value={props.settings[props.id].tone}
                    onChange={e => props.handleChange(props.id, e.target.value, 'tone')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value='Clear, Knowledgeable and Confident' sx={{ fontSize: "12px" }}>SEO Optimized (Clear, Knowledgeable and Confident)</MenuItem>
                    <MenuItem value='Informative, Friendly, Casual' sx={{ fontSize: "12px" }}>Informative, Friendly, Casual</MenuItem>
                    {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem> */}
                    <MenuItem value='Excited' sx={{ fontSize: "12px" }}>Excited</MenuItem>
                    <MenuItem value='Empathetic' sx={{ fontSize: "12px" }}>Empathetic</MenuItem>
                    <MenuItem value='Professional' sx={{ fontSize: "12px" }}>Professional</MenuItem>
                    <MenuItem value='Friendly' sx={{ fontSize: "12px" }}>Friendly</MenuItem>
                    <MenuItem value='Formal' sx={{ fontSize: "12px" }}>Formal</MenuItem>
                    <MenuItem value='Casual' sx={{ fontSize: "12px" }}>Casual</MenuItem>
                    <MenuItem value='Humorous' sx={{ fontSize: "12px" }}>Humorous</MenuItem>

                </Select>
            </FormControl>
        </>
    )
}

export default ToneDropdown;