import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BrandButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "ink" | "ink-coral" | "coral" | "cream";
};

export function BrandButton({
  children,
  className,
  tone = "ink",
  type = "button",
  ...props
}: BrandButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 py-3 font-display text-xl uppercase leading-none transition-[transform,background-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
        tone === "ink" && "bg-ink text-cream hover:bg-indigo",
        tone === "ink-coral" && "bg-ink text-cream hover:bg-coral",
        tone === "coral" && "bg-coral text-cream hover:bg-cream hover:text-ink",
        tone === "cream" && "bg-cream text-ink hover:bg-ink hover:text-cream",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
