import React, { useState } from "react";

function EventForm({ addEvent }) {
  const [date, setDate] = useState("");
  const [nextStep, setNextStep] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ Date: date, NextStep: nextStep });
    setDate("");
    setNextStep("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Next Step"
        value={nextStep}
        onChange={(e) => setNextStep(e.target.value)}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
