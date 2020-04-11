import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import { NoticesList } from '../components/NoticesList';
import {AuthContext} from '../context/auth'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import NoticesForm from '../components/NoticesForm'

const Notices = props => {
  const {user} = useContext(AuthContext)

  return(
    <Container component="notices">
      <Typography component="div" />
      <Grid items alignItems="stretch">
        {user && <NoticesForm />}
        <NoticesList />
      </Grid>
    </Container>
  )
}

export default Notices;