import React from "react";
import styles from "./page.module.css";
import SleepEntryForm from "../components/sleepEntryForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Daily sleep tracker</h1>
      <SleepEntryForm />
    </main>
  );
}
