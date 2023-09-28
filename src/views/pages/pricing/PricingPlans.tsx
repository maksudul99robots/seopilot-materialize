// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import PlanDetails from 'src/@core/components/plan-details'

// ** Types
import { PricingPlanType } from 'src/@core/components/plan-details/types'

interface Props {
  plan: string
  data: PricingPlanType[] | null
}

const PricingPlans = (props: Props) => {
  // ** Props
  const { plan, data } = props

  return (
    <Grid container spacing={15}>
      {data?.map((item: PricingPlanType, index: number) => (
        <Grid item xs={12} md={6} key={item.title.toLowerCase()}>
          <PlanDetails plan={plan} data={item} index={index} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PricingPlans
