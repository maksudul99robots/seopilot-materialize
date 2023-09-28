// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

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

const Pricing = () => {

  const auth = useAuth()

  let pricings = [
    {
      imgWidth: 100,
      title: 'Passenger',
      imgHeight: 100,
      monthlyPrice: 0,
      currentPlan: auth?.user?.plan && auth?.user?.plan == 'free' ? true : auth?.user?.plan && auth?.user?.plan == 'regular' ? false : false,
      popularPlan: false,
      subtitle: 'A simple start for everyone',
      imgSrc: '/images/pages/pricing-illustration-1.png',
      yearlyPlan: {
        perMonth: 0,
        totalAnnual: 0
      },
      planBenefits: [
        { text: "Get on-page SEO", show: true },
        { text: "Contact and Social Info Scraper (Email & Phone)", show: true },
        { text: "Download Data Points to .CSV", show: true },
        { text: "Broken Link Checker", show: true },
        { text: "Get all headings", show: true },
        { text: "Free subscription to SEO & PR Newsletter", show: true },
        { text: "Generate AI article writer", show: false }
      ]

    },
    {
      imgWidth: 100,
      imgHeight: 100,
      monthlyPrice: 49,
      title: 'Captain',
      popularPlan: true,
      currentPlan: auth?.user?.plan && auth?.user?.plan == 'free' ? false : auth?.user?.plan && auth?.user?.plan == 'regular' ? true : false,
      subtitle: 'Get full access to the extension and upcomming features.',
      imgSrc: '/images/pages/pricing-illustration-2.png',
      yearlyPlan: { perMonth: 9, totalAnnual: 108 },
      planBenefits: [
        { text: "Get on-page SEO", show: true },
        { text: "Contact and Social Info Scraper (Email & Phone)", show: true },
        { text: "Download Data Points to .CSV", show: true },
        { text: "Broken Link Checker", show: true },
        { text: "Get all headings", show: true },
        { text: "Free subscription to SEO & PR Newsletter", show: true },
        { text: "Generate AI article writer", show: true }
      ]
    }
  ]




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

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await axios.get('/pages/pricing')
//   const apiData: PricingDataType = res.data

//   return {
//     props: {
//       apiData
//     }
//   }
// }

export default Pricing
