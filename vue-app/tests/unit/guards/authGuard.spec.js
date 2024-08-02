import { authGuard } from "../../../src/guards/authGuard"; // Atualize o caminho conforme necessário
import { getUsuarioByID } from "../../../src/repositories/usuario/obterUsuarios";
import { encriptarDados } from "../../../src/generals/encripitarDados";
import router from "../../../src/routes/index";

// Mock do sessionStorage
const mockSessionStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value;
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
global.sessionStorage = mockSessionStorage;

// Mocks
jest.mock("../../../src/repositories/usuario/obterUsuarios", () => ({
  getUsuarioByID: jest.fn(),
}));

jest.mock("../../../src/generals/encripitarDados", () => ({
  encriptarDados: jest.fn(),
}));

jest.mock("../../../src/routes/index", () => ({
  push: jest.fn(),
}));

describe("authGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  test("deve armazenar dados criptografados e redirecionar para /home quando auth for verdadeiro", async () => {
    // Dados de exemplo
    const usuario = {
      matricula: "1234567",
      professoresAvaliados: ["professor1", "professor2"],
      materiasAvaliadas: ["materia1", "materia2"],
      likesDislikesProfessores: { like: 5, dislike: 2 },
      likesDislikesMaterias: { like: 3, dislike: 1 },
      foto_url: "foto_url",
    };

    // Mock dos métodos
    getUsuarioByID.mockResolvedValue(usuario);
    encriptarDados.mockImplementation((data) =>
      Promise.resolve(`encrypted_${JSON.stringify(data)}`)
    );

    await authGuard(true, "1234567");

    // Verifica se os dados foram armazenados no sessionStorage
    expect(sessionStorage.getItem("matricula")).toBe('encrypted_"1234567"');
    expect(sessionStorage.getItem("materias_avaliadas")).toBe(
      'encrypted_["materia1","materia2"]'
    );
    expect(sessionStorage.getItem("professores_avaliados")).toBe(
      'encrypted_["professor1","professor2"]'
    );
    expect(sessionStorage.getItem("likes_dislikes_professores")).toBe(
      'encrypted_{"like":5,"dislike":2}'
    );
    expect(sessionStorage.getItem("likes_dislikes_materias")).toBe(
      'encrypted_{"like":3,"dislike":1}'
    );
    expect(sessionStorage.getItem("foto_perfil")).toBe("foto_url");

    // Verifica se o redirecionamento ocorreu
    expect(router.push).toHaveBeenCalledWith("/home");
  });

  test("deve remover dados do sessionStorage e retornar 0 quando auth for falso", async () => {
    await authGuard(false, "1234567");

    // Verifica se os dados foram removidos do sessionStorage
    expect(sessionStorage.getItem("matricula")).toBe(null);

    // Verifica o valor retornado
    expect(await authGuard(false, "1234567")).toBe(0);
  });
});
