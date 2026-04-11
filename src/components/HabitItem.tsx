import React from "react";

import { Button } from "./ui/button";

type Props = {
  id: string;
  completedToday: boolean;
  handleCheckbox: (id: string) => void;
  deleteHabit: (id: string) => void;
  children: React.ReactNode;
};

const HabitItem = React.memo(function HabitItem({
  id,
  completedToday,
  handleCheckbox,
  deleteHabit,
  children,
}: Props) {
  console.log("HabitItem rendered:", children);

  return (
    <div>
      <input
        type="checkbox"
        checked={completedToday}
        onChange={() => handleCheckbox(id)}
      ></input>
      <span className={completedToday ? "line-through text-gray-400" : ""}>
        {children}
      </span>
      <Button variant="destructive" onClick={() => deleteHabit(id)}>
        X
      </Button>
    </div>
  );
});

export default HabitItem;
