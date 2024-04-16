// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState, useRef } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { useAnimate } from "framer-motion";

interface CheckboxProps {
  task: Tasks;
  onUpdate: (updatedTask: Tasks) => void;
  onDelete: (deletedTask: Tasks) => void;
  isSelected: boolean;
  onSelect: () => void;
  animation: boolean;
}

function Checkbox({
  task,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
  animation
}: CheckboxProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [titleInputAnimationElement, animateTitleInput] = useAnimate();

  const handleTitleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key == "Enter" && !invalidInput) {
      const inputValue = event.currentTarget.value.trim();
      if (inputValue && inputValue.length >= 3 && inputValue.length <= 50) {
        onUpdate({
          ...task,
          title: inputValue
        });
        if(titleInput.current)
          titleInput.current.blur();
      } else {
        if (animation)
          animateTitleInput(
            titleInputAnimationElement.current,
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
        <div className="grid place-content-center w-screen h-screen fixed top-0 left-0 z-10">
          <div
            className="w-screen h-screen fixed top-0 left-0 z-10 bg-gray-300 opacity-70"
            onClick={() => setShowModal(!showModal)}
          />
          <div className="bg-white text-black cursor-auto z-20 w-screen-3/4 h-screen-3/4 rounded-md shadow-md p-2">
            <div className="inline-flex items-center justify-between w-full p-1">
              {editingTitle ? (
                <div className="w-3/4" ref={titleInputAnimationElement}>
                  <input
                    className={`text-2xl w-full relative ${invalidInput ? "bg-red-50" : ""}`}
                    type="text"
                    placeholder="Title of Task"
                    onKeyDownCapture={handleTitleInputKeyPress}
                    onBlur={() => {
                      setEditingTitle(false);
                      setInvalidInput(false);
                    }}
                    ref={titleInput}
                  />
                </div>
              ) : (
                <h2
                  className="text-2xl w-3/4 relative line-clamp-1"
                  onClick={() => {
                    setEditingTitle(true);
                    setTimeout(() => {
                      if (!titleInput.current) return;
                      titleInput.current.value = task.title;
                      titleInput.current.focus();
                    }, 5);
                  }}
                >
                  {task.title}
                </h2>
              )}

              <MdDeleteForever
                className="w-6 h-6 cursor-pointer hover:fill-gray-600"
                onClick={() => {
                  setShowModal(false);
                  setTimeout(() => onDelete(task), 50);
                }}
              />
            </div>
            <hr className="w-full h-px bg-gray-300" />
          </div>
        </div>
      ) : null}
    </li>
  );
}

export default Checkbox;
