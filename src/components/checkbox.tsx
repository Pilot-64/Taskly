// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

interface CheckboxProps {
  task: Tasks;
  onUpdate(updatedTask: Tasks): void;
}

function Checkbox({ task, onUpdate }: CheckboxProps) {
  return (
    <div className="inline-flex items-center justify-between w-full bg-white rounded-lg cursor-pointer peer-checked:bg-gray-100 peer-checked:text-gray-100 hover:text-gray-50 hover:bg-gray-50">
      <div
        onClick={() =>
          onUpdate({
            ...task,
            completed: !task.completed
          })
        }
        className="w-full flex flex-row items-center p-1 cursor-pointer"
      >
        <input
          type="checkbox"
          id={task.id + "-checkbox"}
          className="bg-white border-green-300 focus:ring-3 focus:ring-green-300 h-full mx-1 rounded-full cursor-pointer"
          checked={task.completed}
          onChange={() =>
            onUpdate({
              ...task,
              completed: !task.completed
            })
          }
        />
        <label
          htmlFor={task.id + "-checkbox"}
          className={`text-gray-700 cursor-pointer ${task.completed ? "line-through" : ""}`}
        >
          {task.title}
        </label>
      </div>
    </div>
  );
}

export default Checkbox;
