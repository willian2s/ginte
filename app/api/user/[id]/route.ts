import { ErrorHandler } from "@/src/common/utils/error-handle";
import { User } from "@/src/repositories";
import { FindOne } from "@/src/repositories/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<FindOne> }
) {
  try {
    const { id } = await params;

    const user = await User.FindOne({
      id,
    });

    if (!user) {
      throw new Error("Usuário não encontrado", {
        cause: "NotFound",
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<FindOne> }
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const user = await User.Update(
      {
        id,
      },
      body
    );

    return NextResponse.json(user);
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<FindOne> }
) {
  try {
    const { id } = await params;

    await User.Delete({
      id,
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
