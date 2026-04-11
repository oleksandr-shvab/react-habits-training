import React from "react";

import useLocalStorage from "./useLocalStorage";
import { Habit, Filter } from "../context/HabitsContext";
import { getToday } from "../utils";

function useHabits() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
  const [filter, setFilter] = React.useState<Filter>("all");

  const filteredHabits = React.useMemo(() => {
    const today = getToday();
    if (filter === "done") return habits.filter((h) => h.completedDates.includes(today));
    if (filter === "pending") return habits.filter((h) => !h.completedDates.includes(today));
    return habits;
  }, [habits, filter]);

  const addHabit = React.useCallback((name: string) => {
    if (!name) return;
    setHabits((prev) => [...prev, { id: crypto.randomUUID(), name, completedDates: [] }]);
  }, [setHabits]);

  const deleteHabit = React.useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, [setHabits]);

  const handleCheckbox = React.useCallback((id: string) => {
    const today = getToday();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const hasToday = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: hasToday
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  }, [setHabits]);

  return { habits, filteredHabits, filter, setFilter, addHabit, deleteHabit, handleCheckbox };
}

export default useHabits;
