import type { Vet } from "@/models/vet";

export function VetCard({ vet }: { vet: Vet }) {
  return (
    <div className="mt-2 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm">
      <div className="flex items-center justify-between gap-2 border-b border-sky-200 pb-2">
        <div className="text-base font-semibold text-sky-900">🏥 {vet.name}</div>
        <span className="whitespace-nowrap rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800">
          {vet.region}
        </span>
      </div>
      <div className="border-t border-sky-200 py-2 first:border-t-0 first:pt-0">
        <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">Phone</div>
        <div className="mt-1 text-zinc-700">{vet.phone}</div>
      </div>
      <div className="border-t border-sky-200 py-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">Services</div>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-zinc-700">
          {vet.services.map((service, i) => (
            <li key={i}>{service}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
