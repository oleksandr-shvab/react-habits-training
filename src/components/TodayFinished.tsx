import React from "react";

import { useHabits } from "../context/HabitsContext";

function TodayFinished() {
  const { habits } = useHabits();
  const habitsToday = habits.length;
  const habitsDone = habits.filter((item) => item.completedToday).length;

  return (
    <div>
      <p>
        {habitsDone} / {habitsToday} done today
      </p>
    </div>
  );
}

export default TodayFinished;
