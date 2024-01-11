import { Grid, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system"

export const ListicleInputComponent = (props: any) => {

    return (

        <div style={{ display: "flex", width: "100%" }}>

            <TextField style={{ paddingRight: "10px" }} fullWidth label='Listicle Title' value="dummy" InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
            }} />
            <TextField style={{ paddingLeft: "10px" }} fullWidth label='Listicle URL' value="dummy" InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
            }} />


            {/* <TextField style={{ paddingLeft: "10px" }} fullWidth label='Listicle URLsadfsadfsadf' placeholder='https://example.com' value="dummy" InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
            }} /> */}

        </div>
    )
}
