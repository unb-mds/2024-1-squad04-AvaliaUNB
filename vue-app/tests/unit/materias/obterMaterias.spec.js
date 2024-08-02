import fetchMock from "jest-fetch-mock";
import {
  getMateriasAvaliadasNotaTotal,
  getMateriasListagem,
  getMateriasParaFiltro,
  getMateriaByID,
} from "../../../src/repositories/materias/obterMaterias"; // Ajuste o caminho conforme necessário

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

describe("Testes para obtenção de matérias", () => {
  test("deve obter matérias avaliadas com nota total com sucesso", async () => {
    const mockData = { data: [{ id: 1, nome: "Matéria 1", nota_total: 8.5 }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await getMateriasAvaliadasNotaTotal();

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/materias_avaliadas`
    );
    expect(response).toEqual(mockData.data);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao obter matérias avaliadas com nota total", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    await expect(getMateriasAvaliadasNotaTotal()).rejects.toThrow(
      "Erro ao obter matérias avaliadas nota total"
    );
  });

  test("deve obter listagem de matérias com sucesso", async () => {
    const mockData = {
      data: [
        { id: 1, nome: "Matéria 1" },
        { id: 2, nome: "Matéria 2" },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await getMateriasListagem();

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/materias`
    );
    expect(response).toEqual(mockData.data);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao obter listagem de matérias", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    await expect(getMateriasListagem()).rejects.toThrow(
      "Erro ao obter listagem de matérias"
    );
  });

  test("deve obter matérias para filtragem com sucesso", async () => {
    const mockData = {
      data: [
        { id: 1, nome: "Matéria 1" },
        { id: 2, nome: "Matéria 2" },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await getMateriasParaFiltro();

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/materias_para_filtragem`
    );
    expect(response).toEqual(mockData.data);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao obter matérias para filtragem", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    await expect(getMateriasParaFiltro()).rejects.toThrow(
      "Erro ao obter matérias para filtragem"
    );
  });

  test("deve obter matéria por ID com sucesso", async () => {
    const cod_materia = 1;
    const mockData = { data: [{ id: 1, nome: "Matéria 1" }] };

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await getMateriaByID(cod_materia);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/materia/${cod_materia}`
    );
    expect(response).toEqual(mockData.data[0]);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao obter matéria por ID", async () => {
    const cod_materia = 1;

    fetchMock.mockResponseOnce("", { status: 500 });

    await expect(getMateriaByID(cod_materia)).rejects.toThrow(
      `Erro ao obter matéria com ID ${cod_materia}`
    );
  });
});
