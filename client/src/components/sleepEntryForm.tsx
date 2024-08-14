"use client";

import React, { useState } from "react";
import { postRequest } from "../utils/postRequest";
import Button from "./button";
import DateInput from "./dateInput";
import styles from "./sleepEntryForm.module.css";

interface SleepEntryFormData {
  date?: string;
  sleepTime?: string;
  wakeupTime?: string;
}

export default function SleepEntryForm() {
  const [formData, setFormData] = useState<SleepEntryFormData>({
    date: "",
    sleepTime: "",
    wakeupTime: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.values(formData);

    if (values.some((value) => !value)) {
      console.log("Date and time values needs to be provided");
      return;
    }

    postRequest(`${process.env.NEXT_PUBLIC_SERVER_URL}/sleep-entries`, formData)
      .then(() => {
        console.log("successfully submitted");
        resetForm();
      })
      .catch((error) => {
        console.log("something went wrong....", error);
      });
  }

  function resetForm() {
    setFormData({ date: "", sleepTime: "", wakeupTime: "" });
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetForm();
  }

  function createFormDataHandler(inputName: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [inputName]: event.target.value });
  }

  function getSleepDuration() {
    if (Object.values(formData).some((value) => !value)) {
      return "-";
    }

    return "TODO";

    // const date1 = new Date(formData.wokeUpAt).getTime();
    // const date2 = new Date(formData.fellAsleepAt).getTime();
    // const diffInMinutes = (date1 - date2) / (1000 * 60);
    // const minutes = diffInMinutes % 60;
    // const hours = Math.floor(diffInMinutes / 60);

    // if (minutes === 0) {
    //   return `${hours} hours`;
    // }

    // return `${hours} hours and ${minutes} minutes`;
  }

  return (
    <form
      className={styles.sleepEntryForm}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <DateInput
        className={styles.input}
        label="Date"
        onChange={createFormDataHandler("date")}
        required
        value={formData.date}
      />
      <DateInput
        className={styles.input}
        label="Sleep time"
        onChange={createFormDataHandler("sleepTime")}
        required
        type="time"
        value={formData.sleepTime}
      />
      <DateInput
        className={styles.input}
        label="Wakeup time"
        onChange={createFormDataHandler("wakeupTime")}
        required
        type="time"
        value={formData.wakeupTime}
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
