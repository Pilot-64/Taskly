// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState, useEffect } from "react";

import CheckboxList from "../components/checkboxList";

function Home() {
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

  const refreshCheckboxList = () => {
    window.Main.LoadTasks().then((loadedTasks) => {
      if (loadedTasks == null) return;
      setTasks(loadedTasks);
      window.Main.LogInfo("Loaded tasks from file successfully!");
    });
  };

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
    <div className="bg-white col-span-2 h-full w-full flex flex-col space-y-2">
      <div className="flex sticky top-0 flex-row space-x-5 p-5 items-center select-none bg-white bg-opacity-90">
        <h1 className="text-3xl font-bold">Home</h1>
        <div className="h-full w-px bg-gray-300" />
        <div className="flex flex-row w-full items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">
              {tasks.filter((task) => !task.completed).length}
            </h1>
            <p>
              Unfinished Task
              {tasks.filter((task) => !task.completed).length > 1 ? "s" : ""}
              {tasks.filter((task) => !task.completed).length == 0
                ? ", Woohoo!"
                : ""}
            </p>
          </div>
          <button
            className="bg-gray-300 p-1 rounded-md"
            onClick={refreshCheckboxList}
          >
            Clean
          </button>
        </div>
      </div>
      <div className="px-5">
        <CheckboxList
          onInputKeyPress={handleInputKeyPress}
          onTaskUpdate={handleTaskUpdate}
          tasks={tasks}
        />
      </div>
    </div>
  );
}

export default Home;
