import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./SelectboxSearch.css";

const SelectboxSearch = forwardRef(({ label, fetchOptions, value, onChange }, ref) => {
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (searchTerm) {
      fetchOptions(searchTerm).then(setOptions);
    } else {
      setOptions([]);
    }
  }, [searchTerm, fetchOptions]);

  const handleSelect = (option) => {
    setSelectedValue(option);
    setSearchTerm(option.label);
    setDropdownOpen(false);
    if (onChange) onChange(option);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
    setValue: (newValue) => {
      setSelectedValue(newValue);
      setSearchTerm(newValue?.label || "");
    },
  }));

  return (
    <div className="selectbox-search-container">
      {label && <label className="selectbox-search-label">{label}</label>}
      <input
        ref={inputRef}
        type="text"
        className="selectbox-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setDropdownOpen(true)}
        placeholder="Nhập để tìm kiếm..."
      />
      {isDropdownOpen && options.length > 0 && (
        <ul className="selectbox-search-dropdown">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props
SelectboxSearch.propTypes = {
  label: PropTypes.string,
  fetchOptions: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

export default SelectboxSearch;
