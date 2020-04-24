import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
import DeleteButton from '../components/DeleteButton';
import Typography from '@material-ui/core/Typography';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_USER_NOTICES} from '../api/queries'
import {messaging} from '../utils/firebaseMessaging'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const NoticesList = () => {
  const classes = useStyles();
  const {data} = useQuery(FETCH_USER_NOTICES);
  // const [checked, setChecked] = useState([0]);
  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };

  useEffect( ()=>{
    messaging.requestPermission()
      .then( async () => {
        console.log('Have permission')
        return await messaging.getToken();
      })
      .catch( (error) => {
        console.log('Permission denied', error)
      })
    navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  })

  return (
    <List className={classes.root}>
      {(data 
        && data.fetchNoticesByUsername.map((notice) => {
          const labelId = `checkbox-list-label-${notice.name}`;
          return (
            <ListItem 
              key={notice.name} 
              role="listitem"
              alignItems="center"
            >
              {/* <Checkbox
                edge="start"
                checked={checked.indexOf(notice) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                onClick={() => handleToggle()}
              /> */}
              <ListItemText 
                id={labelId} 
                primary={ 
                  <Typography variant="h6">
                    {notice.name}
                  </Typography>
                }
              />
              <Chip disabled label={notice.createdAt}/>
              <ListItemSecondaryAction>
                <DeleteButton noticeId={notice.noticeId}/>
              </ListItemSecondaryAction>
            </ListItem>
          );
        }))
      || <Typography align='center' variant="subtitle1"> Add a Notice! </Typography>
      }
    </List>
  )
}
