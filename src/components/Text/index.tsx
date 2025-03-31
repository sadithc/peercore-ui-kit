import React, { JSX } from "react";
import "./style.scss";

type TextProps = {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "default"
    | "body2"
    | "body3"
    | "body4";
  textcase?: "none" | "capitalize" | "lowercase" | "uppercase";
  decor?: "none" | "underline" | "strikethrough";
  alignment?: "left" | "center" | "right" | "justify";
  inline?: boolean;
  children: React.ReactNode;
  className?: string;
};

const Text: React.FC<TextProps> = ({
  variant = "default",
  textcase = "none",
  decor = "none",
  alignment = "left",
  children,
  className = "",
  inline = false,
}) => {
  const Tag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)
    ? (variant as keyof JSX.IntrinsicElements)
    : "span";

  return (
    <Tag
      className={`text-${variant} ${className}`}
      style={{
        textTransform: textcase,
        textDecoration:
          decor === "underline"
            ? "underline"
            : decor === "strikethrough"
            ? "line-through"
            : "none",
        textAlign: alignment as any,
        display: inline?"inline": "block",
      }}
    >
      {children}
    </Tag>
  );
};

export default Text;