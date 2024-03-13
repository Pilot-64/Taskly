// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

function Upcoming() {
  return (
    <div className="bg-white col-span-2 h-full w-full flex flex-col space-y-2">
      <div className="flex sticky top-0 flex-row space-x-5 p-5 items-center select-none bg-white bg-opacity-90">
        <h1 className="text-3xl font-bold">Upcoming</h1>
        <div className="h-full w-px bg-gray-300" />
        <div className="flex flex-row items-center space-x-2">
        <h1 className="text-xl font-bold">0</h1>
          <p>Tasks Upcoming, Woohoo!</p>
          <button
            className="bg-gray-300 p-1 rounded-md"
            onClick={() => {}}
          >
            Clean
          </button>
        </div>
      </div>
      <div className="px-5">
        
      </div>
    </div>
  );
}

export default Upcoming;
