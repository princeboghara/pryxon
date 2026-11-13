import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-slate-200/80 bg-white/90 text-slate-800 shadow-[0_2px_8px_rgba(15,23,42,0.04)] backdrop-blur-md",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200/80",
        outline: "text-foreground border-slate-200",
        sky: "border-sky-200 bg-sky-50/90 text-sky-800 backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
