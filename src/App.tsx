import "./index.css";

import { HabitsProvider } from "./context/HabitsContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import TodayFinished from "./components/TodayFinished";
import { useHabits } from "./context/HabitsContext";
import { Button } from "./components/ui/button";

function AppContent() {
  const { habits } = useHabits();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <Button variant="outline" onClick={toggleDarkMode}>
          {darkMode ? "Light mode" : "Dark mode"}
        </Button>
      </div>
      {habits.length > 0 && <TodayFinished />}
      <HabitList />
      <AddHabitForm />
      <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Your journey starts here.</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <HabitsProvider>
        <AppContent />
      </HabitsProvider>
    </ThemeProvider>
  );
}

export default App;
