import { ErrorHandler } from "@/src/utils/error-handle";
import { Customer } from "@/src/repositories";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/src/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    let where = {};

    if (search) {
      where = {
        ...where,
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive", // Case insensitive
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive", // Case insensitive
            },
          },
        ],
      };
    }

    const customers = await Customer.FindMany(
      where,
      {
        page,
        limit,
      },
      {
        createdAt: "desc",
      }
    );

    return NextResponse.json(customers);
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const data = await req.json();

    if (!data) {
      throw new Error("Dados inválidos", {
        cause: "BadRequest",
      });
    }

    if (
      !data.name ||
      !data.email ||
      !data.address ||
      !data.phone ||
      !data.birthDate
    ) {
      throw new Error("Dados inválidos", {
        cause: "BadRequest",
      });
    }

    // Verificação do formato da data (ISO-8601)
    if (isNaN(new Date(data.birthDate).getTime())) {
      throw new Error("Formato de data inválido", {
        cause: "BadRequest",
      });
    }

    // Verificação do telefone (Formato brasileiro de telefone)
    const phoneRegex = /^[0-9]{10,11}$/; // Considerando um telefone no formato nacional sem máscara
    if (!phoneRegex.test(data.phone)) {
      throw new Error("Formato de telefone inválido", {
        cause: "BadRequest",
      });
    }

    const customer = await Customer.Create(data);

    return NextResponse.json(customer);
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const data = await req.json();

    await Customer.Delete({
      id: data,
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
