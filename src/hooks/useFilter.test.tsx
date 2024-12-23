import { renderHook, act } from "@testing-library/react";
import { useInputContext } from "../contexts/InputContext";
import { useSearchParams } from "react-router-dom";
import useFilter from "../hooks/useFilter";
import { Chip } from "../types";
import { ChangeEvent } from "react";

jest.mock("../contexts/InputContext", () => ({
  useInputContext: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

describe("useFilter", () => {
  const mockSetSearchParams = jest.fn();
  const mockSetValue = jest.fn();
  const mockSetSelectedColumn = jest.fn();
  const mockSetSelectedOperator = jest.fn();
  const mockSetChips = jest.fn();
  const mockSetColumnSearchTerm = jest.fn();
  const mockSetShowColumnsDropdown = jest.fn();
  const mockAddChip = jest.fn();
  const mockSetFilteredTags = jest.fn();

  const mockInputContext = {
    state: {
      value: "" as string | string[],
      chips: [] as Chip[],
      selectedColumn: "",
      selectedOperator: "",
    },
    actions: {
      setSelectedColumn: mockSetSelectedColumn,
      setSelectedOperator: mockSetSelectedOperator,
      setValue: mockSetValue,
      setColumnSearchTerm: mockSetColumnSearchTerm,
      setChips: mockSetChips,
      setShowColumnsDropdown: mockSetShowColumnsDropdown,
      addChip: mockAddChip,
      setFilteredTags: mockSetFilteredTags,
    },
    refs: {
      chipsRefs: { current: [] },
      operatorInputRef: { current: document.createElement("input") },
    },
    currentColumn: { type: "tags", options: ["Tag1", "Tag2", "Tag3"] },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useInputContext as jest.Mock).mockReturnValue(mockInputContext);
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
  });

  it("handles column selection", () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.handleColumnSelect({ id: "1", label: "Column1" });
    });

    expect(mockSetSelectedColumn).toHaveBeenCalledWith("Column1");
    expect(mockSetColumnSearchTerm).toHaveBeenCalledWith("Column1");
    expect(mockSetShowColumnsDropdown).toHaveBeenCalledWith(false);
  });

  it("handles value option selection for tags", () => {
    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.handleValueOptionSelect("Tag1");
    });

    expect(mockSetValue).toHaveBeenCalledWith(["Tag1"]);
  });

  it("toggles tag selection", () => {
    mockInputContext.state.value = ["Tag1"];

    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.toggleTagSelection("Tag2");
    });

    expect(mockSetValue).toHaveBeenCalledWith(["Tag1", "Tag2"]);
  });

  it("handles adding a chip", () => {
    mockInputContext.state.selectedColumn = "Column1";
    mockInputContext.state.selectedOperator = "=";
    mockInputContext.state.value = "Value1";

    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.handleAddChip();
    });

    expect(mockAddChip).toHaveBeenCalledWith({
      column: "Column1",
      operator: "=",
      value: "Value1",
    });
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams),
    );
    expect(mockSetSelectedColumn).toHaveBeenCalledWith("");
    expect(mockSetSelectedOperator).toHaveBeenCalledWith("");
    expect(mockSetValue).toHaveBeenCalledWith("");
  });

  it("handles deleting a chip", () => {
    mockInputContext.state.chips = [
      { column: "Column1", operator: "=", value: "Value1" },
    ];

    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.handleDeleteChip(0);
    });

    expect(mockSetChips).toHaveBeenCalledWith([]);
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams),
    );
  });

  it("handles deleting a chip", () => {
    mockInputContext.state.chips = [
      { column: "Column1", operator: "=", value: "Value1" },
    ];

    const { result } = renderHook(() => useFilter());

    act(() => {
      result.current.handleDeleteChip(0);
    });

    expect(mockSetChips).toHaveBeenCalledWith([]);
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams),
    );
  });

  it("ignores invalid number inputs", () => {
    mockInputContext.currentColumn = { type: "number", options: [] };

    const { result } = renderHook(() => useFilter());

    const mockEvent: ChangeEvent<HTMLInputElement> = {
      target: { value: "123abc" } as HTMLInputElement,
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleValueChange(mockEvent);
    });

    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
