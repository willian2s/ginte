import { ErrorHandler } from "@/src/utils/error-handle";
import { User } from "@/src/repositories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    const users = await User.FindMany(where, {
      page,
      limit,
    });

    return NextResponse.json(users);
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function POST(req: NextRequest) {
  try {
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

    const user = await User.Create(data);

    return NextResponse.json(user);
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();

    await User.Delete({
      id: data,
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    const { message, statusCode } = ErrorHandler(error);

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
