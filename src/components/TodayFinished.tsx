import { useHabits } from "../context/HabitsContext";
import { getToday } from "../utils";

function TodayFinished() {
  const { habits } = useHabits();
  const today = getToday();
  const habitsToday = habits.length;
  const habitsDone = habits.filter((h) => h.completedDates.includes(today)).length;

  return (
    <div>
      <p>
        {habitsDone} / {habitsToday} done today
      </p>
    </div>
  );
}

export default TodayFinished;
