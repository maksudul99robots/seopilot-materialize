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
          'monthly - passenger',
          'yearly - passenger'
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

  // if (auth?.user?.workspace_owner_info?.plan?.plan == "yearly - passenger" ||
  //   auth?.user?.workspace_owner_info?.plan?.plan == "monthly - passenger" ||
  //   auth?.user?.workspace_owner_info?.plan?.plan == "passenger" ||
  //   auth?.user?.workspace_owner_info?.plan?.plan == "extension_only" ||
  //   auth?.user?.workspace_owner_info?.plan?.plan == "free"
  // ) {
  //   menus =
  //     [
  //       {
  //         sectionTitle: 'CONTENT'
  //       },
  //       {
  //         title: 'Create Article',
  //         icon: 'streamline:ai-edit-spark',
  //         path: '/create-article'
  //       },
  //       {
  //         title: 'My Articles',
  //         icon: 'ic:outline-article',
  //         path: '/articles'
  //       },
  //       {
  //         title: 'Folders',
  //         icon: 'mdi:folders-outline',
  //         path: '/folders'
  //       },
  //       {
  //         title: 'Calendar',
  //         icon: 'fluent-mdl2:date-time-mirrored',
  //         path: '/calendar'
  //       },
  //       {
  //         sectionTitle: 'Research',
  //         badgeColor: "info",
  //         badgeContent: "beta"
  //       },
  //       // {
  //       //   title: 'Create Cluster',
  //       //   icon: 'vaadin:cluster',
  //       //   path: '/create-cluster',
  //       //   // badgeColor: "info",
  //       //   // badgeContent: "beta"
  //       // },
  //       {
  //         title: 'Idea Library',
  //         icon: 'icons8:idea',
  //         path: '/idea-list',
  //         // badgeColor: "info",
  //         // badgeContent: "beta"
  //       },
  //       {
  //         title: 'Article Clusters',
  //         // icon: 'fluent-mdl2:folder-list-mirrored',
  //         icon: 'vaadin:cluster',
  //         path: '/clusters',
  //         // badgeColor: "info",
  //         // badgeContent: "beta"
  //       },
  //       // {
  //       //   title: 'Keyword Research',
  //       //   icon: 'ri:menu-search-line',
  //       //   path: '/keyword-research',
  //       //   // badgeColor: "info",
  //       //   // badgeContent: "beta"
  //       // },
  //       {
  //         sectionTitle: 'Workspace Settings'
  //       },
  //       {
  //         title: 'API Key',
  //         icon: 'material-symbols:key-outline',
  //         path: '/add-apikey'
  //       },
  //       {
  //         title: 'Integrations',
  //         icon: 'carbon:plug',
  //         path: '/integrations'
  //       },
  //       {
  //         sectionTitle: 'Account Settings'
  //       },
  //       {
  //         title: 'Workspaces',
  //         icon: 'material-symbols:workspaces-outline',
  //         path: '/workspaces'
  //       },
  //       {
  //         title: 'Team',
  //         icon: 'fluent:people-team-28-regular',
  //         path: '/team'
  //       },
  //       {
  //         sectionTitle: 'Profile Settings'
  //       },

  //       {
  //         title: 'Profile',
  //         icon: 'mdi:account-outline',
  //         path: '/user-profile/account'
  //       },
  //       {
  //         title: 'Plans',
  //         icon: 'mdi:currency-usd',
  //         path: '/plans'
  //       },
  //       {
  //         title: 'Sign Out',
  //         icon: 'material-symbols:logout-sharp',
  //         path: '/go-to-login-page'
  //       },

  //     ];
  // }

  // const finalMenus = () => {
  //   let x: any[] = [];
  //   menus.forEach(m => {
  //     if (m?.restrict && m?.restrict !== 'none') {
  //       if (!m.restrict.includes(auth?.user?.workspace_owner_info?.plan?.plan)) {
  //         x.push(m)
  //       }
  //     } else {
  //       x.push(m);
  //     }
  //   })
  //   console.log("x:", x)
  //   return x;


  // }
  const finalMenus = menus.filter((m: any) => !m.restrict || m.restrict === 'none' || !m.restrict.includes(auth?.user?.workspace_owner_info?.plan?.plan));

  return finalMenus
}

export default navigation
