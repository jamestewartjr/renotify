import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Button, Confirm, Icon } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import {FaTrashAlt} from 'react-icons/fa'
import { useMutation } from '@apollo/react-hooks';
import { DELETE_NOTICE} from '../utils/mutations'
import {FETCH_USER_NOTICES} from '../utils/queries'

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
}));

function DeleteButton(props) {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const {noticeId} = props;
  const [deleteNotice] = useMutation(DELETE_NOTICE, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_USER_NOTICES
      });
      data.fetchNoticesByUsername = data.fetchNoticesByUsername.filter(
        notice => notice.id !== noticeId
      );
      proxy.writeQuery({ query: FETCH_USER_NOTICES, data });
      // if (callback) callback();
      setShowAlert(true);

    },
    variables: { noticeId }
  });
  return (
    <>
      <IconButton 
        edge="end" 
        aria-label="delete" 
        color="secondary"
        onClick={() => deleteNotice()}
      >
        <FaTrashAlt />
      </IconButton>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showAlert} 
        autoHideDuration={6000}
        className={classes.alert}
        message="Notice deleted successfully!" 
      />
    </>
  );
}

export default DeleteButton;
