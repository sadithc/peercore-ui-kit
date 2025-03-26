import { Icon } from "@iconify/react";
import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  options: { name: string; code: string }[];
  selectedCountry: { name: string; code: string } | null;
  onChange: (e: any) => void;
  placeholder: string;
}

const DropdownFilter: React.FC<DropdownProps> = ({
  options,
  selectedCountry,
  onChange,
  placeholder,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredOptions(
      searchTerm === ""
        ? options
        : options.filter((option) =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
  }, [searchTerm, options]);

  // Detect clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (option: { name: string; code: string }) => {
    onChange(option);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening when clearing
    onChange(null);
  };

  return (
    <div
      className="dropdown-container"
      style={{ width: "200px" }}
      ref={dropdownRef}
    >
      {/* Dropdown header */}
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {selectedCountry ? selectedCountry.name : placeholder}
        </div>

        {/* Show close icon only if an item is selected and field is clicked */}
        {selectedCountry && isDropdownOpen && (
          <Icon
            icon="material-symbols:close-rounded"
            className="clear-icon"
            onClick={clearSelection}
            style={{ cursor: "pointer", marginRight: "8px", fontSize: "18px" }}
          />
        )}

        <Icon
          icon="mingcute:down-line"
          className="dropdown-icon"
          style={{ fontSize: "18px" }}
        />
      </div>

      {isDropdownOpen && (
        <div>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "8px 30px 8px 8px", // Extra right padding for the icon
                marginBottom: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
            <Icon
              icon="material-symbols:search"
              style={{
                position: "absolute",
                left: "10px", // Position the icon inside the input
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "18px",
                color: "#888",
              }}
            />
          </div>

          {/* Dropdown options */}
          <div
            className="dropdown-options"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {filteredOptions.map((option) => (
              <div
                key={option.code}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCountry?.code === option.code
                      ? "#e0e0e0"
                      : "transparent",
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

export default DropdownFilter;
