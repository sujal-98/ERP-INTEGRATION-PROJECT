import React, { useState, useRef } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const inputRef = useRef(null);
    const [add, setAdd] = useState(false);
    const [enroll, setEnroll] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    return (
        <header className="header">
            <h1 className="header-title">Report Analysis</h1>

            <div className="search-container">
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                    Clear Search <FontAwesomeIcon icon={faCircleXmark} style={{ marginLeft: '15%' }} />
                </button>

                <button className="Range-Search">
                    Range
                </button>

                <input
                    type="text"
                    className="search-bar"
                    placeholder={`Enrollment Number... (${enroll.length > 0 ? enroll.length : ''})`}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    ref={inputRef}
                />

                {(add)? (
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{ color: 'black', zIndex: '2', cursor: 'pointer', position: 'absolute', marginLeft: '32.4%' }}
                        onClick={() => handleAdd(searchQuery)}
                    />
    ):null}

                <button className="search-button" onClick={handleSearch}>
                    Generate
                </button>
            </div>
        </header>
    );
};

export default Header;
