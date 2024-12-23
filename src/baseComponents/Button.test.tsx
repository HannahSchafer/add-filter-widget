import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders correctly", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("handles click events", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
