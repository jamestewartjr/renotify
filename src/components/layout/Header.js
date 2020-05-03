import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {MdMenu} from 'react-icons/md'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/auth'
import Button from '@material-ui/core/Button';
import ReactGA from 'react-ga';
import { makeStyles } from '@material-ui/core/styles';
import {  Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [toggle, setMenuToggle] = useState(false);
  const {user, logout} = useContext(AuthContext)

  ReactGA.set({userId: user})

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuToggle(!toggle);
  };

  const NavItems = [
    { text: 'Home', to:'/' },
    // { text: 'Login', to:'/login' },
    // { text: 'Register', to:'/register' },
    // { text: 'Notices', to:'/notices' }
  ]

  const handleLogout = () => {
    logout(); 
    return <Redirect to='/'/>
  }

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
              <List>
                {NavItems.map((item, index) => (
                  <ListItem button key={item.text}>
                    <ListItemIcon><MdMenu /></ListItemIcon>
                    <Link to={item.to}>
                      <ListItemText primary={item.text} />
                    </Link>
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
        {user && <Button 
          className="logout_button"
          variant='text' 
          color="inherit"
          disableFocusRipple
          onClick={() => handleLogout()}
        >
          Logout
        </Button>}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  container: PropTypes.any,
};

export default Header;