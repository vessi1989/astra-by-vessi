"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initial={{ "--x": "100%", scale: 0.8 } as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animate={{ "--x": "-100%", scale: 1 } as any}
      whileTap={{ scale: 0.95 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1,
        type: "spring" as const,
        stiffness: 20,
        damping: 15,
        mass: 2,
      }}
      {...(props as React.ComponentProps<typeof motion.button>)}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.15)_0%,transparent_60%)] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-white/10",
        className
      )}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide font-light text-white/90"
        style={{
          maskImage:
            "linear-gradient(-75deg, rgba(200,150,255,1) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgba(200,150,255,1) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(124,58,237,0.1)_calc(var(--x)+20%),rgba(124,58,237,0.5)_calc(var(--x)+25%),rgba(124,58,237,0.1)_calc(var(--x)+100%))] p-px"
      />
    </motion.button>
  );
};
