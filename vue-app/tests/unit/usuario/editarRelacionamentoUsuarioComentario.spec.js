import fetchMock from "jest-fetch-mock";
import {
  editarRelacionamentoUsuarioComentarioProfessor,
  editarRelacionamentoUsuarioComentarioMateria,
} from "../../../src/repositories/comentario/editarRelacionamentoUsuarioComentario"; // Ajuste o caminho conforme necessário
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

describe("Testes para editar relacionamento entre usuário e comentário", () => {
  test("deve editar relacionamento com sucesso para professor", async () => {
    const mockResponse = { success: true };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const cod_comentario = "com1";
    const matricula = "1234567";
    const like = true;
    const dislike = false;

    const response = await editarRelacionamentoUsuarioComentarioProfessor(
      cod_comentario,
      matricula,
      like,
      dislike
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario_comentario_professor/${cod_comentario}/${matricula}`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cod_comentario,
          matricula,
          like,
          dislike,
        }),
      })
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao editar relacionamento de professor", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const cod_comentario = "com1";
    const matricula = "1234567";
    const like = true;
    const dislike = false;

    const response = await editarRelacionamentoUsuarioComentarioProfessor(
      cod_comentario,
      matricula,
      like,
      dislike
    );

    expect(response).toEqual({
      success: false,
      message: "Erro ao editar relacionamento",
    });
  });

  test("deve editar relacionamento com sucesso para matéria", async () => {
    const mockResponse = { success: true };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const cod_comentario = "com1";
    const matricula = "1234567";
    const like = true;
    const dislike = false;

    const response = await editarRelacionamentoUsuarioComentarioMateria(
      cod_comentario,
      matricula,
      like,
      dislike
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario_comentario_materia/${cod_comentario}/${matricula}`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cod_comentario,
          matricula,
          like,
          dislike,
        }),
      })
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao editar relacionamento de matéria", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const cod_comentario = "com1";
    const matricula = "1234567";
    const like = true;
    const dislike = false;

    const response = await editarRelacionamentoUsuarioComentarioMateria(
      cod_comentario,
      matricula,
      like,
      dislike
    );

    expect(response).toEqual({
      success: false,
      message: "Erro ao editar relacionamento",
    });
  });
});
