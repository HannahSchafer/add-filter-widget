import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DefaultInput, { DefaultInputProps } from "./DefaultInput";
import { InputContext } from "../../contexts/InputContext";
import { mockContextValue } from "../../utils/mockData";

describe("DefaultInput Component", () => {
  const mockHandleValueChange = jest.fn();
  const mockHandleKeyDown = jest.fn();
  const mockCloseOtherDropdowns = jest.fn();

  const renderComponent = (props?: Partial<DefaultInputProps>) => {
    render(
      <InputContext.Provider value={mockContextValue}>
        <DefaultInput
          handleValueChange={mockHandleValueChange}
          handleKeyDown={mockHandleKeyDown}
          closeOtherDropdowns={mockCloseOtherDropdowns}
          {...props}
        />
      </InputContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field with correct placeholder", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Enter Value");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("filter-input");
  });

  it("calls handleKeyDown on key down", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Enter Value");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockHandleKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: "Enter" }),
      "value",
    );
  });

  it("calls closeOtherDropdowns on focus", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Enter Value");
    fireEvent.focus(input);
    expect(mockCloseOtherDropdowns).toHaveBeenCalledWith("value");
  });
});
