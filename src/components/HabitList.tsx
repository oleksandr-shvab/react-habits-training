import React from "react";

import HabitItem from "./HabitItem";

function HabitList({ habits, handleCheckbox, deleteHabit }) {
  return (
    <div>
      <ul>
        {habits.map(({ id, name, completedToday }) => (
          <li key={id}>
            <HabitItem
              id={id}
              completedToday={completedToday}
              handleCheckbox={handleCheckbox}
              deleteHabit={deleteHabit}
            >
              {name}
            </HabitItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
