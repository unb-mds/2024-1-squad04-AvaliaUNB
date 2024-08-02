// tests/unit/criptografias/encriptarDados.spec.js

import { encriptarDados } from "../../../src/generals/encripitarDados";
import axios from "axios";
import CryptoJS from "crypto-js";

// Mock do axios
jest.mock("axios");

describe("encriptarDados", () => {
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

  it("deve criptografar dados corretamente", async () => {
    // Mock da resposta do axios para obter a chave
    axios.get.mockResolvedValue({ data: chave });

    // Dados a serem criptografados
    const dados = { test: "value" };

    // Realizar a criptografia
    const dadoCriptografado = await encriptarDados(dados);

    // Verificar se a criptografia foi feita corretamente
    const bytes = CryptoJS.AES.decrypt(dadoCriptografado, chave);
    const jsonDados = bytes.toString(CryptoJS.enc.Utf8);
    const resultado = JSON.parse(jsonDados);

    expect(resultado).toEqual(dados);
  });

  it("deve exibir erro se o dado for nulo", async () => {
    // Mock da resposta do axios para obter a chave
    axios.get.mockResolvedValue({ data: chave });

    // Verificar a chamada de erro do console
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    await encriptarDados(null);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Erro ao criptografar dado!");
    consoleErrorSpy.mockRestore();
  });

  it("deve exibir erro se ocorrer um problema ao obter a chave", async () => {
    // Mock do erro do axios para obter a chave
    axios.get.mockRejectedValue(new Error("Erro ao obter a chave"));

    // Dados a serem criptografados
    const dados = { test: "value" };

    // Verificar a chamada de erro do console
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    await encriptarDados(dados);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error("Erro ao obter a chave")
    );
    consoleErrorSpy.mockRestore();
  });
});
