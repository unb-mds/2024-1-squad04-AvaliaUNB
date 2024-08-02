import fetchMock from "jest-fetch-mock";
import {
  curtirDescurtirComentarioProfessor,
  relacionamentoUsuarioCurtidaProfessor,
} from "../../../src/repositories/comentario/enviarLikeDislikeProfessor"; // Ajuste o caminho conforme necessário

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

describe("Testes para curtir/descurtir e relacionamento usuário com comentário de professor", () => {
  test("deve curtir/descurtir comentário de professor com sucesso", async () => {
    const mockResponse = { success: true };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const novo_like = true;
    const novo_dislike = false;
    const id = "com1";

    const response = await curtirDescurtirComentarioProfessor(
      novo_like,
      novo_dislike,
      id
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/comentario_professor`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          novo_like,
          novo_dislike,
          id,
        }),
      })
    );
    expect(response).toEqual(mockResponse);
  });

  test("deve lançar erro se a resposta da API não for bem-sucedida ao curtir/descurtir comentário de professor", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const novo_like = true;
    const novo_dislike = false;
    const id = "com1";

    const response = await curtirDescurtirComentarioProfessor(
      novo_like,
      novo_dislike,
      id
    );

    expect(response).toBeUndefined();
  });

  test("deve criar relacionamento com sucesso entre usuário e comentário de professor", async () => {
    const mockResponse = { success: true };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const cod_comentario = "com1";
    const matricula = "1234567";
    const like = true;
    const dislike = false;

    const response = await relacionamentoUsuarioCurtidaProfessor(
      cod_comentario,
      matricula,
      like,
      dislike
    );

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/usuario_comentario_professor`,
      expect.objectContaining({
        method: "POST",
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

  test("deve lançar erro se a resposta da API não for bem-sucedida ao criar relacionamento entre usuário e comentário de professor", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const cod_comentario = "com1";
    const matricula = "1234567";
    const like = true;
    const dislike = false;

    const response = await relacionamentoUsuarioCurtidaProfessor(
      cod_comentario,
      matricula,
      like,
      dislike
    );

    expect(response).toBeUndefined();
  });
});
