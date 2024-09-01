import DateTimeDisplay from "./DateTimeDisplay";

export const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <div className="flex flex-row items-center justify-end bg-blue-50 p-4 rounded-lg">
      <span className="text-m md:text-xl font-semibold text-blue-700 whitespace-nowrap">
        Time Left
      </span>
      <div className="flex w-full justify-end">
        <div className="flex items-center justify-center space-x-2 md:space-x-4 text-sm md:text-base lg:text-lg">
          <DateTimeDisplay value={days} type="Days" isDanger={days <= 3} />
          <span className="text-gray-400">:</span>
          <DateTimeDisplay value={hours} type="Hrs" isDanger={hours <= 1} />
          <span className="text-gray-400">:</span>
          <DateTimeDisplay
            value={minutes}
            type="Min"
            isDanger={minutes <= 15 && hours <= 1 && days <= 3}
          />
          <span className="text-gray-400">:</span>
          <DateTimeDisplay
            value={seconds}
            type="Sec"
            isDanger={seconds <= 30 && minutes <= 15 && hours <= 1 && days <= 3}
          />
        </div>
      </div>
    </div>
  );
};
