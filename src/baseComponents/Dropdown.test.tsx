import { render, fireEvent, screen } from "@testing-library/react";
import { FixedSizeList as List } from "react-window";
import Dropdown from "./Dropdown";

interface Item {
  label: string;
}

describe("Dropdown Component", () => {
  const items: Item[] = [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Option 3" },
  ];

  const mockOnHighlight = jest.fn();
  const mockOnSelect = jest.fn();
  const mockGetItemLabel = (item: Item) => item.label;
  const mockDropdownRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing when `show` is false", () => {
    const { container } = render(
      <Dropdown
        items={items}
        show={false}
        highlightedIndex={-1}
        onHighlight={mockOnHighlight}
        onSelect={mockOnSelect}
        getItemLabel={mockGetItemLabel}
        dropdownRef={mockDropdownRef}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders dropdown when `show` is true", () => {
    render(
      <Dropdown
        items={items}
        show={true}
        highlightedIndex={-1}
        onHighlight={mockOnHighlight}
        onSelect={mockOnSelect}
        getItemLabel={mockGetItemLabel}
        dropdownRef={mockDropdownRef}
      />,
    );

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(items.length);
  });

  test("highlights the correct item based on `highlightedIndex`", () => {
    render(
      <Dropdown
        items={items}
        show={true}
        highlightedIndex={1}
        onHighlight={mockOnHighlight}
        onSelect={mockOnSelect}
        getItemLabel={mockGetItemLabel}
        dropdownRef={mockDropdownRef}
      />,
    );

    const highlightedItem = screen.getAllByRole("option")[1];
    expect(highlightedItem).toHaveClass("highlighted");
  });

  test("calls `onHighlight` when an item is hovered", () => {
    render(
      <Dropdown
        items={items}
        show={true}
        highlightedIndex={-1}
        onHighlight={mockOnHighlight}
        onSelect={mockOnSelect}
        getItemLabel={mockGetItemLabel}
        dropdownRef={mockDropdownRef}
      />,
    );

    const itemToHover = screen.getAllByRole("option")[0];
    fireEvent.mouseEnter(itemToHover);

    expect(mockOnHighlight).toHaveBeenCalledWith(0);
  });

  test("renders custom `renderItem` if provided", () => {
    const mockRenderItem = jest.fn((item: Item, isHighlighted: boolean) => (
      <div>{isHighlighted ? `Highlighted: ${item.label}` : item.label}</div>
    ));

    render(
      <Dropdown
        items={items}
        show={true}
        highlightedIndex={0}
        onHighlight={mockOnHighlight}
        onSelect={mockOnSelect}
        getItemLabel={mockGetItemLabel}
        dropdownRef={mockDropdownRef}
        renderItem={mockRenderItem}
      />,
    );

    expect(mockRenderItem).toHaveBeenCalledTimes(items.length);
    expect(screen.getByText("Highlighted: Option 1")).toBeInTheDocument();
  });

  test("virtualization limits the number of rendered items", () => {
    const largeItems = Array.from({ length: 1000 }, (_, index) => ({
      label: `Option ${index + 1}`,
    }));

    render(
      <Dropdown
        items={largeItems}
        show={true}
        highlightedIndex={-1}
        onHighlight={mockOnHighlight}
        onSelect={mockOnSelect}
        getItemLabel={(item) => item.label}
        dropdownRef={mockDropdownRef}
      />,
    );

    const renderedItems = screen.getAllByRole("option");
    expect(renderedItems.length).toBeLessThan(1000);

    expect(List).toBeDefined();
  });
});
