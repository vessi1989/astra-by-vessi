"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function CtaButton({ label = "Book a Strategy Call", icon, className, ...props }: CtaButtonProps) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-full transition-all duration-300 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60",
        className
      )}
      {...props}
    >
      {/* Outer glow border */}
      <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-sky-300/60 via-sky-500/20 to-sky-600/40" />

      {/* Deep background */}
      <div className="absolute inset-[1.5px] rounded-full bg-[#010f1f]" />

      {/* Radial top-light */}
      <div className="absolute inset-[1.5px] rounded-full bg-gradient-to-b from-sky-400/20 via-transparent to-sky-600/10" />

      {/* Side shimmer */}
      <div className="absolute inset-[1.5px] rounded-full bg-gradient-to-r from-sky-500/10 via-transparent to-sky-500/10" />

      {/* Inner inset glow */}
      <div className="absolute inset-[1.5px] rounded-full shadow-[inset_0_1px_8px_rgba(56,189,248,0.18)]" />

      {/* Hover sweep */}
      <div className="absolute inset-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-r from-transparent via-sky-400/12 to-transparent" />

      {/* Label */}
      <div className="relative flex items-center justify-center gap-2.5 px-10 py-4">
        <span
          className="text-[13px] font-bold uppercase tracking-widest bg-gradient-to-b from-sky-200 via-sky-300 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.55)] transition-all duration-300 group-hover:drop-shadow-[0_0_22px_rgba(56,189,248,0.9)]"
        >
          {label}
        </span>
        {icon && (
          <span className="text-sky-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
            {icon}
          </span>
        )}
      </div>

      {/* Bottom ambient glow (outside the button) */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
