// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth';

const navigation = (): VerticalNavItemsType => {
  const auth = useAuth();

  let menus =
    // auth?.user?.workspace_owner_info?.plan?.plan !== 'free' && auth?.user?.workspace_owner_info?.plan?.plan !== 'extension_only' ? 
    [

      {
        sectionTitle: 'Menu' //leaving  for now. Change later
      },
      {
        title: 'My Articles',
        icon: 'ic:outline-article',
        path: '/articles'
      },
      {
        title: 'Create Article',
        icon: 'streamline:ai-edit-spark',
        path: '/create-article'
      },
      // {
      //   title: 'Keyword Research',
      //   icon: 'icons8:idea',
      //   path: '/generate-idea'
      // },
      // {
      //   title: 'Idea Library',
      //   icon: 'fluent-mdl2:folder-list-mirrored',
      //   path: '/idea-list'
      // },
      {
        sectionTitle: 'Workspace Settings'
      },
      {
        title: 'API Key',
        icon: 'material-symbols:key-outline',
        path: '/add-apikey'
      },
      {
        title: 'Integrations',
        icon: 'ic:round-wordpress',
        path: '/integrations'
      },
      {
        sectionTitle: 'Account Settings'
      },
      {
        title: 'Workspaces',
        icon: 'material-symbols:workspaces-outline',
        path: '/workspaces'
      },
      {
        title: 'Team',
        icon: 'fluent:people-team-28-regular',
        path: '/team'
      },
      {
        sectionTitle: 'Profile Settings'
      },

      {
        title: 'Profile',
        icon: 'mdi:account-outline',
        path: '/user-profile/account'
      },
      {
        title: 'Plans',
        icon: 'mdi:currency-usd',
        path: '/plans'
      },

    ]
  // :
  //   [

  //     {
  //       sectionTitle: 'Account Settings'
  //     },
  //     {
  //       title: 'OpenAI API Key',
  //       icon: 'material-symbols:key-outline',
  //       path: '/add-apikey'
  //     },
  //     // {
  //     //   title: 'Workspaces',
  //     //   icon: 'material-symbols:workspaces-outline',
  //     //   path: '/workspaces'
  //     // },
  //     // {
  //     //   title: 'Team',
  //     //   icon: 'fluent:people-team-28-regular',
  //     //   path: '/team'
  //     // },
  //     {
  //       sectionTitle: 'Profile Settings'
  //     },
  //     {
  //       title: 'Profile Settings',
  //       icon: 'mdi:account-outline',
  //       path: '/user-profile/account'
  //     },
  //     {
  //       title: 'Plans',
  //       icon: 'mdi:currency-usd',
  //       path: '/plans'
  //     },

  //   ];

  // let adminMenus = [
  //   {
  //     sectionTitle: 'Admin Options'
  //   },
  //   {
  //     title: 'All Articles',
  //     icon: 'ooui:articles-rtl',
  //     path: '/admin/articles'
  //   },
  //   {
  //     title: 'All Users',
  //     icon: 'mdi:account-outline',
  //     path: '/admin/users'
  //   },
  //   // {
  //   //   title: 'All Articles',
  //   //   icon: 'material-symbols:key-outline',
  //   //   path: '/add-apikey'
  //   // }
  // ]
  // if (auth?.user?.approle?.role.id == 2) { //if app admin
  //   menus = menus.concat(adminMenus);
  // }


  return menus
}

export default navigation
