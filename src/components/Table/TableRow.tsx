import { Check, MoreVertical } from "lucide-react";
import { formatDate, formatPhone } from "@/src/utils/formatter";
import { Client } from "@/src/types";

interface TableRowProps {
  client: Client;
  isSelected: boolean;
  onToggle: (id: number) => void;
  onContextMenu: (e: React.MouseEvent, id: number) => void;
}

export const TableRow = ({
  client,
  isSelected,
  onToggle,
  onContextMenu,
}: TableRowProps) => {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 text-sm font-semibold text-white border-b border-zinc-800 ${
        isSelected ? "bg-zinc-800" : "bg-zinc-900"
      }`}
    >
      <div
        className={`shrink-0 w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
          isSelected ? "bg-neutral-50" : "border border-zinc-50"
        }`}
        onClick={() => onToggle(client.id)}
      >
        {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900" />}
      </div>
      <div className="w-[200px] truncate">{client.name}</div>
      <div className="w-[200px] truncate">{client.email}</div>
      <div className="w-[150px]">{formatPhone(client.phone)}</div>
      <div className="w-[120px]">{formatDate(client.birthDate)}</div>
      <div className="flex-1 truncate">{client.address}</div>
      <div className="w-10 flex justify-center">
        <button
          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          onClick={(e) => onContextMenu(e, client.id)}
          aria-label="Mais opções"
        >
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
