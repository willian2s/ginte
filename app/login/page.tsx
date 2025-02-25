"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useAuth } from "@/src/hook/useAuth";
import { Logo } from "@/src/components/Logo";
import Link from "next/link";
import { type LoginFormData, loginSchema } from "@/src/schemas/user.schema";

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);

    if (success) {
      toast.success("Login realizado com sucesso!");
      router.push("/");
    } else {
      setError("root", {
        message: error || "E-mail ou senha incorretos",
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo */}
        <Logo className="text-zinc-800 my-2" />

        {/* Card de Login */}
        <div className="w-full bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-white mb-6">
              Fazer login
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className={`
                    w-full bg-zinc-950 border rounded-lg px-4 py-2.5
                    text-white placeholder-zinc-400
                    focus:outline-none transition-colors
                    ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-800 focus:border-zinc-700"
                    }
                  `}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-sm text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className={`
                    w-full bg-zinc-950 border rounded-lg px-4 py-2.5
                    text-white placeholder-zinc-400
                    focus:outline-none transition-colors
                    ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-800 focus:border-zinc-700"
                    }
                  `}
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-sm text-red-400">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Erro geral */}
              {errors.root && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                  <span className="text-sm text-red-400">
                    {errors.root.message}
                  </span>
                </div>
              )}

              {/* Esqueci minha senha */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  Esqueci minha senha
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white font-semibold rounded-lg px-4 py-2.5 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>

        {/* Link para cadastro */}
        <p className="mt-4 text-zinc-800">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
