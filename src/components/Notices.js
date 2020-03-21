import React from 'react';
import Chip from '@material-ui/core/Chip';

export const Notices = () => {
  const notices = [
    {
      id: 1,
      name: "This is a notice",
      sourceName: "email",
      sender: "Frank@itjrecruiters.com",
      receivedTime: "March 8th 2020 05:30am"
    },
    {
      id: 2,
      name: "Placeholder notice",
      sourceName: "screenshot",
      sender: "DuoLingo",
      receivedTime: "March 18th 2020 10:30am"
    }
  ];
  return (
    <div className="notices" data-testid="notices">
      <ul className="notices__list">
        {notices.map( notice => (
          <>
            <li key={`${notice.id}`}>
            <h3 data-testid="source-name">{notice.sourceName}</h3>
            {notice.name} from {notice.sender}
            <Chip label={notice.receivedTime}/>
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}