const apiUrl = process.env.VUE_APP_API_URL;
export async function getInfoUserProfile(matricula) {
	return new Promise((resolve, reject) => {
		fetch(`${apiUrl}/usuario_perfil/${matricula}`)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}
