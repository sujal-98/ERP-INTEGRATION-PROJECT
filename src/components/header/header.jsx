import React, { useState, useRef } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPlus,faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

const Header = () => {
    const [add, setAdd] = useState(false);
    const [enroll, setEnroll] = useState({"enroll":[],"lower":0, "upper":0});
    const [searchQuery, setSearchQuery] = useState('');
    const [range,setRange]=useState(false)

    const valid=(roll)=>{
      return typeof roll === 'number' && typeof val==='NaN';
    }
    const valid2=(enroll)=>{
      if(enroll.enroll.length===0){
        if(enroll.lower>0 && enroll.upper>0){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return true;
      }
    }

    const handleSearchChange = (event) => {
        if (event.target.value === "") {
            setAdd(false);
        } else {
            setAdd(true);
        }
        setSearchQuery(event.target.value);
    };

    const handleSearch =async () => {
        console.log('Enroll Array:', enroll);
        console.log('Search Query:', searchQuery);
        try {
          if(valid2(enroll)){
          const response = await axios.post('http://localhost:1000/api/response', {
            enroll: enroll
          });
          console.log(response.data);
          setEnroll({"enroll":[],"lower":0, "upper":0})
        }
        } catch (error) {
          console.error('Error posting data:', error);
        }
    };

    const handleAdd = (roll) => {
      const val = parseInt(roll, 10);
      if (valid(val)) {
        const updatedEnroll = { 
          ...enroll, 
          enroll: [...enroll.enroll, val] 
        };
        setEnroll(updatedEnroll);
        setSearchQuery('');
        console.log(updatedEnroll.enroll);
      } else {
        console.log("Enter valid roll");
      }
    };
  
    const handleRangeQuery = (event) => {
      const value = parseInt(event.target.value, 10);
      if (valid(value)) {
        if (event.target.className === "lower") {
          setEnroll((prevEnroll) => ({
            ...prevEnroll,
            lower: value
          }));
        } else if (event.target.className === "upper") {
          setEnroll((prevEnroll) => ({
            ...prevEnroll,
            upper: value
          }));
        }
        console.log(enroll);
      } else {
        console.log("Enter a valid number");
      }
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
                onChange={handleRangeQuery}
              />
              <input
                type="text"
                className="upper search-bar"
                placeholder="Upper Range"
                id='upper-range'
                onChange={handleRangeQuery}
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
