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
        title: 'Calendar',
        icon: 'fluent-mdl2:date-time-mirrored',
        path: '/calendar'
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
        // badgeColor: "info",
        // badgeContent: "beta"
      },
      {
        title: 'Keyword Research',
        icon: 'ri:menu-search-line',
        path: '/keyword-research',
        // badgeColor: "info",
        // badgeContent: "beta"
      },
      {
        title: 'Article Clusters',
        // icon: 'fluent-mdl2:folder-list-mirrored',
        icon: 'vaadin:cluster',
        path: '/clusters',
        // badgeColor: "info",
        // badgeContent: "beta"
      },
      {
        sectionTitle: 'My Tasks'
      },
      {
        title: 'My Tasks',
        icon: 'fluent-mdl2:task-list',
        path: '/my-tasks'
      },
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
      {
        title: 'Sign Out',
        icon: 'material-symbols:logout-sharp',
        path: '/go-to-login-page'
      },

    ];

  if (auth?.user?.workspace_owner_info?.plan?.plan == "yearly - passenger" ||
    auth?.user?.workspace_owner_info?.plan?.plan == "monthly - passenger" ||
    auth?.user?.workspace_owner_info?.plan?.plan == "passenger" ||
    auth?.user?.workspace_owner_info?.plan?.plan == "extension_only"
  ) {
    menus =
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
          title: 'Calendar',
          icon: 'fluent-mdl2:date-time-mirrored',
          path: '/calendar'
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
          // badgeColor: "info",
          // badgeContent: "beta"
        },
        {
          title: 'Article Clusters',
          // icon: 'fluent-mdl2:folder-list-mirrored',
          icon: 'vaadin:cluster',
          path: '/clusters',
          // badgeColor: "info",
          // badgeContent: "beta"
        },
        // {
        //   title: 'Keyword Research',
        //   icon: 'ri:menu-search-line',
        //   path: '/keyword-research',
        //   // badgeColor: "info",
        //   // badgeContent: "beta"
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
        {
          title: 'Sign Out',
          icon: 'material-symbols:logout-sharp',
          path: '/go-to-login-page'
        },

      ];
  }
  return menus
}

export default navigation
