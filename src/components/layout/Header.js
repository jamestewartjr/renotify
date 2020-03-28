import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {MdMenu} from 'react-icons/md'
import { useTheme } from '@material-ui/core/styles';

export const Header = () => {
  const classes = useTheme();

  return (
    <AppBar position="static" data-testid="header" color="primary" >
      <Toolbar>
        <IconButton edge="start" className="logo" color="inherit" aria-label="menu">
          <MdMenu className={classes.menuButton} />
        </IconButton>
        <Typography variant="h6" className={classes.title} align='center'>
          renotify
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
        {/* <ul>
          <li data-testid="add-task-action" className="settings__add"><FaPlus/></li>
          <li data-testid="dark-mode-action" className="settings__darkmode"><FaToggleOn/></li>
        </ul> */}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  container: PropTypes.any,
};

export default Header;