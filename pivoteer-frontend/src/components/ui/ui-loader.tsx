
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
}

export default function UILoader({
  size = "medium",
  color = "currentColor",
  className,
}: LoaderProps = {}) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div
        className={cn(
          "border-t-2 border-b-2 rounded-full animate-spin",
          sizeClasses[size]
        )}
        style={{ borderColor: color }}
      ></div>
    </div>
  );
}
