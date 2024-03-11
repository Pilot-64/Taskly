// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useState } from "react";

interface CustomCheckboxProps {
  label: string;
}

function CustomCheckbox({ label }: CustomCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full flex flex-row justify-between items-center p-1">
      <div onClick={handleCheckboxClick}>
        <input
          id="checkbox-1"
          type="checkbox"
          className="bg-white border-green-300 focus:ring-3 focus:ring-green-300 h-full mx-1 rounded-full"
          checked={isChecked}
          onChange={() => {}}
        />
        <label className={`text-gray-700 ${isChecked ? "line-through" : ""}`}>
          {label}
        </label>
      </div>
    </div>
  );
}

export default CustomCheckbox;
