import { Prisma } from "@prisma/client";

function PrismaErrorParser(
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientValidationError
): { message: string; statusCode: number } {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          message: `Erro: O valor fornecido já existe no banco de dados. (${error.meta?.target})`,
          statusCode: 409,
        };
      case "P2003":
        return {
          message: `Erro: Violação de integridade referencial. Verifique se os dados relacionados existem.`,
          statusCode: 400,
        };
      case "P1001":
        return {
          message: `Erro: Não foi possível conectar ao banco de dados. Verifique sua conexão e configurações.`,
          statusCode: 503,
        };
      case "P2025":
        return {
          message: `Erro: O registro solicitado não foi encontrado no banco de dados.`,
          statusCode: 404,
        };
      default:
        if (error.message.includes("argument")) {
          // Detecta erro de parâmetro faltante
          return {
            message:
              "Erro: Parâmetros obrigatórios estão faltando. Verifique os dados fornecidos.",
            statusCode: 400,
          };
        }
        return {
          message: `Erro desconhecido: ${error.message}`,
          statusCode: 500,
        };
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      message: `Erro desconhecido: ${error.message}`,
      statusCode: 500,
    };
  } else {
    return {
      message: "Erro inesperado",
      statusCode: 500,
    };
  }
}

function ParseCauseToCode(cause: string): number {
  switch (cause) {
    case "NotFound":
      return 404;
    case "BadRequest":
      return 400;
    case "Conflict":
      return 409;
    case "Unauthorized":
      return 401;
    case "Forbidden":
      return 403;
    case "ServiceUnavailable":
      return 503;
    case "Unknow":
      return 500;
    default:
      return 500;
  }
}

export function ErrorHandler(error: unknown): {
  message: string;
  statusCode: number;
} {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError
  ) {
    const errorMessage = PrismaErrorParser(error);

    return errorMessage;
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: ParseCauseToCode(error.cause as string),
    };
  }

  return {
    message: "Erro inesperado",
    statusCode: ParseCauseToCode("Unknow"),
  };
}
