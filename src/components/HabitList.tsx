import HabitItem from "./HabitItem";
import { useHabits } from "../context/HabitsContext";

function HabitList() {
  const { habits, handleCheckbox, deleteHabit } = useHabits();

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
