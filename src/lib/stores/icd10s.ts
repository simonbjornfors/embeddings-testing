import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const prompts: Writable<string[]> = writable([
  "Sjukdom i bursa, ospecificerad",
  "distorsion skulderled",
  "distorsion akromioklav. Led",
  "Subjektiva synrubbningar",
  "ledvärk",
  "hjärtarytmi ospec",
  "Akillestendinit",
]);
