import fetchMock from "jest-fetch-mock";
import {
  getUsuarios,
  getUsuarioByID,
} from "../../../src/repositories/usuario/obterUsuarios"; // Ajuste o caminho conforme necessário

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe("Testes para obter usuários", () => {
  test("deve obter todos os usuários com sucesso", async () => {
    const mockResponse = { data: [{ matricula: "12345", nome: "João Silva" }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const response = await getUsuarios();

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario`
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro ao obter todos os usuários", async () => {
    fetchMock.mockResponseOnce("", {
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getUsuarios()).rejects.toThrow(
      "Erro ao obter usuários: Internal Server Error"
    );
  });
});

describe("Testes para obter usuário por ID", () => {
  test("deve obter usuário pelo ID com sucesso", async () => {
    const matricula = "12345";
    const mockResponse = { data: { matricula, nome: "João Silva" } };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const response = await getUsuarioByID(matricula);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario_session_storage/${matricula}`
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro ao obter usuário pelo ID", async () => {
    const matricula = "12345";
    fetchMock.mockResponseOnce("", {
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getUsuarioByID(matricula)).rejects.toThrow(
      `Erro ao obter usuário pelo ID ${matricula}: Internal Server Error`
    );
  });
});
