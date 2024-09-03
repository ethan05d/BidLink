import { ClockIcon, UserIcon } from "lucide-react";

interface CardDetailsProps {
  current_bid: number;
  seller_name: string;
}

export const CardDetails = ({ current_bid, seller_name }: CardDetailsProps) => {
  return (
    <div className="flex flex-col space-y-4 mt-auto">
      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
        <h4 className="flex items-center text-md font-semibold text-blue-800 dark:text-blue-200">
          Current Bid: $
          {current_bid.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h4>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
        <div className="text-gray-600 dark:text-gray-400 text-md flex items-center">
          <UserIcon className="w-5 h-5 mr-2" />
          {seller_name}
        </div>
      </div>
    </div>
  );
};
