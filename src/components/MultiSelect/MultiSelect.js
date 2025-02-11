import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./MultiSelect.css";

const MultiSelect = forwardRef(({ label, options, value, onChange }, ref) => {
  const [selectedValues, setSelectedValues] = useState(value || []);

  const handleChange = (selectedValue) => {
    let newValues = [...selectedValues];

    if (newValues.includes(selectedValue)) {
      newValues = newValues.filter((val) => val !== selectedValue);
    } else {
      newValues.push(selectedValue);
    }

    setSelectedValues(newValues);
    if (onChange) onChange(newValues);
  };

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => selectedValues,
    setValue: (newValues) => setSelectedValues(newValues),
  }));

  return (
    <div className="multiselect-container">
      {label && <label className="multiselect-label">{label}</label>}
      <div className="multiselect">
        {options.map((option) => (
          <label key={option.value} className="multiselect-option">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <span className="multiselect-custom"></span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props
MultiSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default MultiSelect;
