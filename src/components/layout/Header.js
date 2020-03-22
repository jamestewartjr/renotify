import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {FaListUl} from 'react-icons/fa'

const useStyles = makeStyles(theme => ({
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

  return (
    <AppBar position="static" data-testid="header">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <FaListUl className="logo"/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Notices
        </Typography>
        <Button color="inherit">Login</Button>
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