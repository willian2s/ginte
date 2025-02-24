"use client";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Modal } from "../Modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
  clientName?: string;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" bg-white rounded-lg shadow-lg text-zinc border border-zinc-500">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-500">
          <div className="flex items-center gap-2 text-red-500 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            <span>CUIDADO: Você está prestes a excluir um cliente!</span>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-sm text-zinc-700">
          <p>
            Tem certeza de que deseja excluir permanentemente o(s) cliente(s)
            selecionado(s)? Esta ação não pode ser desfeita e todos os dados
            relacionados ao cliente, incluindo histórico de empréstimos e
            faturas, serão removidos permanentemente.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-zinc-500">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-zinc-800 text-white border border-zinc-500 hover:bg-zinc-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Deletar
          </button>
        </div>
      </div>
    </Modal>
  );
};
