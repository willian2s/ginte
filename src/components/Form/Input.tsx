"use client";
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, ...rest },
  ref
) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <input
        ref={ref}
        {...rest}
        className={`
          w-full bg-zinc-950 border rounded-lg px-4 py-2.5
          text-white placeholder-zinc-400
          focus:outline-none transition-colors
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-zinc-800 focus:border-zinc-700"
          }
        `}
      />
      {error && <span className="text-sm text-red-400">{error.message}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
