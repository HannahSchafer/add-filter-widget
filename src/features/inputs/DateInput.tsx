import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useInputContext } from "../../contexts/InputContext";
import React from "react";

export interface DateInputProps {
  handleDateChange: (date: Date | null) => void;
  handleKeyDown: (e: React.KeyboardEvent, field: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  handleDateChange,
  handleKeyDown,
}) => {
  const {
    state: { dateValue, isDatePickerOpen },
    actions: { setIsDatePickerOpen },
    refs: { datePickerRef },
  } = useInputContext();
  return (
    <DatePicker
      ref={datePickerRef}
      open={isDatePickerOpen}
      selected={dateValue}
      onChange={handleDateChange}
      placeholderText="Select a date"
      className="filter-input datepicker"
      onKeyDown={(e) => handleKeyDown(e, "value")}
      dateFormat="yyyy-MM-dd"
      onFocus={() => setIsDatePickerOpen(true)}
      onClickOutside={() => setIsDatePickerOpen(false)}
      aria-label="Date input field"
      id="date-input"
      aria-expanded={isDatePickerOpen}
      aria-haspopup="dialog"
    />
  );
};

export default DateInput;
