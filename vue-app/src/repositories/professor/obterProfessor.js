/* eslint-disable */
const apiUrl = process.env.VUE_APP_API_URL;

export async function getProfessoresAvaliadosNotaTotal() {
  try {
    const resposta = await fetch(`${apiUrl}/professores_avaliados`);
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    throw new Error(
      `Erro ao obter professores avaliados nota total: ${erro.message}`
    );
  }
}

export async function getProfessores(materia) {
  try {
    const url = materia
      ? `${apiUrl}/professores?materia=${encodeURIComponent(materia)}`
      : `${apiUrl}/professores`;

    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    throw new Error(`Erro ao obter professores: ${erro.message}`);
  }
}

export async function getProfessoresByID(cod_professor, materia) {
  try {
    const url = materia
      ? `${apiUrl}/professor/${cod_professor}?materia=${encodeURIComponent(
          materia
        )}`
      : `${apiUrl}/professor/${cod_professor}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    throw new Error(
      `Erro ao obter professor com ID ${cod_professor}: ${erro.message}`
    );
  }
}
