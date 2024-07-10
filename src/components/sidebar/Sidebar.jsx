import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Added state for selected language

  const toggleSortMenu = () => {
    setSortMenuVisible(!sortMenuVisible);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const handleOptionClick = (language) => { // Function to handle option click
    setSelectedLanguage(language);
  };

  return (
    <div>
      <div className="sidebar">
        <button
          className="btn btn-primary sort"
          type="button"
          onClick={toggleSortMenu}
        >
          Sort{" "}
          <i
            className={`fa-solid ${
              sortMenuVisible ? "fa-caret-up" : "fa-caret-down"
            } sort-icon`}
          ></i>
        </button>
        <div className={`sort-menu ${sortMenuVisible ? "show" : ""}`}>
          <div 
            className={`options ${selectedLanguage === 'HTML' ? 'selected' : ''}`} // Added conditional class
            onClick={() => handleOptionClick('HTML')} // Added onClick handler
          >
            <input 
              type="radio" 
              id="html" 
              name="fav_language" 
              value="HTML" 
              checked={selectedLanguage === 'HTML'} // Set checked attribute
              onChange={() => setSelectedLanguage('HTML')} // Added onChange handler
            />
            <label htmlFor="html">HTML</label>
            <br />
          </div>
          <div 
            className={`options ${selectedLanguage === 'CSS' ? 'selected' : ''}`} // Added conditional class
            onClick={() => handleOptionClick('CSS')} // Added onClick handler
          >
            <input 
              type="radio" 
              id="css" 
              name="fav_language" 
              value="CSS" 
              checked={selectedLanguage === 'CSS'} // Set checked attribute
              onChange={() => setSelectedLanguage('CSS')} // Added onChange handler
            />
            <label htmlFor="css">CSS</label>
            <br />
          </div>
          <div 
            className={`options ${selectedLanguage === 'JavaScript' ? 'selected' : ''}`} // Added conditional class
            onClick={() => handleOptionClick('JavaScript')} // Added onClick handler
          >
            <input 
              type="radio" 
              id="javascript" 
              name="fav_language" 
              value="JavaScript" 
              checked={selectedLanguage === 'JavaScript'} // Set checked attribute
              onChange={() => setSelectedLanguage('JavaScript')} // Added onChange handler
            />
            <label htmlFor="javascript">JavaScript</label>
          </div>
        </div>
        <button
          className="btn btn-primary filter"
          type="button"
          onClick={toggleFilterMenu}
        >
          Filter{" "}
          <i
            className={`fa-solid ${
              filterMenuVisible ? "fa-caret-up" : "fa-caret-down"
            } filter-icon`}
          ></i>
        </button>
        <div className={`filter-menu ${filterMenuVisible ? "show" : ""}`}>
          <div>hello</div>
          <div>hi</div>
          <div>bye</div>
        </div>
      </div>
      <button className="btn btn-primary apply-btn" type="button">
        Apply
      </button>
    </div>
  );
};

export default Sidebar;
