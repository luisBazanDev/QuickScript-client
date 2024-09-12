import React from "react";

interface ButtonProps {
  buttonType: "icon" | "submit" | "primary" | "secondary";
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ buttonType, onClick, className, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-${buttonType} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
