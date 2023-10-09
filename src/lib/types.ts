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
};
