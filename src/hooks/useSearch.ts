import { useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { COLUMN_CONFIG } from "../config";
import { useInputContext } from "../contexts/InputContext";

const useSearch = () => {
  const {
    state: { columnSearchTerm, selectedOperator, value },
    actions: {
      setColumnSearchTerm,
      setSelectedOperator,
      setShowColumnsDropdown,
      setMatchingColumns,
      setShowOperatorsDropdown,
      setHighlightedIndex,
      setFilteredTags,
    },
    currentColumn,
  } = useInputContext();

  const fuse = useMemo(
    () => new Fuse(COLUMN_CONFIG, { keys: ["label"], threshold: 0.4 }),
    [],
  );

  useEffect(() => {
    if (columnSearchTerm === "") {
      setMatchingColumns(COLUMN_CONFIG);
    } else {
      const results = fuse.search(columnSearchTerm);
      setMatchingColumns(results.map((result) => result.item));
    }
  }, [columnSearchTerm, fuse]);

  useEffect(() => {
    if (currentColumn?.type === "tags" && currentColumn.options) {
      const tagFuse = new Fuse(currentColumn.options, { threshold: 0.4 });
      if (typeof value === "string" && value.trim()) {
        const results = tagFuse.search(value.trim());
        setFilteredTags(results.map((result) => result.item));
      } else {
        setFilteredTags(currentColumn.options);
      }
    }
  }, [currentColumn, value]);

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnSearchTerm(e.target.value);
    setShowColumnsDropdown(true);
    setShowOperatorsDropdown(false);
    setHighlightedIndex(0);
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nativeEvent = e.nativeEvent as InputEvent;
    if (selectedOperator && nativeEvent.inputType === "deleteContentBackward") {
      setSelectedOperator("");
      setShowOperatorsDropdown(true);
    }
  };

  return {
    handleColumnChange,
    handleOperatorChange,
  };
};

export default useSearch;
