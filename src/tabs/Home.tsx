// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

import CheckboxList from "../components/checkboxList";

function Home() {
  return (
    <div className="bg-white col-span-2 h-full w-full flex flex-col space-y-2">
      <div className="z-10 flex sticky top-0 flex-row space-x-5 p-5 items-center select-none bg-white bg-opacity-90">
        <h1 className="text-3xl font-bold">Home</h1>
      </div>
      <CheckboxList maxTasks={5} />
    </div>
  );
}

export default Home;
