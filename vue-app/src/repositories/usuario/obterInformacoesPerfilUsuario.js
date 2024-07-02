export async function getInfoUserProfile(matricula) {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:3000/usuario_perfil/${matricula}`)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}
