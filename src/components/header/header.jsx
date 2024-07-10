import React, { useState, useRef } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPlus,faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const inputRef = useRef(null);
    const [add, setAdd] = useState(false);
    const [enroll, setEnroll] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [range, setRange] = useState(false);


    const handleSearchChange = (event) => {
        if (event.target.value === "") {
            setAdd(false);
        } else {
            setAdd(true);
        }
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log('Enroll Array:', enroll);
        console.log('Search Query:', searchQuery);
    };

    const handleAdd = (roll) => {
        const updatedEnroll = [...enroll, roll];
        setEnroll(updatedEnroll);
        inputRef.current.value = '';
    };

    const handleRangeClick=()=>{
        if(!range){
        setRange(true);}
        else{
            setRange(false)
        }
    }
    return (
        <header className="header">
            <h1 className="header-title">Report Analysis</h1>

            <div className="search-container">
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                    Clear Search <FontAwesomeIcon icon={faCircleXmark} />
                </button>

                {(!range) ? (
            <>
              <button className="Range-Search" onClick={handleRangeClick}>
                Range
              </button>
              <input
                type="text"
                className="search-bar"
                placeholder="Enrollment Number..."
                value={searchQuery}
                onChange={handleSearchChange}
                ref={inputRef}
              />
              {add ? (
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: 'black', zIndex: '2', cursor: 'pointer', position: 'absolute', right:'8.5rem' }}
                  onClick={() => handleAdd(searchQuery)}
                />
              ) : null}
            </>
          ) : (
            <>
             <button className="back" onClick={handleRangeClick}>
             <FontAwesomeIcon icon={faCircleArrowLeft} id='arrowLeft' />
             </button>
              <input
                type="text"
                className="lower search-bar"
                placeholder="Lower Range"
              />
              <input
                type="text"
                className="upper search-bar"
                placeholder="Upper Range"
                id='upper-range'
              />
            </>
          )}

                <button className="search-button" onClick={handleSearch}>
                    Generate
                </button>
            </div>
        </header>
    );
};

export default Header;
