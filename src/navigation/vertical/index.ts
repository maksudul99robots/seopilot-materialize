// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [

    {
      sectionTitle: 'Profile & Settings'
    },
    {
      title: 'Profile Settings',
      icon: 'mdi:account-outline',
      path: '/user-profile/account'
    },
    {
      title: 'Pricing',
      icon: 'mdi:currency-usd',
      path: '/pricing'
    },

  ]
}

export default navigation
