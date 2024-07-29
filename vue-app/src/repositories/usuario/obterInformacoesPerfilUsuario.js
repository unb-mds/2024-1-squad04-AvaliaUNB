const apiUrl = process.env.VUE_APP_API_URL;

export async function getInfoUserProfile(matricula) {
  try {
    const resposta = await fetch(`${apiUrl}/usuario_perfil/${matricula}`);
    if (!resposta.ok) {
      throw new Error(
        `Erro ao obter perfil do usuário: ${resposta.statusText}`
      );
    }
    const dados = await resposta.json();
    return dados.data;
  } catch (erro) {
    throw new Error(`Erro ao obter perfil do usuário: ${erro.message}`);
  }
}
