// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


const LTDPlan = ({ plan }: any) => {

    return (

        plan == 'ltd' ?
            <Card sx={{ mb: 10 }}>
                <CardContent>
                    <Typography variant='h6' sx={{ mb: 2, pl: 5 }}>
                        Your current plan: Rockethub LTD-Captain
                    </Typography>
                    <Typography variant='body1' sx={{ pl: 5 }}>
                        Features:
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 2, pl: 5 }}>
                        Get on-page SEO <br />

                        Contact and Social Info Scraper (Email & Phone)<br />

                        Download Data Points to .CSV,<br />

                        Broken Link Checker,<br />

                        Get all headings,<br />

                        Free subscription to SEO & PR Newsletter,<br />

                        Generate AI article writer
                    </Typography>
                    {/* <Typography variant='body2'>
                    If you’re in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here’s a rundown
                    of some of the best systems available.
                </Typography> */}
                </CardContent>
                {/* <CardActions className='card-action-dense'>
                <Button>Read More</Button>
            </CardActions> */}
            </Card>
            :
            <></>


    )
}

export default LTDPlan