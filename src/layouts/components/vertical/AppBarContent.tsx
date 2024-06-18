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
              <AssignedTo />
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>|</div>
              <Typography sx={{ fontWeight: "600" }}>Article Status:</Typography>
              <FormControl sx={{ marginX: "10px" }}>
                <Select
                  placeholder='Content Status'
                  value={"Published"}
                  sx={{ height: "30px", backgroundColor: "#fff", width: "100%", fontSize: "11px" }}
                // onChange={(e: any) => {
                //   if (e.target.value && e.target.value != "") {
                //     props.setStatus(e.target.value)
                //     LoginRegistrationAPI.updateArticleStatus({ id: props.id, status: e.target.value }).then((res) => {
                //       Swal.fire({
                //         title: 'Success',
                //         text: e.target.value == 'review' ? 'Marked as REVIEW REQUIRED' : 'Marked as READY TO PUBLISH' + " !",
                //         icon: 'success',
                //         confirmButtonText: 'Close',
                //         confirmButtonColor: "#2979FF",
                //       })
                //     }).catch((error: any) => {
                //       Swal.fire(
                //         'Error',
                //         'Unable to changes status',
                //         'error'
                //       )
                //     })
                //   }

                // }}
                >
                  {/* {statusDropdown.map((s: any) => {
                  return */}
                  <MenuItem value="Published">
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <Box sx={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "#72E128",
                        // s == 'completed' ? "#BFC4CC" :
                        //   s == 'review' ? "#41C9E2" :
                        //     s == 'published' ? "#72E128" :
                        //       s == 'ready_to_publish' ? "#2979FF" : "#3ABEF9",
                        borderRadius: "50%",
                        marginRight: "10px",
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center"
                      }}>
                      </Box>
                      <Typography>{'PUBLISHED'
                        // s == 'completed' ? 'GENERATED' :
                        //   s == 'review' ? 'REVIEW REQUIRED' :
                        //     s == 'published' ? 'PUBLISHED' :
                        //       s == 'scheduled' ? 'SCHEDULED' :
                        //         s == 'ready_to_publish' ? 'READY TO PUBLISH' : ''
                      }</Typography>
                    </Box>
                  </MenuItem>
                  {/* })} */}
                  {/* <MenuItem value='incomplete'>
                                    <Box sx={{ display: "flex", }}>
                                        <Box sx={{ height: "10px", width: "10px", backgroundColor: "#2979FF", borderRadius: "50%", marginRight: "10px", marginTop: "8px", display: "flex", alignItems: "center" }}>
                                        </Box>
                                        <Typography>INCOMPLETE</Typography>
                                    </Box>
                                </MenuItem>
                                <MenuItem value='complete'>
                                    <Box sx={{ display: "flex", }}>
                                        <Box sx={{ height: "10px", width: "10px", backgroundColor: "#72E128", borderRadius: "50%", marginRight: "10px", marginTop: "8px", display: "flex", alignItems: "center" }}>
                                        </Box>
                                        <Typography>COMPLETE</Typography>
                                    </Box>
                                </MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          }

        </>
        {/* )} */}
      </Box>
    </Box>
  )
}

export default AppBarContent
