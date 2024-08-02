import fetchMock from "jest-fetch-mock";
import { enviarAvaliacaoProfessor } from "../../../src/repositories/professor/enviarAvaliacaoProfessor"; // Ajuste o caminho conforme necessário

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

describe("Testes para envio de avaliação de professor", () => {
  test("deve enviar a avaliação do professor com sucesso", async () => {
    const avaliacao = {
      usuario: "user123",
      cod_prof: "prof456",
      materia: "Matéria X",
      nota_didatica: 8,
      nota_carisma: 7,
      nota_metodologia: 9,
      nota_acesso: 6,
      comentario: "Ótimo professor",
    };

    const mockResponse = { success: true };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const response = await enviarAvaliacaoProfessor(
      avaliacao.usuario,
      avaliacao.cod_prof,
      avaliacao.materia,
      avaliacao.nota_acesso,
      avaliacao.nota_didatica,
      avaliacao.nota_metodologia,
      avaliacao.nota_carisma,
      avaliacao.comentario
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/avaliacao_professor`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avaliacao),
      }
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao enviar avaliação do professor", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    await expect(
      enviarAvaliacaoProfessor(
        "user123",
        "prof456",
        "Matéria X",
        6,
        8,
        9,
        7,
        "Comentário"
      )
    ).rejects.toThrow("Erro ao enviar avaliação do professor");
  });
});
