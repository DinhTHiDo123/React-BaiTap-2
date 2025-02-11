import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.css";

const DateTimePicker = forwardRef(({ label, value, onChange, showTimeSelect }, ref) => {
  const [selectedDate, setSelectedDate] = useState(value || null);

  const handleChange = (date) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
  };

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => selectedDate,
    setValue: (newValue) => setSelectedDate(newValue),
  }));

  return (
    <div className="datetime-picker-container">
      {label && <label className="datetime-picker-label">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect={showTimeSelect}
        dateFormat={showTimeSelect ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"}
        placeholderText="Chọn ngày"
        className="datetime-picker-input"
      />
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props
DateTimePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  showTimeSelect: PropTypes.bool,
};

export default DateTimePicker;
