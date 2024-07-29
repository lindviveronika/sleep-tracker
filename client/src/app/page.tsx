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
      <h1>Daily sleep tracker</h1>
      <Dialog onClose={handleCloseNewEntryDialog} open={showNewEntryDialog}>
        <SleepEntryForm />
      </Dialog>
      <button onClick={handleNewEntryClick}>New entry</button>
    </main>
  );
}
