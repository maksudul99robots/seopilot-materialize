// @ts-ignore
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth';

const navigation = (): VerticalNavItemsType | any => {
  const auth = useAuth();

  let menus =
    [
      {
        sectionTitle: 'CONTENT'
      },
      {
        title: 'Create Article',
        icon: 'streamline:ai-edit-spark',
        path: '/create-article'
      },
      {
        title: 'My Articles',
        icon: 'ic:outline-article',
        path: '/articles'
      },
      {
        title: 'Folders',
        icon: 'mdi:folders-outline',
        path: '/folders'
      },
      {
        title: 'Create Cluster',
        icon: 'vaadin:cluster',
        path: '/generate-idea',
        badgeColor: "info",
        badgeContent: "beta"
      },
      {
        title: 'My Clusters',
        icon: 'fluent-mdl2:folder-list-mirrored',
        path: '/clusters',
        badgeColor: "info",
        badgeContent: "beta"
      },
      {
        title: 'Schedule',
        icon: 'fluent-mdl2:date-time-mirrored',
        path: '/schedule'
      },
      // {
      //   sectionTitle: 'Research'
      // },
      // {
      //   title: 'Idea Library',
      //   icon: 'icons8:idea',
      //   path: '/idea-list',
      //   badgeColor: "info",
      //   badgeContent: "beta"
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
        icon: 'carbon:plug',
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

    ];

  return menus
}

export default navigation
