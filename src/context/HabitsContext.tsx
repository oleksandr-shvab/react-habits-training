import React from "react";

import useHabitsHook from "../hooks/useHabits";

export type Habit = { id: string; name: string; completedDates: string[] };
export type Filter = "all" | "done" | "pending";

type HabitsContextType = ReturnType<typeof useHabitsHook>;

const HabitsContext = React.createContext<HabitsContextType | null>(null);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const habitsData = useHabitsHook();

  return (
    <HabitsContext.Provider value={habitsData}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const ctx = React.useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used inside HabitsProvider");
  return ctx;
}
