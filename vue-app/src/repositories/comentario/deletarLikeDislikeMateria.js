export async function deletarRelacionamentoUsuarioComentarioMateria(
	cod_comentario,
	matricula
) {
	const url = `http://localhost:3000/usuario_comentario_materia`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			cod_comentario: cod_comentario,
			matricula: matricula,
		}),
	});

	if (!response.ok) {
		throw new Error(
			"Erro ao deletar o relacionamento entre usuário e comentário"
		);
	}

	return await response.json();
}
