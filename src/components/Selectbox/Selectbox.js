import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./Selectbox.css";

const Selectbox = forwardRef(({ label, options, value, onChange }, ref) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) onChange(newValue);
  };

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
    setValue: (newValue) => setSelectedValue(newValue),
  }));

  return (
    <div className="selectbox-container">
      {label && <label className="selectbox-label">{label}</label>}
      <select className="selectbox" value={selectedValue} onChange={handleChange}>
        <option value="" disabled>Chọn một giá trị</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props
Selectbox.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Selectbox;
