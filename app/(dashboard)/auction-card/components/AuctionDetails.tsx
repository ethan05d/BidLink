import { UserIcon, CalendarIcon } from "lucide-react";
import { AuctionCardType } from "../../page";

interface AuctionDetailsProps {
  auctionCard: AuctionCardType;
}

export const AuctionDetails = ({ auctionCard }: AuctionDetailsProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <h2 className="text-lg md:text-xl font-semibold mb-2">Auction Details</h2>
      <ul className="space-y-2">
        <li className="flex items-center">
          <UserIcon className="flex items-center mx-2" />
          {auctionCard.seller_name || "N/A"}
        </li>
        <li className="flex items-center">
          <CalendarIcon className="flex items-center mx-2" />

          {auctionCard.created_at
            ? new Date(auctionCard.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A"}
        </li>
      </ul>
    </div>
  );
};
