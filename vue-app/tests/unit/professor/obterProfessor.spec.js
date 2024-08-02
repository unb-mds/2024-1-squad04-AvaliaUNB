import fetchMock from "jest-fetch-mock";
import {
  getProfessoresAvaliadosNotaTotal,
  getProfessores,
  getProfessoresByID,
} from "../../../src/repositories/professor/obterProfessor"; // Ajuste o caminho conforme necessário

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

describe("Testes para obter professores", () => {
  test("deve obter professores avaliados com nota total com sucesso", async () => {
    const mockResponse = { data: [{ id: 1, nome: "Professor A" }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const response = await getProfessoresAvaliadosNotaTotal();

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/professores_avaliados`
    );
    expect(response).toEqual(mockResponse.data);
  });

  test("deve lançar erro ao obter professores avaliados com nota total", async () => {
    fetchMock.mockResponseOnce("", { status: 500 }); // Simula um erro HTTP

    await expect(getProfessoresAvaliadosNotaTotal()).resolves.toBeUndefined(); // Espera-se que a função não retorne dados, apenas logue o erro
  });

  test("deve obter a listagem de professores com sucesso", async () => {
    const mockResponse = { data: [{ id: 1, nome: "Professor A" }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const response = await getProfessores("Matéria X");

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/professores?materia=Mat%C3%A9ria%20X`
    );
    expect(response).toEqual(mockResponse.data);
  });

  test("deve lançar erro ao obter a listagem de professores", async () => {
    fetchMock.mockResponseOnce("", { status: 500 }); // Simula um erro HTTP

    await expect(getProfessores("Matéria X")).resolves.toBeUndefined(); // Espera-se que a função não retorne dados, apenas logue o erro
  });

  test("deve obter professor por ID com sucesso", async () => {
    const mockResponse = { data: [{ id: 1, nome: "Professor A" }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const response = await getProfessoresByID("prof123", "Matéria X");

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/professor/prof123?materia=Mat%C3%A9ria%20X`
    );
    expect(response).toEqual(mockResponse.data);
  });

  test("deve lançar erro ao obter professor por ID", async () => {
    fetchMock.mockResponseOnce("", { status: 500 }); // Simula um erro HTTP

    await expect(
      getProfessoresByID("prof123", "Matéria X")
    ).resolves.toBeUndefined(); // Espera-se que a função não retorne dados, apenas logue o erro
  });
});
