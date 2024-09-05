import { UserIcon, CalendarIcon } from "lucide-react";
import { AuctionCardType } from "../../page";
import { useCountdown } from "./UseCountdown";
import { ShowCounter } from "./ShowCounter";

interface AuctionDetailsProps {
  auctionCard: AuctionCardType;
}

export const AuctionDetails = ({ auctionCard }: AuctionDetailsProps) => {
  const [days, hours, minutes, seconds] = useCountdown(auctionCard.end_time);

  let showCounter = true;

  if (days + hours + minutes + seconds <= 0) {
    showCounter = false;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <div className="border-1 border-blue-[50] rounded-md mb-2">
        {showCounter ? (
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        ) : (
          <p className="text-center text-red-500">Auction Ended</p>
        )}
      </div>
      <h2 className="text-lg md:text-xl font-semibold mb-2">Auction Details</h2>
      <ul className="space-y-2">
        <li className="flex items-center">
          <UserIcon className="flex-shrink-0 mr-2" />
          <span>Seller: {auctionCard.seller_name || "N/A"}</span>
        </li>
        <li className="flex items-center">
          <CalendarIcon className="flex-shrink-0 mr-2" />
          <span>
            Created:{" "}
            {auctionCard.created_at
              ? new Date(auctionCard.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </span>
        </li>
      </ul>
    </div>
  );
};
