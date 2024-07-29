export async function curtirDescurtirComentarioProfessor(
  novo_like,
  novo_dislike,
  id
) {
  const curtidaOuDescurtida = {
    novo_like,
    novo_dislike,
    id,
  };
  const apiUrl = process.env.VUE_APP_API_URL;
  try {
    const response = await fetch(`${apiUrl}/comentario_professor`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curtidaOuDescurtida),
    });
    if (!response.ok) {
      throw new Error("Erro ao curtir/descurtir");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function relacionamentoUsuarioCurtidaProfessor(
  cod_comentario,
  matricula,
  like,
  dislike
) {
  const curtidaOuDescurtida = {
    cod_comentario,
    matricula,
    like,
    dislike,
  };
  const apiUrl = process.env.VUE_APP_API_URL;
  try {
    const response = await fetch(`${apiUrl}/usuario_comentario_professor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curtidaOuDescurtida),
    });
    if (!response.ok) {
      throw new Error("Erro ao curtir/descurtir");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
