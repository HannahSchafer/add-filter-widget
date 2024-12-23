import { InputContextType } from "../contexts/InputContext";
import { COLUMN_CONFIG } from "../config";

export const mockContextValue: InputContextType = {
  state: {
    selectedColumn: "new column",
    selectedOperator: "=",
    value: "",
    columnSearchTerm: "",
    chips: [],
    dateValue: null,
    showColumnsDropdown: false,
    showOperatorsDropdown: false,
    showValueDropdown: false,
    highlightedIndex: 0,
    isDatePickerOpen: false,
    matchingColumns: COLUMN_CONFIG,
    filteredTags: [],
  },
  actions: {
    setSelectedColumn: jest.fn(),
    setSelectedOperator: jest.fn(),
    setValue: jest.fn(),
    setColumnSearchTerm: jest.fn(),
    setChips: jest.fn(),
    addChip: jest.fn(),
    removeChip: jest.fn(),
    setDateValue: jest.fn(),
    toggleDropdown: jest.fn(),
    setHighlightedIndex: jest.fn(),
    setMatchingColumns: jest.fn(),
    setFilteredTags: jest.fn(),
    setShowColumnsDropdown: jest.fn(),
    setShowOperatorsDropdown: jest.fn(),
    setShowValueDropdown: jest.fn(),
    setIsDatePickerOpen: jest.fn(),
  },
  refs: {
    addFilterButtonRef: { current: null },
    columnInputRef: { current: document.createElement("input") },
    operatorInputRef: { current: document.createElement("input") },
    valueInputRef: { current: document.createElement("input") },
    chipsRefs: { current: [] },
    datePickerRef: { current: null },
  },
  isAddFilterDisabled: false,
  currentColumn: {
    id: "niftyColumn",
    label: "My Nifty Column",
    type: "string",
  },
};
