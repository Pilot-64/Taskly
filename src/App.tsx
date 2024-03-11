import { IoHome, IoCalendar, IoSettingsSharp, IoToday } from "react-icons/io5";

import React, { useState } from "react";

import CustomCheckbox from "./components/checkbox";

function App() {
  const [checkboxes, setCheckboxes] = useState<React.ReactNode[]>([]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const inputValue = event.currentTarget.value.trim();
      if (inputValue) {
        const newCheckbox = (
          <CustomCheckbox label={inputValue} key={inputValue} />
        );
        setCheckboxes((prevCheckboxes) => [...prevCheckboxes, newCheckbox]);
        event.currentTarget.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-3 antialiased">
      <div className="bg-slate-100 h-full w-full p-4">
        <ul className="space-y-1 select-none">
          <div className="flex my-2 items-center">
            <img className="" src="https://picsum.photos/50/50" />
            <p className="ml-3 font-medium">Lorem Ipsum Dolor</p>
          </div>
          <div className="w-full h-px bg-gray-300" />
          <button className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full">
            <IoHome className="mr-3 fill-slate-600" /> Home
          </button>
          <button className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full">
            <IoToday className="mr-3 fill-slate-600" /> Today
          </button>
          <button className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full">
            <IoCalendar className="mr-3 fill-slate-600" /> Upcoming
          </button>
          <div className="w-full h-px bg-gray-300" />
          <button className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full">
            <IoSettingsSharp className="mr-3 fill-slate-600" /> Settings
          </button>
        </ul>
      </div>
      <div className="bg-white col-span-2 h-full w-full p-5 flex flex-col space-y-2">
        <div className="flex flex-row space-x-5 items-center select-none p-1">
          <h1 className="text-3xl font-bold">Home</h1>
          <div className="h-full w-px bg-gray-300" />
          <div className="flex flex-row items-center space-x-2">
            <h1 className="text-xl font-bold">0</h1>
            <p>Unfinished Tasks, Woohoo!</p>
          </div>
        </div>

        <ul>
          {checkboxes.map((checkbox: React.ReactNode) => {
            const key = Math.random();

            return (
              <li className="space-y-2">
                <input
                  type="radio"
                  id={key}
                  name="hosting"
                  value={key}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor={key}
                  className="inline-flex items-center justify-between w-full bg-white rounded-lg cursor-pointer peer-checked:bg-gray-100 peer-checked:text-gray-100 hover:text-gray-50 hover:bg-gray-50"
                >
                  <div key={checkbox.key}>{checkbox}</div>
                </label>
              </li>
            );
          })}
        </ul>
        <input
          className="bg-gray-50"
          type="text"
          placeholder="Add new"
          onKeyPress={handleInputKeyPress}
        />
      </div>
    </div>
  );
}

export default App;
