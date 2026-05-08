import { cn } from "@/lib/utils";

function Select({ className, ...props }) {
  return (
    <select
      data-slot="select"
      className={cn(
        "border-input bg-background focus:border-ring focus:ring-ring/50 flex h-9 w-full cursor-pointer rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition hover:bg-accent focus:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Select };
