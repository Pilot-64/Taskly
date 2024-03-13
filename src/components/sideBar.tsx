// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { IoHome, IoCalendar, IoSettingsSharp, IoToday } from "react-icons/io5";
import { Tabs } from "../App";

interface sideBarProps {
  onTabSwitch(newTab: string): void;
}

function SideBar({ onTabSwitch }: sideBarProps) {
  return (
    <div className="sticky top-0 bg-slate-100 h-dvh w-full p-4 self-start">
      <ul className="space-y-1 select-none">
        <div className="flex my-2 items-center">
          <img src="https://picsum.photos/50/50" />
          <p className="ml-3 font-medium">Lorem Ipsum Dolor</p>
        </div>
        <div className="w-full h-px bg-gray-300" />
        <button
          className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full"
          onClick={() => onTabSwitch(Tabs.home)}
        >
          <IoHome className="mr-3 fill-slate-600" /> Home
        </button>
        <button
          className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full"
          onClick={() => onTabSwitch(Tabs.today)}
        >
          <IoToday className="mr-3 fill-slate-600" /> Today
        </button>
        <button
          className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full"
          onClick={() => onTabSwitch(Tabs.upcoming)}
        >
          <IoCalendar className="mr-3 fill-slate-600" /> Upcoming
        </button>
        <div className="w-full h-px bg-gray-300" />
        <button
          className="p-2 bg-transparent hover:bg-sky-100 rounded-md flex items-center w-full"
          onClick={() => onTabSwitch(Tabs.settings)}
        >
          <IoSettingsSharp className="mr-3 fill-slate-600" /> Settings
        </button>
      </ul>
    </div>
  );
}

export default SideBar;
