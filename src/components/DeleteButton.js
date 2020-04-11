import React from 'react';
// import { Button, Confirm, Icon } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import {FaTrashAlt} from 'react-icons/fa'
import { useMutation } from '@apollo/react-hooks';
import { DELETE_NOTICE} from '../utils/mutations'
import {FETCH_USER_NOTICES} from '../utils/queries'


function DeleteButton(props) {
  // const [confirmOpen, setConfirmOpen] = useState(false);
  const {noticeId} = props;
  const [deleteNotice] = useMutation(DELETE_NOTICE, {
    update(proxy) {
      // setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_USER_NOTICES
      });
      data.fetchNoticesByUsername = data.fetchNoticesByUsername.filter(
        notice => notice.id !== noticeId
      );
      proxy.writeQuery({ query: FETCH_USER_NOTICES, data });
      // if (callback) callback();
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
      {/* <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteNotice}
      /> */}
    </>
  );
}


export default DeleteButton;
