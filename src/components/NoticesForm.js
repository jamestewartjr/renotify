import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useForm} from '../utils/hooks'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Notice
        </Typography>
        <form 
          className={classes.form} 
          onSubmit={onSubmit} 
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="body"
            label="Notice Title"
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
    </Container>
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