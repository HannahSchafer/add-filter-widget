import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateInput, { DateInputProps } from "./DateInput";
import { InputContext } from "../../contexts/InputContext";
import { mockContextValue } from "../../utils/mockData";

const mockHandleDateChange = jest.fn();
const mockHandleKeyDown = jest.fn();

describe("DateInput Component", () => {
  const renderComponent = (props: Partial<DateInputProps> = {}) => {
    render(
      <InputContext.Provider value={mockContextValue}>
        <DateInput
          handleDateChange={mockHandleDateChange}
          handleKeyDown={mockHandleKeyDown}
          {...props}
        />
      </InputContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the date input with placeholder", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Select a date");
    expect(input).toBeInTheDocument();
  });

  it("calls handleKeyDown on key down event", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Select a date");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockHandleKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: "Enter" }),
      "value",
    );
  });
});
