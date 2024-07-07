export async function deletarAvaliacaoComentarioProfessor(
	matricula,
	cod_avaliacao,
	cod_comentario
) {
	const apiUrl = process.env.VUE_APP_API_URL;
	const url = `${apiUrl}/avaliacoes_professor/${matricula}/${cod_avaliacao}/${cod_comentario}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erro ao deletar avaliação e comentário");
	}

	return await response.json();
}

export async function deletarAvaliacaoComentarioMateria(
	matricula,
	cod_avaliacao,
	cod_comentario
) {
	const apiUrl = process.env.VUE_APP_API_URL;
	const url = `${apiUrl}/avaliacoes_materia/${matricula}/${cod_avaliacao}/${cod_comentario}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erro ao deletar avaliação e comentário");
	}

	return await response.json();
}
