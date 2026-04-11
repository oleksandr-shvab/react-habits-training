import React from "react";

import { Button } from "./ui/button";
import { getStreak, getToday } from "../utils";

type Props = {
  id: string;
  completedDates: string[];
  handleCheckbox: (id: string) => void;
  deleteHabit: (id: string) => void;
  children: React.ReactNode;
};

const HabitItem = React.memo(function HabitItem({
  id,
  completedDates,
  handleCheckbox,
  deleteHabit,
  children,
}: Props) {
  const completedToday = completedDates.includes(getToday());
  const streak = React.useMemo(() => getStreak(completedDates), [completedDates]);

  return (
    <div className="flex items-center gap-3 py-1">
      <input
        type="checkbox"
        checked={completedToday}
        onChange={() => handleCheckbox(id)}
      />
      <span className={completedToday ? "line-through text-gray-400" : ""}>
        {children}
      </span>
      {streak > 0 && (
        <span className="text-sm text-orange-500 font-medium">🔥 {streak}</span>
      )}
      <Button variant="destructive" onClick={() => deleteHabit(id)}>
        X
      </Button>
    </div>
  );
});

export default HabitItem;
