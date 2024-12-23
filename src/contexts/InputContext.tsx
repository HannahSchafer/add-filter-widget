import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { Chip, ColumnConfig } from "../types";
import { COLUMN_CONFIG } from "../config";
import DatePicker from "react-datepicker";

export interface InputContextType {
  state: InputState;
  actions: {
    setSelectedColumn: (column: string) => void;
    setSelectedOperator: (operator: string) => void;
    setValue: (value: string | string[]) => void;
    setColumnSearchTerm: (term: string) => void;
    setChips: (chips: Chip[]) => void;
    addChip: (chip: Chip) => void;
    removeChip: (index: number) => void;
    setDateValue: (date: Date | null) => void;
    toggleDropdown: (dropdown: string, value: boolean) => void;
    setHighlightedIndex: (index: number) => void;
    setMatchingColumns: (columns: ColumnConfig[]) => void;
    setFilteredTags: (tags: string[]) => void;
    setShowColumnsDropdown: (value: boolean) => void;
    setShowOperatorsDropdown: (value: boolean) => void;
    setShowValueDropdown: (value: boolean) => void;
    setIsDatePickerOpen: (value: boolean) => void;
  };
  refs: {
    addFilterButtonRef: React.RefObject<HTMLButtonElement>;
    columnInputRef: React.RefObject<HTMLInputElement>;
    operatorInputRef: React.RefObject<HTMLInputElement>;
    valueInputRef: React.RefObject<HTMLInputElement>;
    chipsRefs: React.RefObject<(HTMLDivElement | null)[]>;
    datePickerRef: React.RefObject<DatePicker>;
  };
  isAddFilterDisabled: boolean;
  currentColumn: ColumnConfig | undefined;
}

export enum ActionTypes {
  SET_SELECTED_COLUMN = "SET_SELECTED_COLUMN",
  SET_SELECTED_OPERATOR = "SET_SELECTED_OPERATOR",
  SET_VALUE = "SET_VALUE",
  SET_COLUMN_SEARCH_TERM = "SET_COLUMN_SEARCH_TERM",
  SET_CHIPS = "SET_CHIPS",
  ADD_CHIP = "ADD_CHIP",
  REMOVE_CHIP = "REMOVE_CHIP",
  SET_DATE_VALUE = "SET_DATE_VALUE",
  TOGGLE_DROPDOWN = "TOGGLE_DROPDOWN",
  SET_HIGHLIGHTED_INDEX = "SET_HIGHLIGHTED_INDEX",
  SET_MATCHING_COLUMNS = "SET_MATCHING_COLUMNS",
  SET_FILTERED_TAGS = "SET_FILTERED_TAGS",
  SET_SHOW_COLUMNS_DROPDOWN = "SET_SHOW_COLUMNS_DROPDOWN",
  SET_SHOW_OPERATORS_DROPDOWN = "SET_SHOW_OPERATORS_DROPDOWN",
  SET_SHOW_VALUE_DROPDOWN = "SET_SHOW_VALUE_DROPDOWN",
  SET_IS_DATE_PICKER_OPEN = "SET_IS_DATE_PICKER_OPEN",
}

interface InputState {
  selectedColumn: string;
  selectedOperator: string;
  value: string | string[];
  columnSearchTerm: string;
  chips: Chip[];
  dateValue: Date | null;
  showColumnsDropdown: boolean;
  showOperatorsDropdown: boolean;
  showValueDropdown: boolean;
  highlightedIndex: number;
  isDatePickerOpen: boolean;
  matchingColumns: ColumnConfig[];
  filteredTags: string[];
}

type InputAction =
  | { type: ActionTypes.SET_SELECTED_COLUMN; payload: string }
  | { type: ActionTypes.SET_SELECTED_OPERATOR; payload: string }
  | { type: ActionTypes.SET_VALUE; payload: string | string[] }
  | { type: ActionTypes.SET_COLUMN_SEARCH_TERM; payload: string }
  | { type: ActionTypes.SET_CHIPS; payload: Chip[] }
  | { type: ActionTypes.ADD_CHIP; payload: Chip }
  | { type: ActionTypes.REMOVE_CHIP; payload: number }
  | { type: ActionTypes.SET_DATE_VALUE; payload: Date | null }
  | {
      type: ActionTypes.TOGGLE_DROPDOWN;
      payload: { dropdown: string; value: boolean };
    }
  | { type: ActionTypes.SET_HIGHLIGHTED_INDEX; payload: number }
  | { type: ActionTypes.SET_MATCHING_COLUMNS; payload: ColumnConfig[] }
  | { type: ActionTypes.SET_FILTERED_TAGS; payload: string[] }
  | { type: ActionTypes.SET_SHOW_COLUMNS_DROPDOWN; payload: boolean }
  | { type: ActionTypes.SET_SHOW_OPERATORS_DROPDOWN; payload: boolean }
  | { type: ActionTypes.SET_SHOW_VALUE_DROPDOWN; payload: boolean }
  | { type: ActionTypes.SET_IS_DATE_PICKER_OPEN; payload: boolean };

const initialState: InputState = {
  selectedColumn: "",
  selectedOperator: "",
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
};

const reducer = (state: InputState, action: InputAction): InputState => {
  switch (action.type) {
    case ActionTypes.SET_SELECTED_COLUMN:
      return { ...state, selectedColumn: action.payload };
    case ActionTypes.SET_SELECTED_OPERATOR:
      return { ...state, selectedOperator: action.payload };
    case ActionTypes.SET_VALUE:
      return { ...state, value: action.payload };
    case ActionTypes.SET_COLUMN_SEARCH_TERM:
      return { ...state, columnSearchTerm: action.payload };
    case ActionTypes.SET_CHIPS:
      return { ...state, chips: action.payload };
    case ActionTypes.ADD_CHIP:
      return { ...state, chips: [...state.chips, action.payload] };
    case ActionTypes.REMOVE_CHIP:
      return {
        ...state,
        chips: state.chips.filter((_, index) => index !== action.payload),
      };
    case ActionTypes.SET_DATE_VALUE:
      return { ...state, dateValue: action.payload };
    case ActionTypes.TOGGLE_DROPDOWN:
      return { ...state, [action.payload.dropdown]: action.payload.value };
    case ActionTypes.SET_HIGHLIGHTED_INDEX:
      return { ...state, highlightedIndex: action.payload };
    case ActionTypes.SET_MATCHING_COLUMNS:
      return { ...state, matchingColumns: action.payload };
    case ActionTypes.SET_FILTERED_TAGS:
      return { ...state, filteredTags: action.payload };
    case ActionTypes.SET_SHOW_COLUMNS_DROPDOWN:
      return { ...state, showColumnsDropdown: action.payload };
    case ActionTypes.SET_SHOW_OPERATORS_DROPDOWN:
      return { ...state, showOperatorsDropdown: action.payload };
    case ActionTypes.SET_SHOW_VALUE_DROPDOWN:
      return { ...state, showValueDropdown: action.payload };
    case ActionTypes.SET_IS_DATE_PICKER_OPEN:
      return { ...state, isDatePickerOpen: action.payload };
    default:
      console.warn("Unhandled action type");
      return state;
  }
};

export const InputContext = createContext<InputContextType | undefined>(
  undefined,
);

export function InputProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refs = {
    addFilterButtonRef: useRef<HTMLButtonElement>(null),
    columnInputRef: useRef<HTMLInputElement>(null),
    operatorInputRef: useRef<HTMLInputElement>(null),
    valueInputRef: useRef<HTMLInputElement>(null),
    chipsRefs: useRef<(HTMLDivElement | null)[]>([]),
    datePickerRef: useRef<DatePicker>(null),
  };

  const isAddFilterDisabled = useMemo(
    () => !(state.selectedColumn && state.selectedOperator && state.value),
    [state.selectedColumn, state.selectedOperator, state.value],
  );

  const currentColumn = useMemo(
    () => COLUMN_CONFIG.find((col) => col.label === state.selectedColumn),
    [state.selectedColumn],
  );

  const store = {
    state,
    actions: {
      setSelectedColumn: (column: string) => {
        dispatch({ type: ActionTypes.SET_SELECTED_COLUMN, payload: column });
      },
      setSelectedOperator: (operator: string) =>
        dispatch({
          type: ActionTypes.SET_SELECTED_OPERATOR,
          payload: operator,
        }),
      setValue: (value: string | string[]) =>
        dispatch({ type: ActionTypes.SET_VALUE, payload: value }),
      setColumnSearchTerm: (term: string) =>
        dispatch({ type: ActionTypes.SET_COLUMN_SEARCH_TERM, payload: term }),
      setChips: (chips: Chip[]) => {
        dispatch({ type: ActionTypes.SET_CHIPS, payload: chips });
      },
      addChip: (chip: Chip) =>
        dispatch({ type: ActionTypes.ADD_CHIP, payload: chip }),
      removeChip: (index: number) =>
        dispatch({ type: ActionTypes.REMOVE_CHIP, payload: index }),
      setDateValue: (date: Date | null) =>
        dispatch({ type: ActionTypes.SET_DATE_VALUE, payload: date }),
      toggleDropdown: (dropdown: string, value: boolean) =>
        dispatch({
          type: ActionTypes.TOGGLE_DROPDOWN,
          payload: { dropdown, value },
        }),
      setHighlightedIndex: (index: number) =>
        dispatch({ type: ActionTypes.SET_HIGHLIGHTED_INDEX, payload: index }),
      setMatchingColumns: (columns: ColumnConfig[]) =>
        dispatch({ type: ActionTypes.SET_MATCHING_COLUMNS, payload: columns }),
      setFilteredTags: (tags: string[]) =>
        dispatch({ type: ActionTypes.SET_FILTERED_TAGS, payload: tags }),
      setShowColumnsDropdown: (value: boolean) =>
        dispatch({
          type: ActionTypes.SET_SHOW_COLUMNS_DROPDOWN,
          payload: value,
        }),
      setShowOperatorsDropdown: (value: boolean) =>
        dispatch({
          type: ActionTypes.SET_SHOW_OPERATORS_DROPDOWN,
          payload: value,
        }),
      setShowValueDropdown: (value: boolean) =>
        dispatch({ type: ActionTypes.SET_SHOW_VALUE_DROPDOWN, payload: value }),
      setIsDatePickerOpen: (value: boolean) =>
        dispatch({ type: ActionTypes.SET_IS_DATE_PICKER_OPEN, payload: value }),
    },
    refs,
    isAddFilterDisabled,
    currentColumn,
  };

  return (
    <InputContext.Provider value={store}>{children}</InputContext.Provider>
  );
}

export function useInputContext() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within an InputProvider");
  }
  return context;
}
