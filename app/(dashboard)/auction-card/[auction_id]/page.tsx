"use client";

import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuctionCardType } from "../../page";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import { BidCard } from "../components/BidCard";
import { AuctionDetails } from "../components/AuctionDetails";
import { BidProps } from "../components/BidHistoryItem";

const fetchAuctionCard = async (
  auction_id: string
): Promise<AuctionCardType> => {
  try {
    const { data } = await axios.get<{
      auctionCard: AuctionCardType[];
    }>(`/api/auction-card/${auction_id}`);

    return data.auctionCard[0];
  } catch (err) {
    toast.error("Error fetching auction cards");
    console.error("Error fetching auction cards:", err);
    throw err;
  }
};

const fetchBidHistory = async (auction_id: string): Promise<BidProps[]> => {
  const { data } = await axios.get<{
    bidHistory: BidProps[];
  }>(`/api/auction-card/${auction_id}/bid-history`);

  return data.bidHistory.reverse();
};

export default function AuctionCardPage() {
  const queryClient = useQueryClient();
  const { auction_id } = useParams<{ auction_id: string }>();

  const { data: auctionCard, isLoading } = useQuery<AuctionCardType>({
    queryKey: ["auction_card", auction_id],
    queryFn: () => fetchAuctionCard(auction_id),
  });

  const { data: bidHistory } = useQuery<BidProps[]>({
    queryKey: ["bid_history", auction_id],
    queryFn: () => fetchBidHistory(auction_id),
    refetchInterval: 30000,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["auction_card"] });
    queryClient.invalidateQueries({ queryKey: ["bid_history"] });
  }, [queryClient]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : auctionCard ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <img
              src={auctionCard.image_url}
              alt={auctionCard.title}
              className="w-full h-3/4 object-cover rounded-lg shadow-lg"
            />

            <AuctionDetails auctionCard={auctionCard} />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <BidCard auctionCard={auctionCard} bidHistory={bidHistory || []} />
          </div>
        </div>
      ) : (
        <div className="text-center text-xl md:text-2xl text-gray-600">
          Auction card not found
        </div>
      )}
    </div>
  );
}
