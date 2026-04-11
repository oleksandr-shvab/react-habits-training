import React from "react";

import { Button } from "./ui/button";
import { useHabits } from "../context/HabitsContext";

function AddHabitForm() {
  const { addHabit } = useHabits();
  const [habit, setHabit] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addHabit(habit);
    setHabit("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end mt-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="habit" className="text-base font-medium text-gray-700">
          Habit:
        </label>
        <input
          id="habit"
          ref={inputRef}
          value={habit}
          onChange={(event) => setHabit(event.target.value)}
          className="text-base border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <Button type="submit" className="text-base px-5 py-2">
        Add
      </Button>
    </form>
  );
}

export default AddHabitForm;
