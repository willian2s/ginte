"use client";
import { MobileTableRowProps } from "@/src/types";
import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const MobileTableRow: React.FC<MobileTableRowProps> = ({
  client,
  index,
  isSelected,
  onToggle,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/customer/${client.id}`);
  };

  return (
    <div className="border-b border-zinc-800">
      <div
        className={`flex items-center gap-4 p-4 ${
          isSelected ? "bg-zinc-800" : "bg-zinc-900"
        }`}
      >
        <div
          className={`w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
            isSelected ? "bg-neutral-50" : "border border-zinc-50"
          }`}
          onClick={() => onToggle(index)}
        >
          {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900" />}
        </div>

        <div className="flex-1">
          <div className="font-semibold text-white">{client.name}</div>
          <div className="text-sm text-zinc-400 mt-1">{client.email}</div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronRight
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 bg-zinc-900 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Telefone</span>
            <span className="text-white">{client.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Nascimento</span>
            <span className="text-white">{client.birthDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Endereço</span>
            <span className="text-white">{client.address}</span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onDelete}
              className="bg-red-600 text-white p-2 rounded mx-2"
            >
              Excluir
            </button>
            <button
              onClick={handleEditClick}
              className="bg-zinc-600 text-white p-2 rounded"
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
