import { database } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface GETUser {
  id?: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<GETUser> }
) {
  try {
    const { id } = await params;

    const user = await database.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "GET request to /api/user", id });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }
  }
}
