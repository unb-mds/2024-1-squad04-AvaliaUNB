// tests/unit/criptografias/descriptarDados.spec.js

import { descriptarDados } from "../../../src/generals/descriptografarDados";
import { encriptarDados } from "../../../src/generals/encripitarDados";
import axios from "axios";

// Mock do axios
jest.mock("axios");

describe("descriptarDados", () => {
  const chave = "minha_chave_secreta";

  // Variáveis para armazenar o console.error original e a função de substituição
  let originalConsoleError;
  beforeAll(() => {
    originalConsoleError = console.error;
    console.error = jest.fn(); // Substitui console.error por um mock vazio
  });

  afterAll(() => {
    console.error = originalConsoleError; // Restaura o console.error original
  });

  beforeEach(() => {
    // Resetar os mocks antes de cada teste
    jest.resetAllMocks();
  });

  it("deve descriptografar dados corretamente", async () => {
    // Mock da resposta do axios para obter a chave
    axios.get.mockResolvedValue({ data: chave });

    // Dados a serem criptografados
    const dados = { test: "value" };
    const dadoCriptografado = await encriptarDados(dados);

    const resultado = await descriptarDados(dadoCriptografado);

    expect(resultado).toEqual(dados);
  });

  it("deve retornar um array vazio se a chave não for encontrada", async () => {
    // Mock do erro do axios para obter a chave
    axios.get.mockRejectedValue(new Error("Erro ao obter a chave"));

    const resultado = await descriptarDados("dado_qualquer");

    expect(resultado).toEqual([]);
  });

  it("deve retornar um array vazio se o dado criptografado não for válido", async () => {
    // Mock da resposta do axios para obter a chave
    axios.get.mockResolvedValue({ data: chave });

    const resultado = await descriptarDados("dado_invalid");

    expect(resultado).toEqual([]);
  });

  it("deve retornar um array vazio se o dado criptografado for nulo", async () => {
    const resultado = await descriptarDados(null);

    expect(resultado).toEqual([]);
  });
});
