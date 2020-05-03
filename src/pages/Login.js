import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FaUserLock} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import ReactGA from 'react-ga';
import {useForm} from '../utils/hooks'
import { useMutation } from '@apollo/react-hooks';
import {AuthContext} from '../context/auth'
import {LOGIN_USER} from '../api/mutations'

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const context = useContext(AuthContext)
  const classes = useStyles();
  const [errors, setErrors] = useState({});  

  const { onChange, onSubmit, values} = useForm(signinUser, {
    email: '', password:''
  });

  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}){
      context.login(userData)
      ReactGA.event({
        category: 'Login',
        action: 'User signed in',
      });
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

  function signinUser(){ loginUser()}

  return (
    <Container component="main" maxWidth="xs" data-testid="login">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaUserLock />
        </Avatar>
        <Typography
          className="title"
          component="h1"
          variant="h5"
          data-testid="login-title"
        >
          Welcome Back!
        </Typography>
        <form 
          className={loading ? 'Loading...' : classes.form} 
          onSubmit={onSubmit} 
          noValidate 
          data-testid="login-form"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChange}
            data-testid="login-email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            data-testid="login-password"

          />
          {Object.values(errors).map(errors => 
            <FormHelperText key={errors} error={errors.length > 0 ? true : false}>
              <span>{errors}</span>
            </FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="login-submit-action"
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              {/*   <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid> 
            <Grid item>
              <Link 
                to="/register"
                variant="body2"
                className="register-link"
                data-testid="login-register-link"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
