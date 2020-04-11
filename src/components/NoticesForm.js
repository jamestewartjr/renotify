import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useForm} from '../utils/hooks'

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

  const [createNotice, {error}] = useMutation(CREATE_NOTICE_MUTATION, {
    update(_, result){
      console.log('notice Form error', error)

      console.log(result)
      values.body = ''
    },
    variables: values
  })

  function createNoticeCallback(){ createNotice()}

  console.log('notice Form error', error)
  // const {data} = useQuery(FETCH_NOTICES);

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
          {error && <FormHelperText key={error} error={true}>
            <span>{error}</span>
          </FormHelperText>}
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

const CREATE_NOTICE_MUTATION = gql`
mutation createNotice($body:String!){
  createNotice(body:$body){
    id body createdAt name
  }
}
`