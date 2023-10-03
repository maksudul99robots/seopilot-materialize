// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


const APIKeyInstructions = ({ plan }: any) => {

    return (
        <Card sx={{ mb: 10 }}>
            <CardContent>
                <Typography variant='h6' sx={{ mb: 2, pl: 5 }}>
                    Follow these steps to retrieve and populate your OpenAI API Key:
                </Typography>
                {/* <Typography variant='body1' sx={{ pl: 5 }}>
                
                    </Typography> */}
                <Typography variant='body1' sx={{ mb: 2, pl: 5 }}>
                    1. Get your OpenAI <a href='https://platform.openai.com/account/api-keys' target='_blank'>API Key</a> from ChatGPT. <br />

                    2. Copy the API Key and store it somewhere safe.
                    <br />

                    3. Copy the API Key and paste it into the Open API Key input field below.<br />
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


    )
}

export default APIKeyInstructions