import { ChangeEventHandler } from "react";
import styles from "./dateInput.module.css";

export default function DateInput({
  className = "",
  label,
  onChange,
  required = false,
  value,
}: {
  className?: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  value?: string;
}) {
  return (
    <label className={`${styles.dateInput} ${className}`}>
      <span>{label}</span>
      <input
        onChange={onChange}
        type="datetime-local"
        required={required}
        value={value}
      />
    </label>
  );
}
