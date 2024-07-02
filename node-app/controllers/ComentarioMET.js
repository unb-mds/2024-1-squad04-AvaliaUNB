export const curtirDescurtirComentarioProfessor = (app, sequelize) => {
	app.put("/comentario_professor", (req, res) => {
		const { novo_like, novo_dislike, id } = req.body;
		sequelize
			.query(
				`UPDATE comentario_professor SET num_likes = num_likes + ?, num_dislikes = num_dislikes + ? WHERE cod_comentario = ?`,
				{
					replacements: [novo_like, novo_dislike, id],
					type: sequelize.QueryTypes.UPDATE,
				}
			)
			.then(() => {
				console.log("Informações atualizadas com sucesso");
				res.json({
					success: true,
					message: "Informações atualizadas com sucesso",
				});
			})
			.catch((error) => {
				console.error("Erro ao atualizar:", error);
				res.status(500).json({ success: false, message: "Erro ao atualizar" });
			});
	});
};

export const usuarioCurteDescurteComentarioProfessor = (app, sequelize) => {
	app.post("/usuario_comentario_professor", (req, res) => {
		const { cod_comentario, matricula, like, dislike } = req.body;
		sequelize
			.query(
				`INSERT INTO usuario_like_dislike_professor (cod_comentario, matricula, \`like\`, \`dislike\`)
        VALUES (?, ?, ?, ?)`,
				{
					replacements: [cod_comentario, matricula, like, dislike],
					type: sequelize.QueryTypes.INSERT,
				}
			)
			.then(() => {
				res.json({
					success: true,
					message: "Relacionamento adicionado com sucesso!",
				});
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({
					success: false,
					message: "Erro ao estabelecer relacionamento",
				});
			});
	});
};

export const deletarRelacionamentoUsuarioComentarioProfessor = (
	app,
	sequelize
) => {
	app.delete("/usuario_comentario_professor", (req, res) => {
		const { cod_comentario, matricula } = req.body;
		sequelize
			.query(
				`DELETE FROM usuario_like_dislike_professor WHERE cod_comentario = ? AND matricula = ?`,
				{
					replacements: [cod_comentario, matricula],
					type: sequelize.QueryTypes.DELETE,
				}
			)
			.then(() => {
				res.json({
					success: true,
					message: "Relacionamento deletado com sucesso!",
				});
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({
					success: false,
					message: "Erro ao deletar relacionamento",
				});
			});
	});
};

export const editarRelacionamentoUsuarioComentarioProfessor = (
	app,
	sequelize
) => {
	app.put(
		"/usuario_comentario_professor/:cod_comentario/:matricula",
		(req, res) => {
			const { cod_comentario, matricula } = req.params;
			const { like, dislike } = req.body;

			sequelize
				.query(
					`UPDATE usuario_like_dislike_professor SET \`like\` = ?, \`dislike\` = ? WHERE cod_comentario = ? AND matricula = ?`,
					{
						replacements: [like, dislike, cod_comentario, matricula],
						type: sequelize.QueryTypes.UPDATE,
					}
				)
				.then(() => {
					res.json({
						success: true,
						message: "Relacionamento atualizado com sucesso!",
					});
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json({
						success: false,
						message: "Erro ao atualizar relacionamento",
					});
				});
		}
	);
};

export const curtirDescurtirComentarioMateria = (app, sequelize) => {
	app.put("/comentario_materia", (req, res) => {
		const { novo_like, novo_dislike, id } = req.body;
		sequelize
			.query(
				`UPDATE comentario_materia SET num_likes = num_likes + ?, num_dislikes = num_dislikes + ? WHERE cod_comentario = ?`,
				{
					replacements: [novo_like, novo_dislike, id],
					type: sequelize.QueryTypes.UPDATE,
				}
			)
			.then(() => {
				console.log("Informações atualizadas com sucesso");
				res.json({
					success: true,
					message: "Informações atualizadas com sucesso",
				});
			})
			.catch((error) => {
				console.error("Erro ao atualizar:", error);
				res.status(500).json({ success: false, message: "Erro ao atualizar" });
			});
	});
};

export const usuarioCurteDescurteComentarioMateria = (app, sequelize) => {
	app.post("/usuario_comentario_materia", (req, res) => {
		const { cod_comentario, matricula, like, dislike } = req.body;
		sequelize
			.query(
				`INSERT INTO usuario_like_dislike_materia (cod_comentario, matricula, \`like\`, \`dislike\`)
        VALUES (?, ?, ?, ?)`,
				{
					replacements: [cod_comentario, matricula, like, dislike],
					type: sequelize.QueryTypes.INSERT,
				}
			)
			.then(() => {
				res.json({
					success: true,
					message: "Relacionamento adicionado com sucesso!",
				});
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({
					success: false,
					message: "Erro ao estabelecer relacionamento",
				});
			});
	});
};

export const deletarRelacionamentoUsuarioComentarioMateria = (
	app,
	sequelize
) => {
	app.delete("/usuario_comentario_materia", (req, res) => {
		const { cod_comentario, matricula } = req.body;
		sequelize
			.query(
				`DELETE FROM usuario_like_dislike_materia WHERE cod_comentario = ? AND matricula = ?`,
				{
					replacements: [cod_comentario, matricula],
					type: sequelize.QueryTypes.DELETE,
				}
			)
			.then(() => {
				res.json({
					success: true,
					message: "Relacionamento deletado com sucesso!",
				});
			})
			.catch((error) => {
				console.error(error);
				res.status(500).json({
					success: false,
					message: "Erro ao deletar relacionamento",
				});
			});
	});
};

export const editarRelacionamentoUsuarioComentarioMateria = (
	app,
	sequelize
) => {
	app.put(
		"/usuario_comentario_materia/:cod_comentario/:matricula",
		(req, res) => {
			const { cod_comentario, matricula } = req.params;
			const { like, dislike } = req.body;

			sequelize
				.query(
					`UPDATE usuario_like_dislike_materia SET \`like\` = ?, \`dislike\` = ? WHERE cod_comentario = ? AND matricula = ?`,
					{
						replacements: [like, dislike, cod_comentario, matricula],
						type: sequelize.QueryTypes.UPDATE,
					}
				)
				.then(() => {
					res.json({
						success: true,
						message: "Relacionamento atualizado com sucesso!",
					});
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json({
						success: false,
						message: "Erro ao atualizar relacionamento",
					});
				});
		}
	);
};
