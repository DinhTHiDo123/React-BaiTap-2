import React, { useRef } from "react";
import Input from "./components/Input/Input";
import PhoneNumberInput from "./components/PhoneNumberInput/PhoneNumberInput";
import RadioButton from "./components/RadioButton/RadioButton";
import Checkbox from "./components/Checkbox/Checkbox";
import Switch from "./components/Switch/Switch";
import Selectbox from "./components/Selectbox/Selectbox";
import MultiSelect from "./components/MultiSelect/MultiSelect";
import SelectboxSearch from "./components/SelectboxSearch/SelectboxSearch";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import DataTable from "./components/DataTable/DataTable";

const App = () => {
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Tên", accessor: "name" },
    { Header: "Email", accessor: "email" },
  ];
  
  const initialData = [
    { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
    { id: 2, name: "Trần Thị B", email: "b@gmail.com" },
    { id: 3, name: "Lê Văn C", email: "c@gmail.com" },
    { id: 4, name: "Phạm Thị D", email: "d@gmail.com" },
    { id: 5, name: "Hoàng Văn E", email: "e@gmail.com" },
    { id: 6, name: "Đặng Thị F", email: "f@gmail.com" },
  ];
  const inputRef = useRef();
  const phoneInputRef = useRef();
  const radioRef = useRef();
  const checkboxRef = useRef();
  const switchRef = useRef();
  const selectRef = useRef();
  const multiSelectRef = useRef();
  const selectboxSearchRef = useRef();
  const currencyRef = useRef();
  const datePickerRef = useRef();
  const dataTableRef = useRef();
  const fetchOptionsMock = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const options = [
          { label: "Việt Nam", value: "vn" },
          { label: "Mỹ", value: "us" },
          { label: "Nhật Bản", value: "jp" },
          { label: "Hàn Quốc", value: "kr" },
        ].filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
        resolve(options);
      }, 500);
    });
  };
  return (
    <div>
      <h1>React Component</h1>
      <div className="app-container">
        <Input ref={inputRef} label="Họ và tên" placeholder="Nhập họ và tên" />
        <PhoneNumberInput ref={phoneInputRef} label="Số điện thoại" />
        <RadioButton
          ref={radioRef}
          label="Chọn giới tính"
          name="gender"
          options={[
            { label: "Nam", value: "male" },
            { label: "Nữ", value: "female" },
            { label: "Khác", value: "other" },
          ]}
        />
        <Checkbox
          ref={checkboxRef}
          label="Chọn sở thích"
          options={[
            { label: "Đọc sách", value: "option1" },
            { label: "Du lịch", value: "option2" },
            { label: "Nghe nhạc", value: "option3" },
          ]}
        />
          <Switch ref={switchRef} label="Bật/Tắt" />
          <Selectbox
          ref={selectRef}
          label="Chọn quốc gia"
          options={[
            { label: "Việt Nam", value: "vn" },
            { label: "Mỹ", value: "us" },
            { label: "Nhật Bản", value: "jp" },
          ]}
        />
          <SelectboxSearch ref={selectboxSearchRef} label="Tìm kiếm quốc gia" fetchOptions={fetchOptionsMock}/>
          <CurrencyInput ref={currencyRef} label="Nhập số tiền" currencySymbol="₫" />
          <DateTimePicker ref={datePickerRef} label="Chọn ngày" showTimeSelect={true} />
          <DataTable ref={dataTableRef} columns={columns} data={initialData} pageSize={3} />
          </div>
    </div>
  );
};

export default App;
