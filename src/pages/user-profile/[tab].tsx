// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { PricingDataType } from 'src/@core/components/plan-details/types'

// ** Demo Components Imports
import AccountSettings from 'src/views/pages/account-settings/AccountSettings'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

const AccountSettingsTab = ({ tab, apiPricingPlanData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AccountSettings tab={tab} apiPricingPlanData={apiPricingPlanData} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'security' } },
      { params: { tab: 'billing' } },
      { params: { tab: 'notifications' } },
      { params: { tab: 'connections' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  // const router = useRouter()
  // const auth = useAuth()

  const res = await axios.get('/pages/pricing')
  const data: PricingDataType = res.data

  return {
    props: {
      tab: params?.tab,
      apiPricingPlanData: data.pricingPlans
    }
  }
}

export default AccountSettingsTab
