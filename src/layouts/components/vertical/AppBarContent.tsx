// ** MUI Imports
import Box from '@mui/material/Box'
// import IconButton from '@mui/material/IconButton'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// // ** Components
// import Autocomplete from 'src/layouts/components/Autocomplete'
// import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
// import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
// import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
// import BackToTheLastPage from './BackToTheLastPage'
// import {
//   NotificationsType
// } from 'src/@core/layouts/components/shared-components/NotificationDropdown'
// // import { NotificationDropdown } from 'src/@core/layouts/components/shared-components/NotificationDropdown.1'
// import { ShortcutsType } from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import WorkspaceList from '../WorkspaceList'
import { useEffect, useState } from 'react'
import { LoginRegistrationAPI } from 'src/services/API'
import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import { AssignedTo } from './AssignedTo'
import { ArticleStatus } from './ArticleStatus'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

// const notifications: NotificationsType[] = [
//   {
//     meta: 'Today',
//     avatarAlt: 'Flora',
//     title: 'Congratulation Flora! 🎉',
//     avatarImg: '/images/avatars/4.png',
//     subtitle: 'Won the monthly best seller badge'
//   },
//   {
//     meta: 'Yesterday',
//     avatarColor: 'primary',
//     subtitle: '5 hours ago',
//     avatarText: 'Robert Austin',
//     title: 'New user registered.'
//   },
//   {
//     meta: '11 Aug',
//     avatarAlt: 'message',
//     title: 'New message received 👋🏻',
//     avatarImg: '/images/avatars/5.png',
//     subtitle: 'You have 10 unread messages'
//   },
//   {
//     meta: '25 May',
//     title: 'Paypal',
//     avatarAlt: 'paypal',
//     subtitle: 'Received Payment',
//     avatarImg: '/images/misc/paypal.png'
//   },
//   {
//     meta: '19 Mar',
//     avatarAlt: 'order',
//     title: 'Received Order 📦',
//     avatarImg: '/images/avatars/3.png',
//     subtitle: 'New order received from John'
//   },
//   {
//     meta: '27 Dec',
//     avatarAlt: 'chart',
//     subtitle: '25 hrs ago',
//     avatarImg: '/images/misc/chart.png',
//     title: 'Finance report has been generated'
//   }
// ]

// const shortcuts: ShortcutsType[] = [
//   {
//     title: 'Calendar',
//     url: '/apps/calendar',
//     subtitle: 'Appointments',
//     icon: 'mdi:calendar-month-outline'
//   },
//   {
//     title: 'Invoice App',
//     url: '/apps/invoice/list',
//     subtitle: 'Manage Accounts',
//     icon: 'mdi:receipt-text-outline'
//   },
//   {
//     title: 'Users',
//     url: '/apps/user/list',
//     subtitle: 'Manage Users',
//     icon: 'mdi:account-outline'
//   },
//   {
//     url: '/apps/roles',
//     title: 'Role Management',
//     subtitle: 'Permissions',
//     icon: 'mdi:shield-check-outline'
//   },
//   {
//     url: '/',
//     title: 'Dashboard',
//     icon: 'mdi:chart-pie',
//     subtitle: 'User Dashboard'
//   },
//   {
//     title: 'Settings',
//     icon: 'mdi:cog-outline',
//     subtitle: 'Account Settings',
//     url: '/pages/account-settings/account'
//   },
//   {
//     title: 'Help Center',
//     subtitle: 'FAQs & Articles',
//     icon: 'mdi:help-circle-outline',
//     url: '/pages/help-center'
//   },
//   {
//     title: 'Dialogs',
//     subtitle: 'Useful Dialogs',
//     icon: 'mdi:window-maximize',
//     url: '/pages/dialog-examples'
//   }
// ]

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const [workspaces, setWorkspaces] = useState<any>([])
  const [cw, setCw] = useState<any>([])
  // ** Hook
  const auth = useAuth()

  // console.log("auth:", auth)
  useEffect(() => {
    LoginRegistrationAPI.getAllWorkspaces({}).then(res => {
      // loadServerRows
      setWorkspaces(res.data.workspaces);
      // setCurrentWorkspaceRole(res.data.workspaceRole)
      // setTotal(res.data.total)
      // setRows(loadServerRows(paginationModel.page, res.data.data))
    }).catch(e => {
      console.log("unable to get workspaces")
    })
  }, [])
  useEffect(() => {
    workspaces.map((w: any) => {
      if (auth?.user?.current_workspace == w.id) {
        setCw(w.name.toUpperCase())
      }
    })
  }, [workspaces])

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <BackToTheLastPage />
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
          </IconButton>
        ) : null}

      </Box> */}
      <Box className='actions-left' sx={{ display: 'flex', alignItems: 'center', width: "100%", justifyContent: "space-between" }}>
        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
        <WorkspaceList workspaces={workspaces} current_workspace={auth.user?.current_workspace} cw={cw} />
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}

        {/* {auth.user && ( */}
        <>
          {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
          {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
          {/* <UserDropdown settings={settings} /> */}
          {
            auth.articleStatus &&
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {auth.assignedTo && <AssignedTo assignedTo={auth.assignedTo} updaateAssignedTo={auth.UpdateAssignedTo} />}

              <ArticleStatus articleStatus={auth.articleStatus} updateArticleStatus={auth.updateArticleStatus} />
            </Box>
          }

        </>
        {/* )} */}
      </Box>
    </Box>
  )
}

export default AppBarContent
