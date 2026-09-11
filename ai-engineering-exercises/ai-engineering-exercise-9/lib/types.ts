export type ProductUnderstanding = {
  product: string;
  brand?: string;
  model?: string;
  variant?: string; // storage/size/color etc.
  condition: "new" | "used" | "any";
  clarificationNeeded?: string; // set if the query was too ambiguous to search confidently
};

export type Candidate = {
  title: string;
  link: string;
  snippet: string;
};

export type VerifiedResult = {
  storeName: string;
  productName: string;
  productUrl: string;
  price: number | null;
  currency: string | null;
  availability: "in_stock" | "out_of_stock" | "unknown";
  condition: "new" | "used" | "unknown";
  priceVerified: boolean;
};

export type MatchedResult = VerifiedResult & {
  isMatch: boolean;
  matchReason: string;
};

export type NormalizedResult = MatchedResult & {
  priceNumericUsd: number | null; // normalized for sorting; null if not comparable
};

export type RankedResult = NormalizedResult & {
  rank: number;
};

export type ShoppingState = {
  query: string;
  understanding?: ProductUnderstanding;
  candidates?: Candidate[];
  verified?: VerifiedResult[];
  matched?: MatchedResult[];
  normalized?: NormalizedResult[];
  ranked?: RankedResult[];
};
