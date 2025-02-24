"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ClientForm } from "@/src/components/ClientForm";
import type { ClientFormData } from "@/src/schemas/client.schema";
import { Loader2 } from "lucide-react";
import { useClients } from "@/src/hook/useClient";
import { formatISOToInputDate } from "@/src/utils/formatter";

export default function UpdateClient() {
  const params = useParams();
  const id = params.id as string;
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);

  const { GetClient, updateClient } = useClients();
  const { data: clientData, isLoading: isFetching } = GetClient(id as string);

  const handleSubmit = async (data: ClientFormData) => {
    setIsLoading(true);
    try {
      const birthDate = new Date(data.birthDate).toISOString();
      await updateClient(id, {
        ...data,
        birthDate,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-zinc-800 animate-spin" />
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-zinc-800">Cliente não encontrado</p>
      </div>
    );
  }

  const formattedData: ClientFormData = {
    name: clientData.name,
    email: clientData.email,
    phone: clientData.phone,
    birthDate: formatISOToInputDate(clientData.birthDate),
    address: clientData.address,
  };

  return (
    <ClientForm
      mode="edit"
      initialData={formattedData}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
