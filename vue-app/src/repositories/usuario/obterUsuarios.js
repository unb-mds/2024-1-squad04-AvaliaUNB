const apiUrl = process.env.VUE_APP_API_URL;
export async function getUsuarios() {
	try {
		const resposta = await fetch(`${apiUrl}/usuario`);
		if (!resposta.ok) {
			throw new Error(`Erro ao obter usuários: ${resposta.statusText}`);
		}
		const dados = await resposta.json();
		return dados;
	} catch (erro) {
		throw new Error(`Erro ao obter usuários: ${erro.message}`);
	}
}

// Função para obter um usuário pelo ID
export async function getUsuarioByID(matricula) {
	try {
		const resposta = await fetch(
			`${apiUrl}/usuario_session_storage/${matricula}`
		);
		if (!resposta.ok) {
			throw new Error(
				`Erro ao obter usuário pelo ID ${matricula}: ${resposta.statusText}`
			);
		}
		const dados = await resposta.json();
		return dados;
	} catch (erro) {
		throw new Error(
			`Erro ao obter usuário pelo ID ${matricula}: ${erro.message}`
		);
	}
}
