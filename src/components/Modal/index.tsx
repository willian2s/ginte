"use client";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-lg border border-zinc-800"
        style={{
          width: "60%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
