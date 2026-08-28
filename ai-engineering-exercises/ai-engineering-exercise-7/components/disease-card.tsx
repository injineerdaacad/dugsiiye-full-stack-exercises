import type { Disease } from "@/models/disease";

const urgencyColor: Record<Disease["urgency"], string> = {
  "monitor at home": "bg-green-100 text-green-800",
  "see a vet soon": "bg-amber-100 text-amber-800",
  "see a vet urgently": "bg-red-100 text-red-800",
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-emerald-200 py-2 first:border-t-0 first:pt-0">
      <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{label}</div>
      <div className="mt-1 text-zinc-700">{children}</div>
    </div>
  );
}

export function DiseaseCard({ disease }: { disease: Omit<Disease, "embedding"> }) {
  return (
    <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
      <div className="flex items-center justify-between gap-2 border-b border-emerald-200 pb-2">
        <div className="text-base font-semibold text-emerald-900">🐄 {disease.diseaseName}</div>
        <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${urgencyColor[disease.urgency]}`}>
          {disease.urgency}
        </span>
      </div>

      <Section label="Cause">{disease.cause}</Section>

      <Section label="Symptoms">
        <ul className="list-disc space-y-0.5 pl-5">
          {disease.symptoms.map((symptom, i) => (
            <li key={i}>{symptom}</li>
          ))}
        </ul>
      </Section>

      <Section label="Treatment">{disease.treatment}</Section>
      <Section label="Medicine">{disease.medicine}</Section>
      <Section label="Prevention">{disease.prevention}</Section>
    </div>
  );
}
