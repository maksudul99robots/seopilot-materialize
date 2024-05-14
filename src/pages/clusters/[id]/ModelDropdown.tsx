import { FormControl, MenuItem, Select } from "@mui/material";
// import { LoginRegistrationAPI } from "../API";
import { useEffect, useState } from "react";
import { LoginRegistrationAPI } from "src/services/API";

const FolderDropdown = (props: any) => {
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
                    sx={{ fontSize: "14px", padding: "0px" }}
                    value={props.folder_id}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {
                        props?.folders?.map((f: any) => {
                            return <MenuItem value={f?.id}>{f?.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default FolderDropdown;