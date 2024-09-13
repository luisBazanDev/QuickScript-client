import React from 'react';

interface ButtonProps {
  buttonType: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ buttonType, onClick, children }) => {
  const baseClasses = 'w-full p-3 rounded-lg font-semibold transition-all group active:scale-95 hover:scale-105 flex items-center justify-center';
  const typeClasses = buttonType === 'primary'
    ? 'bg-quickscript_gray hover:bg-opacity-50 text-gray-900 hover:bg-quickscript_green'
    : 'bg-secondary-color hover:bg-secondary-hover-color text-secondary-text-color';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${typeClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;