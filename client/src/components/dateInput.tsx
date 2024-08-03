import { ChangeEventHandler } from "react";
import styles from "./dateInput.module.css";

export default function DateInput({
  label,
  onChange,
  required = false,
  value,
}: {
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  value?: string;
}) {
  return (
    <label className={styles.dateInput}>
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
