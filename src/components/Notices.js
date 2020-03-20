import React from 'react';

export const Notices = () => {
  const notices = [
    {
      id: 1,
      name: "This is a notice",
      sourceName: "email"
    },
    {
      id: 2,
      name: "Placeholder notice",
      sourceName: "screenshot"
    }
  ];
  return (
    <div className="notices" data-testid="notices">
      <ul className="notices__list">
        {notices.map( notice => (
          <>
            <li key={`${notice.id}`}>
            <h3 data-testid="source-name">{notice.sourceName}</h3>: <span>{notice.name}</span>
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}