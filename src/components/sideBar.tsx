// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { IoHome, IoCalendar, IoSettingsSharp, IoToday } from "react-icons/io5";

function SideBar() {
  return (
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
  );
}

export default SideBar;
