import { AuctionCardType } from "../../page";
import { BidForm } from "./BidForm";
import { AuctionDescription } from "./AuctionDescription";

interface BidInputProps {
  auctionCard: AuctionCardType;
}

export const BidCard = ({ auctionCard }: BidInputProps) => {
  return (
    <div className="bg-white p-4 md:p-3 rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col space-y-4">
        <AuctionDescription auctionCard={auctionCard} />

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
