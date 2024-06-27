import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { HeadingsKeywords } from './HeadingsKeywords';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        // sx: 'font-size:12px',
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MetricsTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', fontSize: "12px" }}>
            {/* <Typography variant='body1'>Keywords</Typography> */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ fontSize: "12px !important;" }}>
                    <Tab label="Headings" {...a11yProps(0)} sx={{ fontSize: "12px !important;" }} />
                    <Tab label="Article" {...a11yProps(1)} sx={{ fontSize: "12px !important;" }} />
                    {/* <Tab label="Item Three" {...a11yProps(2)} sx={{ fontSize: "12px !important;" }} /> */}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <HeadingsKeywords />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>
    );
}