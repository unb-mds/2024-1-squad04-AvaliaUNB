import fetchMock from "jest-fetch-mock";
import { deletarRelacionamentoUsuarioComentarioMateria } from "../../../src/repositories/comentario/deletarLikeDislikeMateria"; // Ajuste o caminho conforme necessário

// Ativa o fetch-mock
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Testes para deletar relacionamento entre usuário e comentário de matéria", () => {
  test("deve deletar o relacionamento com sucesso", async () => {
    const mockResponse = { success: true };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const cod_comentario = "com1";
    const matricula = "1234567";

    const response = await deletarRelacionamentoUsuarioComentarioMateria(
      cod_comentario,
      matricula
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario_comentario_materia`,
      expect.objectContaining({
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cod_comentario,
          matricula,
        }),
      })
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const cod_comentario = "com1";
    const matricula = "1234567";

    await expect(
      deletarRelacionamentoUsuarioComentarioMateria(cod_comentario, matricula)
    ).rejects.toThrow(
      "Erro ao deletar o relacionamento entre usuário e comentário"
    );
  });
});
