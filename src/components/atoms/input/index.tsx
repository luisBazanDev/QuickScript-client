import React from "react";

interface InputProps {
  placeholder: string;
  className?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
