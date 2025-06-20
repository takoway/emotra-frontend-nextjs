import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  fullWidth = false,
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 focus:ring-cyan-500 shadow-sm hover:shadow-md",
    secondary: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 focus:ring-cyan-500 border border-cyan-300",
    outline: "border border-cyan-300 text-cyan-700 hover:bg-cyan-50 focus:ring-cyan-500 bg-white",
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabledClass,
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}; 