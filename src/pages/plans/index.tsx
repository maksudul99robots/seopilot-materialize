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
import { LoginRegistrationAPI } from 'src/services/API'
import Swal from 'sweetalert2'

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
  const [plan, setPlan] = useState<'monthly' | 'annually'>('monthly')
  let pricings = [
    {
      imgWidth: 100,
      title: 'Passenger',
      imgHeight: 100,
      monthlyPrice: 19,
      // currentPlan: auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'passenger' ? true : auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan == 'regular' ? false : false,
      currentPlan:
        (auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'free' ? false :
          (plan == 'monthly' && (!auth?.user?.workspace_owner_info?.plan?.token && auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'monthly - passenger') ? true :
            (plan == 'annually' && (!auth?.user?.workspace_owner_info?.plan?.token && auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'yearly - passenger') ? true :
              false,
      popularPlan: true,
      subtitle: 'SaaS & Chrome Extension Plan',
      imgSrc: '/images/pages/passenger.svg',
      yearlyPlan: {
        perMonth: 15.8,
        totalAnnual: 190
      },
      planBenefits: [
        { text: "Advanced AI Writer (Saas)", show: true },
        { text: "30 Articles / Month", show: true },
        { text: "1 User", show: true },
        { text: "1 Workspace", show: true },
        { text: "1 Site Connected", show: true },
        { text: "1 Article Cluster", show: true },
        { text: "Folders", show: true },
        { text: "Schedule Post", show: true },
        { text: "Extension Access (Contact info & Ai Writer)", show: true }
      ]

    },
    {
      imgWidth: 100,
      imgHeight: 100,
      monthlyPrice: 49,
      title: 'Co-Pilot',
      popularPlan: true,
      currentPlan:
        (auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'free' ? false :
          (plan == 'monthly' && (!auth?.user?.workspace_owner_info?.plan?.token && auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'monthly - copilot') ? true :
            (plan == 'annually' && (!auth?.user?.workspace_owner_info?.plan?.token && auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'yearly - copilot') ? true :
              false,
      subtitle: 'SaaS & Chrome Extension Plan',
      imgSrc: '/images/pages/copilot.svg',
      yearlyPlan: { perMonth: 40.8, totalAnnual: 490 },
      planBenefits: [
        { text: "Advanced AI Writer (Saas)", show: true },
        { text: "Unlimited Articles", show: true },
        { text: "5 Users", show: true },
        { text: "5 Workspaces", show: true },
        { text: "5 Sites Connected", show: true },
        { text: "5 Article Clusters", show: true },
        { text: "Folders", show: true },
        { text: "Schedule Post", show: true },
        { text: "Extension Access (Contact Info & Ai Writer)", show: true }
      ]
    },
    {
      imgWidth: 100,
      imgHeight: 100,
      monthlyPrice: 99,
      title: 'Captain',
      popularPlan: true,
      currentPlan:
        (auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'free' ? false :
          (plan == 'monthly' && (!auth?.user?.workspace_owner_info?.plan?.token && auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'monthly - captain') ? true :
            (plan == 'annually' && (!auth?.user?.workspace_owner_info?.plan?.token && auth?.user?.workspace_owner_info?.plan?.plan && auth?.user?.workspace_owner_info?.plan?.plan) == 'yearly - captain') ? true :
              false,
      subtitle: 'SaaS & Chrome Extension Plan',
      imgSrc: '/images/pages/captain.svg',
      yearlyPlan: { perMonth: 82.5, totalAnnual: 990 },
      planBenefits: [
        { text: "Advanced AI Writer (Saas)", show: true },
        { text: "Unlimited Articles", show: true },
        { text: "25 Users", show: true },
        { text: "25 Workspaces", show: true },
        { text: "25 Sites Connected", show: true },
        { text: "25 Article Clusters", show: true },
        { text: "Folders", show: true },
        { text: "Schedule Post", show: true },
        { text: "Extension Access (Contact Info & Ai Writer)", show: true }
      ]
    }
  ]




  // ** States

  const [loading, setLoading] = useState(false)
  const [downOrCancel, setDownOrCancel] = useState<any>(null)

  const handleChange = (e: ChangeEvent<{ checked: boolean }>) => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }
  // console.log("auth.user", auth.user)

  const makePayment = (plan: string) => {
    Swal.fire({
      text: 'Are you sure you want to subscribe to this plan?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      // cancelButtonColor: "#2979FF",
      confirmButtonText: 'Subscribe',
      confirmButtonColor: "#2979FF",


    }).then((res: any) => {
      // console.log("res:", res)
      if (res.isConfirmed) {
        setLoading(true)
        LoginRegistrationAPI.makePayment({ plan: plan })
          .then(response => {
            // console.log("response from makePayment:", response.data)
            if (response.data.url) {
              window.location.href = response.data.url
            } else if (response.data == "subscription updated") {
              setTimeout(() => {
                LoginRegistrationAPI.getUser({}).then(res => {
                  // console.log("res:", res)
                  auth.setUserDataWithToken(res)

                }).catch(e => {

                })
              }, 5000)

            }
          })
          .catch(error => console.log("error:", error));
      }

    })

  };
  const calcelPayment = () => {
    Swal.fire({
      text: 'Are you sure you want to cancel subscription?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      // cancelButtonColor: "#2979FF",
      confirmButtonText: 'Yes',
      confirmButtonColor: "#2979FF",


    }).then((res: any) => {
      // console.log("res:", res)
      if (res.isConfirmed) {
        setLoading(true)
        LoginRegistrationAPI.cancelSubscription({})
          .then(response => {
            // console.log("response from makePayment:", response.data)
            if (response.data.url) {
              window.location.href = response.data.url
            } else if (response.data == "subscription updated") {
              setTimeout(() => {
                LoginRegistrationAPI.getUser({}).then(res => {
                  // console.log("res:", res)
                  auth.setUserDataWithToken(res)

                }).catch(e => {

                })
              }, 5000)

            }
          })
          .catch(error => console.log("error:", error));
      }

    })

  };

  useEffect(() => {
    LoginRegistrationAPI.downgradeInfo({}).then(res => {
      // console.log("downgrade info:", res.data)
      setDownOrCancel(res.data)
    }).catch(e => {

    })


    LoginRegistrationAPI.getUser({}).then(res => {
      if (auth && auth?.user?.workspace_owner_info?.plan.plan != res.data.userData.workspace_owner_info.plan.plan)
        auth.setUserDataWithToken(res)
    }).catch(e => {

    })
  }, [])

  return (
    <Card>
      <CardContent>
        <PricingHeader plan={plan} handleChange={handleChange} planObj={auth?.user?.workspace_owner_info?.plan} downOrCancel={downOrCancel} />
        {/* <LTDPlan plan={auth?.user?.plan} downOrCancel={downOrCancel} /> */}
        <PricingPlans plan={plan} data={pricings} makePayment={makePayment} setLoading={setLoading} loading={loading} calcelPayment={calcelPayment} />
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
