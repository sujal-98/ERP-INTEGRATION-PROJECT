import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  const toggleSortMenu = () => {
    setSortMenuVisible(!sortMenuVisible);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  return (
    <div>
      <div className="sidebar">
        <div>
          <button className="btn btn-primary sort" type="button" onClick={toggleSortMenu}>
            Sort <i className={`fa-solid ${sortMenuVisible ? 'fa-caret-up' : 'fa-caret-down'} sort-icon`}></i>
          </button>
          <div className={`sort-menu ${sortMenuVisible ? 'show' : ''}`}>
            <div>hello</div>
            <div>hi</div>
            <div>bye</div>
            <div>hello</div>
            <div>hi</div>
            <div>bye</div>
            <div>hello</div>
            <div>hi</div>
            <div>bye</div>
            <div>hello</div>
            <div>hi</div>
            <div>bye</div>
            <div>hello</div>
            <div>hi</div>
            <div>bye</div>
            <div>hello</div>
            <div>hi</div>
            <div>bye</div>
          </div>
          <button className="btn btn-primary filter" type="button" onClick={toggleFilterMenu}>
            Filter <i className={`fa-solid ${filterMenuVisible ? 'fa-caret-up' : 'fa-caret-down'} filter-icon`}></i>
          </button>
          <div className={`filter-menu ${filterMenuVisible ? 'show' : ''}`}>
            <div>hello</div>
            <div>hi</div>
            <div>bye</div>
          </div>
        </div>
        <div className="apply-container">
          <button className="btn btn-primary apply-btn" type="button">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
