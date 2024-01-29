import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const prompts: Writable<string[]> = writable([
  "inflammation slemsäck",
  "distorsion axel",
  "ac-ledsdistorsion",
  "krokigt seende",
  "belastningssmärta höger knä",
  "oregelbunden hjärtrytm",
  "Hälseneinflammation",
]);
