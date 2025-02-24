"use client";
import { Search, XCircle } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ value, onChange, onClear }: SearchBarProps) => {
  return (
    <div className="relative flex-1 lg:max-w-[358px]">
      <div className="flex items-center w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5">
        <Search className="w-5 h-5 text-zinc-400 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar por nome ou email"
          className="flex-1 bg-transparent text-white placeholder-zinc-400 outline-none ml-2"
        />
        {value && (
          <button
            onClick={onClear}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
