// tests/unit/criptografias/getUsuarioLogado.spec.js

import { getUsuarioLogado } from "../../../src/generals/getUsuarioLogado";
import axios from "axios";
import CryptoJS from "crypto-js";

// Mock do axios
jest.mock("axios");

// Mock do sessionStorage
const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
global.sessionStorage = sessionStorageMock;

describe("getUsuarioLogado", () => {
  const chave = "minha_chave_secreta";
  const matriculaOriginal = "123456";
  const matriculaCriptografada = CryptoJS.AES.encrypt(
    matriculaOriginal,
    chave
  ).toString();

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
    sessionStorageMock.clear();
  });

  it("deve retornar a matrícula descriptografada corretamente", async () => {
    // Mock da resposta do axios para obter a chave
    axios.get.mockResolvedValue({ data: chave });

    // Configura o sessionStorage com a matrícula criptografada
    sessionStorageMock.setItem("matricula", matriculaCriptografada);

    // Realiza a chamada da função
    const matriculaDescriptografada = await getUsuarioLogado();

    // Verifica se a matrícula foi descriptografada corretamente
    expect(matriculaDescriptografada).toBe(matriculaOriginal);
  });

  it("deve lidar com a falta de matrícula no sessionStorage", async () => {
    // Mock da resposta do axios para obter a chave
    axios.get.mockResolvedValue({ data: chave });

    // Verifica a chamada de erro do console
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Realiza a chamada da função
    await getUsuarioLogado();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error decrypting matricula:",
      new Error("No matricula found in session storage")
    );
    consoleErrorSpy.mockRestore();
  });

  it("deve lidar com erros ao obter a chave", async () => {
    // Mock do erro do axios para obter a chave
    axios.get.mockRejectedValue(new Error("Erro ao obter a chave"));

    // Configura o sessionStorage com a matrícula criptografada
    sessionStorageMock.setItem("matricula", matriculaCriptografada);

    // Verifica a chamada de erro do console
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Realiza a chamada da função
    await getUsuarioLogado();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error decrypting matricula:",
      new Error("Erro ao obter a chave")
    );
    consoleErrorSpy.mockRestore();
  });
});
