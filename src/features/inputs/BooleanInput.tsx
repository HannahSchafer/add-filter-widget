import React, { useRef } from "react";
import { useInputContext } from "../../contexts/InputContext";
import Dropdown from "../../baseComponents/Dropdown";

export interface BooleanInputProps {
  closeOtherDropdowns: (
    dropdownType: "column" | "operator" | "value" | "none",
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string,
  ) => void;
  handleKeyDownDropdown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "value" | "column" | "operator",
  ) => void;
}

const BooleanInput: React.FC<BooleanInputProps> = ({
  closeOtherDropdowns,
  handleKeyDown,
  handleKeyDownDropdown,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    state: { value, highlightedIndex, showValueDropdown },
    actions: { setHighlightedIndex, setValue, setShowValueDropdown },
    refs: { valueInputRef },
  } = useInputContext();

  const options = ["True", "False"];

  return (
    <div className="input-with-dropdown">
      <input
        placeholder="Enter Value"
        ref={valueInputRef}
        className="filter-input"
        value={String(value)}
        role="combobox"
        readOnly
        aria-haspopup="listbox"
        aria-expanded={showValueDropdown}
        aria-controls="boolean-dropdown"
        aria-activedescendant={
          showValueDropdown && highlightedIndex >= 0
            ? `option-${highlightedIndex}`
            : undefined
        }
        onFocus={() => {
          closeOtherDropdowns("value");
          setShowValueDropdown(true);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e, "value");
          handleKeyDownDropdown(e, "value");
        }}
      />
      <Dropdown
        items={options}
        show={showValueDropdown}
        highlightedIndex={highlightedIndex}
        onHighlight={setHighlightedIndex}
        onSelect={setValue}
        getItemLabel={(item: string) => item}
        dropdownRef={dropdownRef}
      />
    </div>
  );
};

export default BooleanInput;
