import "./index.css";
import React from "react";

import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import TodayFinished from "./components/TodayFinished";

function App() {
  // const [habits, setHabits] = React.useState([]);
  const [habits, setHabits] = React.useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  function addHabit(habit) {
    const newHabit = {
      id: crypto.randomUUID(),
      name: habit,
      completedToday: false,
    };

    setHabits([...habits, newHabit]);
  }

  function deleteHabit(id) {
    const nextHabit = habits.filter((habit) => {
      return habit.id !== id;
    });

    setHabits(nextHabit);
  }

  function handleCheckbox(id) {
    const updatedList = habits.map((item) =>
      item.id === id ? { ...item, completedToday: !item.completedToday } : item,
    );
    setHabits(updatedList);
  }

  React.useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
      {habits.length > 0 && <TodayFinished habits={habits} />}
      <HabitList
        habits={habits}
        handleCheckbox={handleCheckbox}
        deleteHabit={deleteHabit}
      />
      <AddHabitForm addHabit={addHabit} />
      <p className="text-gray-500 mt-2">Your journey starts here.</p>
    </div>
  );
}

export default App;
