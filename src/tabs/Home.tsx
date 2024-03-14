// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState, useEffect } from "react";

import Checkbox from "../components/checkbox";

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

  const handleTaskUpdate = (updatedTask: Tasks) => {
    const newTasks = tasks.map((item) =>
      item.id == updatedTask.id ? updatedTask : item
    );
    setTasks(newTasks);
    window.Main.SaveTasks(newTasks);
  };

  const displayTasks = () => {
    const filteredTasks = tasks.filter((_task, index) => index < 5);
    return filteredTasks.map((task: Tasks) => {
      return <Checkbox key={task.id} task={task} onUpdate={handleTaskUpdate} />;
    });
  };

  return (
    <div className="bg-white col-span-2 h-full w-full flex flex-col space-y-2">
      <div className="flex sticky top-0 flex-row space-x-5 p-5 items-center select-none bg-white bg-opacity-90">
        <h1 className="text-3xl font-bold">Home</h1>
      </div>
      <div className="px-5">
        <ul className="space-y-1">{displayTasks()}</ul>
      </div>
    </div>
  );
}

export default Home;
