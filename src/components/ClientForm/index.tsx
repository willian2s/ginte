"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../Form/Input";
import { PhoneInput } from "../Form/PhoneInput";
import { clientSchema, type ClientFormData } from "../../schemas/client.schema";
import { formatPhone } from "../../utils/formatter";
import { toast } from "react-hot-toast";

interface ClientFormProps {
  initialData?: ClientFormData;
  onSubmit: (data: ClientFormData) => Promise<void>;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export function ClientForm({
  initialData,
  onSubmit,
  isLoading,
  mode,
}: ClientFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    mode: "onBlur",
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: ClientFormData) => {
    try {
      await onSubmit(data);
      toast.success(
        mode === "create"
          ? "Cliente cadastrado com sucesso!"
          : "Cliente atualizado com sucesso!"
      );
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(
        mode === "create"
          ? "Erro ao cadastrar cliente"
          : "Erro ao atualizar cliente"
      );
    }
  };

  return (
    <div className="p-4 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="hover:bg-zinc-100 rounded-lg p-2 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-zinc-800" />
        </button>
        <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-800">
          {mode === "create" ? "Cadastrar Cliente" : "Editar Cliente"}
        </h1>
      </div>

      {/* Form Card */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-6 border-b border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome"
                placeholder="Digite o nome completo"
                error={errors.name}
                {...register("name")}
              />

              <Input
                label="E-mail"
                type="email"
                placeholder="Digite o e-mail"
                error={errors.email}
                {...register("email")}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    label="Telefone"
                    value={formatPhone(value || "")}
                    onChange={onChange}
                    error={errors.phone}
                  />
                )}
              />

              <Input
                label="Data de Nascimento"
                type="date"
                error={errors.birthDate}
                {...register("birthDate")}
              />

              <div className="md:col-span-2">
                <Input
                  label="Endereço"
                  placeholder="Digite o endereço completo"
                  error={errors.address}
                  {...register("address")}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-zinc-950 text-white border border-zinc-800 hover:bg-zinc-900 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
