import { AuctionCardType } from "../../page";

interface AuctionDetailsProps {
  auctionCard: AuctionCardType;
}

export const AuctionDetails = ({ auctionCard }: AuctionDetailsProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg md:text-xl font-semibold mb-2">Auction Details</h2>
      <ul className="space-y-2">
        <li>
          <strong>Seller:</strong> {auctionCard.seller_name || "N/A"}
        </li>
        <li>
          <strong>Created at:</strong>{" "}
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
