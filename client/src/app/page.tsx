"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SleepEntryForm from "../components/sleepEntryForm";
import Dialog from "@/components/dialog";

export default function Home() {
  const [showNewEntryDialog, setShowNewEntryDialog] = useState(false);

  function handleNewEntryClick() {
    setShowNewEntryDialog(true);
  }

  function handleCloseNewEntryDialog() {
    setShowNewEntryDialog(false);
  }

  return (
    <main className={styles.main}>
      <span className={styles.moon}>🌙</span>
      <h1>Daily sleep tracker</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis
        fuga vero fugit quod? In nulla deleniti nemo laboriosam alias
        repudiandae? Commodi temporibus quibusdam eos repellat dicta provident
        unde aliquam et.
      </p>
      <Dialog onClose={handleCloseNewEntryDialog} open={showNewEntryDialog}>
        <SleepEntryForm />
      </Dialog>
      <button className={styles.primaryButton} onClick={handleNewEntryClick}>
        New entry
      </button>
    </main>
  );
}
