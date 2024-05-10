// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Alert } from '@mui/material'


const LTDPlan = ({ plan, downOrCancel }: any) => {
    console.log("plan:", plan)
    return (

        plan.plan == 'extension_only' || plan.plan == 'passenger' || plan.plan == 'copilot' || plan.plan == 'captain' || plan.plan == "monthly - passenger" || plan.plan == "monthly - copilot" || plan.plan == "monthly - captain" ?
            <Card sx={{ mb: 10, textAlign: "start" }}>
                <CardContent>
                    <Typography variant='h6' sx={{ mb: 2, pl: 5 }}>
                        Your current plan: {plan?.token ? 'Rockethub LTD-' : null}{plan.plan == 'extension_only' ? 'EXTENSION-ONLY' : plan.plan.toUpperCase()}
                    </Typography>
                    <Typography variant='body1' sx={{ pl: 5, pb: 2 }}>
                        Features:
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 2, pl: 5 }}>
                        {plan.plan == 'extension_only' ? 'Monthly 2 Articles' : plan.plan == 'passenger' ? 'Monthly 25 Articles' : 'Unlimited Articles'}<br />

                        {plan.plan == 'extension_only' ? '1 Site Connected' : plan.plan == 'passenger' ? '1 Site Connected' : plan.plan == 'copilot' ? '5 Sites Connected' : '25 Sites Connected'}<br />

                        {plan.plan == 'extension_only' ? '1 User' : plan.plan == 'passenger' ? '1 User' : plan.plan == 'copilot' ? '5 Users' : '25 Users'}<br />

                        {plan.plan == 'extension_only' ? '1 Workspace' : plan.plan == 'passenger' ? '1 Workspace' : plan.plan == 'copilot' ? '5 Workspaces' : '25 Workspaces'}<br />

                        Extension Access (On Page SEO & Contact Info)
                    </Typography>
                    {/* <Typography variant='body2'>
                    If you’re in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here’s a rundown
                    of some of the best systems available.
                </Typography> */}
                    {
                        downOrCancel?.downgrade?.length > 0 ?
                            <Alert severity='warning' sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "20px" }}>
                                {downOrCancel?.downgrade}
                            </Alert>
                            :
                            null
                    }
                    {
                        downOrCancel?.cancel?.length > 0 ?
                            <Alert severity='warning' sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "20px" }}>
                                {downOrCancel?.cancel}
                            </Alert>
                            :
                            null
                    }

                </CardContent>
                {/* <CardActions className='card-action-dense'>
                <Button>Read More</Button>
            </CardActions> */}
            </Card>
            :

            <Card sx={{ mb: 10, textAlign: "start" }}>
                <CardContent>
                    <Typography variant='h6' sx={{ mb: 2, pl: 5 }}>
                        Your current plan: Free Trial
                    </Typography>
                    <Typography variant='body1' sx={{ pl: 5, pb: 2 }}>
                        Features:
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 2, pl: 5 }}>
                        Monthly 2 Articles <br />

                        1 Site Connected<br />

                        1 User<br />

                        1 Workspace<br />

                        Extension Access (On Page SEO & Contact Info)
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

export default LTDPlan