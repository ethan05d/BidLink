import { AuctionCardType } from "../../page";
import { BidForm } from "./BidForm";
import { AuctionDescription } from "./AuctionDescription";
import { BidProps } from "./BidHistoryItem";
import { BidHistory } from "./BidHistory";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import WinnerCard from "./WinnerCard";
import { useSession } from "next-auth/react";

interface BidInputProps {
  auctionCard: AuctionCardType;
  bidHistory: BidProps[];
}

type WinnerDetailsType = {
  id: string;
  name: string;
  image: string;
};

const fetchWinnerDetails = async (
  auction_id: string
): Promise<WinnerDetailsType> => {
  const { data } = await axios.get<{
    winnerDetails: WinnerDetailsType;
  }>(`/api/auction-card/${auction_id}/winner-details`);

  return data.winnerDetails;
};

export const BidCard = ({ auctionCard, bidHistory }: BidInputProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  let showBidHistory = true;
  let showWinnerDetails = false;
  let showBidForm = true;
  if (!bidHistory || bidHistory.length === 0) {
    showBidHistory = false;
  }

  if (auctionCard.auction_status === "ended") {
    showWinnerDetails = true;
  }

  if (auctionCard.seller_id === session?.user?.id) {
    showBidForm = false;
  }

  const { data: winnerDetails } = useQuery({
    queryKey: ["winnerDetails", auctionCard.id],
    queryFn: () => fetchWinnerDetails(auctionCard.id),
    enabled:
      auctionCard.winner_id !== "none" &&
      auctionCard.auction_status === "ended",
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["winnerDetails", auctionCard.id],
    });
  }, [queryClient, auctionCard.id]);

  return (
    <div className="bg-white p-4 md:p-3 rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col space-y-4">
        <AuctionDescription auctionCard={auctionCard} />

        {!showWinnerDetails && (
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <span className="text-lg md:text-xl font-semibold text-gray-700">
              Current Bid
            </span>
            <span className="text-2xl md:text-3xl font-bold text-green-700">
              $
              {auctionCard.current_bid
                ? auctionCard.current_bid.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"}
            </span>
          </div>
        )}
        <BidForm auctionCard={auctionCard} />
        {showBidHistory ? (
          <BidHistory bidHistory={bidHistory} />
        ) : showBidForm ? (
          <p className="flex justify-center text-gray-500 dark:text-gray-400">
            No bid history available.
          </p>
        ) : (
          <p className="flex justify-center text-gray-500 dark:text-gray-400">
            You are the seller of this auction.
          </p>
        )}

        {showWinnerDetails && winnerDetails ? (
          <WinnerCard
            winner={winnerDetails.name}
            amount={auctionCard.current_bid?.toString() || "0.00"}
            image={winnerDetails.image}
          />
        ) : (
          showWinnerDetails && (
            <WinnerCard winner={"No Winner"} amount={"0.00"} image={" "} />
          )
        )}
      </div>
    </div>
  );
};
