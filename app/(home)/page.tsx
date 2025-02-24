"use client";
import React, { useState } from "react";
import { Trash2, Check, Loader2 } from "lucide-react";
import { useClients } from "@/src/hook/useClient";
import { useDebounce } from "@/src/hook/useDebounce";
import { toast } from "react-hot-toast";
import { ContextMenu } from "@/src/components/ContextMenu";
import { SearchBar } from "@/src/components/SearchBar";
import { EmptyState } from "@/src/components/EmptyState";
import { TableHeader } from "@/src/components/Table/TableHeader";
import { TableRow } from "@/src/components/Table/TableRow";
import { Pagination } from "@/src/components/Pagination";
import { MobileTableRow } from "@/src/components/Table/MobileTableRow";
import { DeleteConfirmationModal } from "@/src/components/DeleteConfirmModal";

const Lista = () => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 10;

  const debouncedSearch = useDebounce(searchTerm, 300);

  const { clients, pagination, isLoading, isError, deleteClients } = useClients(
    currentPage,
    ITEMS_PER_PAGE,
    debouncedSearch
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const toggleRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === clients.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(clients.map((client) => client.id)));
    }
  };

  // const handleDeleteSelected = async () => {
  //   try {
  //     const selectedIds = Array.from(selectedRows);
  //     await deleteClients(selectedIds);
  //     setSelectedRows(new Set());
  //     toast.success("Clientes excluídos com sucesso!");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Erro ao excluir clientes");
  //   }
  // };

  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    clientId: number | null;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    clientId: null,
  });

  const handleContextMenu = (e: React.MouseEvent, clientId: number) => {
    e.preventDefault();
    e.stopPropagation();

    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const x = rect.right - 10;
    const y = rect.top + scrollTop;

    setContextMenu({
      isOpen: true,
      position: {
        x: x,
        y: y,
      },
      clientId,
    });
  };

  const handleEditClient = (clientId: number) => {
    console.log("Editar cliente:", clientId);
    // Implementar lógica de edição
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "single" | "multiple";
    ids: number[];
  } | null>(null);

  const handleDeleteClick = (type: "single" | "multiple", ids: number[]) => {
    setItemToDelete({ type, ids });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteClients(itemToDelete.ids);
      toast.success(
        itemToDelete.type === "multiple"
          ? "Clientes excluídos com sucesso!"
          : "Cliente excluído com sucesso!"
      );
      setSelectedRows(new Set());
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir cliente(s)");
    }
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Erro ao carregar dados
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1">
      <div className="p-4 lg:p-8 pt-16 lg:pt-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-800 mb-4 lg:mb-8">
          Clientes
        </h1>

        <div className="bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="p-4 lg:p-6 border-b border-zinc-800">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:justify-between lg:items-center">
              <SearchBar
                value={searchTerm}
                onChange={handleSearch}
                onClear={clearSearch}
              />

              <button
                onClick={() =>
                  handleDeleteClick("multiple", Array.from(selectedRows))
                }
                className={`flex items-center justify-center gap-2.5 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap ${
                  selectedRows.size === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={selectedRows.size === 0}
              >
                <span>Excluir Selecionados</span>
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : clients.length === 0 ? (
            <EmptyState searchTerm={searchTerm} onClearSearch={clearSearch} />
          ) : (
            <>
              {/* Versão Mobile */}
              <div className="lg:hidden">
                <div className="sticky top-0 flex items-center gap-3 px-4 py-3 bg-with-900 border-b border-zinc-800">
                  <div
                    onClick={toggleAllRows}
                    className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
                      selectedRows.size === clients.length
                        ? "bg-neutral-50"
                        : "border border-zinc-50"
                    }`}
                  >
                    {selectedRows.size === clients.length && (
                      <Check className="w-3.5 h-3.5 text-zinc-900" />
                    )}
                  </div>
                  <span className="text-sm text-zinc-400 font-medium">
                    {selectedRows.size} de {clients.length} selecionados
                  </span>
                </div>

                {clients.map((client) => (
                  <MobileTableRow
                    key={client.id}
                    client={client}
                    index={client.id}
                    isSelected={selectedRows.has(client.id)}
                    onToggle={toggleRow}
                  />
                ))}
              </div>

              {/* Versão Desktop */}
              <div className="hidden lg:block">
                <TableHeader
                  onSelectAll={toggleAllRows}
                  isAllSelected={selectedRows.size === clients.length}
                />

                <div className="w-full overflow-x-auto">
                  <div style={{ minWidth: "1200px" }}>
                    {clients.map((client) => (
                      <TableRow
                        key={client.id}
                        client={client}
                        isSelected={selectedRows.has(client.id)}
                        onToggle={toggleRow}
                        onContextMenu={handleContextMenu}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {pagination && clients.length > 0 && (
            <Pagination
              currentPage={pagination.currentPage}
              lastPage={pagination.lastPage}
              hasNext={!!pagination.next}
              hasPrev={!!pagination.prev}
              onPageChange={setCurrentPage}
              selectedCount={selectedRows.size}
              totalItems={clients.length}
            />
          )}
        </div>
      </div>

      <ContextMenu
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        position={contextMenu.position}
        onEdit={() => {
          if (contextMenu.clientId) {
            handleEditClient(contextMenu.clientId);
          }
        }}
        onDelete={() => {
          if (contextMenu.clientId) {
            handleDeleteClick("single", [contextMenu.clientId]);
          }
        }}
      />
      {/* Modal de Confirmação */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        selectedCount={itemToDelete?.ids.length ?? 0}
      />
    </main>
  );
};

export default Lista;
