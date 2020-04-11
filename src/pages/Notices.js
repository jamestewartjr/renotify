import React from 'react';
import Typography from '@material-ui/core/Typography';
import { NoticesList } from '../components/NoticesList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import NoticesForm from '../components/NoticesForm'

const Notices = props => (
  <Container className="notices">
    <Typography component="div" />
    <Grid item>
      <NoticesForm />
      <NoticesList />
    </Grid>
  </Container>
)


export default Notices;