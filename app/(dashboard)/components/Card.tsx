"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CardDetails } from "./CardDetails";
import { DeleteCard } from "./DeleteCard";

interface CardProps {
  id: string;
  title: string;
  description: string;
  starting_bid: number;
  seller_id: string;
  seller_name: string;
  end_time: string;
  image_url?: string;
}

export const Card = ({
  id,
  title,
  description,
  starting_bid,
  seller_id,
  seller_name,
  image_url,
}: CardProps) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // Check if the current user is the seller
  const isCurrentUserSeller = session?.user?.id === seller_id;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/auction-card/${id}`);
      queryClient.invalidateQueries({ queryKey: ["auction_cards"] });

      const imageKey = image_url?.split(".dev/").pop();
      if (imageKey) {
        await axios.delete(`/api/upload/${imageKey}`);
      }

      toast.success("Auction card deleted successfully");
    } catch (error) {
      toast.error("Error deleting auction card");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full mb-4 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      <div className="relative group flex-grow">
        <div className="relative h-[300px] w-full rounded-t-lg">
          <Link
            href={`/auction-card/${id}`}
            className="hover:opacity-70 transition-opacity duration-300"
          >
            <img
              src={
                image_url || "https://placehold.co/600x400/000000/FFFFFF/png"
              }
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              alt={title}
            />
          </Link>
          <DeleteCard
            isCurrentUserSeller={isCurrentUserSeller}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      <div className="flex flex-col h-full p-4 flex-grow">
        <h3 className="truncate text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <p className="truncate text-gray-600 dark:text-gray-400 flex-grow group-hover:whitespace-pre-line transition-all duration-300">
          {description}
        </p>

        <CardDetails starting_bid={starting_bid} seller_name={seller_name} />
      </div>
    </div>
  );
};
