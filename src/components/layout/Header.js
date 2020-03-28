import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {MdMenu} from 'react-icons/md'
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const Header = () => {
  const classes = useTheme();

  const [state, setState] = useState({
    open: false,
  });

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, open:true });
  };

  return (
    <AppBar position="static" data-testid="header" color="primary" >
      <Toolbar>
        <IconButton 
          className={classes.menuButton} 
          onClick={toggleDrawer()} 
          aria-label="menu"
        >
          <Drawer anchor="left" open={state.open} onClose={toggleDrawer()}>
            <div
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer()}
              onKeyDown={toggleDrawer()}
            >
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon><MdMenu /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
          <MdMenu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          renotify
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  container: PropTypes.any,
};

export default Header;