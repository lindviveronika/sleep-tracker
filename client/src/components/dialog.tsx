"use client";

import React, { useEffect, useRef } from "react";
import styles from "./dialog.module.css";

export default function Dialog({
  children,
  onClose,
  open = false,
  title,
}: {
  children: React.ReactNode;
  onClose?: Function;
  open?: boolean;
  title: string;
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
      <div className={styles.header}>
        <h2>{title}</h2>
        <button className={styles.closeButton} onClick={handleCloseClick}>
          <svg viewBox="0 0 40 40">
            <path
              d="M 0,0 L 40,40 M 40,0 L 0,40"
              stroke="currentColor"
              strokeWidth="6"
            />
          </svg>
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
}
