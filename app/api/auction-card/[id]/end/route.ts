import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const supabase = createClient();

  try {
    // Fetch the auction card
    const { data: auctionCard, error: auctionError } = await supabase
      .from("auction_cards")
      .select("*")
      .eq("id", id)
      .single();

    if (auctionError) throw auctionError;

    // Set the auction status to ended
    const { error: statusError } = await supabase
      .from("auction_cards")
      .update({
        auction_status: "ended",
      })
      .eq("id", id);

    if (statusError) throw statusError;

    // Check if the auction has ended
    if (new Date(auctionCard.end_time) > new Date()) {
      return NextResponse.json(
        { message: "Auction has not ended yet" },
        { status: 400 }
      );
    }

    // Fetch the highest bid
    const { data: highestBid, error: bidError } = await supabase
      .from("bids")
      .select("*")
      .eq("auction_card_id", id)
      .order("bid_amount", { ascending: false })
      .limit(1)
      .single();

    // If there are no bids, set the winner to the NONE
    if (!highestBid) {
      const { error: updateError } = await supabase
        .from("auction_cards")
        .update({
          winner_id: "none",
        })
        .eq("id", id);

      if (updateError) throw updateError;

      return NextResponse.json({
        message: "Auction ended and winner updated successfully",
      });
    }

    if (bidError && bidError.code !== "PGRST116") throw bidError;

    // Update the auction card with the winner
    const { error: updateError } = await supabase
      .from("auction_cards")
      .update({
        winner_id: highestBid?.bidder_id || null,
      })
      .eq("id", id);

    if (updateError) throw updateError;

    return NextResponse.json({
      message: "Auction ended and winner updated successfully",
    });
  } catch (error) {
    console.error("Error ending auction:", error);
    return NextResponse.json(
      { error: "Failed to end auction" },
      { status: 500 }
    );
  }
}
