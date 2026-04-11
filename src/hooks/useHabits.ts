import React from "react";

import useLocalStorage from "./useLocalStorage";
import { Habit, Filter } from "../context/HabitsContext";

function useHabits() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
  const [filter, setFilter] = React.useState<Filter>("all");

  const filteredHabits = React.useMemo(() => {
    if (filter === "done") return habits.filter((h) => h.completedToday);
    if (filter === "pending") return habits.filter((h) => !h.completedToday);
    return habits;
  }, [habits, filter]);

  const addHabit = React.useCallback((name: string) => {
    if (!name) return;
    setHabits((prev) => [...prev, { id: crypto.randomUUID(), name, completedToday: false }]);
  }, [setHabits]);

  const deleteHabit = React.useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, [setHabits]);

  const handleCheckbox = React.useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) => h.id === id ? { ...h, completedToday: !h.completedToday } : h)
    );
  }, [setHabits]);

  return { habits, filteredHabits, filter, setFilter, addHabit, deleteHabit, handleCheckbox };
}

export default useHabits;
