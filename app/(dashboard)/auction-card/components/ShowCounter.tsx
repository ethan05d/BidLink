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
    <div className="flex items-center justify-center space-x-2 md:space-x-4 text-sm md:text-base lg:text-lg">
      <DateTimeDisplay value={days} type="Days" isDanger={days <= 3} />
      <span className="text-gray-400">:</span>
      <DateTimeDisplay value={hours} type="Hrs" isDanger={false} />
      <span className="text-gray-400">:</span>
      <DateTimeDisplay value={minutes} type="Min" isDanger={false} />
      <span className="text-gray-400">:</span>
      <DateTimeDisplay value={seconds} type="Sec" isDanger={false} />
    </div>
  );
};
