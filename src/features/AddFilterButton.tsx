import Button from "../baseComponents/Button";
import { useInputContext } from "../contexts/InputContext";
import "./AddFilterButton.css";

const AddFilterButton: React.FC<{
  handleAddChip: () => void;
  handleKeyDown: (e: React.KeyboardEvent, field: string) => void;
}> = ({ handleAddChip, handleKeyDown }) => {
  const {
    refs: { addFilterButtonRef },
    isAddFilterDisabled,
  } = useInputContext();
  return (
    <Button
      ref={addFilterButtonRef}
      disabled={isAddFilterDisabled}
      className="add-filter-button"
      onClick={handleAddChip}
      onKeyDown={(e) => handleKeyDown(e, "addFilterButton")}
      aria-disabled={isAddFilterDisabled}
      aria-label="Add Filter"
    >
      Add Filter
    </Button>
  );
};

export default AddFilterButton;
