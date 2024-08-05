
//@ts-ignore
import React from 'react';
import FlagIcon from 'react-flagkit';
import { getName } from 'country-list';
import { getCountryNameFlag } from 'src/services/getCountryNameFlag';

// Your existing country data
const countryData = [
    {
        "keys": "usa",
        "clicks": 206,
        "impressions": 12792,
        "ctr": "1.61",
        "position": 43.97373358348968,
        "id": 0,
        "prevClicks": 213,
        "prevImpressions": 14512,
        "prevCtr": "1.47",
        "prevPosition": 44.977191289966925,
        "clicksChange": "-3.29%",
        "impressionsChange": "-11.85%",
        "ctrChange": "9.72%",
        "positionChange": "-1.00"
    },
    {
        "keys": "ind",
        "clicks": 183,
        "impressions": 5028,
        "ctr": "3.64",
        "position": 25.780230708035003,
        "id": 1,
        "prevClicks": 169,
        "prevImpressions": 5450,
        "prevCtr": "3.10",
        "prevPosition": 29.56256880733945,
        "clicksChange": "8.28%",
        "impressionsChange": "-7.74%",
        "ctrChange": "17.37%",
        "positionChange": "-3.78"
    },
    {
        "keys": "nga",
        "clicks": 150,
        "impressions": 478,
        "ctr": "31.38",
        "position": 9.57112970711297,
        "id": 2,
        "prevClicks": 77,
        "prevImpressions": 368,
        "prevCtr": "20.92",
        "prevPosition": 13.154891304347826,
        "clicksChange": "94.81%",
        "impressionsChange": "29.89%",
        "ctrChange": "49.98%",
        "positionChange": "-3.58"
    },
    {
        "keys": "gbr",
        "clicks": 38,
        "impressions": 2429,
        "ctr": "1.56",
        "position": 47.41375051461507,
        "id": 3,
        "prevClicks": 43,
        "prevImpressions": 2505,
        "prevCtr": "1.72",
        "prevPosition": 48.329740518962076,
        "clicksChange": "-11.63%",
        "impressionsChange": "-3.03%",
        "ctrChange": "-8.86%",
        "positionChange": "-0.92"
    }
    // Add more objects as needed...
];


const CountryList = ({ data }: any) => {
    return (
        <div>
            {data.map((item: any, index: number) => {
                const c = getCountryNameFlag(item.keys);
                console.log("c-", index, c)
                return (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${c[0].alpha2}.svg`} style={{ height: "24px", width: "24px" }}></img>
                        <span style={{ marginLeft: '10px' }}>{c[0].name}</span>
                    </div>
                );
            })}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <h1>Country List with Flags</h1>
            <CountryList data={countryData} />
        </div>
    );
};

export default App;
