import { Check } from "lucide-react";

interface TableHeaderProps {
  onSelectAll: () => void;
  isAllSelected: boolean;
}

export const TableHeader = ({
  onSelectAll,
  isAllSelected,
}: TableHeaderProps) => {
  return (
    <div className="w-full bg-zinc-900 border-b border-zinc-800">
      <div style={{ minWidth: "1200px" }}>
        <div className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-white">
          <div
            onClick={onSelectAll}
            className={`shrink-0 w-4 h-4 rounded cursor-pointer flex items-center justify-center ${
              isAllSelected ? "bg-neutral-50" : "border border-zinc-50"
            }`}
          >
            {isAllSelected && <Check className="w-3.5 h-3.5 text-zinc-900" />}
          </div>
          <div className="w-[200px]">Nome</div>
          <div className="w-[200px]">E-mail</div>
          <div className="w-[150px]">Telefone</div>
          <div className="w-[120px]">Nascimento</div>
          <div className="flex-1">Endereço</div>
          <div className="w-10"></div>
        </div>
      </div>
    </div>
  );
};
