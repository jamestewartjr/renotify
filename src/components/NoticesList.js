import React from 'react';
import Chip from '@material-ui/core/Chip';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_USER_NOTICES} from '../utils/queries'

export const NoticesList = () => {
  const {data} = useQuery(FETCH_USER_NOTICES);
  return (
    <div className="notices" data-testid="notices">
      <ul className="notices__list">
        {data && data.fetchNoticesByUsername.map( notice => (
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
