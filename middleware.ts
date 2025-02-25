import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Este arquivo deve estar na raiz do projeto (mesmo nível que package.json)
export function middleware(request: NextRequest) {
  // Verificar se existe um token de autenticação
  const token = request.cookies.get("auth_token")?.value;

  // Verificar se a rota atual é uma página de autenticação
  const isAuthPage = request.nextUrl.pathname === "/login";

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ["/login", "/register", "/forgot-password"];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // Se não há token e a rota não é pública, redirecionar para login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se há token e a rota é de autenticação, redirecionar para home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continuar com a requisição normalmente
  return NextResponse.next();
}

// Configurar quais rotas o middleware deve processar
export const config = {
  // Aplicar o middleware a todas as rotas exceto:
  // - API routes (/api/*)
  // - Arquivos estáticos (_next/static/*, _next/image/*)
  // - Favicon, robots.txt, etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
