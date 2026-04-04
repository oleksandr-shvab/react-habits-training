import React from "react";

import { Button } from "./ui/button";

function HabitItem({
  id,
  completedToday,
  handleCheckbox,
  deleteHabit,
  children,
}) {
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
}

export default HabitItem;
