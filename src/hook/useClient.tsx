import useSWR from "swr";
import { ApiResponse, Client } from "../types";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }
  return response.json();
};

export function useClients(page: number, limit: number, search: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Client>>(
    `/api/user?page=${page}&limit=${limit}&search=${search}`,
    fetcher
  );

  const deleteClients = async (ids: number[]) => {
    try {
      await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      });

      // Revalidate the data
      mutate();
    } catch (error) {
      console.error("Error deleting clients:", error);
      throw error;
    }
  };

  return {
    clients: data?.data ?? [],
    pagination: data?.meta,
    isLoading,
    isError: error,
    deleteClients,
    mutate,
  };
}
