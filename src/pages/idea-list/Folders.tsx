import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { LoginRegistrationAPI } from "src/services/API"

const Folders = (props: any) => {
    const [folders, setFolders] = useState<any>([])
    useEffect(() => {
        LoginRegistrationAPI.getFolders({ get_count: false }).then((res) => {
            setFolders(res.data);
            if (props.folder) {
                props.setFolder(props.folder)
            } else if (res.data[0]) {
                props.setFolder(res.data[0].id)
            }
        }).catch(e => {
            console.log("unable to get Folders")
        })
    }, [])
    return (
        <>
            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                <InputLabel id='country-select'>Folder</InputLabel>
                <Select
                    fullWidth
                    placeholder='Folder'
                    label='Folder'
                    labelId='Folder'
                    value={
                        props.folder
                    }
                    onChange={e => {
                        props.setFolder(e.target.value)
                    }}
                >
                    {
                        folders.map((f: any) => {
                            return <MenuItem value={f?.id}>{f?.name?.toUpperCase()}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </>
    )
}

export default Folders;