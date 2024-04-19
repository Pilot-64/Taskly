// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { useAnimate } from "framer-motion";
import MarkdownEditor from "@uiw/react-markdown-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import dayjs from "dayjs";

interface CheckboxModalProps {
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
}: CheckboxModalProps) {
  //* Title editing
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const titleInput = useRef<HTMLInputElement>(null);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [titleInputAnimationElement, animateTitleInput] = useAnimate();

  const handleTitleSubmit = () => {
    if (!titleInput.current) return;
    const inputValue = titleInput.current.value.trim();
    if (inputValue && inputValue.length >= 3 && inputValue.length <= 50) {
      onUpdate({
        ...task,
        title: inputValue
      });
      setEditingTitle(false);
      setInvalidInput(false);
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
  };

  const handleTitleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (event.key) {
      case "Enter": {
        if (invalidInput) break;
        handleTitleSubmit();
        break;
      }
      case "Escape": {
        setEditingTitle(false);
        setInvalidInput(false);
        break;
      }
      default:
        break;
    }
  };

  //* Description Editing
  const [editingDescription, setEditingDescription] = useState<boolean>(false);
  const [descriptionInputValue, setDescriptionInputValue] = useState<string>(
    task.description != null ? task.description : ""
  );

  //* Do Date Editing
  const doDateInput = useRef<HTMLInputElement>(null);
  const [editingDoDate, setEditingDoDate] = useState<boolean>(false);
  const [doDateInputValue, setDoDateInputValue] = useState<string>(
    task.doDate == null ? "" : dayjs(task.doDate).format("YYYY-MM-DDTHH:mm")
  );

  //* Due Date Editing
  const dueDateInput = useRef<HTMLInputElement>(null);
  const [editingDueDate, setEditingDueDate] = useState<boolean>(false);
  const [dueDateInputValue, setDueDateInputValue] = useState<string>(
    task.dueDate == null ? "" : dayjs(task.dueDate).format("YYYY-MM-DDTHH:mm")
  );

  return (
    <div className="grid place-content-center w-screen h-screen fixed top-0 left-0 z-10">
      <div
        className="w-screen h-screen fixed top-0 left-0 z-10 bg-gray-300 opacity-70"
        onClick={onClose}
      />
      <div className="bg-white text-black cursor-auto z-20 w-screen-3/4 h-screen-3/4 rounded-md shadow-md p-2 pl-6 overflow-y-scroll">
        <div className="inline-flex items-center justify-between w-full p-1">
          {editingTitle ? (
            <div className="w-3/4 inline-flex items-center">
              <div ref={titleInputAnimationElement}>
                <input
                  className={`text-2xl w-full relative border-orange-300 rounded-md border-2 ${invalidInput ? "bg-red-50" : ""}`}
                  type="text"
                  placeholder="Title of Task"
                  onKeyDownCapture={handleTitleInputKeyPress}
                  ref={titleInput}
                />
              </div>
              <IoMdCheckmarkCircle
                onClick={handleTitleSubmit}
                className="w-5 h-5 ml-2 cursor-pointer hover:fill-gray-600"
              />
              <IoCloseCircle
                className="w-5 h-5 cursor-pointer hover:fill-gray-600"
                onClick={() => {
                  setEditingTitle(false);
                  setInvalidInput(false);
                }}
              />
            </div>
          ) : (
            <div className="w-3/4 inline-flex items-center">
              <h2 className="text-2xl relative line-clamp-1">{task.title}</h2>
              <FaEdit
                className="w-4 h-4 ml-2 cursor-pointer hover:fill-gray-600"
                onClick={() => {
                  setEditingTitle(true);
                  setTimeout(() => {
                    if (!titleInput.current) return;
                    titleInput.current.value = task.title;
                    titleInput.current.focus();
                  }, 2);
                }}
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
            <IoCloseCircle
              className="w-6 h-6 cursor-pointer hover:fill-gray-600"
              onClick={onClose}
            />
          </div>
        </div>
        <hr className="w-full h-px bg-gray-300" />
        <div className="grid grid-cols-2 grid-rows-2 gap-2 my-2">
          <div className="flex flex-row items-center col-span-1 w-full">
            <h3 className="underline">Completed:</h3>
            <input
              type="checkbox"
              className="bg-white border-green-300 focus:ring-3 focus:ring-green-300 h-full rounded-full cursor-pointer ml-2"
              checked={task.completed}
              onChange={() => {
                onUpdate({
                  ...task,
                  completed: !task.completed
                });
              }}
            />
          </div>
          <div className="grid grid-cols-subgrid col-span-2">
            <div>
              <div className="inline-flex items-center">
                <h3 className="underline">Due Date</h3>
                {editingDueDate ? (
                  <div className="inline-flex items-center">
                    <IoMdCheckmarkCircle
                      onClick={() => {
                        setEditingDueDate(false);
                        onUpdate({
                          ...task,
                          dueDate: dayjs(dueDateInputValue).toDate()
                        });
                      }}
                      className="w-5 h-5 ml-2 cursor-pointer hover:fill-gray-600"
                    />
                    <IoCloseCircle
                      className="w-5 h-5 cursor-pointer hover:fill-gray-600"
                      onClick={() => setEditingDueDate(false)}
                    />
                  </div>
                ) : (
                  <FaEdit
                    className="w-4 h-4 ml-2 cursor-pointer hover:fill-gray-600"
                    onClick={() => {
                      setEditingDueDate(true);
                      if (dueDateInput.current) dueDateInput.current.focus();
                    }}
                  />
                )}
              </div>
              <input
                type="datetime-local"
                value={dueDateInputValue}
                onChange={(event) => setDueDateInputValue(event.target.value)}
                readOnly={!editingDueDate}
                ref={dueDateInput}
              />
            </div>
            <div>
              <div className="inline-flex items-center">
                <h3 className="underline">Do Date</h3>
                {editingDoDate ? (
                  <div className="inline-flex items-center">
                    <IoMdCheckmarkCircle
                      onClick={() => {
                        setEditingDoDate(false);
                        onUpdate({
                          ...task,
                          doDate: dayjs(doDateInputValue).toDate()
                        });
                      }}
                      className="w-5 h-5 ml-2 cursor-pointer hover:fill-gray-600"
                    />
                    <IoCloseCircle
                      className="w-5 h-5 cursor-pointer hover:fill-gray-600"
                      onClick={() => setEditingDoDate(false)}
                    />
                  </div>
                ) : (
                  <FaEdit
                    className="w-4 h-4 ml-2 cursor-pointer hover:fill-gray-600"
                    onClick={() => {
                      setEditingDoDate(true);
                      if (doDateInput.current) doDateInput.current.focus();
                    }}
                  />
                )}
              </div>
              <input
                type="datetime-local"
                value={doDateInputValue}
                onChange={(event) => setDoDateInputValue(event.target.value)}
                readOnly={!editingDoDate}
                ref={doDateInput}
              />
            </div>
          </div>
        </div>
        {task.description != null ? (
          <div className="p-1">
            <div className="inline-flex items-center justify-between w-full">
              <h3 className="mt-2 text-lg">Description</h3>
              {editingDescription ? (
                <div className="inline-flex items-center">
                  <IoMdCheckmarkCircle
                    className="mt-2 w-5 h-5 cursor-pointer hover:fill-gray-600"
                    onClick={() => {
                      setEditingDescription(false);
                      onUpdate({
                        ...task,
                        description: descriptionInputValue
                      });
                    }}
                  />
                  <IoCloseCircle
                    className="mt-2 w-5 h-5 cursor-pointer hover:fill-gray-600"
                    onClick={() => {
                      setEditingDescription(false);
                      setDescriptionInputValue(
                        task.description != null ? task.description : ""
                      );
                    }}
                  />
                </div>
              ) : (
                <FaEdit
                  className="mt-1 w-4 h-4 cursor-pointer hover:fill-gray-600"
                  onClick={() => setEditingDescription(true)}
                />
              )}
            </div>
            <hr className="w-full h-px bg-gray-300 mt-0 mb-2" />
            {editingDescription ? (
              <MarkdownEditor
                value={descriptionInputValue}
                onChange={(value) => setDescriptionInputValue(value)}
              />
            ) : (
              <MarkdownPreview
                source={task.description}
                rehypeRewrite={(node, _index, parent) => {
                  if (
                    node.type == "element" &&
                    node.tagName == "a" &&
                    parent &&
                    parent.type == "element" &&
                    /^h(1|2|3|4|5|6)/.test(parent.tagName)
                  ) {
                    parent.children = parent.children.slice(1);
                  }
                }}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CheckboxModal;
