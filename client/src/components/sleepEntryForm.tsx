"use client";

import React, { useState } from "react";
import hasValidDateOrders from "../utils/hasValidDateOrders";
import { postRequest } from "../utils/postRequest";
import Button from "./button";
import DateInput from "./dateInput";
import styles from "./sleepEntryForm.module.css";

interface SleepEntryFormData {
  fellAsleepAt?: string;
  wokeUpAt?: string;
}

export default function SleepEntryForm() {
  const [formData, setFormData] = useState<SleepEntryFormData>({
    fellAsleepAt: "",
    wokeUpAt: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.fellAsleepAt || !formData.wokeUpAt) {
      console.log("dates needs to be provided");
      return;
    }

    if (!hasValidDateOrders(formData.fellAsleepAt, formData.wokeUpAt)) {
      console.log("woke up time needs to be after fell asleep time");
      return;
    }

    postRequest(`${process.env.NEXT_PUBLIC_SERVER_URL}/sleep-entries`, formData)
      .then(() => {
        console.log("successfully submitted");
      })
      .catch((error) => {
        console.log("something went wrong....", error);
      });
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormData({ fellAsleepAt: "", wokeUpAt: "" });
  }

  function handleFellAsleepAtChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({ ...formData, fellAsleepAt: event.target.value });
  }

  function handleWokeUpAtChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, wokeUpAt: event.target.value });
  }

  function getSleepDuration() {
    if (!formData.wokeUpAt || !formData.fellAsleepAt) {
      return "-";
    }

    const date1 = new Date(formData.wokeUpAt).getTime();
    const date2 = new Date(formData.fellAsleepAt).getTime();
    const diffInMinutes = (date1 - date2) / (1000 * 60);
    const minutes = diffInMinutes % 60;
    const hours = Math.floor(diffInMinutes / 60);

    if (minutes === 0) {
      return `${hours} hours`;
    }

    return `${hours} hours and ${minutes} minutes`;
  }

  return (
    <form
      className={styles.sleepEntryForm}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <DateInput
        className={styles.input}
        label="Sleep time"
        onChange={handleFellAsleepAtChange}
        required
        value={formData.fellAsleepAt}
      />
      <DateInput
        className={styles.input}
        label="Wakeup time"
        onChange={handleWokeUpAtChange}
        required
        value={formData.wokeUpAt}
      />
      <div className={styles.info}>Sleep duration: {getSleepDuration()}</div>
      <div className={styles.actions}>
        <Button className={styles.submitButton} type="submit">
          Submit
        </Button>
        <input className={styles.resetButton} type="reset" value="Reset" />
      </div>
    </form>
  );
}
