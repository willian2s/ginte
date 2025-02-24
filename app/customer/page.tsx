"use client";
import { useState } from "react";
import { type ClientFormData } from "@/src/schemas/client.schema";
import { useClients } from "@/src/hook/useClient";
import { ClientForm } from "@/src/components/ClientForm";

export default function CreateClient() {
  const [isLoading, setIsLoading] = useState(false);

  const { createClient } = useClients();

  const onSubmit = async (data: ClientFormData) => {
    setIsLoading(true);
    try {
      const birthDate = new Date(data.birthDate).toISOString();
      await createClient({
        ...data,
        birthDate,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return <ClientForm mode="create" onSubmit={onSubmit} isLoading={isLoading} />;
}
