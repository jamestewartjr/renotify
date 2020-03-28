import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {MdMenu} from 'react-icons/md'
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const Header = () => {
  const classes = useTheme();
  const [toggle, setMenuToggle] = useState(false);

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuToggle(!toggle);
  };

  return (
    <AppBar position="static" data-testid="header" color="primary" >
      <Toolbar>
        <IconButton 
          className={classes.menuButton} 
          onClick={toggleDrawer()} 
          aria-label="menu"
        >
          <Drawer anchor="left" open={toggle} onClose={toggleDrawer()}>
            <div
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer()}
              onKeyDown={toggleDrawer()}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<MdMenu />}
              >
                New Notice
              </Button>
              <List>
                {['Notices', 'In 7 Days', 'Send email', 'Drafts'].map((text, index) => (
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
          Renotify
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  container: PropTypes.any,
};

export default Header;