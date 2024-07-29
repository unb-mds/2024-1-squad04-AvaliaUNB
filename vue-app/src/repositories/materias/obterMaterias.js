const apiUrl = process.env.VUE_APP_API_URL; // essa função obtém as matérias com sua nota total - ranking geral de matérias

export async function getMateriasAvaliadasNotaTotal() {
  try {
    const resposta = await fetch(`${apiUrl}/materias_avaliadas`);
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    throw new Error(
      `Erro ao obter matérias avaliadas nota total: ${erro.message}`
    );
  }
}

export async function getMateriasListagem() {
  try {
    const resposta = await fetch(`${apiUrl}/materias`);
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    throw new Error(`Erro ao obter listagem de matérias: ${erro.message}`);
  }
}

export async function getMateriasParaFiltro() {
  try {
    const resposta = await fetch(`${apiUrl}/materias_para_filtragem`);
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    throw new Error(`Erro ao obter matérias para filtragem: ${erro.message}`);
  }
}

export async function getMateriaByID(cod_materia) {
  try {
    const resposta = await fetch(`${apiUrl}/materia/${cod_materia}`);
    const dados = await resposta.json();
    return dados.data[0];
  } catch (erro) {
    throw new Error(
      `Erro ao obter matéria com ID ${cod_materia}: ${erro.message}`
    );
  }
}
