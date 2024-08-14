import { ChangeEventHandler } from "react";
import styles from "./dateInput.module.css";

export default function DateInput({
  className = "",
  label,
  onChange,
  required = false,
  type = "date",
  value,
}: {
  className?: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  type?: string;
  value?: string;
}) {
  return (
    <label className={`${styles.dateInput} ${className}`}>
      <span>{label}</span>
      <input
        onChange={onChange}
        type={type}
        required={required}
        value={value}
      />
    </label>
  );
}
