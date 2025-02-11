import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./RadioButton.css";

const RadioButton = forwardRef(({ label, options, value, onChange, name }, ref) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    if (onChange) onChange(newValue);
  };

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
    setValue: (newValue) => setSelectedValue(newValue),
  }));

  return (
    <div className="radio-container">
      {label && <label className="radio-label">{label}</label>}
      <div className="radio-group">
        {options.map((option) => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
            />
            <span className="radio-custom"></span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props
RadioButton.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default RadioButton;
