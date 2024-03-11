// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState } from "react";

function checkboxList() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key == "Enter") {
      const inputValue = event.currentTarget.value.trim();
      if (inputValue) {
        const newTask: Tasks = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2),
          title: inputValue,
          completed: false
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        event.currentTarget.value = "";
      }
    }
  };

  const handleCheckboxClick = (id: string) => {
    setTasks(prevData =>
      prevData.map(item =>
        item.id == id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div>
      <ul>
        {tasks.map((task: Tasks) => {
          return (
            <div className="inline-flex items-center justify-between w-full bg-white rounded-lg cursor-pointer peer-checked:bg-gray-100 peer-checked:text-gray-100 hover:text-gray-50 hover:bg-gray-50">
              <div
                onClick={() => handleCheckboxClick(task.id)}
                className="w-full flex flex-row items-center p-1 cursor-pointer"
              >
                <input
                  id="checkbox-1"
                  type="checkbox"
                  className="bg-white border-green-300 focus:ring-3 focus:ring-green-300 h-full mx-1 rounded-full cursor-pointer"
                  checked={task.completed}
                  onChange={() => {}}
                />
                <label
                  htmlFor="checkbox-1"
                  className={`text-gray-700 cursor-pointer ${task.completed ? "line-through" : ""}`}
                >
                  {task.title}
                </label>
              </div>
            </div>
          );
        })}
      </ul>
      <input
        className="bg-gray-50 w-full"
        type="text"
        placeholder="Add new task..."
        name="New task field"
        onKeyDownCapture={handleInputKeyPress}
      />
    </div>
  );
}

export default checkboxList;
