import { useRef } from "react";
import { OPERATORS } from "../config";
import { useInputContext } from "../contexts/InputContext";
import useFilter from "./useFilter";

const useDropdown = () => {
  const {
    state: { value, matchingColumns, highlightedIndex },
    actions: {
      setSelectedOperator,
      setShowColumnsDropdown,
      setShowOperatorsDropdown,
      setShowValueDropdown,
      setHighlightedIndex,
      setIsDatePickerOpen,
    },
    refs: { valueInputRef },
    currentColumn,
  } = useInputContext();

  const { handleColumnSelect, handleValueOptionSelect } = useFilter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = () => {
    setShowColumnsDropdown(false);
    setShowOperatorsDropdown(false);
    setShowValueDropdown(false);
  };

  const scrollToHighlighted = (index: number) => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    if (isNaN(index) || index < 0) return;

    const item = dropdown.querySelector<HTMLDivElement>(
      `div:nth-child(${index + 1})`,
    );

    item?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const handleOperatorSelect = (operator: string) => {
    setSelectedOperator(operator);
    setShowOperatorsDropdown(false);
    valueInputRef.current?.focus();
    setTimeout(() => {
      valueInputRef.current?.setSelectionRange(value.length, value.length);
    }, 0);
  };

  const handleKeyDownDropdown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    dropdownType: "column" | "operator" | "value",
  ) => {
    const currentDropdown = (() => {
      switch (dropdownType) {
        case "column":
          return matchingColumns;
        case "operator":
          return OPERATORS;
        case "value":
          if (currentColumn?.type === "boolean") {
            return ["True", "False"];
          }
          return currentColumn?.options || [];
        default:
          return [];
      }
    })();

    if (currentDropdown.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (highlightedIndex + 1) % currentDropdown.length;
      setHighlightedIndex(nextIndex);
      scrollToHighlighted(nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex =
        (highlightedIndex - 1 + currentDropdown.length) %
        currentDropdown.length;
      setHighlightedIndex(nextIndex);
      scrollToHighlighted(nextIndex);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (dropdownType === "column") {
        const selectedColumn = currentDropdown[highlightedIndex] as {
          id: string;
          label: string;
        };
        handleColumnSelect(selectedColumn);
      } else if (dropdownType === "operator") {
        const selectedOperator = currentDropdown[highlightedIndex] as string;
        handleOperatorSelect(selectedOperator);
      } else if (dropdownType === "value") {
        const selectedValue = currentDropdown[highlightedIndex] as string;
        handleValueOptionSelect(selectedValue);
      }
    } else if (e.key === "Escape") {
      setShowColumnsDropdown(false);
      setShowOperatorsDropdown(false);
      setShowValueDropdown(false);
    }
  };

  const closeOtherDropdowns = (
    current: "column" | "operator" | "value" | "date" | "none",
  ) => {
    setShowColumnsDropdown(current === "column");
    setShowOperatorsDropdown(current === "operator");
    setShowValueDropdown(current === "value");
    setIsDatePickerOpen(current === "date");

    if (current !== "none") {
      setHighlightedIndex(0);
    }
  };

  return {
    closeAllDropdowns,
    dropdownRef,
    handleOperatorSelect,
    handleKeyDownDropdown,
    setIsDatePickerOpen,
    closeOtherDropdowns,
  };
};

export default useDropdown;
