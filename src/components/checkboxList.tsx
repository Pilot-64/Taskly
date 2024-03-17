import React, { useState, useEffect } from "react";

import Checkbox from "./checkbox";

interface CheckboxListProps {
  input?: boolean;
  maxTasks?: number | null;
  setTaskNum?: (taskNum: number) => void;
}

function CheckboxList({
  input = false,
  maxTasks = null,
  setTaskNum = undefined
}: CheckboxListProps) {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    window.Main.LoadTasks().then((loadedTasks) => {
      if (loadedTasks == null) return;

      if (setTaskNum != undefined)
        setTaskNum(loadedTasks.filter((task) => !task.completed).length);

      setTasks(loadedTasks);
      window.Main.LogInfo("Loaded tasks from file successfully!");

      return () => {
        window.Main.SaveTasks(tasks);
        window.Main.LogInfo("Saved tasks on unmount.");
      };
    });
  }, []);

  const handleTaskDelete = (deletedTask: Tasks) => {
    const newTasks = tasks.filter((item) => item.id !== deletedTask.id);
    if (setTaskNum != undefined)
      setTaskNum(newTasks.filter((task) => !task.completed).length);
    setTasks(newTasks);
    setSelectedId(null);
    window.Main.SaveTasks(newTasks);
  };

  const handleTaskUpdate = (updatedTask: Tasks) => {
    const newTasks = tasks.map((item) =>
      item.id === updatedTask.id ? updatedTask : item
    );
    if (setTaskNum != undefined)
      setTaskNum(newTasks.filter((task) => !task.completed).length);
    setTasks(newTasks);
    setSelectedId(updatedTask.id);
    window.Main.SaveTasks(newTasks);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
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
    <div className="px-5 relative">
      <ul className="space-y-1">
        {tasks.map((task: Tasks, index) => {
          if (maxTasks != null && index > maxTasks) return null;
          return (
            <Checkbox
              key={task.id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
              isSelected={selectedId == task.id}
              onSelect={() => setSelectedId(task.id)}
            />
          );
        })}
      </ul>
      {input ? (
        <div className="absolute left-0 bottom-0 p-2 bg-white w-full h-[46px]">
          <input
            className="bg-gray-50 w-full h-[30px] px-2 border-2 rounded-md"
            type="text"
            placeholder="Add new task..."
            name="New task field"
            onKeyDownCapture={handleInputKeyPress}
          />
        </div>
      ) : null}
    </div>
  );
}

export default CheckboxList;
