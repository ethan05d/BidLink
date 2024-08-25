import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Read the auction card from the database
    const supabase = createClient();

    let { data, error } = await supabase.from("auction_cards").select("*");

    if (error) {
      console.error("Database read error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, auctionCards: data });
  } catch (error) {
    console.error("Error reading auction cards:", error);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
