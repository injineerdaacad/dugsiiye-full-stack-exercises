import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

function PasswordInput({ className, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className={cn("pr-11", className)}
      />
      <button
        type="button"
        aria-label={isVisible ? "Hide password" : "Show password"}
        onClick={() => setIsVisible((current) => !current)}
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition hover:bg-sky-100 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <Icon className="size-4" />
      </button>
    </div>
  );
}

export { PasswordInput };
