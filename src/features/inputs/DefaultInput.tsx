import React from "react";
import { useInputContext } from "../../contexts/InputContext";

export interface DefaultInputProps {
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string,
  ) => void;
  closeOtherDropdowns: (
    dropdownType: "column" | "operator" | "value" | "none",
  ) => void;
}

const DefaultInput: React.FC<DefaultInputProps> = ({
  handleValueChange,
  handleKeyDown,
  closeOtherDropdowns,
}) => {
  const {
    state: { value },
    refs: { valueInputRef },
  } = useInputContext();

  return (
    <input
      placeholder="Enter Value"
      ref={valueInputRef}
      className="filter-input"
      value={String(value)}
      onChange={handleValueChange}
      onKeyDown={(e) => handleKeyDown(e, "value")}
      onFocus={() => closeOtherDropdowns("value")}
      aria-label="Value input field"
      role="textbox"
    />
  );
};

export default DefaultInput;
