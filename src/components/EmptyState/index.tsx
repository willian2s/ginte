import { Search } from "lucide-react";

interface EmptyStateProps {
  searchTerm?: string;
  onClearSearch?: () => void;
}

export const EmptyState = ({ searchTerm, onClearSearch }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-zinc-400">
      <Search className="w-12 h-12 mb-4" />
      <p className="text-lg font-semibold">Nenhum resultado encontrado</p>
      <p className="mt-1">
        {searchTerm
          ? "Tente buscar por outro nome ou email"
          : "Não há clientes cadastrados"}
      </p>
      {searchTerm && onClearSearch && (
        <button
          onClick={onClearSearch}
          className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
        >
          Limpar busca
        </button>
      )}
    </div>
  );
};
