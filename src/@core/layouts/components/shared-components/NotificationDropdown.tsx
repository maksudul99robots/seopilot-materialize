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
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { getInitials } from 'src/@core/utils/get-initials'
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


// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})



const NotificationDropdown = (props: any) => {
  // ** Props
  const { settings, status, type, length, setStatus, setType, setLength, setRunFilter, runFilter } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const RenderAvatar = ({ notification }: { notification: NotificationsType }) => {
    const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification

    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg} />
    } else if (avatarIcon) {
      return (
        <Avatar skin='light' color={avatarColor}>
          {avatarIcon}
        </Avatar>
      )
    } else {
      return (
        <Avatar skin='light' color={avatarColor}>
          {getInitials(avatarText as string)}
        </Avatar>
      )
    }
  }

  return (
    <Fragment>
      {/* <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>


      </IconButton> */}
      <Button variant='outlined' onClick={handleDropdownOpen} startIcon={<Icon icon="mdi:filter" />}>
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
        <Box sx={{ padding: "15px" }}>
          <Grid item sm={12} xs={12} sx={{ paddingBottom: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id='type-select'>Article Type</InputLabel>
              <Select
                fullWidth
                placeholder='Article Type'
                label='Article Type'
                labelId='Article Type'
                value={type}
                onChange={e => {
                  setType(e.target.value)
                }}
              >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='blog'>Blog</MenuItem>
                <MenuItem value='listicle'>Listicle</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12} sx={{ paddingBottom: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id='length-select'>Article Length</InputLabel>
              <Select
                fullWidth
                placeholder='Article Length'
                label='Article Length'
                labelId='Article Length'
                value={length}
                onChange={e => {
                  setLength(e.target.value)
                }}
              >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='short'>Short</MenuItem>
                <MenuItem value='long'>Long</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12} sx={{ paddingBottom: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id='country-select'>Status</InputLabel>
              <Select
                fullWidth
                placeholder='Status'
                label='Status'
                labelId='Status'
                value={status}
                onChange={e => {
                  setStatus(e.target.value)
                }}
              >
                <MenuItem value='all'>All</MenuItem>
                {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem> */}
                <MenuItem value='completed'>Completed</MenuItem>
                <MenuItem value='error'>Error</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <MenuItem sx={{ display: "flex", justifyContent: "end", width: "100%" }}>


          <Button variant='outlined' onClick={e => {
            setStatus('all')
            setLength('all')
            setType('all')
            setRunFilter(runFilter + 1)
            // handleDropdownClose()
          }} sx={{ marginRight: "10px" }}>
            Reset
          </Button>

          <Button variant='contained' onClick={e => {
            setRunFilter(runFilter + 1)
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
