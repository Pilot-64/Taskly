// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState, useEffect } from "react";

import Checkbox from "./checkbox";

function checkboxList() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    window.Main.LoadTasks().then((loadedTasks) => {
      if (loadedTasks == null) return;
      setTasks(loadedTasks);
      window.Main.LogInfo("Loaded tasks from file successfully!");

      return () => {
        window.Main.SaveTasks(tasks);
        window.Main.LogInfo("Saved tasks on unmount.");
      };
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

  const handleTaskUpdate = (updatedTask: Tasks) => {
    const newTasks = tasks.map((item) =>
      item.id == updatedTask.id ? updatedTask : item
    );
    setTasks(newTasks);
    window.Main.SaveTasks(newTasks);
  };

  return (
    <div>
      <ul>
        {tasks.map((task: Tasks) => {
          return (
            <Checkbox key={task.id} task={task} onUpdate={handleTaskUpdate} />
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
