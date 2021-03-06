import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import FormHelperText from '@material-ui/core/FormHelperText';
import ReactGA from 'react-ga';
import {useForm} from '../utils/hooks'
import {FETCH_USER_NOTICES } from '../api/queries'
import {CREATE_NOTICE } from '../api/mutations'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const NoticesForm = (props) => {
  const classes = useStyles();
  // const [errors, setErrors] = useState({});  

  const { onChange, onSubmit, values} = useForm(createNoticeCallback,
    {body: ''});

  const [createNotice] = useMutation(CREATE_NOTICE, {
    update(proxy, result){
      const data = proxy.readQuery({query: FETCH_USER_NOTICES})
      data.fetchNoticesByUsername = [result.data.createNotice, ...data.fetchNoticesByUsername]
      proxy.writeQuery({ query: FETCH_USER_NOTICES , data})
      ReactGA.event({
        category: 'Notice Created',
        action: 'user created new notice',
      });
      values.body = ''
    },
    onError(error) {
      if(error.graphQLErrors[0]){
        console.error(error.graphQLErrors[0])     
        // setErrors(error.graphQLErrors[0].message);
      }
      if(error.networkError){
        console.error(error.networkError)     

        // setErrors(error.networkError[0]);
      }
    },
    variables: values
  })

  function createNoticeCallback(){ createNotice()}
  // TODO add validation for empty form

  return (
    <section className="notice_form">
      <div className={classes.paper}>
        <form 
          className={classes.form} 
          onSubmit={onSubmit} 
          noValidate
        >
          <Typography align='center' variant="subtitle1"> Add Notice </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="body"
            label="Notice"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          {/* {error && <FormHelperText key={error} error={true}>
            <span>{error}</span>
          </FormHelperText>} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Notice
          </Button>
 
        </form>
      </div>
    </section>
  )
}

export default NoticesForm;
