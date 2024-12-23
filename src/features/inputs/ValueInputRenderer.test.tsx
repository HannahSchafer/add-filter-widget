import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ValueInputRenderer from "./ValueInputRenderer";
import { InputContext } from "../../contexts/InputContext";
import TagsInput from "./TagsInput";
import { ColumnConfig } from "../../types";
import { mockContextValue as contextValue } from "../../utils/mockData";

jest.mock("./DateInput", () => jest.fn(() => <div data-testid="DateInput" />));
jest.mock("./TagsInput", () => jest.fn(() => <div data-testid="TagsInput" />));
jest.mock("./BooleanInput", () =>
  jest.fn(() => <div data-testid="BooleanInput" />),
);
jest.mock("./DefaultInput", () =>
  jest.fn(() => <div data-testid="DefaultInput" />),
);

const inputProps = {
  closeOtherDropdowns: jest.fn(),
  handleValueChange: jest.fn(),
  handleDateChange: jest.fn(),
  handleKeyDown: jest.fn(),
  handleKeyDownDropdown: jest.fn(),
  toggleTagSelection: jest.fn(),
};

const mockContextValue = {
  ...contextValue,
  currentColumn: { id: "1", label: "Mock Column", type: "date" },
  selectedColumn: "Mock Column",
  setSelectedColumn: jest.fn(),
  selectedOperator: "=",
  setSelectedOperator: jest.fn(),
  value: "",
  setValue: jest.fn(),
  valueInputRef: { current: null },
  highlightedIndex: 0,
  setHighlightedIndex: jest.fn(),
  showValueDropdown: false,
  setShowValueDropdown: jest.fn(),
  setFilteredTags: jest.fn(),
  filteredTags: [],
};

const renderComponent = (
  currentColumnType:
    | "string"
    | "number"
    | "boolean"
    | "date"
    | "tags"
    | undefined,
) => {
  const contextValue = {
    ...mockContextValue,
    currentColumn: currentColumnType
      ? ({
          id: "1",
          label: "Mock Column",
          type: currentColumnType,
        } as ColumnConfig)
      : undefined,
  };

  return render(
    <InputContext.Provider value={contextValue}>
      <ValueInputRenderer inputProps={inputProps} />
    </InputContext.Provider>,
  );
};
describe("ValueInputRenderer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders DateInput when currentColumn.type is 'date'", () => {
    renderComponent("date");
    expect(screen.getByTestId("DateInput")).toBeInTheDocument();
  });

  it("renders TagsInput when currentColumn.type is 'tags'", () => {
    renderComponent("tags");
    expect(screen.getByTestId("TagsInput")).toBeInTheDocument();
  });

  it("renders BooleanInput when currentColumn.type is 'boolean'", () => {
    renderComponent("boolean");
    expect(screen.getByTestId("BooleanInput")).toBeInTheDocument();
  });

  it("passes inputProps to the rendered component", () => {
    renderComponent("tags");

    expect(TagsInput).toHaveBeenCalledWith(
      expect.objectContaining(inputProps),
      {},
    );
  });
});
