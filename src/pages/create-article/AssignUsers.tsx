import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { LoginRegistrationAPI } from "src/services/API"

const AssignUsers = (props: any) => {
    const [users, setUsers] = useState<any>([])
    useEffect(() => {
        LoginRegistrationAPI.getTeam({}).then(res => {
            setUsers(res.data)
            // setTotal(res.data.total)
            // setRows(loadServerRows(paginationModel.page, res.data.data))
        }).catch(e => {
            console.log("unable to get Folders")
        })
    }, [])
    return (
        <>
            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                <InputLabel id='country-select'>Assign To</InputLabel>
                <Select
                    fullWidth
                    placeholder='Assign To'
                    label='Assign To'
                    labelId='Assign To'
                    value={
                        props.user
                    }
                    onChange={e => {
                        props.setUser(e.target.value)
                    }}
                >
                    {
                        users.map((u: any) => {
                            return <MenuItem value={u?.user.id}>{u?.user?.first_name.toUpperCase()} {u?.user?.last_name.toUpperCase()}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </>
    )
}

export default AssignUsers;