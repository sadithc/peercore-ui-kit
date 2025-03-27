import { Icon } from '@iconify/react';
import React, { useState, useEffect, useRef } from 'react';

interface DropdownProps {
  options: { name: string; code: string }[];
  selectedCountry: { name: string; code: string } | null;
  onChange: (e: any) => void;
  placeholder: string;
  isFilterEnabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedCountry, onChange, placeholder, isFilterEnabled = true }) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false); // State to track dropdown position
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(
      searchTerm === ''
        ? options
        : options.filter((option) =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check available space and set dropdown position
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If there's not enough space below but enough above, open dropdown upwards
      if (spaceBelow < 200 && spaceAbove > 200) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [isDropdownOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (option: { name: string; code: string }) => {
    onChange(option);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="dropdown-container" style={{ width: '100%', position: 'relative' }} ref={dropdownRef}>
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {selectedCountry ? selectedCountry.name : placeholder}
        </div>

        {selectedCountry && (
          <Icon
            icon="material-symbols:close-rounded"
            className="clear-icon"
            onClick={clearSelection}
            style={{ cursor: 'pointer', marginRight: '8px', fontSize: '18px' }}
          />
        )}

        <Icon icon="mingcute:down-line" className="dropdown-icon" style={{ fontSize: '18px' }} />
      </div>

      {isDropdownOpen && (
        <div
          className="dropdown-list"
          style={{
            position: 'absolute',
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            background: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            top: dropUp ? 'auto' : '100%',
            bottom: dropUp ? '100%' : 'auto',
          }}
        >
          {isFilterEnabled && (
            <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  width: '98%',
                  padding: '8px',
                  marginBottom: '8px',
                  border: '1px solid #ccc',
                }}
              />
              <Icon
                icon="material-symbols:search"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '45%',
                  transform: 'translateY(-55%)',
                  fontSize: '15px',
                  color: '#888',
                }}
              />
            </div>
          )}

          <div className="dropdown-options">
            {filteredOptions.map((option) => (
              <div
                key={option.code}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedCountry?.code === option.code ? '#e0e0e0' : 'transparent',
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
