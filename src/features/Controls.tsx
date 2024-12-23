import React from "react";
import AddFilterButton from "../features/AddFilterButton";
import Chips from "./Chips";
import ColumnInput from "./inputs/ColumnInput";
import OperatorInput from "./inputs/OperatorInput";
import ValueInputRenderer from "./inputs/ValueInputRenderer";
import { useInputContext } from "../contexts/InputContext";
import useDateInput from "../hooks/useDateInput";
import useDropdown from "../hooks/useDropdown";
import useFilter from "../hooks/useFilter";
import useKeyNavigation from "../hooks/useKeyNavigation";
import useOutsideClick from "../hooks/useOutsideClick";
import useSearch from "../hooks/useSearch";
import "react-datepicker/dist/react-datepicker.css";
import "./Spreadsheet.css";

const Controls: React.FC = () => {
  const {
    state: { selectedOperator },
    refs: { columnInputRef, operatorInputRef },
  } = useInputContext();

  const { handleDateChange } = useDateInput();

  const {
    closeAllDropdowns,
    closeOtherDropdowns,
    dropdownRef,
    handleOperatorSelect,
    handleKeyDownDropdown,
  } = useDropdown();

  const { handleColumnChange, handleOperatorChange } = useSearch();

  const {
    handleAddChip,
    handleDeleteChip,
    handleValueChange,
    toggleTagSelection,
    handleColumnSelect,
  } = useFilter();

  useOutsideClick(closeAllDropdowns, [
    "react-datepicker",
    "dropdown",
    "filter-input",
  ]);

  const { handleKeyDown } = useKeyNavigation({
    handleAddChip,
    handleDeleteChip,
  });

  const inputProps = {
    closeOtherDropdowns,
    handleValueChange,
    handleDateChange,
    handleKeyDown,
    handleKeyDownDropdown,
    toggleTagSelection,
    dropdownRef,
  };

  return (
    <>
      <div className="controls-wrapper">
        {/* Column Input */}
        <ColumnInput
          ref={columnInputRef}
          handleColumnChange={handleColumnChange}
          closeOtherDropdowns={closeOtherDropdowns}
          handleKeyDown={handleKeyDown}
          handleKeyDownDropdown={handleKeyDownDropdown}
          handleColumnSelect={handleColumnSelect}
          dropdownRef={dropdownRef}
        />

        {/* Operator Input */}
        <OperatorInput
          ref={operatorInputRef}
          onChange={handleOperatorChange}
          onFocus={() => {
            closeOtherDropdowns("operator");
            setTimeout(() => {
              operatorInputRef.current?.setSelectionRange(
                selectedOperator.length,
                selectedOperator.length,
              );
            }, 0);
          }}
          onKeyDown={handleKeyDown}
          onKeyDownDropdown={handleKeyDownDropdown}
          handleOperatorSelect={handleOperatorSelect}
          dropdownRef={dropdownRef}
        />

        {/* Value Input */}
        <div className="input-wrapper">
          <ValueInputRenderer inputProps={inputProps} />
        </div>

        <AddFilterButton
          handleAddChip={handleAddChip}
          handleKeyDown={handleKeyDown}
        />
      </div>
      <div className="chips-wrapper">
        <Chips
          handleKeyDown={handleKeyDown}
          handleDeleteChip={handleDeleteChip}
        />
      </div>
    </>
  );
};

export default Controls;
