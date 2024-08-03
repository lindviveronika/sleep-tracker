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

  function handleFellAsleepAtChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({ ...formData, fellAsleepAt: event.target.value });
  }

  function handleWokeUpAtChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, wokeUpAt: event.target.value });
  }

  return (
    <form className={styles.sleepEntryForm} onSubmit={handleSubmit}>
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
      <Button className={styles.submitButton} type="submit">
        Submit
      </Button>
    </form>
  );
}
