"use client";
import { Building2, LogOut, UserPlus, Users, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 w-[260px] bg-white border-r border-neutral-300 transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex justify-end lg:hidden p-4">
        <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-lg">
          <X className="w-6 h-6 text-zinc-800" />
        </button>
      </div>

      <div className="px-4 py-8 flex flex-col items-center h-full">
        <Building2 className="w-[50px] h-[50px] text-zinc-800" />

        <div className="mt-12 w-full space-y-3">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-green-900 bg-opacity-10 text-zinc-800 font-semibold">
            <Users className="w-6 h-6" />
            <span>Clientes</span>
          </button>

          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-800 font-semibold hover:bg-zinc-100">
            <UserPlus className="w-6 h-6" />
            <span>Cadastrar Cliente</span>
          </button>
        </div>

        <button className="mt-auto w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-800 font-semibold hover:bg-zinc-100">
          <LogOut className="w-6 h-6" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};
