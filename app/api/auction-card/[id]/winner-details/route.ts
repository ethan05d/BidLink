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
      .from("auction_cards")
      .select("winner_id")
      .eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    const { data: winnerDetails, error: winnerDetailsError } = await supabase
      .schema("next_auth")
      .from("users")
      .select("id, name, image")
      .eq("id", data[0].winner_id)
      .single();

    if (winnerDetailsError)
      return NextResponse.json(
        { error: winnerDetailsError.message },
        { status: 500 }
      );

    return NextResponse.json({ winnerDetails: winnerDetails });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
