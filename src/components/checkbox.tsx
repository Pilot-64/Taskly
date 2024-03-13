// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

interface CheckboxProps {
  task: Tasks;
  onUpdate(updatedTask: Tasks): void;
}

function checkbox({ task, onUpdate }: CheckboxProps) {
  const handleCheckboxClick = () =>
    onUpdate({
      ...task,
      completed: !task.completed
    });

  return (
    <div
      key={task.id}
      className="inline-flex items-center justify-between w-full bg-white rounded-lg cursor-pointer peer-checked:bg-gray-100 peer-checked:text-gray-100 hover:text-gray-50 hover:bg-gray-50"
    >
      <div
        onClick={handleCheckboxClick}
        className="w-full flex flex-row items-center p-1 cursor-pointer"
      >
        <input
          id={task.id}
          type="checkbox"
          className="bg-white border-green-300 focus:ring-3 focus:ring-green-300 h-full mx-1 rounded-full cursor-pointer"
          checked={task.completed}
          onChange={() => {}}
        />
        <label
          htmlFor={task.id}
          onClick={handleCheckboxClick}
          className={`text-gray-700 cursor-pointer ${task.completed ? "line-through" : ""}`}
        >
          {task.title}
        </label>
      </div>
    </div>
  );
}

export default checkbox;
