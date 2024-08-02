import fetchMock from "jest-fetch-mock";
import { cadastrarUsuarioDB } from "../../../src/repositories/usuario/cadastrarUsuario"; // Ajuste o caminho conforme necessário

// Ativa o fetch-mock
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  // Mock do console.error para evitar que erros apareçam no console durante os testes
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  // Restaura o console.error após cada teste
  console.error.mockRestore();
});

describe("Testes para cadastrar usuário", () => {
  test("deve cadastrar usuário com sucesso", async () => {
    const mockResponse = { success: true, id: 1 };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

    const formData = {
      nome: "Usuario Teste",
      email: "usuario@teste.com",
      senha: "senha123",
    };

    const response = await cadastrarUsuarioDB(formData);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro ao tentar cadastrar usuário", async () => {
    fetchMock.mockResponseOnce("", { status: 500 }); // Simula um erro HTTP

    const formData = {
      nome: "Usuario Teste",
      email: "usuario@teste.com",
      senha: "senha123",
    };

    await expect(cadastrarUsuarioDB(formData)).resolves.toBeUndefined(); // Espera-se que a função não retorne dados, apenas logue o erro
  });
});
