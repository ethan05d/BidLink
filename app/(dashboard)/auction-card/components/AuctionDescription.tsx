import { AuctionCardType } from "../../page";

interface AuctionDetailsProps {
  auctionCard: AuctionCardType;
}

export const AuctionDescription = ({ auctionCard }: AuctionDetailsProps) => {
  return (
    <div className="rounded-lg p-3 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-800">
        {auctionCard.title}
      </h1>
      <p className="text-base md:text-lg text-gray-600 font-lato whitespace-pre-wrap">
        {auctionCard.description}
      </p>
    </div>
  );
};
