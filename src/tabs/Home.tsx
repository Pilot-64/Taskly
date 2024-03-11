// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

import CheckboxList from "../components/checkboxList";

function Home() {
  return (
    <div className="bg-white col-span-2 h-full w-full p-5 flex flex-col space-y-2">
      <div className="flex flex-row space-x-5 items-center select-none p-1">
        <h1 className="text-3xl font-bold">Home</h1>
        <div className="h-full w-px bg-gray-300" />
        <div className="flex flex-row items-center space-x-2">
          <h1 className="text-xl font-bold">0</h1>
          <p>Unfinished Tasks, Woohoo!</p>
        </div>
      </div>
      <CheckboxList />
    </div>
  );
}

export default Home;
