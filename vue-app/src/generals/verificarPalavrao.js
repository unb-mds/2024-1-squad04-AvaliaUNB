import Piii from "piii";
import piiiFilters from "piii-filters";

const removeAccents = (string) =>
  string
    .replace(/ô/g, "o")
    .replace(/ê/g, "e")
    .replace(/ú/g, "u")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .replace(/ç/g, "c");

const piii = new Piii({
  filters: [...Object.values(piiiFilters)],
  repeated: true,
  aliases: {
    a: ["2", "4", "@", "á", "à", "â", "ã", "ä", "å", "ā"],
    e: ["3", "&", "é", "è", "ê", "ë", "ē", "ė", "ę"],
    i: ["1", "í", "ì", "î", "ï", "ī", "į", "ı"],
    o: ["0", "ó", "ò", "ô", "õ", "ö", "ō"],
    u: ["ú", "ù", "û", "ü", "ū"],
    c: ["ç"],
  },
  cleaner: removeAccents,
  censor: (badWord) => {
    return badWord.charAt(0) + "*".repeat(badWord.length - 1);
  },
});

export default function verificarPalvrao(frase) {
  return piii.has(frase);
}
