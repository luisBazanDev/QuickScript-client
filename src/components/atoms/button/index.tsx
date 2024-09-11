import React from "react";

function Button({
  children,
  onClick,
  buttonType,
}: {
  children: React.ReactNode;
  onClick: () => void;
  buttonType: "icon" | "submit" | "primary" | "secondary";
}) {
  const type = {
    icon: "button-icon",
    submit: "button-submit",
    primary: "button-primary",
    secondary: "button-secondary",
  };

  return <div className={`${type}`}>{children}</div>;
}

export default Button;
