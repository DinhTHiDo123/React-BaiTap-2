import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./CurrencyInput.css";

const CurrencyInput = forwardRef(({ label, value, onChange, currencySymbol = "$" }, ref) => {
  const [inputValue, setInputValue] = useState(formatCurrency(value || 0));

  function formatCurrency(num) {
    if (num === "" || isNaN(num)) return "";
    return Number(num)
      .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace(/,/g, ",") + currencySymbol;
  }

  function parseCurrency(value) {
    return parseFloat(value.replace(/,/g, "").replace(currencySymbol, "")) || 0;
  }

  const handleChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d.]/g, ""); // Chỉ giữ lại số và dấu chấm
    if (rawValue.split(".").length > 2) return; // Ngăn nhập nhiều dấu chấm
    setInputValue(formatCurrency(rawValue));
    if (onChange) onChange(parseCurrency(rawValue));
  };

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => parseCurrency(inputValue),
    setValue: (newValue) => setInputValue(formatCurrency(newValue)),
  }));

  return (
    <div className="currency-input-container">
      {label && <label className="currency-input-label">{label}</label>}
      <input
        type="text"
        className="currency-input"
        value={inputValue}
        onChange={handleChange}
        placeholder="0.00$"
      />
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props
CurrencyInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  currencySymbol: PropTypes.string,
};

export default CurrencyInput;
