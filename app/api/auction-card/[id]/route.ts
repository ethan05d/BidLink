import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

// Define the schema for the incoming request body
const auctionCardUpdateSchema = z.object({
  title: z.string().min(2).max(50).optional(),
  description: z.string().min(2).max(250).optional(),
  starting_bid: z.number().nonnegative().optional(),
  end_time: z.string().optional(),
  image_url: z.string().url().nullable().optional(),
});

const auctionCardSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
  starting_bid: z.number().nonnegative(),
  end_time: z.string().min(1, "End time is required"),
  image_url: z.string().url().nullable().optional(),
});

function handleError(error: unknown) {
  console.error("Error:", error);
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { success: false, error: error.errors },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { success: false, error: "Internal Server Error" },
    { status: 500 }
  );
}

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
    const auctionCard = auctionCardSchema.parse({ ...json, id });
    const { id: userId, name: userName } = session.user;

    const { data, error } = await supabase
      .from("auction_cards")
      .insert([
        {
          id: id,
          title: auctionCard.title,
          description: auctionCard.description,
          starting_bid: auctionCard.starting_bid,
          current_bid: auctionCard.starting_bid,
          seller_id: userId as string,
          seller_name: userName as string,
          end_time: new Date(auctionCard.end_time).toISOString(),
          image_url: auctionCard.image_url,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, auctionCard: data[0] });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { id } = params;
  const { data, error } = await supabase
    .from("auction_cards")
    .select("*")
    .eq("id", id);

  if (error) return handleError(error);

  return NextResponse.json({ auctionCard: data });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    const supabase = createClient();
    const { id } = params;
    const json = await req.json();
    const updateData = auctionCardUpdateSchema.parse(json);

    const { data, error } = await supabase
      .from("auction_cards")
      .update(updateData)
      .eq("id", id)
      .eq("seller_id", userId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return NextResponse.json(
        { success: false, error: "Auction card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, auctionCard: data[0] });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    const supabase = createClient();
    const { id } = params;
    const { error } = await supabase
      .from("auction_cards")
      .delete()
      .eq("id", id)
      .eq("seller_id", userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
