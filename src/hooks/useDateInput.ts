import { useInputContext } from "../contexts/InputContext";

const useDateInput = () => {
  const {
    state: { dateValue },
    actions: { setValue, setDateValue },
  } = useInputContext();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateValue(date);
      setValue(date.toISOString().split("T")[0]);
    } else {
      setDateValue(null);
      setValue("");
    }
  };

  return { dateValue, handleDateChange };
};

export default useDateInput;
