interface PaginationProps {
  currentPage: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  selectedCount: number;
  totalItems: number;
}

export const Pagination = ({
  currentPage,
  lastPage,
  hasNext,
  hasPrev,
  onPageChange,
  selectedCount,
  totalItems,
}: PaginationProps) => {
  return (
    <div className="border-t border-zinc-800 p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center text-sm font-semibold text-white">
        <div className="hidden lg:block order-2 lg:order-1">
          {selectedCount} de {totalItems} linhas selecionadas
        </div>
        <div className="flex items-center gap-4 order-1 lg:order-2">
          <div className="text-zinc-400">
            Página {currentPage} de {lastPage}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrev}
              className={`px-4 py-2 rounded-lg border border-zinc-800 transition-colors ${
                !hasPrev
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-zinc-950 text-white hover:bg-zinc-900"
              }`}
            >
              Anterior
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNext}
              className={`px-4 py-2 rounded-lg border border-zinc-800 transition-colors ${
                !hasNext
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-zinc-600 text-white hover:bg-zinc-700"
              }`}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
