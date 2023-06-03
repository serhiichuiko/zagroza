import React, { useState, useRef, useEffect } from 'react';

import { ReactComponent as Arrow } from './img/arrow-bottom.svg';
import './style.css';

const Dropdown = ({ options, onSelect, selectedOption, onSearch, renderOption, renderSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clickedInput, setClickedInput] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleDropdownToggle = (event) => {
    if (!event.target.classList.contains('dropdown-option')) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (option, event) => {
    event.stopPropagation();
    onSelect(option);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    // onSearch(value); // function for API
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleInputClick = (event) => {
    event.stopPropagation();
    setClickedInput(true);
    setIsOpen(true);
  };

  const handleInputFocus = (event) => {
    event.stopPropagation();
  };

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
        className={`dropdown-container ${isOpen ? 'active' : ''}`}
        onClick={handleDropdownToggle}
        onFocus={handleDropdownToggle}
        onBlur={() => {
        if (!clickedInput) {
            setIsOpen(false);
        }
        setClickedInput(false);
        }}
        ref={dropdownRef}
    >
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        {renderSelectedOption ? (
            renderSelectedOption(selectedOption, isOpen)
        ) : (
            <div className={`selected-option ${isOpen ? 'active' : ''}`}>
                {selectedOption ? selectedOption.label : 'Select an option'}
                <span className={`select-arrow ${isOpen ? 'active' : ''}`}>
                    <Arrow />
                </span>
            </div>
        )}
        {isOpen && (
          <>
            <div className="field-input">
                <input
                    className="input"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onClick={handleInputClick}
                    onChange={handleSearchInputChange}
                    onFocus={handleInputFocus}
                    ref={inputRef}
                />
            </div>
            <div className="dropdown-options">
              {filteredOptions?.length > 0 ? (
                filteredOptions.map((option, index) => (
                    <div
                        key={index}
                        className="dropdown-option"
                        onClick={(event) => handleOptionSelect(option, event)}
                        >
                        {renderOption ? renderOption(option) : option.label}
                    </div>
                ))
              ) : (
                <div className="no-options">No options found</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;