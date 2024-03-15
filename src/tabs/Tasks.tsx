// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState, useEffect } from "react";

import Checkbox from "../components/checkbox";
import { handleTaskDelete, handleTaskUpdate } from "../lib/taskHandlers";

function Tasks() {
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

  return (
    <div className="bg-white col-span-2 h-full w-full flex flex-col space-y-2">
      <div className="flex sticky top-0 flex-row space-x-5 p-5 items-center select-none bg-white bg-opacity-90">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <hr className="h-full w-px bg-gray-300" />
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
        <ul className="space-y-1">
          {tasks.map((task: Tasks) => {
            return (
              <Checkbox
                key={task.id}
                task={task}
                onUpdate={(task) => handleTaskUpdate(tasks, setTasks, task)}
                onDelete={(task) => handleTaskDelete(tasks, setTasks, task)}
              />
            );
          })}
        </ul>
        <input
          className="sticky bottom-3 bg-gray-50 w-full mt-2 h-[30px] px-2 border-2 rounded-md"
          type="text"
          placeholder="Add new task..."
          name="New task field"
          onKeyDownCapture={handleInputKeyPress}
        />
      </div>
    </div>
  );
}

export default Tasks;
