import React from "react";
import "./button.scss";
import { Icon } from "@iconify/react";

export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: string;
  iconPos?: "left" | "right";
  disabled?: boolean;
  className?: string;
}

const Button = ({ label, onClick, variant = "primary", icon, iconPos = "left", disabled = false, className = "" }: ButtonProps): React.ReactElement => {

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <button className={`btn  btn-${variant}  ${disabled ? "disabled" : ""} ${className}`} onClick={handleClick} disabled={disabled}>
      <div style={{ display: "flex", alignItems: "center" }}>{icon && iconPos === "left" && (<><Icon icon={icon} /> </>)} {label} {icon && iconPos === "right" && (<><Icon icon={icon} /> </>)}  </div>
    </button>
  );
};

export default Button;
