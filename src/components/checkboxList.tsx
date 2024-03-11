// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
import { useState } from "react";

function checkboxList() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    window.Main.LoadTasks().then((loadedTasks) => {
      if (loadedTasks == null) return;
      setTasks(loadedTasks);
      window.Main.LogInfo("Loaded tasks from file successfully!");

      return () => window.Main.SaveTasks(tasks);
    });
  }, []);

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
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks, newTask];
          window.Main.SaveTasks(newTasks);
          return newTasks;
        });
        event.currentTarget.value = "";
      }
    }
  };

  const handleCheckboxClick = (id: string) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((item) =>
        item.id == id ? { ...item, completed: !item.completed } : item
      );
      window.Main.SaveTasks(newTasks);
      return newTasks;
    });
  };

  return (
    <div>
      <ul>
        {tasks.map((task: Tasks) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              key={task.id}
              className="inline-flex items-center justify-between w-full bg-white rounded-lg cursor-pointer peer-checked:bg-gray-100 peer-checked:text-gray-100 hover:text-gray-50 hover:bg-gray-50"
            >
              <div
                onClick={() => handleCheckboxClick(task.id)}
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
                  onClick={() => handleCheckboxClick(task.id)}
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
