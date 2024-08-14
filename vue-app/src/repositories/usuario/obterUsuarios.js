import { authGuard } from "@/guards/authGuard";

const apiUrl = process.env.VUE_APP_API_URL;

// Função para autenticar o usuário
export async function autenticaUsuario(emailEntrada, senhaEntrada) {
	try {
		const resposta = await fetch(`${apiUrl}/autenticar`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: emailEntrada, senha: senhaEntrada }),
		});
		if (!resposta.ok) {
			throw new Error(`Erro ao autenticar usuário: ${resposta.statusText}`);
		}
		const data = await resposta.json();
		if (data.success) {
			authGuard(true, data.matricula);
			return true;
		} else {
			authGuard(false);
			return false;
		}
	} catch (erro) {
		throw new Error(`Erro ao autenticar usuário: ${erro.message}`);
	}
}

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
