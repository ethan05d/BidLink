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
    const userId = session.user.id;
    const userName = session.user.name;
    const { id } = params;
    const supabase = createClient();
    const json = await req.json();
  } catch (error) {
    console.log(error);
  }
}
