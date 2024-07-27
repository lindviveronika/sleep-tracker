"use client";

import React, { useState } from "react";
import hasValidDateOrders from "./hasValidDateOrders";

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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/sleep-entries`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log("successfully submitted");
    } else {
      console.log("something went wrong....");
    }
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
    <form onSubmit={handleSubmit}>
      <label>
        <span>Fell asleep at:</span>
        <input
          onChange={handleFellAsleepAtChange}
          type="datetime-local"
          required
          value={formData.fellAsleepAt}
        />
      </label>
      <label>
        <span>Woke up at:</span>
        <input
          onChange={handleWokeUpAtChange}
          type="datetime-local"
          required
          value={formData.wokeUpAt}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
