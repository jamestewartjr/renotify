import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import { NoticesList } from '../components/NoticesList';
import {AuthContext} from '../context/auth'
import Grid from '@material-ui/core/Grid';
import NoticesForm from '../components/NoticesForm'

const Notices = props => {
  const {user} = useContext(AuthContext)

  return(
    <React.Fragment>
      <Typography component="div" />
      <Grid container spacing={5} alignItems="flex-end">
        {user && <NoticesForm />}
        <NoticesList />
      </Grid>
    </React.Fragment>
  )
}

export default Notices;