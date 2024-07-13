import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CreateArticleUI from './CreateArticleUI';
import Icon from 'src/@core/components/icon'


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function IdeaLibraryDrawer(props: any) {
    const [state, setState] = React.useState({
        // top: false,
        // left: false,
        // bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                // console.log("anchor, open:", anchor, open)
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100%' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const closeDrawer = () => {
        setState({ ...state, right: false });
    };
    return (
        <div>
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    {
                        props.isCreateIdea ?
                            <Button variant='contained' onClick={() => {

                                setState({ ...state, right: true });
                            }} startIcon={<Icon icon="ph:plus"></Icon>}>Create Idea</Button>
                            :
                            <Button variant='outlined' color='secondary' className='outlined-btn-color' size='small' onClick={() => {

                                setState({ ...state, right: true });
                            }} sx={{ fontSize: "12px", padding: "5px", marginRight: "5px" }}>

                                Edit
                            </Button>
                    }
                    <Drawer
                        className='custom-drawer'
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <CreateArticleUI
                            toggleDrawer={closeDrawer}
                            isCreateIdea={props.isCreateIdea}
                            settings={[]}
                            updateList={props.updateList}
                            idea_id={props.idea_id}
                            data={props.data}
                            allSites={props.allSites}
                        />
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}