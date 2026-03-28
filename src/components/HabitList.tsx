import React from "react";

import HabitItem from "./HabitItem";

function HabitList({ habits, deleteHabit }) {
  return (
    <div>
      <ul>
        {habits.map(({ id, name }) => (
          <li key={id}>
            <HabitItem id={id} deleteHabit={deleteHabit}>
              {name}
            </HabitItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
