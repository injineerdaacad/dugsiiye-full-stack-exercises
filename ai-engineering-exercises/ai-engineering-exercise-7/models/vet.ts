import vetData from "@/lib/data/vets.json";

export type Vet = {
  id: string;
  name: string;
  region: string;
  phone: string;
  services: string[];
};

export async function findVetsByRegion(region: string): Promise<Vet[]> {
  const pattern = new RegExp(region, "i");
  return (vetData as Vet[]).filter((vet) => pattern.test(vet.region));
}
