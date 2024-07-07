export async function enviarAvaliacaoProfessor(
	usuario,
	cod_prof,
	materia,
	nota_acesso,
	nota_didatica,
	nota_metodologia,
	nota_carisma,
	comentario
) {
	// carisma no banco vai ser metodo de ensino pq vai dar mt trabalho pra mudar o nome

	// Crie um objeto com os dados da avaliação
	const avaliacao = {
		usuario,
		cod_prof,
		materia,
		nota_didatica,
		nota_carisma,
		nota_metodologia,
		nota_acesso,
		comentario,
	};

	// Aqui você pode enviar a requisição para o servidor

	try {
		const apiUrl = process.env.VUE_APP_API_URL;
		const response = await fetch(`${apiUrl}/avaliacao_professor`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(avaliacao), // Envie o objeto avaliacao como JSON
		});
		if (!response.ok) {
			throw new Error("Erro ao enviar avaliação do professor");
		}
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}
