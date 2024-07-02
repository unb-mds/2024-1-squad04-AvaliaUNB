// essa função obtem os usuários para verificações de existencia e login
export async function getUsuarios() {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:3000/usuario")
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados))
			.catch((erro) => reject(erro));
	});
}

export async function getUsuarioByID(matricula) {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:3000/usuario_session_storage/${matricula}`)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados))
			.catch((erro) => reject(erro));
	});
}
