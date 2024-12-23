import React, { forwardRef, RefObject } from "react";
import Dropdown from "../../baseComponents/Dropdown";
import { OPERATORS } from "../../config";
import { useInputContext } from "../../contexts/InputContext";

interface OperatorInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, field: string) => void;
  onKeyDownDropdown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "operator" | "value" | "column",
  ) => void;
  handleOperatorSelect: (operator: string) => void;
  dropdownRef: RefObject<HTMLDivElement>;
}

const OperatorInput = forwardRef<HTMLInputElement, OperatorInputProps>(
  (
    {
      onChange,
      onFocus,
      onKeyDown,
      onKeyDownDropdown,
      handleOperatorSelect,
      dropdownRef,
    },
    ref,
  ) => {
    const {
      state: { selectedOperator, showOperatorsDropdown, highlightedIndex },
      actions: { setHighlightedIndex },
    } = useInputContext();

    return (
      <div className="input-wrapper">
        <input
          placeholder="="
          ref={ref}
          className="filter-input operator"
          type="text"
          value={selectedOperator}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={(e) => {
            onKeyDown(e, "operator");
            onKeyDownDropdown(e, "operator");
          }}
        />
        <Dropdown
          items={OPERATORS}
          show={showOperatorsDropdown}
          highlightedIndex={highlightedIndex}
          onHighlight={setHighlightedIndex}
          onSelect={handleOperatorSelect}
          getItemLabel={(operator) => operator}
          dropdownRef={dropdownRef}
        />
      </div>
    );
  },
);

OperatorInput.displayName = "OperatorInput";

export default OperatorInput;
