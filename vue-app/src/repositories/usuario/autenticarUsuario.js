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
