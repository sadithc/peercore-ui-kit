import React from "react";
import "./button.scss";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const Button = ({ label, onClick, variant = "primary" }: ButtonProps): React.ReactElement => {
  return (
    <button className={`btn  btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
