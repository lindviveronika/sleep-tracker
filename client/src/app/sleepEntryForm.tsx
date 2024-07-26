"use client";

import React, { useState } from "react";

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

    const response = await fetch("http://localhost:8080/sleep-entries", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("successfully submitted");
    } else {
      console.log("something went wrong....");
    }
  }

  function handleSleepStartTimeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({ ...formData, fellAsleepAt: event.target.value });
  }

  function handleSleepEndTimeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormData({ ...formData, wokeUpAt: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Fell asleep at:</span>
        <input
          onChange={handleSleepStartTimeChange}
          type="datetime-local"
          required
          value={formData.fellAsleepAt}
        />
      </label>
      <label>
        <span>Woke up at:</span>
        <input
          onChange={handleSleepEndTimeChange}
          type="datetime-local"
          required
          value={formData.wokeUpAt}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
