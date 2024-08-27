import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/s3";

export async function POST(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    console.log("params key", params.key);
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: params.key,
      }),
      { expiresIn: 60 }
    );

    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.log("error");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: params.key,
    });

    await r2.send(deleteCommand);

    return NextResponse.json({ message: "Object deleted successfully" });
  } catch (err) {
    console.error("Error deleting object:", err);
    return NextResponse.json(
      { error: "Failed to delete object" },
      { status: 500 }
    );
  }
}
