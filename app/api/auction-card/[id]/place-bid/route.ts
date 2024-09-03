import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { auth } from "@/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const supabase = createClient();
    const json = await req.json();
    const { bidAmount }: { bidAmount: number } = json;

    const { data, error } = await supabase
      .from("auction_cards")
      .update({ current_bid: bidAmount })
      .eq("id", id)
      .select();

    const { data: bidData, error: bidError } = await supabase
      .from("bids")
      .insert({
        bidder_id: session.user.id,
        auction_card_id: id,
        bid_amount: bidAmount,
        bid_time: new Date().toISOString(),
        bidder_name: session.user.name,
      })
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
