"use client";

import React, { useEffect, useRef } from "react";
import styles from "./dialog.module.css";

export default function Dialog({
  children,
  onClose,
  open = false,
}: {
  children: React.ReactNode;
  onClose?: Function;
  open?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (open) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [open]);

  function handleCloseClick() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <dialog className={styles.dialog} ref={ref}>
      <button onClick={handleCloseClick}>Close dialog</button>
      {children}
    </dialog>
  );
}
