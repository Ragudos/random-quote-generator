import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default" | "outline" | "transparent";
  color: "primary" | "accent" | "secondary" | "monochromatic";
  size: "small" | "medium" | "large" | "icon";
  roundness: "not-round" | "somewhat-round" | "round" | "circle";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, size = "small", variant, roundness, ...props }, ref) => {
    return (
      <button
        className={`${className} ${variant} ${color} ${size} ${roundness}`}
        ref={ref}
        {...props}
      />
    );
  },
);
