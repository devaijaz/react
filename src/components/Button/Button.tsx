import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

export interface IButton extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  backgroundColor?: string;
  color?: string;
}

export const Button: FunctionComponent<IButton> = ({ children, backgroundColor, color, style, className, ...props }) => {
  const _style: React.CSSProperties = style || {};
  if (backgroundColor) _style.backgroundColor = backgroundColor;
  if (color) _style.color = color;

  return (
    <button style={_style} {...props}>
      {children}
    </button>
  );
};
