import React from 'react';
import Chip from '@material-ui/core/Chip';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_NOTICES} from '../utils/queries'

export const NoticesList = () => {
  const {data} = useQuery(FETCH_NOTICES);
  // const {data} = useQuery(FETCH_USER_NOTICES);
  // console.log('NoticesList fetch data', data)
  return (
    <div className="notices" data-testid="notices">
      <ul className="notices__list">
        {data && data.fetchAllNotices.map( notice => (
          <li key={`${notice.name}`}>
            <h3 data-testid="source-name">{notice.platformId}</h3>
            {notice.name} from {notice.user}
            <Chip label={notice.createdAt}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
