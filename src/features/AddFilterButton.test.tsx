import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddFilterButton from "./AddFilterButton";
import { InputContext } from "../contexts/InputContext";
import { mockContextValue } from "../utils/mockData";

jest.mock("../baseComponents/Button", () =>
  jest.fn(({ children, ...props }) => <button {...props}>{children}</button>),
);

describe("AddFilterButton Component", () => {
  const handleAddChip = jest.fn();
  const handleKeyDown = jest.fn();

  const renderComponent = (isAddFilterDisabled: boolean) => {
    render(
      <InputContext.Provider
        value={{ ...mockContextValue, isAddFilterDisabled }}
      >
        <AddFilterButton
          handleAddChip={handleAddChip}
          handleKeyDown={handleKeyDown}
        />
      </InputContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the button with 'Add Filter' text", () => {
    renderComponent(false);

    const button = screen.getByRole("button", { name: "Add Filter" });
    expect(button).toBeInTheDocument();
  });

  it("is disabled when 'isAddFilterDisabled' is true", () => {
    renderComponent(true);

    const button = screen.getByRole("button", { name: "Add Filter" });
    expect(button).toBeDisabled();
  });

  it("is enabled when 'isAddFilterDisabled' is false", () => {
    renderComponent(false);

    const button = screen.getByRole("button", { name: "Add Filter" });
    expect(button).not.toBeDisabled();
  });

  it("calls 'handleAddChip' when the button is clicked", () => {
    renderComponent(false);

    const button = screen.getByRole("button", { name: "Add Filter" });
    fireEvent.click(button);

    expect(handleAddChip).toHaveBeenCalledTimes(1);
  });

  it("calls 'handleKeyDown' with correct arguments on key down", () => {
    renderComponent(false);

    const button = screen.getByRole("button", { name: "Add Filter" });
    fireEvent.keyDown(button, { key: "Enter" });

    expect(handleKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: "Enter" }),
      "addFilterButton",
    );
  });
});
