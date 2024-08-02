const apiUrl = process.env.VUE_APP_API_URL;

export async function getMinhasAvaliacoesDeProfessor(matricula) {
  try {
    const resposta = await fetch(`${apiUrl}/avaliacoes_professor/${matricula}`);
    if (!resposta.ok) {
      throw new Error("Erro ao obter avaliações!");
    }
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    console.error(erro);
    throw new Error(`Erro ao obter avaliações de professor: ${erro.message}`);
  }
}

export async function getMinhasAvaliacoesDeMaterias(matricula) {
  try {
    const resposta = await fetch(`${apiUrl}/avaliacoes_materia/${matricula}`);
    if (!resposta.ok) {
      throw new Error("Erro ao obter avaliações!");
    }
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    console.error(erro);
    throw new Error(`Erro ao obter avaliações de matérias: ${erro.message}`);
  }
}
