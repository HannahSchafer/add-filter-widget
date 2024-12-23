import { render, screen, fireEvent } from "@testing-library/react";
import MultiSelectItem, { MultiSelectItemProps } from "./MultiSelect";

describe("MultiSelectItem Component", () => {
  const mockOnSelect = jest.fn();
  const defaultProps: MultiSelectItemProps = {
    option: "Option 1",
    isHighlighted: false,
    isSelected: false,
    onSelect: mockOnSelect,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with default props", () => {
    render(<MultiSelectItem {...defaultProps} />);
    const optionElement = screen.getByText("Option 1");

    expect(optionElement).toBeInTheDocument();
    expect(optionElement).toHaveAttribute("role", "option");
    expect(optionElement).not.toHaveClass("highlighted");
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("applies the highlighted class when `isHighlighted` is true", () => {
    render(<MultiSelectItem {...defaultProps} isHighlighted={true} />);
    const optionElement = screen.getByText("Option 1");

    expect(optionElement).toHaveClass("highlighted");
  });

  test("marks the checkbox as checked when `isSelected` is true", () => {
    render(<MultiSelectItem {...defaultProps} isSelected={true} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });

  test("calls `onSelect` with the correct option when clicked", () => {
    render(<MultiSelectItem {...defaultProps} />);
    const optionElement = screen.getByText("Option 1");

    fireEvent.click(optionElement);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("Option 1");
  });

  test("renders a checkbox with correct `aria-checked` value", () => {
    render(<MultiSelectItem {...defaultProps} isSelected={true} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  test("handles multiple options without conflicts", () => {
    render(
      <>
        <MultiSelectItem {...defaultProps} option="Option 1" />
        <MultiSelectItem {...defaultProps} option="Option 2" />
      </>,
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
