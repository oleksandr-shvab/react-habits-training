import "./index.css";

import HabitList from "./components/HabitList";

const HARDCODED_HABIT = [
  { id: "1", name: "Swimming" },
  { id: "2", name: "Dreank 2 littr of watter" },
  { id: "3", name: "Sleap 8 hours" },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
      <HabitList habits={HARDCODED_HABIT} />
      <p className="text-gray-500 mt-2">Your journey starts here.</p>
    </div>
  );
}

export default App;
