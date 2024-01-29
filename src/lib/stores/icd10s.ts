import type { icd10 } from "$lib/types";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const icd10s: Writable<icd10[]> = writable([
  { text: "Sjukdom i bursa, ospecificerad", embedding: undefined },
  { text: "distorsion skulderled", embedding: undefined },
  { text: "distorsion akromioklav. Led", embedding: undefined },
  { text: "Subjektiva synrubbningar", embedding: undefined },
  { text: "ledvärk", embedding: undefined },
  { text: "hjärtarytmi ospec", embedding: undefined },
  { text: "Akillestendinit", embedding: undefined },
  { text: "Virusinfektion, ospecificerad", embedding: undefined },
  { text: "Alkoholberoende, Ospecificerat", embedding: undefined },
]);
