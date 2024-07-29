export async function editarDadosPerfil(dados_formulario) {
  const apiUrl = process.env.VUE_APP_API_URL;
  const url = `${apiUrl}/usuario_perfil`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados_formulario),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error("Erro ao atualizar informações:", data);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
