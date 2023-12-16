import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
// ** MUI Imports

import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'

import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
// ** Icon Imports
import { Icon } from '@iconify/react';
import { LoginRegistrationAPI } from 'src/services/API';

export default function AiScoreComponent(props: any) {

    const [wordScore, setWordScore] = useState<number>(props.scoreObj.words_score)
    const [styleScore, setStyleScore] = useState<number>(props.scoreObj.style_score)
    const [factualScore, setFactualScore] = useState<number>(props.scoreObj.factual_score)
    const [hStructureScore, setHStructureScore] = useState<number>(props.scoreObj.h_structure_score)
    const [bullettingScore, setBullettingScore] = useState<number>(props.scoreObj.bulletting_score)
    const [keywordScore, setKeywordScore] = useState<number>(props.scoreObj.keywords_score)
    const [linkScore, setLinkScore] = useState<number>(props.scoreObj.links_score)
    const [lengthScore, setLengthScore] = useState<number>(props.scoreObj.length_score)
    const [scoreClicked, setScoreClicked] = useState(false)
    useEffect(() => {
        setWordScore(props.scoreObj.words_score)
        setStyleScore(props.scoreObj.style_score)
        setFactualScore(props.scoreObj.factual_score)
        setHStructureScore(props.scoreObj.h_structure_score)
        setBullettingScore(props.scoreObj.bulletting_score)
        setKeywordScore(props.scoreObj.keywords_score)
        setLinkScore(props.scoreObj.links_score)
        setLengthScore(props.scoreObj.length_score)

    }, [props.scoreObj])


    useEffect(() => {
        if (scoreClicked) {
            LoginRegistrationAPI.saveArticleScore({
                id: props.id,
                words_score: wordScore,
                style_score: styleScore,
                factual_score: factualScore,
                h_structure_score: hStructureScore,
                bulletting_score: bullettingScore,
                keywords_score: keywordScore,
                links_score: linkScore,
                length_score: lengthScore
            }).then((res: any) => {
                console.log(res.data)
                // if(res.status ==200){
                //     setWordScore
                // }
            })
        }

    }, [wordScore, styleScore, factualScore, hStructureScore, bullettingScore, keywordScore, linkScore, lengthScore])

    const storeScores = () => {
        setScoreClicked(true)
    }

    return (


        <Card sx={{ border: "1px solid #EBEBEF", borderRadius: "10px", marginTop: "10px", padding: "20px" }}>
            <Typography variant='h5' sx={{ paddingTop: "0px", paddingBottom: "30px" }}>Article Score</Typography>
            <Divider sx={{ my: '0 !important' }} />

            <Typography variant='h6' sx={{ paddingTop: "0px", marginTop: "20px" }}>Quality of the Post (0 to 10)</Typography>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>Word Score</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(1); storeScores() }} style={wordScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(2); storeScores() }} style={wordScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(3); storeScores() }} style={wordScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(4); storeScores() }} style={wordScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(5); storeScores() }} style={wordScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(6); storeScores() }} style={wordScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(7); storeScores() }} style={wordScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(8); storeScores() }} style={wordScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(9); storeScores() }} style={wordScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setWordScore(10); storeScores() }} style={wordScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>Style Score</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(1); storeScores() }} style={styleScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(2); storeScores() }} style={styleScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(3); storeScores() }} style={styleScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(4); storeScores() }} style={styleScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(5); storeScores() }} style={styleScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(6); storeScores() }} style={styleScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(7); storeScores() }} style={styleScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(8); storeScores() }} style={styleScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(9); storeScores() }} style={styleScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setStyleScore(10); storeScores() }} style={styleScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>Factual Score </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(1); storeScores() }} style={factualScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(2); storeScores() }} style={factualScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(3); storeScores() }} style={factualScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(4); storeScores() }} style={factualScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(5); storeScores() }} style={factualScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(6); storeScores() }} style={factualScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(7); storeScores() }} style={factualScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(8); storeScores() }} style={factualScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(9); storeScores() }} style={factualScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setFactualScore(10); storeScores() }} style={factualScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
            <Typography variant='h6' sx={{ paddingTop: "0px", marginTop: "20px" }}>Formatting of the Post (0 to 10)</Typography>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>Heading Structure Score</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(1); storeScores() }} style={hStructureScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(2); storeScores() }} style={hStructureScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(3); storeScores() }} style={hStructureScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(4); storeScores() }} style={hStructureScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(5); storeScores() }} style={hStructureScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(6); storeScores() }} style={hStructureScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(7); storeScores() }} style={hStructureScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(8); storeScores() }} style={hStructureScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(9); storeScores() }} style={hStructureScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setHStructureScore(10); storeScores() }} style={hStructureScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>Bulletting Score</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(1); storeScores() }} style={bullettingScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(2); storeScores() }} style={bullettingScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(3); storeScores() }} style={bullettingScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(4); storeScores() }} style={bullettingScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(5); storeScores() }} style={bullettingScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(6); storeScores() }} style={bullettingScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(7); storeScores() }} style={bullettingScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(8); storeScores() }} style={bullettingScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(9); storeScores() }} style={bullettingScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setBullettingScore(10); storeScores() }} style={bullettingScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
            <Typography variant='h6' sx={{ paddingTop: "0px", marginTop: "20px" }}>Formatting of the Post (0 to 10)</Typography>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>Keywords Score</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(1); storeScores() }} style={keywordScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(2); storeScores() }} style={keywordScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(3); storeScores() }} style={keywordScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(4); storeScores() }} style={keywordScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(5); storeScores() }} style={keywordScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(6); storeScores() }} style={keywordScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(7); storeScores() }} style={keywordScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(8); storeScores() }} style={keywordScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(9); storeScores() }} style={keywordScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setKeywordScore(10); storeScores() }} style={keywordScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>External Linking Score</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(1); storeScores() }} style={linkScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(2); storeScores() }} style={linkScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(3); storeScores() }} style={linkScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(4); storeScores() }} style={linkScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(5); storeScores() }} style={linkScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(6); storeScores() }} style={linkScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(7); storeScores() }} style={linkScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(8); storeScores() }} style={linkScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(9); storeScores() }} style={linkScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLinkScore(10); storeScores() }} style={linkScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant='body1' sx={{ marginBottom: "5px" }}>Article Length Score</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Icon icon="mdi:numeric-1-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(1); storeScores() }} style={lengthScore >= 1 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-2-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(2); storeScores() }} style={lengthScore >= 2 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-3-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(3); storeScores() }} style={lengthScore >= 3 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-4-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(4); storeScores() }} style={lengthScore >= 4 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-5-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(5); storeScores() }} style={lengthScore >= 5 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-6-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(6); storeScores() }} style={lengthScore >= 6 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-7-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(7); storeScores() }} style={lengthScore >= 7 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-8-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(8); storeScores() }} style={lengthScore >= 8 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-9-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(9); storeScores() }} style={lengthScore >= 9 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                    <Icon icon="mdi:numeric-10-circle-outline" fontSize={30} className='add-icon-color' onClick={() => { setLengthScore(10); storeScores() }} style={lengthScore >= 10 ? { color: "#2979FF" } : { color: "#b7b8c2" }} />
                </Box>

            </Box>
        </Card>
    )

}