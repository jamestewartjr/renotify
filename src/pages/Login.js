import React, {useState} from 'react';
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
import {useForm} from '../utils/hooks'
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
  const classes = useStyles();

  const [errors, setErrors] = useState({});  

  const { onChange, onSubmit, values} = useForm(signinUser, {
    email: '', password:''
  });

  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(proxy, result){
      props.history.push('/notices');
    },
    onError(errors) {
      if(errors.graphQLErrors[0]){
        setErrors(errors.graphQLErrors[0].message);
      }
      if(errors.networkError){
        setErrors(errors.networkError);
      }
    },
    variables: values
  })

  function signinUser(){ loginUser()}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FaUserLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome Back!
        </Typography>
        <form className={loading ? 'loading' : classes.form} onSubmit={onSubmit} noValidate>
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
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <FormHelperText error={errors.length > 0 ? true : false}>{Object.values(errors)}</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
              <Link to="/register" variant="body2">
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


const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login( email: $emai  password: $password  )
    {
     token user{ id email username createdAt }
    }
  }
`