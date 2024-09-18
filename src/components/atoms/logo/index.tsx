import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";

interface LogoProps {
  logoType: "primary" | "secondary";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ logoType, className }) => {
  const baseClasses = "flex items-center";
  const typeClasses =
    logoType === "primary"
      ? "text-6xl pl-8 mt-0 text-quickscript_green select-none"
      : "text-xl pl-2 mt-1 text-quickscript_green select-none";

  const headingClasses =
    logoType === "primary"
      ? "text-6xl font-bold text-quickscript_white mb-4 pl-4 text-center select-none"
      : "text-xl font-bold text-quickscript_white mb-0 pl-2 text-left select-none";

  return (
    <div className={`${baseClasses} ${className}`}>
      <FontAwesomeIcon icon={faKeyboard} className={typeClasses} />
      <h2 className={headingClasses}>QuickScript</h2>
    </div>
  );
};

export default Logo;
