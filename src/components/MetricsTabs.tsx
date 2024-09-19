import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { KeywordSuggestions } from './KeywordSuggestions';
import { SerpSuggestions } from './SerpSuggestions';
import { PAA } from './PAA';

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
            style={{ padding: "0px !important;" }}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
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

export default function MetricsTabs(props: any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', fontSize: "12px" }}>
            {/* <Typography variant='body1'>Keywords</Typography> */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ fontSize: "12px !important;", padding: "0px" }}>
                    <Tab label="Terms" {...a11yProps(0)} sx={{ fontSize: "12px !important;" }} />
                    <Tab label="Top 10 SERP" {...a11yProps(1)} sx={{ fontSize: "12px !important;" }} />
                    {/* <Tab label="PAA" {...a11yProps(2)} sx={{ fontSize: "12px !important;", padding: "0px" }} /> */}
                    {/* <Tab label="Item Three" {...a11yProps(2)} sx={{ fontSize: "12px !important;" }} /> */}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <KeywordSuggestions keywordSuggestions={props.keywordSuggestions} primaryKeyword={props.primaryKeyword} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SerpSuggestions serp={props.serp} metricsComp={props.metricsComp} insertHeader={props.insertHeader} lastSelectionOnePoint={props.lastSelectionOnePoint}
                    lastCurrentStateOnePoint={props.lastCurrentStateOnePoint} />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={2}>
                <PAA paa={props.paa} />
            </CustomTabPanel> */}
        </Box>
    );
}