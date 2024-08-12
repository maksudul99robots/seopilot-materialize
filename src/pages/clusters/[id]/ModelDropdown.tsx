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
                    value={props.settings[props.id]?.model}
                    onChange={e => props.handleChange(props.id, e.target.value, 'model')}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {/* <MenuItem value='gpt-4o'>GPT-4o (Recommended)</MenuItem>
                    <MenuItem value='gpt-4o-mini'>GPT-4o-Mini</MenuItem>
                    <MenuItem value='gpt-4-turbo'>GPT-4-TURBO</MenuItem>
                    <MenuItem value='gpt-4'>GPT-4</MenuItem>
                    <MenuItem value='gpt-3.5-turbo-1106'>GPT-3.5-TURBO</MenuItem>
                    <MenuItem value='claude-3-5-sonnet-20240620'>Claude 3.5 Sonnet</MenuItem> */}
                    <MenuItem value='gpt-4o' disabled={props.hasOpenAiKey != 'yes'}>GPT-4o (Recommended)</MenuItem>
                    <MenuItem value='gpt-4o-mini' disabled={props.hasOpenAiKey != 'yes'}>GPT-4o mini</MenuItem>
                    <MenuItem value='gpt-4-turbo' disabled={props.hasOpenAiKey != 'yes'}>GPT-4-TURBO</MenuItem>
                    <MenuItem value='gpt-4' disabled={props.hasOpenAiKey != 'yes'}>GPT-4</MenuItem>
                    <MenuItem value='gpt-3.5-turbo-1106' disabled={props.hasOpenAiKey != 'yes'}>GPT-3.5-TURBO</MenuItem>
                    <MenuItem value='claude-3-5-sonnet-20240620' disabled={props.hasClaudeAiKey != 'yes'}>Claude 3.5 Sonnet</MenuItem>

                </Select>
            </FormControl >
        </>
    )
}

export default ModelDropdown;