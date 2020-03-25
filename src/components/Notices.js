import React from 'react';
import Chip from '@material-ui/core/Chip';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';

export const Notices = () => {
  const {data} = useQuery(FETCH_NOTICES);

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

const FETCH_NOTICES = gql`
  {
    fetchAllNotices{
      id
      name
      platformId
      user
      createdAt
    }
  }
`