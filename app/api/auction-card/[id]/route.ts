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

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userName = session.user.name;
    const { id } = params;
    const supabase = createClient();
    const json = await req.json();
    const auctionCard = auctionCardSchema.parse(json);

    // Insert the auction card into the database
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

    if (error) {
      console.error("Database insert error:", error.message);
      console.error("Full error object:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, auctionCard: data[0] });
  } catch (error) {
    console.error("Error creating auction card:", error);

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

  return NextResponse.json({ auctionCard: data });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const supabase = createClient();
    const { id } = params;
    const json = await req.json();
    const updateData = auctionCardUpdateSchema.parse(json);

    // Update the auction card in the database
    const { data, error } = await supabase
      .from("auction_cards")
      .update(updateData)
      .eq("id", id)
      .eq("seller_id", userId)
      .select();

    if (error) {
      console.error("Database update error:", error.message);
      console.error("Full error object:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (data.length === 0) {
      return NextResponse.json(
        { success: false, error: "Auction card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, auctionCard: data[0] });
  } catch (error) {
    console.error("Error updating auction card:", error);

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
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const supabase = createClient();
    const { id } = params;
    const { data, error } = await supabase
      .from("auction_cards")
      .delete()
      .eq("id", id)
      .eq("seller_id", userId);

    if (error) {
      console.error("Database delete error:", error.message);
      console.error("Full error object:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting auction card:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
