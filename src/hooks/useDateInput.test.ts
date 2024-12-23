import { renderHook, act } from "@testing-library/react";
import useDateInput from "../hooks/useDateInput";
import { useInputContext } from "../contexts/InputContext";

jest.mock("../contexts/InputContext", () => ({
  useInputContext: jest.fn(),
}));

describe("useDateInput", () => {
  const setValue = jest.fn();
  const setDateValue = jest.fn();
  const mockContext = {
    state: {
      dateValue: null,
    },
    actions: {
      setValue,
      setDateValue,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useInputContext as jest.Mock).mockReturnValue(mockContext);
  });

  it("returns the current dateValue", () => {
    (useInputContext as jest.Mock).mockReturnValue({
      ...mockContext,
      state: { dateValue: new Date("2023-01-01") },
    });

    const { result } = renderHook(() => useDateInput());
    expect(result.current.dateValue).toEqual(new Date("2023-01-01"));
  });

  it("calls setDateValue and setValue with the correct date when a valid date is passed", () => {
    const { result } = renderHook(() => useDateInput());

    act(() => {
      result.current.handleDateChange(new Date("2023-01-01"));
    });

    expect(setDateValue).toHaveBeenCalledWith(new Date("2023-01-01"));
    expect(setValue).toHaveBeenCalledWith("2023-01-01");
  });

  it("calls setDateValue and setValue with null and an empty string when null is passed", () => {
    const { result } = renderHook(() => useDateInput());

    act(() => {
      result.current.handleDateChange(null);
    });

    expect(setDateValue).toHaveBeenCalledWith(null);
    expect(setValue).toHaveBeenCalledWith("");
  });

  it("does not call setValue or setDateValue unnecessarily when date is null", () => {
    const { result } = renderHook(() => useDateInput());

    act(() => {
      result.current.handleDateChange(null);
    });

    expect(setDateValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(1);
  });

  it("correctly formats the date to ISO string (YYYY-MM-DD) when a valid date is passed", () => {
    const { result } = renderHook(() => useDateInput());

    act(() => {
      result.current.handleDateChange(new Date("2023-06-15T15:45:00Z"));
    });

    expect(setValue).toHaveBeenCalledWith("2023-06-15");
  });
});
