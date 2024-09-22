import React, { useState, useRef } from 'react';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPlus, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { setStudents,fetchStudents ,updStudents} from '../../actions/index';

const Header = () => {
  const lowerRef = useRef(null);
  const upperRef = useRef(null);
  const [add, setAdd] = useState(false);
  const [enroll, setEnroll] = useState({ enroll: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [range, setRange] = useState(false);
const solo=useRef(null);
  const students = useSelector((state) => state.display.students);
  const dispatch = useDispatch();

  const clearSearch=()=>{
    dispatch(setStudents([]));
    dispatch(updStudents([]));
  }

  const handleSearchChange = (event) => {
    if (event.target.value === '') {
      setAdd(false);
    } else {
      setAdd(true);
    }
    setSearchQuery(event.target.value);
    console.log(searchQuery)
  };

  const handleSearch = async () => {
    console.log('Enroll Array:', enroll);
    const search=solo.current.value
    console.log(search)
    try {
      if (enroll.enroll.length === 0) {  
        if (search && search.trim() !== "") {  
          const updatedEnroll = { ...enroll, enroll: [...enroll.enroll, search] };
          dispatch(fetchStudents(updatedEnroll.enroll)); 
          setEnroll({ enroll: [] });  
        } else {
          console.warn('Search query is empty');
        }
      } else {
        dispatch(fetchStudents(enroll.enroll));  
        setEnroll({ enroll: [] });  
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  


  const handleAdd = (roll) => {
    const val = parseInt(roll, 10);
    if (val > 0) {
      const updatedEnroll = {
        ...enroll,
        enroll: [...enroll.enroll, val],
      };
      setEnroll(updatedEnroll);
      setSearchQuery('');
      console.log(updatedEnroll.enroll);
    } else {
      console.log('Enter a valid roll');
    }
  };

 
 
  const handleRangeQuery = () => {
    const lower = parseInt(lowerRef.current.value, 10);
    const upper = parseInt(upperRef.current.value, 10);

    if (lower > 0 && upper > 0 && lower <= upper) {
      dispatch(setStudents([]));
      const enrollments = [];
      for (let roll = lower; roll <= upper; roll += 100000000) {
        enrollments.push(roll);
      }

      dispatch(fetchStudents(enrollments));
    } else {
      console.log('Enter a valid number');
    }
  };
  

  const handleRangeClick = () => {
    setRange(!range);
  };

  return (
    <header className="header">
      <h1 className="header-title">Report Analysis</h1>

      <div className="search-container">
        {enroll.enroll.length > 0 && <div className="enroll-counter" style={{ transition: 'all 1s ease-in' }}>{enroll.enroll.length}</div>}
        
        <button className="clear-search" onClick={() => clearSearch()}>
          Clear Search
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        {!range ? (
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
              ref={solo}
            />
            {add && (
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => handleAdd()}
                className='plus-icon'
              />
            )}
            <button className="search-button" onClick={handleSearch}>
              Generate
            </button>
          </>
        ) : (
          <>
            <button className="back" onClick={handleRangeClick}>
              <FontAwesomeIcon icon={faCircleArrowLeft} id="arrowLeft" />
            </button>
            <input type="text" className="lower search-bar" placeholder="Lower Range" ref={lowerRef} />
            <input type="text" className="upper search-bar" placeholder="Upper Range" id="upper-range" ref={upperRef} />
            <button className="search-button" onClick={handleRangeQuery}>
              Generate
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
