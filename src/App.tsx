import "./index.css";
import React from "react";

import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";

function App() {
  const [habits, setHabits] = React.useState([]);

  function addHabit(habit) {
    const newHabit = { id: crypto.randomUUID(), name: habit };

    setHabits([...habits, newHabit]);
  }

  function deleteHabit(id) {
    const nextHabit = habits.filter((habit) => {
      return habit.id !== id;
    });

    setHabits(nextHabit);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
      <HabitList habits={habits} deleteHabit={deleteHabit} />
      <AddHabitForm addHabit={addHabit} />
      <p className="text-gray-500 mt-2">Your journey starts here.</p>
    </div>
  );
}

export default App;
