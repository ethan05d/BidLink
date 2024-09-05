"use client";

import { useEffect } from "react";
import { Card } from "./components/Card";
import { SkeletonCard } from "./components/SkeletonCard";
import axios from "axios";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type AuctionCardType = {
  id: string;
  title: string;
  description: string;
  starting_bid: number;
  seller_id?: string;
  seller_name?: string;
  end_time: string;
  image_url?: string;
  winner_id?: string;
  created_at?: string;
  current_bid?: number;
  auction_status?: string;
};

const fetchAuctionCards = async (): Promise<AuctionCardType[]> => {
  try {
    const response = await axios.get<{
      success: boolean;
      auctionCards: AuctionCardType[];
    }>("/api/auction-cards");

    return response.data.auctionCards;
  } catch (err) {
    toast.error("Error fetching auction cards");
    console.error("Error fetching auction cards:", err);
    throw err;
  }
};

const HomePage = () => {
  const queryClient = useQueryClient();

  const { data: auctionCards, isLoading } = useQuery<AuctionCardType[]>({
    queryKey: ["auction_cards"],
    queryFn: fetchAuctionCards,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["auction_cards"] });
  }, [queryClient]);

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-gray-200">
        Open Bids
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : auctionCards && auctionCards.length > 0 ? (
          auctionCards.map(
            ({
              id,
              title,
              description,
              current_bid,
              seller_id,
              seller_name,
              end_time,
              image_url,
            }) => (
              <Card
                key={id}
                id={id}
                title={title}
                description={description}
                current_bid={current_bid || 0}
                seller_id={seller_id || ""}
                seller_name={seller_name || ""}
                end_time={end_time}
                image_url={image_url}
              />
            )
          )
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No open bids available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
