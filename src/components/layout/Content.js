import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Notices } from '../Notices';

export const Content = () => {
  return (
    <React.Fragment>
      <Container>
        <Typography component="div" />
        <Notices />
      </Container>
    </React.Fragment>
  );
}