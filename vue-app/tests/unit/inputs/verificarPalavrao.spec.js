import verificarPalvrao from "../../../src/generals/verificarPalavrao"; // Atualize o caminho conforme necessário

describe("Função verificarPalvrao", () => {
  // Testa se a função retorna true para palavras proibidas
  test("deve retornar true para palavras que contêm palavras proibidas", () => {
    expect(verificarPalvrao("caralho")).toBe(true);
    expect(verificarPalvrao("porra")).toBe(true);
    expect(verificarPalvrao("cu")).toBe(true);
  });

  // Testa se a função lida corretamente com acentos e variações
  test("deve retornar true para palavras proibidas com variações e acentos", () => {
    expect(verificarPalvrao("cú")).toBe(true);
    expect(verificarPalvrao("cárálho")).toBe(true);
  });

  // Testa se a função retorna false para frases sem palavras proibidas
  test("deve retornar false para frases sem palavras proibidas", () => {
    expect(verificarPalvrao("texto normal")).toBe(false);
    expect(verificarPalvrao("um texto qualquer")).toBe(false);
  });
});
