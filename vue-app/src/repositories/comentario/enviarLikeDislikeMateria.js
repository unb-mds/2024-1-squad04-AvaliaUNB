export async function curtirDescurtirComentarioMateria(
	novo_like,
	novo_dislike,
	id
) {
	const curtidaOuDescurtida = {
		novo_like,
		novo_dislike,
		id,
	};
	try {
		const response = await fetch("http://localhost:3000/comentario_materia", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(curtidaOuDescurtida),
		});
		if (!response.ok) {
			throw new Error("Erro ao curtir/descurtir");
		}
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

export async function relacionamentoUsuarioCurtidaMateria(
	cod_comentario,
	matricula,
	like,
	dislike
) {
	const curtidaOuDescurtida = {
		cod_comentario,
		matricula,
		like,
		dislike,
	};
	try {
		const response = await fetch(
			"http://localhost:3000/usuario_comentario_materia",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(curtidaOuDescurtida),
			}
		);
		if (!response.ok) {
			throw new Error("Erro ao curtir/descurtir");
		}
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}
