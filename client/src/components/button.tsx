import React, { MouseEventHandler } from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  className = "",
  type,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`${className} ${styles.button}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
