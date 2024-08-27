"use client";

import { Button } from "@/components/ui/button";
import { AuctionCardType } from "../../page";
import { useState } from "react";
import {
  DollarSign,
  Minus,
  Plus,
  RefreshCcw,
  TimerResetIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AnimatedNumber } from "@/components/ui/animatednumber";

export const BidForm = ({ auctionCard }: { auctionCard: AuctionCardType }) => {
  const [bidAmount, setBidAmount] = useState(auctionCard.starting_bid);
  const [incrementAmount, setIncrementAmount] = useState(10);

  const incrementBid = () => {
    setBidAmount(bidAmount + incrementAmount);
  };

  const decreaseBid = () => {
    if (bidAmount - incrementAmount < auctionCard.starting_bid) {
      return;
    }
    setBidAmount(bidAmount - incrementAmount);
  };

  const resetBid = () => {
    setBidAmount(auctionCard.starting_bid);
    setIncrementAmount(10);
  };

  const onSubmit = () => {
    console.log(bidAmount);
  };

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
