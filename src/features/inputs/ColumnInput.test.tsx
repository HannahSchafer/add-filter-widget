import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColumnInput from "./ColumnInput";
import { mockContextValue } from "../../utils/mockData";
import { InputContext } from "../../contexts/InputContext";

const mockHandleColumnChange = jest.fn();
const mockCloseOtherDropdowns = jest.fn();
const mockHandleKeyDown = jest.fn();
const mockHandleKeyDownDropdown = jest.fn();
const mockHandleColumnSelect = jest.fn();

describe("ColumnInput Component", () => {
  const renderComponent = (props = {}) => {
    const dropdownRef = { current: document.createElement("div") };
    render(
      <InputContext.Provider value={mockContextValue}>
        <ColumnInput
          handleColumnChange={mockHandleColumnChange}
          closeOtherDropdowns={mockCloseOtherDropdowns}
          handleKeyDown={mockHandleKeyDown}
          handleKeyDownDropdown={mockHandleKeyDownDropdown}
          handleColumnSelect={mockHandleColumnSelect}
          dropdownRef={dropdownRef}
          {...props}
        />
      </InputContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field with placeholder", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Enter column");
    expect(input).toBeInTheDocument();
  });

  it("calls closeOtherDropdowns on input focus", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Enter column");
    fireEvent.focus(input);
    expect(mockCloseOtherDropdowns).toHaveBeenCalledWith("column");
  });

  it("calls handleKeyDown and handleKeyDownDropdown on key down", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Enter column");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(mockHandleKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: "ArrowDown" }),
      "column",
    );
    expect(mockHandleKeyDownDropdown).toHaveBeenCalledWith(
      expect.objectContaining({ key: "ArrowDown" }),
      "column",
    );
  });
});
