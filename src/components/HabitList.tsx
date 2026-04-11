import HabitItem from "./HabitItem";
import FilterBar from "./FilterBar";
import { useHabits } from "../context/HabitsContext";

function HabitList() {
  const { filteredHabits, handleCheckbox, deleteHabit } = useHabits();

  return (
    <div>
      <FilterBar />
      <ul>
        {filteredHabits.map(({ id, name, completedToday }) => (
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
