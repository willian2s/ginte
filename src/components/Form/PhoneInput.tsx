/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { IMaskInput } from "react-imask";
import { FieldError } from "react-hook-form";
import { removeMask } from "../../utils/formatter";

interface PhoneInputProps {
  label: string;
  error?: FieldError;
  onChange: (value: string) => void;
  value: string;
}

const PhoneInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  PhoneInputProps
> = ({ label, error, onChange, value, ...rest }, ref) => {
  const handleChange = (value: string) => {
    // Remove a máscara antes de enviar o valor
    const unmaskedValue = removeMask(value);
    onChange(unmaskedValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <IMaskInput
        mask="(00) 00000-0000"
        value={value}
        onChange={(e: any) => handleChange(e.target.value)}
        placeholder="(00) 00000-0000"
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
        {...rest}
      />
      {error && <span className="text-sm text-red-400">{error.message}</span>}
    </div>
  );
};

export const PhoneInput = forwardRef(PhoneInputBase);
