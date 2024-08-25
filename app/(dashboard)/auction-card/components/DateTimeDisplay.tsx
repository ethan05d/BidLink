import React from "react";

const DateTimeDisplay = ({
  value,
  type,
  isDanger,
}: {
  value: number;
  type: string;
  isDanger: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 rounded-lg ${
        isDanger ? "bg-red-100 text-red-700" : "bg-blue-100 text-gray-700"
      }`}
    >
      <p className="text-2xl font-bold">{value.toString().padStart(2, "0")}</p>
      <span className="text-xs uppercase">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
