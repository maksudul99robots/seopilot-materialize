// @ts-ignore
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth';

const navigation = (): VerticalNavItemsType | any => {
  const auth = useAuth();
  // console.log("auth:", auth)
  let menus =
    [
      {
        sectionTitle: 'CONTENT'
      },
      {
        title: 'Create Article',
        icon: 'streamline:ai-edit-spark',
        path: '/create-article',
        restrict: 'none'
      },
      {
        title: 'My Articles',
        icon: 'ic:outline-article',
        path: '/articles',
        restrict: 'none'
      },
      {
        title: 'Folders',
        icon: 'mdi:folders-outline',
        path: '/folders',
        restrict: 'none'
      },
      {
        title: 'Calendar',
        icon: 'fluent-mdl2:date-time-mirrored',
        path: '/calendar',
        restrict: 'none'
      },
      {
        sectionTitle: 'Research',
        badgeColor: "info",
        badgeContent: "beta"
      },
      // {
      //   title: 'Create Cluster',
      //   icon: 'vaadin:cluster',
      //   path: '/create-cluster',
      //   // badgeColor: "info",
      //   // badgeContent: "beta"
      // },

      {
        title: 'Idea Library',
        icon: 'icons8:idea',
        path: '/idea-list',
        restrict: 'none'
        // badgeColor: "info",
        // badgeContent: "beta"
      },
      {
        title: 'Keyword Research',
        icon: 'ri:menu-search-line',
        path: '/keyword-research',
        restrict: 'none'
        // badgeColor: "info",
        // badgeContent: "beta"
      },
      {
        title: 'Article Clusters',
        // icon: 'fluent-mdl2:folder-list-mirrored',
        icon: 'vaadin:cluster',
        path: '/clusters',
        restrict: 'none'
        // badgeColor: "info",
        // badgeContent: "beta"
      },
      {
        title: 'GSC Stats',
        // icon: 'fluent-mdl2:folder-list-mirrored',
        icon: 'icomoon-free:stats-dots',
        path: '/gsc-stats',
        restrict: [
          'free',
          'passenger',
          'copilot',
          // 'captain',
          'extension_only'
        ]
        // badgeColor: "info",
        // badgeContent: "beta"
      },
      {
        sectionTitle: 'My Tasks'
      },
      {
        title: 'My Tasks',
        icon: 'fluent-mdl2:task-list',
        path: '/my-tasks',
        restrict: 'none'
      },
      {
        sectionTitle: 'Account Settings'
      },
      {
        title: 'API Key',
        icon: 'material-symbols:key-outline',
        path: '/add-apikey',
        restrict: ['monthly - passenger', 'yearly - passenger', 'monthly - copilot', 'yearly - copilot', 'monthly - captain', 'yearly - captain']
      },
      {
        title: 'Integrations',
        icon: 'carbon:plug',
        path: '/integrations',
        restrict: 'none'
      },

      {
        sectionTitle: 'Workspace Settings'
      },
      {
        title: 'Workspaces',
        icon: 'material-symbols:workspaces-outline',
        path: '/workspaces',
        restrict: 'none'
      },
      {
        title: 'Team',
        icon: 'fluent:people-team-28-regular',
        path: '/team',
        restrict: 'none'
      },
      {
        sectionTitle: 'Profile Settings'
      },

      {
        title: 'Profile',
        icon: 'mdi:account-outline',
        path: '/user-profile/account',
        restrict: 'none'
      },
      {
        title: 'Plans',
        icon: 'mdi:currency-usd',
        path: '/plans',
        restrict: 'none'
      },
      {
        title: 'Sign Out',
        icon: 'material-symbols:logout-sharp',
        path: '/go-to-login-page',
        restrict: 'none'
      },

    ];


  const finalMenus = menus.filter((m: any) => !m.restrict || m.restrict === 'none' || !m.restrict.includes(auth?.user?.workspace_owner_info?.plan?.plan));
  if (auth?.user?.role_permission_id == 2) {
    finalMenus.push({
      sectionTitle: 'Admin Settings'
    },
      {
        title: 'Users',
        icon: 'mdi:account-outline',
        path: '/admin/users',
        restrict: 'none'
      },
      {
        title: 'All Articles',
        icon: 'ic:outline-article',
        path: '/admin/articles',
        restrict: 'none'
      })
  }

  return finalMenus
}

export default navigation
