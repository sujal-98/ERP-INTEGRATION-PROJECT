import React, { useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPlus,faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

const Header = () => {
    const [add, setAdd] = useState(false);
    const [enroll, setEnroll] = useState(['0']);
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
        console.log(enroll.length)
        try{
        const response=axios.post('http://localhost:1000/api/response', {
          enroll: enroll.slice(1)
      })
      setEnroll(['0'])
      }
      catch{
        console.log("error")
      }
    };

    const handleAdd = (roll) => {
      console.log("add")
        const updatedEnroll = [...enroll, roll];
        setEnroll(updatedEnroll);
        console.log(enroll)
        setSearchQuery('')
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
              />
              {add ? (
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: 'black', zIndex: '2', cursor: 'pointer', position: 'absolute', marginLeft: '28.5rem' }}
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
