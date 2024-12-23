import { render, screen, fireEvent } from "@testing-library/react";
import BooleanInput from "./BooleanInput";
import { useInputContext } from "../../contexts/InputContext";
import Dropdown from "../../baseComponents/Dropdown";
import { mockContextValue } from "../../utils/mockData";

jest.mock("../../baseComponents/Dropdown", () => {
  return jest.fn(() => <div data-testid="mock-dropdown" />);
});

jest.mock("../../contexts/InputContext", () => ({
  useInputContext: jest.fn(),
}));

describe("BooleanInput", () => {
  const closeOtherDropdowns = jest.fn();
  const handleKeyDown = jest.fn();
  const handleKeyDownDropdown = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useInputContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  it("renders the input field and dropdown", () => {
    render(
      <BooleanInput
        closeOtherDropdowns={closeOtherDropdowns}
        handleKeyDown={handleKeyDown}
        handleKeyDownDropdown={handleKeyDownDropdown}
      />,
    );

    expect(screen.getByPlaceholderText("Enter Value")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown")).toBeInTheDocument();
  });

  it("shows the dropdown when input is focused", () => {
    render(
      <BooleanInput
        closeOtherDropdowns={closeOtherDropdowns}
        handleKeyDown={handleKeyDown}
        handleKeyDownDropdown={handleKeyDownDropdown}
      />,
    );

    const input = screen.getByPlaceholderText("Enter Value");
    fireEvent.focus(input);

    expect(closeOtherDropdowns).toHaveBeenCalledWith("value");
    expect(mockContextValue.actions.setShowValueDropdown).toHaveBeenCalledWith(
      true,
    );
  });

  it("handles keydown events", () => {
    render(
      <BooleanInput
        closeOtherDropdowns={closeOtherDropdowns}
        handleKeyDown={handleKeyDown}
        handleKeyDownDropdown={handleKeyDownDropdown}
      />,
    );

    const input = screen.getByPlaceholderText("Enter Value");
    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(handleKeyDown).toHaveBeenCalledWith(expect.any(Object), "value");
    expect(handleKeyDownDropdown).toHaveBeenCalledWith(
      expect.any(Object),
      "value",
    );
  });

  it("passes correct props to the Dropdown component", () => {
    render(
      <BooleanInput
        closeOtherDropdowns={closeOtherDropdowns}
        handleKeyDown={handleKeyDown}
        handleKeyDownDropdown={handleKeyDownDropdown}
      />,
    );

    expect(Dropdown).toHaveBeenCalledWith(
      expect.objectContaining({
        items: ["True", "False"],
        show: mockContextValue.state.showValueDropdown,
        highlightedIndex: mockContextValue.state.highlightedIndex,
        onHighlight: mockContextValue.actions.setHighlightedIndex,
        onSelect: mockContextValue.actions.setValue,
        dropdownRef: expect.any(Object),
      }),
      {},
    );
  });

  it("updates the input value when a dropdown item is selected", () => {
    render(
      <BooleanInput
        closeOtherDropdowns={closeOtherDropdowns}
        handleKeyDown={handleKeyDown}
        handleKeyDownDropdown={handleKeyDownDropdown}
      />,
    );

    const input = screen.getByPlaceholderText("Enter Value");

    fireEvent.focus(input);
    mockContextValue.actions.setValue("True");

    expect(mockContextValue.actions.setValue).toHaveBeenCalledWith("True");
  });
});
