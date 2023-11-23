// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth';

const navigation = (): VerticalNavItemsType => {
  const auth = useAuth();
  let menus = auth?.user?.plan?.plan !== 'free' ? [

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
      title: 'Integrations',
      icon: 'ic:round-wordpress',
      path: '/integrations'
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

    ];

  let adminMenus = [
    {
      sectionTitle: 'Admin Options'
    },
    {
      title: 'All Users',
      icon: 'mdi:account-outline',
      path: '/admin/users'
    },
    // {
    //   title: 'All Articles',
    //   icon: 'material-symbols:key-outline',
    //   path: '/add-apikey'
    // }
  ]
  if (auth?.user?.approle?.role.id == 2) { //if app admin
    menus = menus.concat(adminMenus);
  }


  return menus
}

export default navigation
