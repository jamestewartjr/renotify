import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cta: {
    padding: theme.spacing(12, 12, 12),
  },
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/register" {...props} />
));

export default function Signup()  {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" component="section" >
      <Typography variant="h5" className={classes.cta} align="center" color="textPrimary" display="inline">
        Sign up now!
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        className="register-button" 
        type="button" 
        component={LinkBehavior}
      > 
        Signup
      </Button>
    </Container>
  )
}