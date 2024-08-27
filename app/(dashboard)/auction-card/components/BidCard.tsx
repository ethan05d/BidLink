import { AuctionCardType } from "../../page";
import { ShowCounter } from "./ShowCounter";
import { useCountdown } from "./UseCountdown";
import { BidForm } from "./BidForm";

interface BidInputProps {
  auctionCard: AuctionCardType;
}

export const BidCard = ({ auctionCard }: BidInputProps) => {
  const [days, hours, minutes, seconds] = useCountdown(auctionCard.end_time);
  let showCounter = true;

  if (days + hours + minutes + seconds <= 0) {
    showCounter = false;
  }

  return (
    <div className="bg-white p-4 md:p-3 rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col space-y-4">
        {showCounter ? (
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        ) : (
          <ShowCounter days={0} hours={0} minutes={0} seconds={0} />
        )}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="text-lg md:text-xl font-semibold text-gray-700">
            Current Bid
          </span>
          <span className="text-2xl md:text-3xl font-bold text-green-700">
            $
            {auctionCard.starting_bid.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div>
          <BidForm auctionCard={auctionCard} />
        </div>
      </div>
    </div>
  );
};
