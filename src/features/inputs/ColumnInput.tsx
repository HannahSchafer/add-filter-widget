import React, { forwardRef, RefObject } from "react";
import Dropdown from "../../baseComponents/Dropdown";
import { useInputContext } from "../../contexts/InputContext";

interface ColumnInputProps {
  handleColumnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeOtherDropdowns: (
    dropdownType: "column" | "operator" | "value" | "none",
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string,
  ) => void;
  handleKeyDownDropdown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "column" | "operator" | "value",
  ) => void;
  handleColumnSelect: (column: { id: string; label: string }) => void;
  dropdownRef: RefObject<HTMLDivElement>;
}

const ColumnInput = forwardRef<HTMLInputElement, ColumnInputProps>(
  (
    {
      handleColumnChange,
      closeOtherDropdowns,
      handleKeyDown,
      handleKeyDownDropdown,
      handleColumnSelect,
      dropdownRef,
    },
    ref,
  ) => {
    const {
      state: {
        columnSearchTerm,
        highlightedIndex,
        matchingColumns,
        showColumnsDropdown,
      },
      actions: { setHighlightedIndex },
    } = useInputContext();
    return (
      <div className="input-wrapper">
        <input
          placeholder="Enter column"
          ref={ref}
          className="filter-input"
          type="text"
          value={columnSearchTerm}
          onChange={handleColumnChange}
          onFocus={() => closeOtherDropdowns("column")}
          onKeyDown={(e) => {
            handleKeyDown(e, "column");
            handleKeyDownDropdown(e, "column");
          }}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showColumnsDropdown}
          aria-controls="column-dropdown"
          aria-activedescendant={
            showColumnsDropdown && highlightedIndex >= 0
              ? `option-${highlightedIndex}`
              : undefined
          }
        />
        <Dropdown
          items={matchingColumns}
          show={showColumnsDropdown}
          highlightedIndex={highlightedIndex}
          onHighlight={setHighlightedIndex}
          onSelect={handleColumnSelect}
          getItemLabel={(column) => column.label}
          dropdownRef={dropdownRef}
        />
      </div>
    );
  },
);

ColumnInput.displayName = "ColumnInput";

export default ColumnInput;
