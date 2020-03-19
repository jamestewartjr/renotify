import React from 'react';
import {FaToggleOn, FaListUl, FaPlus} from 'react-icons/fa'

export const Header = () => {
  return (
    <header 
      className="header"
      data-testid="header"
    >
      <nav>
        <div className="logo">
          <FaListUl/>
        </div>
        <div className="settings">
          <ul>
            <li data-testid="add-task-action" className="settings__add"><FaPlus/></li>
            <li data-testid="dark-mode-action" className="settings__darkmode"><FaToggleOn/></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}