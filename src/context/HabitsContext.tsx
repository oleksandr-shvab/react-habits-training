import React from "react";

export type Habit = { id: string; name: string; completedToday: boolean };
export type Filter = "all" | "done" | "pending";

type Action =
  | { type: "ADD_HABIT"; name: string }
  | { type: "DELETE_HABIT"; id: string }
  | { type: "TOGGLE_HABIT"; id: string };

type HabitsContextType = {
  habits: Habit[];
  filteredHabits: Habit[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  handleCheckbox: (id: string) => void;
};

function reducer(habits: Habit[], action: Action): Habit[] {
  switch (action.type) {
    case "ADD_HABIT":
      return [...habits, { id: crypto.randomUUID(), name: action.name, completedToday: false }];
    case "DELETE_HABIT":
      return habits.filter((h) => h.id !== action.id);
    case "TOGGLE_HABIT":
      return habits.map((h) =>
        h.id === action.id ? { ...h, completedToday: !h.completedToday } : h
      );
    default:
      return habits;
  }
}

const HabitsContext = React.createContext<HabitsContextType | null>(null);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, dispatch] = React.useReducer(reducer, [], () => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = React.useState<Filter>("all");

  React.useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const filteredHabits = React.useMemo(() => {
    if (filter === "done") return habits.filter((h) => h.completedToday);
    if (filter === "pending") return habits.filter((h) => !h.completedToday);
    return habits;
  }, [habits, filter]);

  const addHabit = React.useCallback((name: string) => {
    if (!name) return;
    dispatch({ type: "ADD_HABIT", name });
  }, []);

  const deleteHabit = React.useCallback((id: string) => {
    dispatch({ type: "DELETE_HABIT", id });
  }, []);

  const handleCheckbox = React.useCallback((id: string) => {
    dispatch({ type: "TOGGLE_HABIT", id });
  }, []);

  return (
    <HabitsContext.Provider value={{ habits, filteredHabits, filter, setFilter, addHabit, deleteHabit, handleCheckbox }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const ctx = React.useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used inside HabitsProvider");
  return ctx;
}
