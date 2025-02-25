"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/src/components/Logo";
import {
  type RegisterFormData,
  registerSchema,
} from "@/src/schemas/user.schema";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao criar conta");
      }

      toast.success("Conta criada com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Register error:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar conta"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo */}
        <Logo className="w-[64px] h-[64px] text-zinc-800 mb-8" />

        {/* Card de Registro */}
        <div className="w-full bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/login">
                <ArrowLeft className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
              </Link>
              <h1 className="text-xl font-semibold text-white">Criar conta</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Nome */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Digite seu nome completo"
                  className={`
                    w-full bg-zinc-950 border rounded-lg px-4 py-2.5
                    text-white placeholder-zinc-400
                    focus:outline-none transition-colors
                    ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-800 focus:border-zinc-700"
                    }
                  `}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-sm text-red-400">
                    {errors.name.message}
                  </span>
                )}
              </div>

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

              {/* Confirmar Senha */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  className={`
                    w-full bg-zinc-950 border rounded-lg px-4 py-2.5
                    text-white placeholder-zinc-400
                    focus:outline-none transition-colors
                    ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-800 focus:border-zinc-700"
                    }
                  `}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white font-semibold rounded-lg px-4 py-2.5 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </button>
            </form>
          </div>
        </div>

        {/* Link para login */}
        <p className="mt-4 text-zinc-800">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
