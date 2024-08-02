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
      <button className={styles.closeButton} onClick={handleCloseClick}>
        <svg width="30" height="30" viewBox="0 0 40 40">
          <path
            d="M 10,10 L 30,30 M 30,10 L 10,30"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </button>
      <div className={styles.content}>{children}</div>
    </dialog>
  );
}
