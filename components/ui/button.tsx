import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_20px_-3px_rgba(15,23,42,0.32),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_4px_12px_rgba(15,23,42,0.2),0_14px_28px_-3px_rgba(15,23,42,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5 border border-white/20",
        secondary:
          "bg-white/90 text-slate-900 shadow-sm border border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md",
        outline:
          "border border-slate-200/90 bg-white/70 hover:bg-white hover:border-slate-300 hover:text-slate-950 backdrop-blur-md",
        ghost: "hover:bg-slate-100/70 hover:text-slate-900",
        link: "text-slate-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
