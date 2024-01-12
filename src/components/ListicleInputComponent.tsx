import { Grid, InputAdornment, TextField, Tooltip, TooltipProps, Typography, tooltipClasses } from "@mui/material";
import { Box, styled } from "@mui/system"
import { useEffect } from "react";
import Icon from "src/@core/components/icon";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

export const ListicleInputComponent = (props: any) => {

    const addNewItem = () => {
        let lists = [...props.listicleOutlines];
        lists.push({ title: '', url: '' })
        props.setListicleOutlines(lists)
    }

    const changeItems = (value: any, i: number) => {
        let lists = [...props.listicleOutlines];
        lists[i].title = value.title
        lists[i].title = value.url
    }
    const removeItem = (i: number) => {
        // if (i != 0) {
        const newList = [...props.listicleOutlines];
        newList.splice(i, 1);
        props.setListicleOutlines(newList);
        // }

    }

    useEffect(() => {
        console.log(props.listicleOutlines)
    }, [props.listicleOutlines])
    return (
        <>
            <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginTop: "20px", marginBottom: "10px", display: "flex" }}>
                Listicle Items
                <LightTooltip title={
                    <p style={{ color: "#606378", fontSize: "12px", zIndex: "99999999", }}>
                        If you choose "Get Outline From a URL", the system will scrape the given URL to get all the Headings as your Article Outline.
                        <br></br>If you choose "Create Your Own Outline", you can also Create your own article manually.
                        <br></br>If you choose "System Generated Outline", the system will generate Article Outline on its own.

                    </p>
                } placement="top">
                    <div style={{ height: "100%" }}>
                        <Icon icon="ph:info-fill" className='add-icon-color' style={{ fontSize: "20px", marginTop: "4px", marginLeft: "5px" }} />
                    </div>
                </LightTooltip >
            </Typography>
            {
                props.listicleOutlines?.map((l: any, i: number) => {
                    return (
                        <div>
                            <Typography variant='body1' sx={{ fontSize: "18px", fontWeight: 500, marginTop: "20px", marginBottom: "10px", display: "flex" }}>
                                Item-{i + 1}:
                            </Typography>
                            <div style={{ display: "flex", width: "100%", marginBottom: "10px" }} key={i}>

                                <TextField style={{ paddingRight: "10px", width: "40%" }} fullWidth label='Listicle Title' value={l.title}
                                    onChange={(e) => {
                                        let lists = [...props.listicleOutlines];
                                        lists[i].title = e.target.value;
                                        props.setListicleOutlines(lists)

                                    }
                                    }
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }} />
                                <TextField style={{ width: "60%" }} fullWidth label='Listicle URL' value={l.url}
                                    onChange={(e) => {
                                        let lists = [...props.listicleOutlines];
                                        lists[i].url = e.target.value;
                                        props.setListicleOutlines(lists)

                                    }
                                    }
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }} />

                                <div style={{ display: "flex", alignItems: "center", marginLeft: "5px", justifyContent: "center" }}>

                                    <Icon icon="carbon:close-outline" style={{ marginRight: "2px", }} className='close-icon-style' onClick={e => { removeItem(i) }} />
                                </div>

                            </div>
                        </div>

                    )
                })
            }
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }} onClick={addNewItem}>
                <Icon icon="lets-icons:add-duotone" className='add-icon-color' fontSize={40} />
            </Box>

        </>

    )
}
