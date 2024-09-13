import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

interface LogoProps {
  logoType: "primary" | "secondary";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ logoType, className }) => {
  const baseClasses = "flex items-center";
  const typeClasses =
    logoType === "primary"
      ? "text-6xl pl-8 mt-0 text-quickscript_green"
      : "text-xl pl-2 mt-1 text-quickscript_green";

  const headingClasses =
    logoType === "primary"
      ? "text-6xl font-bold text-quickscript_white mb-4 pl-4 text-center"
      : "text-xl font-bold text-quickscript_white mb-0 pl-2 text-left";

  return (
    <div className={`${baseClasses} ${className}`}>
      <FontAwesomeIcon icon={faKeyboard} className={typeClasses} />
      <h2 className={headingClasses}>QuickScript</h2>
    </div>
  );
};

export default Logo;
