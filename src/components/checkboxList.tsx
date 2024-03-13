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
      <ul>
        {tasks.map((task: Tasks) => {
          return <Checkbox key={task.id} task={task} onUpdate={onTaskUpdate} />;
        })}
      </ul>
      <input
        className="bg-gray-50 w-full"
        type="text"
        placeholder="Add new task..."
        name="New task field"
        onKeyDownCapture={onInputKeyPress}
      />
    </div>
  );
}

export default checkboxList;
