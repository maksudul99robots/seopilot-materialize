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
      monthlyPrice: 19,
      currentPlan: auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'free' ? true : auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'regular' ? false : false,
      popularPlan: false,
      subtitle: 'Full access to the extension and upcomming features',
      imgSrc: '/images/pages/passenger.svg',
      yearlyPlan: {
        perMonth: 19,
        totalAnnual: 288
      },
      planBenefits: [
        { text: "Get on-page SEO", show: true },
        { text: "Contact and Social Info Scraper (Email & Phone)", show: true },
        { text: "Download Data Points to .CSV", show: true },
        { text: "Broken Link Checker", show: true },
        { text: "Get all headings", show: true },
        { text: "1 WordPress Site Connection", show: true },
        { text: "1 User/Team Member(s)", show: true },
        { text: "1 Workspace", show: true },
        { text: "Free subscription to SEO & PR Newsletter", show: true },
        { text: "Generate AI article", show: true }
      ]

    },
    {
      imgWidth: 100,
      imgHeight: 100,
      monthlyPrice: 49,
      title: 'Co-Pilot',
      popularPlan: true,
      currentPlan: auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'free' ? false : auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'regular' ? true : false,
      subtitle: 'Full access to the extension and upcomming features.',
      imgSrc: '/images/pages/copilot.svg',
      yearlyPlan: { perMonth: 49, totalAnnual: 588 },
      planBenefits: [
        { text: "Get on-page SEO", show: true },
        { text: "Contact and Social Info Scraper (Email & Phone)", show: true },
        { text: "Download Data Points to .CSV", show: true },
        { text: "Broken Link Checker", show: true },
        { text: "Get all headings", show: true },
        { text: "5 WordPress Site Connections", show: true },
        { text: "5 Users/Team Members", show: true },
        { text: "5 Workspaces", show: true },
        { text: "Free subscription to SEO & PR Newsletter", show: true },
        { text: "Generate AI article", show: true }
      ]
    },
    {
      imgWidth: 100,
      imgHeight: 100,
      monthlyPrice: 99,
      title: 'Captain',
      popularPlan: true,
      currentPlan: auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'free' ? false : auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'regular' ? true : false,
      subtitle: 'Full access to the extension and upcomming features.',
      imgSrc: '/images/pages/captain.svg',
      yearlyPlan: { perMonth: 99, totalAnnual: 1188 },
      planBenefits: [
        { text: "Get on-page SEO", show: true },
        { text: "Contact and Social Info Scraper (Email & Phone)", show: true },
        { text: "Download Data Points to .CSV", show: true },
        { text: "Broken Link Checker", show: true },
        { text: "Get all headings", show: true },
        { text: "25 WordPress Site Connections", show: true },
        { text: "25 Users/Team Members", show: true },
        { text: "25 Workspaces", show: true },
        { text: "Free subscription to SEO & PR Newsletter", show: true },
        { text: "Generate AI article", show: true }
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
