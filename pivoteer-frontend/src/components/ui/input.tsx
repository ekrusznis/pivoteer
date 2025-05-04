import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  inputSize?: "sm" | "md" | "lg"; // Define possible size values
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-10 text-sm",
      md: "h-11 text-sm",
      lg: "h-[45px] xl:h-[55px] text-sm",
    } as const;

    const resolvedSize =
      sizeClasses[inputSize as keyof typeof sizeClasses] || sizeClasses.md;

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent text-deepIndigo file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          resolvedSize,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };