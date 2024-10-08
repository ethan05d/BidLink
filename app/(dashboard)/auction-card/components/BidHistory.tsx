import { BidHistoryItem, BidProps } from "./BidHistoryItem";

export const BidHistory = ({ bidHistory }: { bidHistory: BidProps[] }) => {
  return (
    <div className="space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Bid History</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {bidHistory.map((bid) => (
            <BidHistoryItem key={bid.id} bid={bid} />
          ))}
        </div>
      </div>
    </div>
  );
};
