import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./Checkbox.css";

const Checkbox = forwardRef(({ label, options, value, onChange }, ref) => {
  const [selectedValues, setSelectedValues] = useState(value || []);

  const handleChange = (checkedValue) => {
    let newValues = [...selectedValues];

    if (newValues.includes(checkedValue)) {
      newValues = newValues.filter((val) => val !== checkedValue);
    } else {
      newValues.push(checkedValue);
    }

    setSelectedValues(newValues);
    if (onChange) onChange(newValues);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValues,
    setValue: (newValues) => setSelectedValues(newValues),
  }));

  return (
    <div className="checkbox-container">
      {label && <label className="checkbox-label">{label}</label>}
      <div className="checkbox-group">
        {options.map((option) => (
          <label key={option.value} className="checkbox-option">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <span className="checkbox-custom"></span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
});

Checkbox.propTypes = {
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

export default Checkbox;
