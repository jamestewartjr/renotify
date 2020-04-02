import React from 'react';
import Typography from '@material-ui/core/Typography';
import { NoticesList } from '../components/NoticesList';

const Notices = props => {
  return(
    <React.Fragment>
      <Typography component="div" />
      <NoticesList />
    </React.Fragment>
  )
}

export default Notices;