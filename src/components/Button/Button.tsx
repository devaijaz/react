import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import styles from "./Button.module.css";

export interface IButton extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  backgroundColor?: string;
  color?: string;
}

export const Button: FunctionComponent<IButton> = ({ children, backgroundColor, color, style, className, ...props }) => {
  const _style: React.CSSProperties = style || {};
  if (backgroundColor) _style.backgroundColor = backgroundColor;
  if (color) _style.color = color;

  const _className = className ? [className] : [];
  _className.push(styles["button"]);
  return (
    <button style={_style} {...props} className={_className.join(" ")}>
      {children}
    </button>
  );
};
