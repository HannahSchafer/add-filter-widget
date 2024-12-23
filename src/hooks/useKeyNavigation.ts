import { useInputContext } from "../contexts/InputContext";

interface KeyNavigationProps {
  handleAddChip: () => void;
  handleDeleteChip: (chipIndex: number) => void;
}

const useKeyNavigation = ({
  handleAddChip,
  handleDeleteChip,
}: KeyNavigationProps) => {
  const {
    state: { isDatePickerOpen, chips },
    actions: {
      setIsDatePickerOpen,
      setShowValueDropdown,
      setShowOperatorsDropdown,
    },
    refs: {
      chipsRefs,
      columnInputRef,
      valueInputRef,
      datePickerRef,
      addFilterButtonRef,
      operatorInputRef,
    },
    isAddFilterDisabled,
  } = useInputContext();

  const focusElement = (
    ref: React.RefObject<HTMLInputElement | HTMLButtonElement>,
  ) => {
    ref.current?.focus();
  };

  const setSelectionRange = (
    inputRef: React.RefObject<HTMLInputElement | { input: HTMLElement | null }>,
  ) => {
    setTimeout(() => {
      const input =
        inputRef.current instanceof HTMLInputElement
          ? inputRef.current
          : inputRef.current?.input;

      if (input instanceof HTMLInputElement) {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }, 0);
  };

  const handleRightNavigation = (currentField: string) => {
    switch (currentField) {
      case "column":
        focusElement(operatorInputRef);
        setSelectionRange(operatorInputRef);
        break;

      case "operator":
        focusElement(valueInputRef);
        setSelectionRange(valueInputRef);

        const datePickerInput = datePickerRef.current?.input;
        datePickerInput?.focus();
        setSelectionRange(datePickerRef);
        setShowOperatorsDropdown(false);
        break;

      case "value":
        if (!isAddFilterDisabled) {
          focusElement(addFilterButtonRef);
          setShowValueDropdown(false);
        } else if (isAddFilterDisabled && chips.length > 0) {
          document.getElementById(`chip-0`)?.focus();
          setShowValueDropdown(false);
        }
        break;

      case "addFilterButton":
        if (chips.length > 0) {
          document.getElementById(`chip-0`)?.focus();
        }
        break;

      default:
        if (currentField.startsWith("chip")) {
          const chipIndex = parseInt(currentField.split("-")[1], 10);
          const nextChip = document.getElementById(`chip-${chipIndex + 1}`);
          if (nextChip) {
            nextChip.focus();
          } else {
            focusElement(columnInputRef);
            setSelectionRange(valueInputRef);
          }
        }
        break;
    }
  };

  const handleNavigationLeft = (currentField: string) => {
    switch (currentField) {
      case "operator":
        focusElement(columnInputRef);
        setSelectionRange(columnInputRef);
        break;

      case "value":
        focusElement(operatorInputRef);
        setSelectionRange(operatorInputRef);
        setShowValueDropdown(false);
        break;

      case "addFilterButton":
        focusElement(valueInputRef);
        setSelectionRange(valueInputRef);
        datePickerRef.current?.input?.focus();
        setSelectionRange(datePickerRef);
        break;

      default:
        if (currentField.startsWith("chip")) {
          const chipIndex = parseInt(currentField.split("-")[1], 10);
          const prevChip = document.getElementById(`chip-${chipIndex - 1}`);
          if (prevChip) {
            prevChip.focus();
          } else if (chipIndex === 0) {
            if (isAddFilterDisabled) {
              focusElement(valueInputRef);
              setSelectionRange(valueInputRef);
            } else {
              focusElement(addFilterButtonRef);
            }
          }
        }
        break;
    }
  };

  const handleBackspaceOnChip = (currentField: string) => {
    if (!currentField.startsWith("chip")) return;

    const chipIndex = parseInt(currentField.split("-")[1], 10);
    handleDeleteChip(chipIndex);

    if (chipsRefs.current) {
      if (chipsRefs.current[chipIndex - 1]) {
        chipsRefs.current[chipIndex - 1]?.focus();
      } else if (chipsRefs.current[chipIndex + 1]) {
        chipsRefs.current[chipIndex + 1]?.focus();
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent, currentField: string) => {
    if (isDatePickerOpen) {
      // Allow DatePicker to handle its own key navigation
      if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
        return;
      }
      // If Enter is pressed in DatePicker, resume higher-level navigation
      if (e.key === "Enter") {
        setIsDatePickerOpen(false);
        return;
      }
    }

    switch (e.key) {
      case "ArrowRight":
        handleRightNavigation(currentField);
        break;

      case "ArrowLeft":
        handleNavigationLeft(currentField);
        break;

      case "Enter":
        if (currentField === "addFilterButton") {
          handleAddChip();
        }
        if (currentField.startsWith("chip")) {
          handleBackspaceOnChip(currentField);
        }
        break;

      case "Backspace":
        if (currentField.startsWith("chip")) {
          handleBackspaceOnChip(currentField);
        }
        break;

      default:
        break;
    }
  };

  return {
    handleKeyDown,
  };
};

export default useKeyNavigation;
