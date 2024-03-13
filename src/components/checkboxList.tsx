// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

import Checkbox from "./checkbox";

interface CheckboxListProps {
  tasks: Tasks[];
  onInputKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void;
  onTaskUpdate(updatedTask: Tasks): void;
}

function checkboxList({
  tasks,
  onInputKeyPress,
  onTaskUpdate
}: CheckboxListProps) {
  return (
    <div>
      <ul className="space-y-1">
        {tasks.map((task: Tasks) => {
          return <Checkbox key={task.id} task={task} onUpdate={onTaskUpdate} />;
        })}
      </ul>
      <input
        className="sticky bottom-3 bg-gray-50 w-full mt-2 h-[30px] px-2 border-2 rounded-md"
        type="text"
        placeholder="Add new task..."
        name="New task field"
        onKeyDownCapture={onInputKeyPress}
      />
    </div>
  );
}

export default checkboxList;
