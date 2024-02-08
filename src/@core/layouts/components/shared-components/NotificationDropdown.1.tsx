import { useState, SyntheticEvent, Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import CustomChip from 'src/@core/components/mui/chip';
import { getInitials } from 'src/@core/utils/get-initials';
import { Props, NotificationsType, Avatar, Menu, MenuItem } from './NotificationDropdown';

export const NotificationDropdown = (props: Props) => {
    // ** Props
    const { settings, notifications } = props;

    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);

    // ** Hook
    const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    // ** Vars
    const { direction } = settings;

    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
    };

    const RenderAvatar = ({ notification }: { notification: NotificationsType; }) => {
        const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification;

        if (avatarImg) {
            return <Avatar alt={avatarAlt} src={avatarImg} />;
        } else if (avatarIcon) {
            return (
                <Avatar skin='light' color={avatarColor}>
                    {avatarIcon}
                </Avatar>
            );
        } else {
            return (
                <Avatar skin='light' color={avatarColor}>
                    {getInitials(avatarText as string)}
                </Avatar>
            );
        }
    };

    return (
        <Fragment>
            {/* <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
      
      
            </IconButton> */}
            <Button variant='contained' onClick={handleDropdownOpen}>
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
                        <CustomChip
                            skin='light'
                            size='small'
                            color='primary'
                            label={`${notifications.length} New`}
                            sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }} />
                    </Box>
                </MenuItem>
                {/* <ScrollWrapper hidden={hidden}>
              {notifications.map((notification: NotificationsType, index: number) => (
                <MenuItem key={index} onClick={handleDropdownClose}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <RenderAvatar notification={notification} />
                    <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{notification.title}</MenuItemTitle>
                      <MenuItemSubtitle variant='body2'>{notification.subtitle}</MenuItemSubtitle>
                    </Box>
                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                      {notification.meta}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </ScrollWrapper> */}
                <Box>
                    <Grid item sm={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='country-select'>Point of View of Article</InputLabel>
                            <Select
                                fullWidth
                                placeholder='Point of View of Article'
                                label='Point of View of Article'
                                labelId='Point of View of Article'
                                defaultValue={pointOfView}
                                onChange={e => {
                                    setPointOfView(e.target.value);
                                }}
                            >
                                <MenuItem value='Third Person (he, she, it, they)'>Third Person (he, she, it, they)</MenuItem>
                                {/* <MenuItem value='gpt-3.5-turbo-16k-0613'>GPT-3.5-TURBO-16k</MenuItem> */}
                                <MenuItem value='Second Person (you, your, yours)'>Second Person (you, your, yours)</MenuItem>
                                <MenuItem value='First Person Plural (we, us, our, ours)'>First Person Plural (we, us, our, ours)</MenuItem>
                                <MenuItem value='First Person Singular (I, me, my, mine)'>First Person Singular (I, me, my, mine)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Box>
                {/* <MenuItem
              disableRipple
              disableTouchRipple
              sx={{
                py: 3.5,
                borderBottom: 0,
                cursor: 'default',
                userSelect: 'auto',
                backgroundColor: 'transparent !important',
                borderTop: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Button fullWidth variant='contained' onClick={handleDropdownClose}>
                Read All Notifications
              </Button>
            </MenuItem> */}
            </Menu>
        </Fragment>
    );
};
