import React from "react";

export type Habit = { id: string; name: string; completedToday: boolean };
type Action =
  | { type: "ADD_HABIT"; name: string }
  | { type: "DELETE_HABIT"; id: string }
  | { type: "TOGGLE_HABIT"; id: string };

type HabitsContextType = {
  habits: Habit[];
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

  React.useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  function addHabit(name: string) {
    if (!name) return;
    dispatch({ type: "ADD_HABIT", name });
  }

  function deleteHabit(id: string) {
    dispatch({ type: "DELETE_HABIT", id });
  }

  function handleCheckbox(id: string) {
    dispatch({ type: "TOGGLE_HABIT", id });
  }

  return (
    <HabitsContext.Provider value={{ habits, addHabit, deleteHabit, handleCheckbox }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const ctx = React.useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used inside HabitsProvider");
  return ctx;
}
