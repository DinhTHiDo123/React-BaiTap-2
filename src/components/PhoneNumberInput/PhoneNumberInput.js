import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./PhoneNumberInput.css";

const PhoneNumberInput = forwardRef(({ label, value, onChange, defaultCountryCode = "+84" }, ref) => {
  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [countryCode, setCountryCode] = useState(defaultCountryCode);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Chỉ giữ số
    setPhoneNumber(newValue);
    if (onChange) onChange(`${countryCode}${newValue}`);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => `${countryCode}${phoneNumber}`,
    setValue: (newValue) => {
      if (newValue.startsWith("+")) {
        const parts = newValue.match(/^(\+\d+)(\d*)$/);
        if (parts) {
          setCountryCode(parts[1]);
          setPhoneNumber(parts[2]);
        }
      } else {
        setPhoneNumber(newValue);
      }
    },
  }));

  return (
    <div className="phone-input-container">
      {label && <label className="phone-label">{label}</label>}
      <div className="phone-wrapper">
        <input
          type="text"
          value={countryCode}
          className="phone-code"
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={handleChange}
          className="phone-number"
          placeholder="Nhập số điện thoại"
        />
      </div>
    </div>
  );
});

PhoneNumberInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultCountryCode: PropTypes.string,
};

export default PhoneNumberInput;
