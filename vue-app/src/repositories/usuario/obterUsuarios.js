// essa função obtem os usuários para verificações de existencia e login
export async function getUsuarios() {
	const apiUrl = process.env.VUE_APP_API_URL;
	return new Promise((resolve, reject) => {
		fetch(`${apiUrl}/usuario`)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados))
			.catch((erro) => reject(erro));
	});
}

export async function getUsuarioByID(matricula) {
	const apiUrl = process.env.VUE_APP_API_URL;
	return new Promise((resolve, reject) => {
		fetch(`${apiUrl}/usuario_session_storage/${matricula}`)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados))
			.catch((erro) => reject(erro));
	});
}
