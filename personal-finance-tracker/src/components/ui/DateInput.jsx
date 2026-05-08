import { CalendarDays } from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

function formatDate(value) {
  if (!value) return "";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

function DateInput({ className, id, value, onChange, placeholder = "Select date", "aria-label": ariaLabel }) {
  const inputRef = useRef(null);
  const displayValue = formatDate(value);

  function openPicker() {
    const input = inputRef.current;

    if (input?.showPicker) {
      input.showPicker();
      return;
    }

    input?.click();
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={openPicker}
        aria-label={ariaLabel || placeholder}
        className="border-input bg-background focus:border-ring focus:ring-ring/50 flex h-9 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition hover:bg-accent/50 hover:border-ring/60 focus:ring-[3px]"
      >
        <span className={displayValue ? "text-foreground" : "text-muted-foreground"}>
          {displayValue || placeholder}
        </span>
        <CalendarDays className="size-4 text-muted-foreground" />
      </button>
      <input
        ref={inputRef}
        id={id}
        type="date"
        value={value}
        onChange={onChange}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}

export { DateInput };
