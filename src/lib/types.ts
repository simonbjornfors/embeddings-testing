export type Model = {
  includeModel: boolean | null | undefined;
  time: number | null | undefined;
  name: string | null | undefined;
  embedding: number[] | null | undefined;
  modelName: string | null | undefined;
  modelType: string | null | undefined;
  useQuantized?: boolean | null | undefined;
  similarity: number | null | undefined;
  synonyms: number[] | null | undefined;
  averageTime: number | null | undefined;
  dimensions?: number | null | undefined;
  matchSimilarity?: number | null | undefined;
  nonMatchSimilarity?: number | null | undefined;
  delta?: number | null | undefined;
};
export type prompt = {
  text: string;
  embedding: number[] | number[][] | null | undefined;
  expected: string;
};
export type icd10 = {
  text: string;
  embedding: number[] | number[][] | null | undefined;
};
