import React from "react";

import HabitItem from "./HabitItem";

function HabitList({ habits }) {
  return (
    <div>
      <ul>
        {habits.map(({ id, name }) => (
          <li key={id}>
            <HabitItem>{name}</HabitItem>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
