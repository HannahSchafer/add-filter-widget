import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { InputContext } from "../contexts/InputContext";
import { mockContextValue as contextValue } from "../utils/mockData";
import Controls from "./Controls";

const mockHandleAddChip = jest.fn();
const mockHandleKeyDown = jest.fn();
const mockCloseOtherDropdowns = jest.fn();
const mockHandleColumnChange = jest.fn();

jest.mock("./inputs/ColumnInput", () =>
  jest.fn(({ handleColumnChange }) => (
    <input
      data-testid="ColumnInput"
      onChange={(e) => handleColumnChange(e.target.value)}
    />
  )),
);
jest.mock("./inputs/OperatorInput", () =>
  jest.fn(() => <div data-testid="OperatorInput" />),
);
jest.mock("./inputs/ValueInputRenderer", () =>
  jest.fn(() => <div data-testid="ValueInputRenderer" />),
);
jest.mock("../features/AddFilterButton", () =>
  jest.fn(({ handleAddChip }) => (
    <button data-testid="AddFilterButton" onClick={handleAddChip}>
      Add Filter
    </button>
  )),
);
jest.mock("./Chips", () =>
  jest.fn(({ handleKeyDown }) => (
    <div
      data-testid="Chips"
      onKeyDown={(e) => {
        if (e.key === "Delete") handleKeyDown();
      }}
    >
      Chips
    </div>
  )),
);

jest.mock("../hooks/useDropdown", () =>
  jest.fn(() => ({
    closeOtherDropdowns: mockCloseOtherDropdowns,
    handleOperatorSelect: jest.fn(),
    handleKeyDownDropdown: jest.fn(),
  })),
);
jest.mock("../hooks/useFilter", () =>
  jest.fn(() => ({
    handleAddChip: mockHandleAddChip,
    handleDeleteChip: jest.fn(),
    handleValueChange: jest.fn(),
    toggleTagSelection: jest.fn(),
  })),
);
jest.mock("../hooks/useKeyNavigation", () =>
  jest.fn(() => ({
    handleKeyDown: mockHandleKeyDown,
  })),
);
jest.mock("../hooks/useSearch", () =>
  jest.fn(() => ({
    handleColumnChange: mockHandleColumnChange,
    handleOperatorChange: jest.fn(),
    handleColumnSelect: jest.fn(),
  })),
);

describe("Controls Component", () => {
  const mockContextValue = {
    ...contextValue,
    selectedOperator: "=",
  };

  const renderControls = () => {
    render(
      <BrowserRouter>
        <InputContext.Provider value={mockContextValue}>
          <Controls />
        </InputContext.Provider>
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all child components", () => {
    renderControls();

    expect(screen.getByTestId("ColumnInput")).toBeInTheDocument();
    expect(screen.getByTestId("OperatorInput")).toBeInTheDocument();
    expect(screen.getByTestId("ValueInputRenderer")).toBeInTheDocument();
    expect(screen.getByTestId("AddFilterButton")).toBeInTheDocument();
    expect(screen.getByTestId("Chips")).toBeInTheDocument();
  });

  it("calls handleAddChip when Add Filter button is clicked", () => {
    renderControls();

    const addFilterButton = screen.getByTestId("AddFilterButton");
    fireEvent.click(addFilterButton);

    expect(mockHandleAddChip).toHaveBeenCalled();
  });

  it("handles key navigation on Chips", () => {
    renderControls();

    const chips = screen.getByTestId("Chips");
    fireEvent.keyDown(chips, { key: "Delete" });

    expect(mockHandleKeyDown).toHaveBeenCalled();
  });
});
