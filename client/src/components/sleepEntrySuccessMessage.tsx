"use client";

import Button from "./button";
import styles from "./sleepEntrySuccessMessage.module.css";

export default function SleepEntrySuccessMessage({
  onClose,
}: {
  onClose: Function;
}) {
  function handleCloseClick() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <div className={styles.message}>
      <h2 className={styles.title}>🎉</h2>
      <p>Your new entry has been submitted sucessfully!</p>
      <Button onClick={handleCloseClick} className={styles.closeButton}>
        Close
      </Button>
    </div>
  );
}
