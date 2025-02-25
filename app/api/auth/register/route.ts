/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/prisma";
import { registerApiSchema } from "@/src/schemas/user.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = registerApiSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este e-mail já está em uso" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Usuário criado com sucesso",
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
