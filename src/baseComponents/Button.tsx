import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", disabled, children, ...props }, ref) => {
    const buttonClass = `${className} ${disabled ? "disabled" : ""}`;

    return (
      <button
        ref={ref}
        className={buttonClass}
        aria-disabled={disabled}
        role="button"
        tabIndex={disabled ? -1 : 0}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
