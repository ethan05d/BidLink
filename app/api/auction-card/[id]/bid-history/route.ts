import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = createClient();

    const { data, error } = await supabase
      .from("bids")
      .select("*")
      .eq("auction_card_id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ bidHistory: data });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
