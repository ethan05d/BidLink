import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export type BidProps = {
  id: string;
  bidder_id: string;
  bid_amount: number;
  bid_time: string;
  bidder_name: string;
};

export const BidHistoryItem = ({ bid }: { bid: BidProps }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <div className="flex items-center space-x-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={bid.bidder_id} />
          <AvatarFallback>{bid.bidder_name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{bid.bidder_name}</span>
      </div>
      <div className="text-right">
        <span className="font-bold">${bid.bid_amount.toFixed(2)}</span>
        <p className="text-xs text-muted-foreground">
          {new Date(bid.bid_time).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};
