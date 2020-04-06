import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FaUserLock} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useForm} from '../utils/hooks'
import {AuthContext} from '../context/auth'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Renotify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});  

  const { onChange, onSubmit, values} = useForm(registerUser, {
    username: '', email: '', password:'', confirmPassword:''
  });

  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(_, {data: {register: userData}}){
      context.login(userData)
      props.history.push('/notices');
    },
    onError(errors) {
      if(errors.graphQLErrors[0]){
        setErrors(errors.graphQLErrors[0].message);
      }
      if(errors.networkError){
        setErrors(errors.networkError[0]);
      }
    },
    variables: values
  })

  function registerUser(){ addUser()}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaUserLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <form className={loading ? 'loading' : classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                // error={errors.username ? true : false}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // error={errors.email ? true : false}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // error={errors.password ? true : false}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-confirm-password"
                // error={errors.confirmPassword ? true : false}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {Object.values(errors).map(errors => 
            <FormHelperText key={errors} error={errors.length > 0 ? true : false}>
              <span>{errors}</span>
            </FormHelperText>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Register;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
     token user{ id email username createdAt }
    }
  }
`