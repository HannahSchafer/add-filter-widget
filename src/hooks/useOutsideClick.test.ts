import { renderHook } from "@testing-library/react";
import useOutsideClick from "../hooks/useOutsideClick";
import { act } from "@testing-library/react";

describe("useOutsideClick", () => {
  let callback: jest.Mock;
  let container: HTMLElement;

  beforeEach(() => {
    callback = jest.fn();
    container = document.createElement("div");
    container.className = "test-container";
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  it("calls callback when clicking outside the specified element", () => {
    renderHook(() => useOutsideClick(callback));

    act(() => {
      const outsideElement = document.createElement("div");
      outsideElement.className = "outside-element";
      document.body.appendChild(outsideElement);

      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      document.body.removeChild(outsideElement);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call callback when clicking an element with excluded classes", () => {
    renderHook(() => useOutsideClick(callback, ["exclude-class"]));

    act(() => {
      const excludedElement = document.createElement("div");
      excludedElement.className = "exclude-class";
      document.body.appendChild(excludedElement);

      excludedElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      document.body.removeChild(excludedElement);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("handles an invalid callback without throwing an error", () => {
    console.error = jest.fn();

    renderHook(() => useOutsideClick(undefined as unknown as () => void));

    act(() => {
      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);

      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      document.body.removeChild(outsideElement);
    });

    expect(console.error).toHaveBeenCalledWith(
      "useOutsideClick: callback is not a valid function.",
    );
  });

  it("cleans up event listeners on unmount", () => {
    const { unmount } = renderHook(() => useOutsideClick(callback));

    unmount();

    act(() => {
      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);

      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true }),
      );

      document.body.removeChild(outsideElement);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
