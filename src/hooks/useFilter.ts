import { useCallback, useEffect } from "react";
import { useInputContext } from "../contexts/InputContext";
import { useSearchParams } from "react-router-dom";
import { Chip } from "../types";

const useFilter = () => {
  const {
    state: { value, chips, selectedColumn, selectedOperator },
    actions: {
      setSelectedColumn,
      setSelectedOperator,
      setValue,
      setColumnSearchTerm,
      setChips,
      setFilteredTags,
      setShowColumnsDropdown,
      addChip,
    },
    refs: { chipsRefs, operatorInputRef },
    currentColumn,
  } = useInputContext();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (chipsRefs.current) {
      chipsRefs.current.length = chips.length;
    }
  }, [chips, chipsRefs]);

  useEffect(() => {
    if (chips.length > 0) {
      const lastChipIndex = chips.length - 1;
      const lastChip = chipsRefs.current![lastChipIndex];
      if (lastChip) {
        lastChip.focus();
      }
    }
  }, [chips]);

  // Sync query params with chip state on page load
  useEffect(() => {
    const keys = [...searchParams.keys()];
    const uniqueKeys = Array.from(new Set(keys));

    const loadedChips = uniqueKeys.flatMap((key) =>
      searchParams.getAll(key).map((value) => ({
        column: key,
        operator: "=",
        value,
      })),
    );

    if (JSON.stringify(loadedChips) !== JSON.stringify(chips)) {
      setChips(loadedChips);
    }
  }, [searchParams, chips]);

  const handleColumnSelect = (column: { id: string; label: string }) => {
    setSelectedColumn(column.label);
    setColumnSearchTerm(column.label);
    setShowColumnsDropdown(false);
    operatorInputRef.current?.focus();
  };

  const handleValueOptionSelect = (option: string) => {
    if (currentColumn?.type === "tags") {
      const isArray = Array.isArray(value);
      const updatedTags = isArray
        ? value.includes(option)
          ? value.filter((tag) => tag !== option)
          : [...value, option]
        : [option];
      setValue(updatedTags);
    } else {
      setValue(option);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (currentColumn?.type === "number") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setValue(value);
  };

  const handleAddChip = useCallback(() => {
    if (selectedColumn && selectedOperator && value) {
      const formattedValue = Array.isArray(value) ? value.join(" | ") : value;

      addChip({
        column: selectedColumn,
        operator: selectedOperator,
        value: formattedValue,
      });

      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.append(selectedColumn, formattedValue);
      setSearchParams(updatedSearchParams);

      setSelectedColumn("");
      setColumnSearchTerm("");
      setSelectedOperator("");
      setValue("");
    }
  }, [
    selectedColumn,
    selectedOperator,
    value,
    addChip,
    searchParams,
    setSearchParams,
    setSelectedColumn,
    setColumnSearchTerm,
    setSelectedOperator,
    setValue,
  ]);

  const handleDeleteChip = useCallback(
    (index: number) => {
      const chipToDelete = chips[index];
      if (!chipToDelete) return;

      const updatedChips = chips.filter(
        (_: Chip, chipIndex: number) => chipIndex !== index,
      );
      setChips(updatedChips);

      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      const existingValues =
        updatedSearchParams.get(chipToDelete.column)?.split(",") || [];
      const newValues = existingValues.filter(
        (value) => value !== chipToDelete.value,
      );

      if (newValues.length > 0) {
        updatedSearchParams.set(chipToDelete.column, newValues.join(","));
      } else {
        updatedSearchParams.delete(chipToDelete.column);
      }

      setSearchParams(updatedSearchParams);
    },
    [chips, searchParams, setChips, setSearchParams],
  );

  const toggleTagSelection = (tag: string) => {
    let updatedValue;
    if (Array.isArray(value)) {
      updatedValue = value.includes(tag)
        ? value.filter((t) => t !== tag)
        : [...value, tag];
    } else {
      updatedValue = [tag];
    }
    setValue(updatedValue);

    if (currentColumn?.type === "tags" && currentColumn.options) {
      setFilteredTags(currentColumn.options);
    }
  };

  return {
    handleAddChip,
    handleDeleteChip,
    handleColumnSelect,
    handleValueOptionSelect,
    handleValueChange,
    toggleTagSelection,
    setSearchParams,
    searchParams,
  };
};

export default useFilter;
