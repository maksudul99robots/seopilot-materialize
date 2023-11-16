// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth';

const navigation = (): VerticalNavItemsType => {
  const auth = useAuth();

  let menus = auth?.user?.plan == 'ltd' ? [

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

  ] :
    [
      {
        sectionTitle: 'Menu & Profile Settings'
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


  return menus
}

export default navigation
