import fetchMock from "jest-fetch-mock";
import { getInfoUserProfile } from "../../../src/repositories/usuario/obterInformacoesPerfilUsuario"; // Ajuste o caminho conforme necessário

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe("Testes para obter perfil do usuário", () => {
  test("deve obter perfil do usuário com sucesso", async () => {
    const mockResponse = { data: { matricula: "12345", nome: "João Silva" } };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const matricula = "12345";
    const response = await getInfoUserProfile(matricula);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario_perfil/${matricula}`
    );
    expect(response).toEqual(mockResponse.data);
  });

  test("deve lançar erro ao obter perfil do usuário", async () => {
    fetchMock.mockResponseOnce("", {
      status: 500,
      statusText: "Internal Server Error",
    });

    const matricula = "12345";

    await expect(getInfoUserProfile(matricula)).rejects.toThrow(
      "Erro ao obter perfil do usuário: Internal Server Error"
    );
  });
});
