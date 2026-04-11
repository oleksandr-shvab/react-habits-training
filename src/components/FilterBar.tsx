import { Filter, useHabits } from "../context/HabitsContext";
import { Button } from "./ui/button";

const FILTERS: Filter[] = ["all", "done", "pending"];

function FilterBar() {
  const { filter, setFilter } = useHabits();

  return (
    <div className="flex gap-2 mt-4">
      {FILTERS.map((item) => (
        <Button
          key={item}
          variant={filter === item ? "default" : "outline"}
          onClick={() => setFilter(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </div>
  );
}

export default FilterBar;
