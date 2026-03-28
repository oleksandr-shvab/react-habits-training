import React from "react";

import { Button } from "./ui/button";

function HabitItem({ id, deleteHabit, children }) {
  return (
    <div>
      <span>{children}</span>
      <Button variant="destructive" onClick={() => deleteHabit(id)}>
        X
      </Button>
    </div>
  );
}

export default HabitItem;
