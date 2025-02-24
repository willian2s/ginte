import useSWR from "swr";
import { ApiResponse, Client } from "../types";
import { ClientFormData } from "../schemas/client.schema";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }
  return response.json();
};

export function useClients(page?: number, limit?: number, search?: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Client>>(
    `/api/customer?page=${page}&limit=${limit}&search=${search}`,
    fetcher
  );

  const GetClient = (clientId: string) => {
    const { data, error, isLoading } = useSWR(
      `/api/customer/${clientId}`,
      fetcher
    );

    return {
      data,
      isLoading,
      isError: error,
    };
  };

  const deleteClients = async (ids: number[]) => {
    try {
      await fetch("/api/customer", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      });

      // Revalidate the data
      mutate();
    } catch (error) {
      console.error("Error deleting customers:", error);
      throw error;
    }
  };

  const createClient = async (data: ClientFormData) => {
    try {
      await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      mutate();
    } catch (error) {
      console.error("Error create customer:", error);
      throw error;
    }
  };

  const updateClient = async (clientId: string, data: ClientFormData) => {
    try {
      await fetch(`/api/customer/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      mutate();
    } catch (error) {
      console.error("Error create customer:", error);
      throw error;
    }
  };

  return {
    clients: data?.data ?? [],
    pagination: data?.meta,
    isLoading,
    isError: error,
    deleteClients,
    createClient,
    GetClient,
    updateClient,
    mutate,
  };
}
