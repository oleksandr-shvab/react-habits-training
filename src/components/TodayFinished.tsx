import React from "react";

function TodayFinished({ habits }) {
  const habitsToday = habits.length;
  const habitsDone = habits.filter((item) => item.completedToday).length;

  return (
    <div>
      {/* <p>{todayDone} done today</p> */}
      <p>
        {habitsDone} / {habitsToday} done today
      </p>
    </div>
  );
}

export default TodayFinished;
