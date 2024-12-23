import React from "react";
import { FixedSizeList as List } from "react-window";
import "./Dropdown.css";

interface DropdownProps<T> {
  items: T[];
  show: boolean;
  highlightedIndex: number;
  onHighlight: (index: number) => void;
  onSelect: (item: T) => void;
  getItemLabel: (item: T) => string;
  dropdownRef: React.RefObject<HTMLDivElement>;
  renderItem?: (item: T, isHighlighted: boolean) => React.ReactNode;
}

const ITEM_HEIGHT = 35;
const DROPDOWN_HEIGHT = 200;

const Dropdown = <T,>({
  items,
  show,
  highlightedIndex,
  onHighlight,
  onSelect,
  getItemLabel,
  dropdownRef,
  renderItem,
}: DropdownProps<T>) => {
  if (!show) return null;

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = items[index];
    const isHighlighted = index === highlightedIndex;

    return (
      <div
        key={getItemLabel(item)}
        style={style}
        role="option"
        aria-selected={isHighlighted}
        tabIndex={-1}
        className={`dropdown-item ${isHighlighted ? "highlighted" : ""}`}
        onMouseEnter={() => onHighlight(index)}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={() => {
          onSelect(item);
        }}
      >
        {renderItem ? renderItem(item, isHighlighted) : getItemLabel(item)}
      </div>
    );
  };

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      role="listbox"
      aria-label="Dropdown menu"
      tabIndex={-1}
      style={{ maxHeight: DROPDOWN_HEIGHT, overflowY: "auto" }}
    >
      <List
        height={Math.min(items.length * ITEM_HEIGHT, DROPDOWN_HEIGHT)}
        itemCount={items.length}
        itemSize={ITEM_HEIGHT}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default Dropdown;
