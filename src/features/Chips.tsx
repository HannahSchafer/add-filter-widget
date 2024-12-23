import React from "react";
import { useInputContext } from "../contexts/InputContext";
import { Chip } from "../types";
import "./Chips.css";

interface ChipsProps {
  handleKeyDown: (e: React.KeyboardEvent, currentField: string) => void;
  handleDeleteChip: (index: number) => void;
}

const Chips: React.FC<ChipsProps> = ({ handleKeyDown, handleDeleteChip }) => {
  const {
    state: { chips },
    refs: { chipsRefs },
  } = useInputContext();
  return (
    <div
      className="chips-container"
      role="list" // Adds semantic meaning for screen readers
      aria-label="Selected filters"
    >
      {" "}
      {chips.map((chip: Chip, index: number) => (
        <div
          key={index}
          id={`chip-${index}`}
          ref={(el) => {
            if (el) {
              chipsRefs.current![index] = el;
            }
          }}
          className="chip"
          tabIndex={0}
          onFocus={(e) => e.currentTarget.classList.add("hover")}
          onBlur={(e) => e.currentTarget.classList.remove("hover")}
          onKeyDown={(e) => handleKeyDown(e, `chip-${index}`)}
          role="listitem"
          aria-label={`Filter: ${chip.column} ${chip.operator} ${chip.value}`}
        >
          <div>
            {chip.column} {chip.operator} {chip.value}
          </div>
          <button
            aria-label={`Delete filter ${chip.column} ${chip.operator} ${chip.value}`}
            className="chip-delete"
            onClick={() => handleDeleteChip(index)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Chips;
