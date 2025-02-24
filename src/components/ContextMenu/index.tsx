"use client";
import React, { useRef, useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  position: { x: number; y: number };
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  position,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Ajusta a posição se o menu estiver saindo da tela
      let adjustedY = position.y;
      let adjustedX = position.x;

      if (rect.bottom > viewportHeight) {
        adjustedY = position.y - rect.height - 10;
      }

      if (rect.right > viewportWidth) {
        adjustedX = position.x - rect.width;
      }

      menu.style.top = `${adjustedY}px`;
      menu.style.left = `${adjustedX}px`;
    }
  }, [isOpen, position]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 py-1 w-48"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
          onClose();
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
      >
        <Edit2 className="w-4 h-4" />
        Editar
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
          onClose();
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Excluir
      </button>
    </div>
  );
};
