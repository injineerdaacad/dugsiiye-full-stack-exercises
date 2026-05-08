import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <table
      data-slot="table"
      className={cn("w-full caption-bottom border-collapse text-sm", className)}
      {...props}
    />
  );
}

function TableHeader({ className, ...props }) {
  return <thead data-slot="table-header" className={cn("bg-slate-100", className)} {...props} />;
}

function TableBody({ className, ...props }) {
  return <tbody data-slot="table-body" className={cn("divide-y divide-slate-200 bg-white", className)} {...props} />;
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn("border-b border-slate-200 text-left transition-colors hover:bg-sky-50/50", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return <th data-slot="table-head" className={cn("px-4 py-3 font-semibold text-slate-700", className)} {...props} />;
}

function TableCell({ className, ...props }) {
  return <td data-slot="table-cell" className={cn("px-4 py-3", className)} {...props} />;
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
