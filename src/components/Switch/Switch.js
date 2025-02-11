import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import "./Switch.css";

const Switch = forwardRef(({ label, value, onChange }, ref) => {
  const [isChecked, setIsChecked] = useState(value || false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) onChange(newValue);
  };

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => isChecked,
    setValue: (newValue) => setIsChecked(newValue),
  }));

  return (
    <div className="switch-container">
      {label && <span className="switch-label">{label}</span>}
      <div className={`switch ${isChecked ? "switch-on" : ""}`} onClick={handleToggle}>
        <div className="switch-handle"></div>
      </div>
    </div>
  );
});

Switch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Switch;
