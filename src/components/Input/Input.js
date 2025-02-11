import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = forwardRef(({ label, value, onChange, placeholder, type = "text" }, ref) => {
  const [inputValue, setInputValue] = useState(value || "");

  // Cập nhật giá trị khi nhập
  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    setValue: (newValue) => setInputValue(newValue),
  }));

  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props
Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
