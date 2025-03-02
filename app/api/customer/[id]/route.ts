import { ErrorHandler } from "@/src/utils/error-handle";
import { Customer } from "@/src/repositories";
import { FindOne } from "@/src/repositories/customer";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/src/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<FindOne> }
) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const customer = await Customer.FindOne({
      id,
    });

    if (!customer) {
      throw new Error("Cliente não encontrado", {
        cause: "NotFound",
      });
    }

    return NextResponse.json(customer);
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
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = await params;

    const customer = await Customer.Update(
      {
        id,
      },
      body
    );

    return NextResponse.json(customer);
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
