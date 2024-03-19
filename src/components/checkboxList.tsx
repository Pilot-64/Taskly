import React, { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAnimate } from "framer-motion";

import Checkbox from "./checkbox";

interface CheckboxListProps {
  input?: boolean;
  animation?: boolean;
  maxTasks?: number | null;
  setTaskNum?: (taskNum: number) => void;
}

function CheckboxList({
  input = false,
  animation = true,
  maxTasks = null,
  setTaskNum = undefined
}: CheckboxListProps) {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [parent, enableAnimations] = useAutoAnimate();
  const [scope, animate] = useAnimate();
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  enableAnimations(animation);

  useEffect(() => {
    if (initialRender) {
      window.Main.LoadTasks().then((loadedTasks) => {
        if (loadedTasks != null) {
          setTasks(loadedTasks);
          window.Main.LogInfo("Loaded tasks on mount.");
        }
        setInitialRender(false);
      });
    } else {
      if (setTaskNum != undefined)
        setTaskNum(tasks.filter((task) => !task.completed).length);
      window.Main.SaveTasks(tasks);
      window.Main.LogInfo("Saved tasks on state change.");
    }
  }, [tasks, setTaskNum]);

  const handleTaskDelete = (deletedTask: Tasks) => {
    const newTasks = tasks.filter((item) => item.id != deletedTask.id);
    setTasks(newTasks);
    setSelectedId(null);
  };

  const handleTaskUpdate = (updatedTask: Tasks) => {
    const newTasks = tasks.map((item) =>
      item.id == updatedTask.id ? updatedTask : item
    );
    setTasks(newTasks);
    setSelectedId(updatedTask.id);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key == "Enter" && !invalidInput) {
      const inputValue = event.currentTarget.value.trim();
      if (inputValue && inputValue.length >= 2 && inputValue.length <= 50) {
        const newTask: Tasks = {
          id: crypto.randomUUID(),
          title: inputValue,
          completed: false
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        event.currentTarget.value = "";
      } else {
        if (animation)
          animate(
            scope.current,
            {
              x: [0, -5, 5, -5, 5, -5, 5, -5, 5, -5, 0]
            },
            {
              duration: 0.5
            }
          );
        setInvalidInput(true);
        setTimeout(() => setInvalidInput(false), 500);
      }
    }
  };

  return (
    <div className="px-5">
      <ul className="space-y-1" ref={parent}>
        {tasks.map((task: Tasks, index) => {
          if (maxTasks != null && index >= maxTasks) return null;
          return (
            <Checkbox
              key={task.id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
              isSelected={selectedId == task.id}
              onSelect={() => setSelectedId(task.id)}
              animation={animation}
            />
          );
        })}
      </ul>
      {input ? (
        <div className="fixed left-0 bottom-0 p-2 bg-white w-full h-[46px]">
          <input
            className={`w-full h-[30px] px-2 border-2 rounded-md ${invalidInput ? "bg-red-50" : "bg-gray-50"}`}
            type="text"
            placeholder="Add new task..."
            ref={scope}
            onKeyDownCapture={handleInputKeyPress}
          />
        </div>
      ) : null}
    </div>
  );
}

export default CheckboxList;
