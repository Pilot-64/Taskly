// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useAnimate } from "framer-motion";
import MarkdownEditor from "@uiw/react-markdown-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface CheckboxProps {
  task: Tasks;
  onClose: () => void;
  onUpdate: (updatedTask: Tasks) => void;
  onDelete: () => void;
  animation: boolean;
}

function CheckboxModal({
  task,
  onClose,
  onUpdate,
  onDelete,
  animation
}: CheckboxProps) {
  //* Title editing
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [titleInputAnimationElement, animateTitleInput] = useAnimate();

  const handleTitleClick = () => {
    setEditingTitle(true);
    setTimeout(() => {
      if (!titleInput.current) return;
      titleInput.current.value = task.title;
      titleInput.current.focus();
    }, 2);
  };

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
        if (titleInput.current) titleInput.current.blur();
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

  //* Description Editing
  const [editingDescription, setEditingDescription] = useState<boolean>(false);

  return (
    <div className="grid place-content-center w-screen h-screen fixed top-0 left-0 z-10">
      <div
        className="w-screen h-screen fixed top-0 left-0 z-10 bg-gray-300 opacity-70"
        onClick={onClose}
      />
      <div className="bg-white text-black cursor-auto z-20 w-screen-3/4 h-screen-3/4 rounded-md shadow-md p-2">
        <div className="inline-flex items-center justify-between w-full p-1">
          {editingTitle ? (
            <div className="w-3/4 inline-flex items-center">
              <div ref={titleInputAnimationElement}>
                <input
                  className={`text-2xl w-full relative ${invalidInput ? "bg-red-50" : ""}`}
                  type="text"
                  placeholder="Title of Task"
                  onKeyDownCapture={handleTitleInputKeyPress}
                  ref={titleInput}
                  onBlur={() => {
                    setEditingTitle(false);
                    setInvalidInput(false);
                  }}
                />
              </div>
              <IoMdCheckmarkCircle className="w-5 h-5 ml-2 cursor-pointer hover:fill-gray-600" />
            </div>
          ) : (
            <div className="w-3/4 inline-flex items-center">
              <h2
                className="text-2xl relative line-clamp-1"
                onClick={handleTitleClick}
              >
                {task.title}
              </h2>
              <FaEdit
                className="w-4 h-4 ml-2 cursor-pointer hover:fill-gray-600"
                onClick={handleTitleClick}
              />
            </div>
          )}
          <div className="inline-flex items-center justify-between">
            <MdDeleteForever
              className="w-6 h-6 cursor-pointer hover:fill-gray-600"
              onClick={() => {
                onClose();
                setTimeout(onDelete, 50);
              }}
            />
          </div>
        </div>
        <hr className="w-full h-px bg-gray-300" />
        <div className="p-1">
          <div className="inline-flex items-center justify-between w-full">
            <h3 className="mt-2 text-lg">Description</h3>
            <FaEdit className="mt-1 w-4 h-4 cursor-pointer hover:fill-gray-600" />
          </div>
          <hr className="w-full h-px bg-gray-300 mt-0 mb-2" />
          {editingDescription ? <MarkdownEditor /> : <MarkdownPreview />}
        </div>
      </div>
    </div>
  );
}

export default CheckboxModal;
