"use client";

import { Button } from "@/components/ui/button";
import { AuctionCardType } from "../../page";
import { useState } from "react";
import { DollarSign, Minus, Plus, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AnimatedNumber } from "@/components/ui/animatednumber";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const MAX_BID_AMOUNT_MULTIPLIER = 20;

export const BidForm = ({ auctionCard }: { auctionCard: AuctionCardType }) => {
  if (!auctionCard.current_bid) {
    return null;
  }

  const { data: session } = useSession();
  const [bidAmount, setBidAmount] = useState(auctionCard.current_bid);
  const [incrementAmount, setIncrementAmount] = useState(10);
  const queryClient = useQueryClient();

  const placeBidMutation = useMutation({
    mutationFn: async (newBidAmount: number) => {
      const response = await fetch(
        `/api/auction-card/${auctionCard.id}/place-bid`,
        {
          method: "POST",
          body: JSON.stringify({ bidAmount: newBidAmount }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to place bid");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Bid placed successfully");
      queryClient.invalidateQueries({
        queryKey: ["auction_card", auctionCard.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["bid_history", auctionCard.id],
      });
    },
    onError: () => {
      toast.error("Failed to place bid");
    },
  });

  // Move the logic for early returns to a separate function
  const shouldRenderBidForm = () => {
    return (
      auctionCard.current_bid &&
      session &&
      session.user?.id !== auctionCard.seller_id
    );
  };

  const incrementBid = () => {
    const maxBidAmount = MAX_BID_AMOUNT_MULTIPLIER * auctionCard.starting_bid;
    if (bidAmount + incrementAmount > maxBidAmount) {
      setBidAmount(maxBidAmount);
      return;
    }
    setBidAmount(bidAmount + incrementAmount);
  };

  const decreaseBid = () => {
    // If bid is lower than starting amount
    if (
      !auctionCard.current_bid ||
      bidAmount - incrementAmount < auctionCard.current_bid
    ) {
      setBidAmount(Math.max(auctionCard.current_bid || 0, 0));
      return;
    }
    setBidAmount(bidAmount - incrementAmount);
  };

  const resetBid = () => {
    setBidAmount(Math.max(auctionCard.current_bid || 0, 0));
    setIncrementAmount(10);
  };

  const onSubmit = async () => {
    if (!auctionCard.current_bid || bidAmount <= auctionCard.current_bid) {
      toast.error("Your bid must be higher than the current bid");
      return;
    }

    if (bidAmount > MAX_BID_AMOUNT_MULTIPLIER * auctionCard.starting_bid) {
      toast.error("Your bid must be lower than 500% of the starting bid");
      return;
    }

    placeBidMutation.mutate(bidAmount);
  };

  if (!shouldRenderBidForm()) {
    return null;
  }

  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Place Your Bid</h2>

      <span className="flex items-center justify-center text-5xl font-bold text-primary">
        <DollarSign className="inline-block mr-1 text-green-700" size={36} />
        <AnimatedNumber
          className="inline-flex items-center text-4xl font-normal text-green-700"
          springOptions={{
            bounce: 0,
            duration: 1000,
          }}
          value={bidAmount}
        />
      </span>
      <div className="space-y-6 mt-5">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Button onClick={resetBid} size="icon" className="h-10 w-20">
              <RefreshCcw className="h-5 w-5" />
            </Button>
            <Input
              id="increment-amount"
              type="number"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(Number(e.target.value))}
              className="text-center text-lg font-medium"
              min="1"
            />
            <Button onClick={decreaseBid} size="icon" className="h-10 w-20">
              <Minus className="h-5 w-5" />
            </Button>
            <Button onClick={incrementBid} size="icon" className="h-10 w-20">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={onSubmit}
            className="w-full text-lg font-semibold py-6 hover:scale-105 transition-all duration-300 hover:text-white"
          >
            Place Bid
          </Button>
        </div>
      </div>
    </div>
  );
};
