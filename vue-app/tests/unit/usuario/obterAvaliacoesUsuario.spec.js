import fetchMock from "jest-fetch-mock";
import {
  getMinhasAvaliacoesDeProfessor,
  getMinhasAvaliacoesDeMaterias,
} from "../../../src/repositories/usuario/obterAvaliacoesUsuario"; // Ajuste o caminho conforme necessário

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe("Testes para obter avaliações", () => {
  test("deve obter avaliações de professor com sucesso", async () => {
    const mockResponse = { data: [{ id: 1, comentario: "Ótimo professor!" }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const matricula = "12345";
    const response = await getMinhasAvaliacoesDeProfessor(matricula);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/avaliacoes_professor/${matricula}`
    );
    expect(response).toEqual(mockResponse.data);
  });

  test("deve lançar erro ao obter avaliações de professor", async () => {
    fetchMock.mockResponseOnce("", { status: 500 }); // Simula um erro HTTP

    const matricula = "12345";

    await expect(getMinhasAvaliacoesDeProfessor(matricula)).rejects.toThrow(
      "Erro ao obter avaliações!"
    );
  });

  test("deve obter avaliações de matérias com sucesso", async () => {
    const mockResponse = {
      data: [{ id: 1, comentario: "Matéria interessante!" }],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const matricula = "12345";
    const response = await getMinhasAvaliacoesDeMaterias(matricula);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/avaliacoes_materia/${matricula}`
    );
    expect(response).toEqual(mockResponse.data);
  });

  test("deve lançar erro ao obter avaliações de matérias", async () => {
    fetchMock.mockResponseOnce("", { status: 500 }); // Simula um erro HTTP

    const matricula = "12345";

    await expect(getMinhasAvaliacoesDeMaterias(matricula)).rejects.toThrow(
      "Erro ao obter avaliações!"
    );
  });
});
