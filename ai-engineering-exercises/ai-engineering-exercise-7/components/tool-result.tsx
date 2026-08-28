import { DiseaseCard } from "@/components/disease-card";
import { VetCard } from "@/components/vet-card";
import type { Disease } from "@/models/disease";
import type { Vet } from "@/models/vet";

export type ToolPart = {
  type: string;
  output?: {
    success?: boolean;
    error?: string;
    matches?: Omit<Disease, "embedding">[];
    count?: number;
    vets?: Vet[];
  };
};

export function ToolResult({ part }: { part: ToolPart }) {
  const data = part.output;
  if (!data) return null;

  if (data.error) {
    return <div className="mt-2 rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">{data.error}</div>;
  }

  if (part.type === "tool-diagnoseLivestock" && data.matches) {
    return (
      <div className="space-y-2">
        {data.matches.map((disease) => (
          <DiseaseCard key={disease.id} disease={disease} />
        ))}
      </div>
    );
  }

  if (part.type === "tool-findNearestVet" && data.vets) {
    return (
      <div className="space-y-2">
        {data.vets.map((vet) => (
          <VetCard key={vet.id} vet={vet} />
        ))}
      </div>
    );
  }

  return null;
}
