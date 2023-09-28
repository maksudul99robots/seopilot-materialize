// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiCardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { PricingDataType } from 'src/@core/components/plan-details/types'

// ** Demo Imports
import PricingCTA from 'src/views/pages/pricing/PricingCTA'
import PricingTable from 'src/views/pages/pricing/PricingTable'
import PricingPlans from 'src/views/pages/pricing/PricingPlans'
import PricingHeader from 'src/views/pages/pricing/PricingHeader'
import PricingFooter from 'src/views/pages/pricing/PricingFooter'
import LTDPlan from 'src/views/pages/pricing/LTDplan'
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const CardContent = styled(MuiCardContent)<CardContentProps>(({ theme }) => ({
  padding: `${theme.spacing(20, 36)} !important`,
  [theme.breakpoints.down('xl')]: {
    padding: `${theme.spacing(20)} !important`
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(10, 5)} !important`
  }
}))

const Pricing = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const auth = useAuth()

  let pricings = apiData.pricingPlans;
  if (pricings.length > 0) {
    pricings[0].planBenefits = [
      "Get on-page SEO",

      "Contact and Social Info Scraper (Email & Phone)",

      "Download Data Points to .CSV",

      "Broken Link Checker",

      "Get all headings",

      "Free subscription to SEO & PR Newsletter"
    ]
    pricings[1].planBenefits = [
      "Get on-page SEO",

      "Contact and Social Info Scraper (Email & Phone)",

      "Download Data Points to .CSV",

      "Broken Link Checker",

      "Get all headings",

      "Free subscription to SEO & PR Newsletter",

      "Generate AI article writer"
    ]

    pricings[1].yearlyPlan =
      { perMonth: 9, totalAnnual: 108 }
    pricings[0].title = "Passenger"
    pricings[1].title = "Captain"
    pricings[1].subtitle = "Get full access to the extension and upcomming features."
    pricings.splice(pricings.length - 1, 1)

    if (auth?.user?.plan && auth?.user?.plan == 'free') {
      pricings[0].currentPlan = true;
      pricings[1].currentPlan = false;
    } else if (auth?.user?.plan && auth?.user?.plan == 'regular') {
      pricings[0].currentPlan = false;
      pricings[1].currentPlan = true;
    } else {
      pricings[0].currentPlan = false;
      pricings[1].currentPlan = false;
    }
  }



  // ** States
  const [plan, setPlan] = useState<'monthly' | 'annually'>('annually')

  const handleChange = (e: ChangeEvent<{ checked: boolean }>) => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }

  return (
    <Card>
      <CardContent>
        <PricingHeader plan={plan} handleChange={handleChange} />
        <LTDPlan plan={auth?.user?.plan} />
        <PricingPlans plan={plan} data={pricings} />
      </CardContent>
      {/* <PricingCTA /> */}
      {/* <CardContent>
        <PricingTable data={apiData} />
      </CardContent> */}
      {/* <CardContent sx={{ backgroundColor: 'action.hover' }}>
        <PricingFooter data={apiData} />
      </CardContent> */}
    </Card>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/pages/pricing')
  const apiData: PricingDataType = res.data

  return {
    props: {
      apiData
    }
  }
}

export default Pricing
