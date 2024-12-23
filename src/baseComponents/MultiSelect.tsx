import React from "react";

export interface MultiSelectItemProps {
  option: string;
  isHighlighted: boolean;
  isSelected: boolean;
  onSelect: (option: string) => void;
}

const MultiSelectItem: React.FC<MultiSelectItemProps> = ({
  option,
  isHighlighted,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`dropdown-option ${isHighlighted ? "highlighted" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(option);
      }}
      role="option"
      aria-selected={isHighlighted}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        aria-checked={isSelected}
      />
      {option}
    </div>
  );
};

export default MultiSelectItem;
