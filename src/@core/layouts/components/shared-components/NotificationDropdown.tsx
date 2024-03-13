// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components

// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'

import { FormControl, Grid, InputLabel, Select } from '@mui/material'

export type NotificationsType = {
  meta: string
  title: string
  subtitle: string
} & (
    | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
    | {
      avatarAlt?: never
      avatarImg?: never
      avatarText: string
      avatarIcon?: never
      avatarColor?: ThemeColor
    }
    | {
      avatarAlt?: never
      avatarImg?: never
      avatarText?: never
      avatarIcon: ReactNode
      avatarColor?: ThemeColor
    }
  )
// interface Props {
//   settings: Settings,
//   status:string,
//   type: 

// }

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))



const NotificationDropdown = (props: any) => {
  // ** Props
  // const { settings, status, type, length, setStatus, setType, setLength, setRunFilter, runFilter } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook

  // ** Vars
  let settings = {
    skin: 'default',
    mode: 'dark',
    appBar: undefined,
    footer: undefined,
    navHidden: undefined,
    appBarBlur: false,
    direction: 'ltr',
    navCollapsed: false,
    themeColor: 'primary',
    contentWidth: 'full',
    layout: undefined,
    lastLayout: undefined,
    verticalNavToggleType: 'collapse',
    toastPosition: undefined
  }
  const { direction } = settings
  const FilterOptions: React.ReactElement = props.FilterOptions;


  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }


  return (
    <Fragment>
      {/* <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>


      </IconButton> */}
      <Button variant='outlined' onClick={handleDropdownOpen} startIcon={<Icon icon="mdi:filter" />} style={{ height: "40px" }}>
        Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ cursor: 'text', fontWeight: 600 }}>Filter Options</Typography>
            {/* <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={<Icon icon="mdi:filter" />}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500}}
            /> */}
          </Box>
        </MenuItem>
        {
          FilterOptions
        }
        <MenuItem sx={{ display: "flex", justifyContent: "end", width: "100%" }}>


          <Button variant='outlined' onClick={e => { props.reset() }} sx={{ marginRight: "10px" }}>
            Reset
          </Button>

          <Button variant='contained' onClick={e => {
            props.setRunFilter(props.runFilter + 1)
            handleDropdownClose()
          }}>
            Apply
          </Button>

        </MenuItem>

      </Menu>
    </Fragment >
  )
}

export default NotificationDropdown
