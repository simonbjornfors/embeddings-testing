import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type { prompt } from "../types";

export const prompts: Writable<prompt[]> = writable([
  {
    text: "inflammation slemsäck",
    embedding: undefined,
    expected: "bursit",
  },
  {
    text: "distorsion axel",
    embedding: undefined,
    expected: "distorsion skulderled",
  },
  {
    text: "ac-ledsdistorsion",
    embedding: undefined,
    expected: "distorsion akromioklav. Led",
  },
  {
    text: "krokigt seende",
    embedding: undefined,
    expected: "subjektiva synrubbningar",
  },
  {
    text: "belastningssmärta höger knä",
    embedding: undefined,
    expected: "ledvärk",
  },
  {
    text: "oregelbunden hjärtrytm",
    embedding: undefined,
    expected: "hjärtarytmi ospec",
  },
  {
    text: "Hälseneinflammation",
    embedding: undefined,
    expected: "Akillestendinit",
  },
  {
    text: "viros",
    embedding: undefined,
    expected: "Virusinfektion, ospecificerad",
  },
  {
    text: "alkoholism",
    embedding: undefined,
    expected: "Alkoholberoende, Ospecificerat",
  },
]);
