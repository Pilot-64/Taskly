// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState } from "react";

import CheckboxList from "../components/checkboxList";

function Tasks() {
  const [numTasks, setNumTasks] = useState<number>(0);
  const [checklistKey, setChecklistKey] = useState<string>(crypto.randomUUID());

  return (
    <div className="bg-white col-span-2 h-full w-full flex flex-col space-y-2">
      <div className="z-10 flex sticky top-0 flex-row space-x-5 p-5 items-center select-none bg-white bg-opacity-95">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <hr className="h-full w-px bg-gray-300" />
        <div className="flex flex-row w-full items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">{numTasks}</h1>
            <p>
              Unfinished Task
              {numTasks != 1 ? "s" : ""}
              {numTasks == 0 ? ", Woohoo!" : ""}
            </p>
          </div>
          <button
            className="bg-gray-300 p-1 rounded-md"
            onClick={() => setChecklistKey(crypto.randomUUID())}
          >
            Clean
          </button>
        </div>
      </div>

      <CheckboxList
        animation={true}
        key={checklistKey}
        input={true}
        setTaskNum={setNumTasks}
      />
    </div>
  );
}

export default Tasks;
