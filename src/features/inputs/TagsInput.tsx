import React, { RefObject } from "react";
import Dropdown from "../../baseComponents/Dropdown";
import { useInputContext } from "../../contexts/InputContext";
import MultiSelectItem from "../../baseComponents/MultiSelect";

import "../Spreadsheet.css";

export interface TagsInputProps {
  closeOtherDropdowns: (
    dropdownType: "column" | "operator" | "value" | "none",
  ) => void;
  dropdownRef: RefObject<HTMLDivElement>;
  toggleTagSelection: (tag: string) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string,
  ) => void;
  handleKeyDownDropdown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "value" | "column" | "operator",
  ) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({
  closeOtherDropdowns,
  toggleTagSelection,
  handleKeyDown,
  handleKeyDownDropdown,
  dropdownRef,
}) => {
  const {
    state: { value, showValueDropdown, highlightedIndex, filteredTags },
    actions: { setShowValueDropdown, setHighlightedIndex, setValue },
    refs: { valueInputRef },
  } = useInputContext();

  return (
    <div className="input-with-dropdown">
      <input
        placeholder="Search or select tags"
        ref={valueInputRef}
        className="filter-input"
        value={Array.isArray(value) ? value.join(", ") : value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          closeOtherDropdowns("value");
          setShowValueDropdown(true);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e, "value");
          handleKeyDownDropdown(e, "value");
        }}
        aria-autocomplete="list"
        aria-controls="tags-dropdown"
        aria-expanded={showValueDropdown}
        aria-haspopup="listbox"
        aria-activedescendant={
          showValueDropdown && highlightedIndex >= 0
            ? `tags-option-${highlightedIndex}`
            : undefined
        }
      />
      <Dropdown
        items={filteredTags}
        show={showValueDropdown}
        highlightedIndex={highlightedIndex}
        onHighlight={setHighlightedIndex}
        onSelect={(option: string) => toggleTagSelection(option)}
        getItemLabel={(option: string) => option}
        dropdownRef={dropdownRef}
        renderItem={(option: string, isHighlighted: boolean) => (
          <MultiSelectItem
            option={option}
            isHighlighted={isHighlighted}
            isSelected={Array.isArray(value) && value.includes(option)}
            onSelect={toggleTagSelection}
          />
        )}
      />
    </div>
  );
};

export default TagsInput;
