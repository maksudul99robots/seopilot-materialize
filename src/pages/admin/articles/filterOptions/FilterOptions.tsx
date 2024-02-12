import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { Box } from "@mui/system"

const FilterOptions = (props: any) => {
    return (
        <Box sx={{ padding: "15px", marginTop: "20px" }}>
            <Grid item sm={12} xs={12} sx={{ paddingBottom: "10px" }}>
                <FormControl fullWidth>
                    <InputLabel id='type-select'>Article Type</InputLabel>
                    <Select
                        fullWidth
                        placeholder='Article Type'
                        label='Article Type'
                        labelId='Article Type'
                        value={props.type}
                        onChange={e => {
                            props.setType(e.target.value)
                        }}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='blog'>Blog</MenuItem>
                        <MenuItem value='listicle'>Listicle</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={12} xs={12} sx={{ paddingBottom: "10px" }}>
                <FormControl fullWidth>
                    <InputLabel id='length-select'>Article Length</InputLabel>
                    <Select
                        fullWidth
                        placeholder='Article Length'
                        label='Article Length'
                        labelId='Article Length'
                        value={props.length}
                        onChange={e => {
                            props.setLength(e.target.value)
                        }}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='short'>Short</MenuItem>
                        <MenuItem value='long'>Long</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={12} xs={12} sx={{ paddingBottom: "10px" }}>
                <FormControl fullWidth>
                    <InputLabel id='country-select'>Status</InputLabel>
                    <Select
                        fullWidth
                        placeholder='Status'
                        label='Status'
                        labelId='Status'
                        value={props.status}
                        onChange={e => {
                            props.setStatus(e.target.value)
                        }}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem> */}
                        <MenuItem value='completed'>Completed</MenuItem>
                        <MenuItem value='error'>Error</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Box>
    )
}
export default FilterOptions;