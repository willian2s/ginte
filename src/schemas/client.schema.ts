import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .length(11, "Telefone deve ter 11 dígitos")
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
  birthDate: z.string(),
  address: z
    .string()
    .min(10, "Endereço deve ter no mínimo 10 caracteres")
    .max(200, "Endereço deve ter no máximo 200 caracteres"),
});

export type ClientFormData = z.infer<typeof clientSchema>;
