import { AuctionCardType } from "../../page";
import { ShowCounter } from "./ShowCounter";
import { useCountdown } from "./UseCountdown";
import { BidForm } from "./BidForm";

interface BidInputProps {
  auctionCard: AuctionCardType;
}

export const BidCard = ({ auctionCard }: BidInputProps) => {
  const [days, hours, minutes, seconds] = useCountdown(auctionCard.end_time);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-row items-center justify-end bg-blue-50 p-4 rounded-lg">
          <span className="text-lg md:text-xl font-semibold text-blue-700 whitespace-nowrap">
            Time Left
          </span>
          <div className="flex w-full justify-end">
            <ShowCounter
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="text-lg md:text-xl font-semibold text-gray-700">
            Current Bid
          </span>
          <span className="text-xl md:text-2xl font-bold text-green-600">
            $
            {auctionCard.starting_bid.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      <BidForm />
    </div>
  );
};
