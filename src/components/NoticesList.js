import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteButton from '../components/DeleteButton';

import {useQuery} from '@apollo/react-hooks';
import {FETCH_USER_NOTICES} from '../utils/queries'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const NoticesList = () => {
  const classes = useStyles();
  const {data} = useQuery(FETCH_USER_NOTICES);

  // const toggleDrawer = () => event => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setMenuToggle(!toggle);
  // };

  return (
  //   <div className="notices" data-testid="notices">
  //     <ul className="notices__list">
  //       {data && data.fetchNoticesByUsername.map( notice => (
  //         <li key={`${notice.name}`}>
  //           <h3 data-testid="source-name">{notice.platformId}</h3>
  //           {notice.name} from {notice.user}
  //           <Chip label={notice.createdAt}/>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
    <List className={classes.root}>
      {data && data.fetchNoticesByUsername.map((notice) => {
        const labelId = `checkbox-list-label-${notice.name}`;
        return (
          <ListItem 
            key={notice.name} 
            role="listitem"
            alignItems="center"
            // onClick={handleToggle(notice)}
          >
            {/* <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(notice) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon> */}
            <ListItemText id={labelId} primary={notice.name} />
            <ListItemSecondaryAction>
              <DeleteButton noticeId={notice.noticeId}/>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  )
}




// export default function CheckboxList() {
// const [checked, setChecked] = React.useState([0]);
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

// return (
//   </List
// );
// }