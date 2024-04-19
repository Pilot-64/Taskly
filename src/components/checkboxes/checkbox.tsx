// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import CheckboxModal from "./checkboxModal";

interface CheckboxProps {
  task: Tasks;
  onUpdate: (updatedTask: Tasks) => void;
  onDelete: (deletedTask: Tasks) => void;
  isSelected: boolean;
  onSelect: () => void;
  animation: boolean;
  defaultShowModalState: boolean;
}

function Checkbox({
  task,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
  animation,
  defaultShowModalState
}: CheckboxProps) {
  const [showModal, setShowModal] = useState<boolean>(defaultShowModalState);

  return (
    <li
      className={`inline-flex items-center justify-between w-full rounded-lg cursor-pointer peer-checked:bg-gray-100
        peer-checked:text-gray-100 ${isSelected ? "bg-blue-50" : "bg-white hover:text-gray-50 hover:bg-gray-50"} `}
    >
      <div
        onClick={onSelect}
        onDoubleClick={() => {
          setShowModal(!showModal);
        }}
        className="w-full flex flex-row items-center p-1"
      >
        <div
          onClick={() => {
            onUpdate({
              ...task,
              completed: !task.completed
            });
          }}
          className="flex flex-row items-center cursor-pointer"
        >
          <input
            type="checkbox"
            className="bg-white border-green-300 focus:ring-3 focus:ring-green-300 h-full mx-1 rounded-full cursor-pointer"
            checked={task.completed}
            onChange={() => {}}
          />
          <label
            className={`relative text-gray-700 select-none cursor-pointer line-clamp-1 ${!animation && task.completed ? "line-through" : ""}`}
          >
            {task.title}
            {animation ? (
              <span
                className={`absolute left-0 bottom-[45%] w-full h-[1px] bg-black ${task.completed ? "transform -translate-x-[0%] transition-all duration-500 w-0" : "transform -translate-x-[100%] transition-all duration-500 max-w-full"} `}
              />
            ) : null}
          </label>
        </div>
      </div>
      <PiDotsThreeVerticalBold
        className="fill-gray-500"
        onClick={() => setShowModal(!showModal)}
      />
      {showModal ? (
        <CheckboxModal
          task={task}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedTask) => onUpdate(updatedTask)}
          onDelete={() => onDelete(task)}
          animation={animation}
        />
      ) : null}
    </li>
  );
}

export default Checkbox;
