// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [

    {
      sectionTitle: 'Menu & Profile Settings'
    },
    {
      title: 'AI Articles',
      icon: 'ic:outline-article',
      path: '/articles'
    },
    {
      title: 'Generate AI Articles',
      icon: 'streamline:ai-edit-spark',
      path: '/create-article'
    },
    {
      title: 'Profile Settings',
      icon: 'mdi:account-outline',
      path: '/user-profile/account'
    },
    {
      title: 'OpenAI API Key',
      icon: 'material-symbols:key-outline',
      path: '/add-apikey'
    },

    {
      title: 'Pricing',
      icon: 'mdi:currency-usd',
      path: '/pricing'
    },

  ]
}

export default navigation
