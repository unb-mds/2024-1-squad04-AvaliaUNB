import fetchMock from "jest-fetch-mock";
import { enviarAvaliacaoMateria } from "../../../src/repositories/materias/enviarAvaliacaoMateria"; // Ajuste o caminho conforme necessário

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

describe("Testes para enviar avaliação de matéria", () => {
  test("deve enviar avaliação de matéria com sucesso", async () => {
    const mockResponse = { success: true };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const nota_dif = 4;
    const nota_exp = 5;
    const comentario = "Excelente matéria!";
    const matricula = "1234567";
    const materia = "Matemática";

    const response = await enviarAvaliacaoMateria(
      nota_dif,
      nota_exp,
      comentario,
      matricula,
      materia
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/avaliacao_materia`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nota_dif,
          nota_exp,
          comentario,
          matricula,
          materia,
        }),
      })
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao enviar avaliação de matéria", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const nota_dif = 4;
    const nota_exp = 5;
    const comentario = "Excelente matéria!";
    const matricula = "1234567";
    const materia = "Matemática";

    const response = await enviarAvaliacaoMateria(
      nota_dif,
      nota_exp,
      comentario,
      matricula,
      materia
    );

    expect(response).toBeUndefined();
  });
});
