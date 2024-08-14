import Sequelize from "sequelize";
export const getDados = (app, sequelize) => {
	app.get("/usuario", async (req, res) => {
		try {
			const [results] = await sequelize.query(
				"SELECT email, matricula FROM usuario"
			);
			res.json(results);
		} catch (error) {
			console.error(error);
			res.status(500).send("Houve um erro ao buscar os dados");
		}
	});
};

export const autenticaUsuario = (app, sequelize) => {
	app.post("/autenticar", async (req, res) => {
		const { email, senha } = req.body;

		try {
			const [results] = await sequelize.query(
				"SELECT matricula, senha FROM usuario WHERE email = :email",
				{
					replacements: { email },
					type: Sequelize.QueryTypes.SELECT,
				}
			);
			console.log(results);

			// Se não encontrar o usuário, retorna erro
			if (results.length === 0) {
				return res
					.status(401)
					.json({ success: false, message: "Usuário não encontrado" });
			}

			const usuario = results;

			// Verifica se a senha está correta (comparando diretamente)
			if (senha !== usuario.senha) {
				return res
					.status(401)
					.json({ success: false, message: "Senha incorreta" });
			}

			// Se a autenticação for bem-sucedida, retornar um sucesso
			return res
				.status(200)
				.json({ success: true, matricula: usuario.matricula });
		} catch (error) {
			console.error("Erro ao autenticar:", error);
			res.status(500).json({ success: false, message: "Erro ao autenticar" });
		}
	});
};

export const getDadosSessionStorage = (app, sequelize) => {
	app.get("/usuario_session_storage/:matricula", async (req, res) => {
		const { matricula } = req.params;
		try {
			const [results] = await sequelize.query(
				`
                SELECT 
                    u.matricula,
										u.foto_url,
                    COALESCE(
                        (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'cod_materia', mau.cod_materia
                                )
                            )
                            FROM materia_avaliacao_usuario mau
                            WHERE mau.matricula = u.matricula
                        ),
                        JSON_ARRAY()
                    ) AS materiasAvaliadas,
                    COALESCE(
                        (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'cod_professor', pau.cod_professor,
                                    'cod_materia', pau.cod_materia
                                )
                            )
                            FROM professor_avaliacao_usuario pau
                            WHERE pau.matricula = u.matricula
                        ),
                        JSON_ARRAY()
                    ) AS professoresAvaliados,
                    COALESCE(
                        (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'cod_comentario', uldp.cod_comentario,
                                    'like', uldp.like,
                                    'dislike', uldp.dislike
                                )
                            )
                            FROM usuario_like_dislike_professor uldp
                            WHERE uldp.matricula = u.matricula
                        ),
                        JSON_ARRAY()
                    ) AS likesDislikesProfessores,
                    COALESCE(
                        (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'cod_comentario', uldm.cod_comentario,
                                    'like', uldm.like,
                                    'dislike', uldm.dislike
                                )
                            )
                            FROM usuario_like_dislike_materia uldm
                            WHERE uldm.matricula = u.matricula
                        ),
                        JSON_ARRAY()
                    ) AS likesDislikesMaterias
                FROM usuario u
                WHERE u.matricula = :matricula
                `,
				{ replacements: { matricula }, type: sequelize.QueryTypes.SELECT }
			);
			res.json(results);
		} catch (error) {
			console.error(error);
			res.status(500).send("Houve um erro ao buscar os dados");
		}
	});
};

export const postDados = (app, sequelize) => {
	app.post("/usuario", async (req, res) => {
		const { matricula, cpf, nome, sobrenome, email, senha, curso } = req.body;

		try {
			// Verifica se o e-mail, matrícula ou CPF já estão cadastrados
			const usuariosExistentes = await sequelize.query(
				"SELECT email, matricula, cpf FROM usuario WHERE email = :email OR matricula = :matricula OR cpf = :cpf",
				{
					replacements: { email, matricula, cpf },
					type: Sequelize.QueryTypes.SELECT,
				}
			);

			if (usuariosExistentes) {
				// Verificar qual campo já está cadastrado e retornar a mensagem correspondente
				if (usuariosExistentes.some((user) => user.email === email)) {
					return res
						.status(400)
						.json({ success: false, message: "O e-mail já está cadastrado." });
				}

				if (
					usuariosExistentes.some(
						(user) => user.matricula.toString() === matricula.toString()
					)
				) {
					return res.status(400).json({
						success: false,
						message: "A matrícula já está cadastrada.",
					});
				}

				if (usuariosExistentes.some((user) => user.cpf === cpf)) {
					return res
						.status(400)
						.json({ success: false, message: "O CPF já está cadastrado." });
				}
			}

			// Se passar nas verificações, inserir o novo usuário
			await sequelize.query(
				"INSERT INTO usuario (matricula, cpf, nome, sobrenome, email, senha, curso) VALUES (?, ?, ?, ?, ?, ?, ?)",
				{
					replacements: [matricula, cpf, nome, sobrenome, email, senha, curso],
					type: Sequelize.QueryTypes.INSERT,
				}
			);

			console.log("Cadastro feito com sucesso");
			res.json({ success: true, message: "Cadastro feito com sucesso" });
		} catch (error) {
			console.error("Erro ao cadastrar:", error);
			res.status(500).json({ success: false, message: "Erro ao cadastrar" });
		}
	});
};

export const getChave = (app) => {
	app.get("/chave", async (req, res) => {
		const segredo =
			"^VX0t#C7b3$Q4h!^v)z&FL6Mnq9#e2f5@!w4Jj%R)7*A0#Dk8Y2^&h$l3TnQ9@6r3g1cXJ*8(K7o#wF5$m)dU9P^2Zl%1@0s#Rf!Bv&3x6G$4t(N7J*Ky)Q!5D2e^@P0#r8w^hYqf%U3$n9(4J6L*7Z!vX5T@3r#2Q1h&8cF$0^m9N@)4$3b7gWl1*#K!2J(T9P3nQ^4w8D&zF5$v@6j0t#3*r)X7h9m^2L!8#4k@3$0F5U%*B^7j@9Q2t4D1&k)v3#cL!6M7f^R*4Q8$2@h3N!9W5)X&0r#4J0l3^K7*g9P$1@6$F2%8zN9*w4v(3J#0L&h^2cY7q1T5)k9mN!^$U4v5@3*2jQ8T7#r3D1&Xh@6J$0g4l9)w#^M3F2*t8P5!@7c9Q4D&1Kv$r)J2L^3nU0#8h7f1L!6P3$*Q9v^r2D#4J7w)@K8&0c5N$3h6m1F!XQ^*j9T&2$l4k7@#1p3^J)0N!D8U$w*F2v#r5&7h3^T9Q$6c4@N0*J1(L7w2D9)3gQ#F&4k5m@8$t*X7)U2r0N!9^Q@l4J6h5%3#7f$K1*T8)Xv2&0m9Jw!cL3^4Qn)@7$1h6P2D9^#rN5*F3v)4j0tW!8$U2Q%*K3@7L#9X&4h0c^6D8)N1Q9*m4P$3&v@J2#Lw7*r5h6^U0(3T8F!7$k)N4lQ2@9J5c#Xv3&w8)U0r^T1$Q6h3)K*4F!N7@2D9J#5^0L3mQ8rw$7U6@1#vX2c^9D0)h5J3*t4$F!7Q2&K#n8N@^rX3)J1l5$Qw7h9*m2P4@3D&N0F^v8cL5r9W!kQ1t@)3Jh$2T7K4#0&X6n^vQ8D9*L)5m3c1J$7!@F2r0h^4K9Q6*NTw3$5J)4)Q@r8&U2D1X!7L5^J9h0$k3w7K!Q4J8)2t@#N^9h5D$3c)r1U7L6Qv8JX*2w@^4)N5Q3T9$F&7*r1Xh6^L8mK@4c0Q#J7)N2r*5F$3v9&w)8TQX@J1^4L6h0Q9#Dk7c5w(2h3r)4F1*8J0vQ!L2@N9Q^3D$5w7J)K@h0T2Q4m6N^3cL#X5$9vU*F&rQ8J@7T^0k9#4LQ!1hN5D2r)3c*6)7w0FQ@X9#Lr8*J1h5Q7)N2c4T3D^Jm9$w6vL5@r&8X*J1^Q)h2(0F4c7N@T9#6$Q3m5&1*rL9)8Jh!7D4F2Q6@0$kN^9X3*2wQ#r@8Jh&7L)4v5Q)N0^c3$D4TQ2KJ9*m6L)1F^3@h4N7T9Q5$rw2X0J3c)k6^8r1L@4Q9*v$5h7)N3t2D&FQX5@*J1^L4Q6c3wN9Q2J7)mT*0$r4)h8!5J1&X7N2F^L@3$wQ*4v9c)hJ2N@Q1r3k0#5$wQ8FJX9*6)L@7^Q4T3&c9Q5N7)rD2L1@Jh0k4w*3r8$7F^L2Q1J5D)6@9N$w3h7TQ&*4)@J5c2Q1N^rD9m8X7L0Q)4T$J2*rL5h7F^@3D9w6cNQ4m0&1*J3)9L8T$5h7N)2Q1@D4vJ3^r5L6w0c9*2Q7T4)@F!1L&k3Qh9X)5J2D^7$8NrL0w*Q9T1&J2c5Q4@3!X^J7h5r8*N4$D)k3L9v2Q0wQ5Jh)3T7N^*X$4r8@J9L2cQ5^1*7)D3r0h$w2F&L8JX@3Q4Nr)9*Q0tJ6c$5w9@2Lr1^D8F&QXh7J*3mT4)5N9L!Q3r@h2)J1Q4^*D7c&X8Fw5$k3!7m9QhJ^L0r@8T$1D2*4X7&cL9)@3vNQkJ5^0r2$8T7*1cD3L)6wQ&5h9QF@4N2J7$3^*1Lk8Xr9)Q5@cT0F2$4wJhN7Q3D^*X!L4r9@2N5)Q1t$D&8J0h3!4L@7Q1Q2*rF6T5)c&9J^L8wJ9^3r1N@7X$8kQ2)5!4*6DhL0c7J9&Q5@^2r3)N*4)kJQ!h8TX9$5L0*2F7^4v@6Q3cD1T9L8N3rJh$7X&4)2Q*Q1@k5^Nw9!cL7rD)2F*3T6h0$8JX9^N5@Q1L4r2)k3wQ7Jh$T*D8!Q4F^cL0N1r2@JXQ9v7w5J4T3Q&QkD^1@c8L9h3$*r4)6F0N7!Q2X&J5L8t@J9^r2)1kNQ5$L0c*3h7J4D9w2T6^QF@1L5T3N)7X&*8Qk$4r2Qh^0J3r9F@6L1c!Q5T2J4N9$*w8L7Qv3^hX&J5D@0)r1$QkL4c7*3Nw9F8TQ2&^J6r)h5@1$0^Q3k4L*Qv5D2N7@c9T&F8hJ1)3w$4^7J0Lr*Q9N1c2&hX5F@8T3)JQ$6^L4N0kQ2r7T1*D9J5@c3w8&XhQ)F6!Q$4Jr9L2^5N3k1@8T0c*Jh7Q6D&2r3)5Q4^X8N9Q$1Jk7*Lw@0h5F6c9r2Q4D*J1T^X8Q3w7L0@5N3)Q&J2h!9r$T8^k6F4Q1LJ7cX0D2N)r9w3*Q8@5&h1F@*r0k6L7Jh^4D2T9c3Q$N1)8F5XQ&3J7v^h9L@J4$)QwT2*N0r5!k3c4D9L1@7&Jh2^Q0r*3)8TXN$6F5Qv4J3h2&N^1k*QX7@9L0)rwD!8c5TQ4J1L^2N9Xk3)0h7r8Q@*FJw5!3&6DL$7^rJc1T*Q8N5X0Qv9F3@4)2hQ2k@*T8Lr1)D9wF0NQ7c3^6X5J4$!J7r)kL9N4@3&Q5T2h8^X0FQJ1$c*6w2)8r@Q5J7h^N1L0*D4Q3c!v6X9T9&4J3r1N5k7@Q0$2*L^8D)c6w2QJhX3@)5F1*r!k4N9T0cL8^D3Qh2&7$X@4w1*F5J9)3L6rNQJ2v^8T0k4c@X9w)1&Q5Jh3*Q3rN4T2LJ9^0F7)6D@wXh5$8!kJQ9T*Q3r4N2L0^7@)5c8)hX*J1&v6D2L$4T@QJ3N9r^7c0Q8)5F!h1wX&6J9kQ2@0*r^D1TN4c3L8v7$h!JQ5Q3rX2@9N4*^7L0c1)8w6JhD5&2T4J9Lr3^N0k1Q8*w7cX@)5Qh)2Qv3J0F1L^8N7Q4T9rX5kJ6&@hD3w$!c9*rJ0N2L^7T8)F5Q4X6@1&hD$3wN9JQr*L0^7c2)5TQX8&v4D3h1)6J9Q5N@Q0k*3L7T^2r4)J1X@v9&5Q4ch8!1D*J0w7)2L3NQr^kT6@9$5X)J8&cD3L1w0^Q7T2h$r9F*@4N6)Q1k*5J7N8@LQwT2&c0)3r4^Q9!h1X4J^7N@5kQ*0X8T2L9c)rJ3!&QDh)4Q2@3L9N1^8v7w5TXQk*rJ06&c3^D1Lh0)TQ8N9J4w7r@Q5&!J8*^1X0)N5@6D4T9^c7QXw2rJ3$L1hQ4k8v)0N7J!5^Q@T9c3&r2L6D4hXw$kJ01*7Q8Q5^N4L0)@cT3rX2&Jh9w^3rN8Q7c)5T$J4L1!Q2@9X6D0*Jh@N)5^8Q3Lw7X1*T9Q4&c2r!6^FvD@3L0)J4h8N7^w1$k5T2Qc9XJ)r*3!@Q8^N1w7r)4h2L9$J5T0c@*6!3^7JQ5w0)h4N1T2k^3X@8Qr!6LJ9$2D^c0*5N7@3LQ4hT1&!Q8v)9J7c6^2r)wX0$4Jh3k*5Q1N@3L9T8X7^Qc2r4)@Jh6!w3$Q9N)J7L0^T4c5r@Q*2&8!1h5J)Xk4vN^@9L6Q3t8$T7c4)X*1Qr0h2!5Q@3Jw6N9)k1r$h4*2T0Qc^J8L7^v3rQX@4)J5!N2k6L1)Qw*8$J0T7h5^4Q2@N9c!X3D0rJ6)w3$1T8h^J@4)5N7Qc2L9*Q0T3X)r6kL1v@7^$h5Q4c2JN9)Q*8!T0^r@w1Lh4)k5^7NQ@2JcL8X0!Q3r9)4J5Jh2&1v@N^Q6L3T8$0)4rJ9Xk5Q@7*c1hN^8!L2D@3X6w)TQ4J!5Qc7r^2N1h$3v9&*L8T0)@4kJ3X6N1wQ9T2)J^5r$3c7@h*L8N1!6Q4Q2rD0w7X^9J5@*c8)h3T$JkN@2Q^1rL9)4)Q3w6JrT7N1L^0h2c9XQ8v@5*k4&$3Jh9!Q4N1L0T7)Jc5*2rX^2@3QwD9r8^L)1N4@5k7JhT6*Q0$Jv2&1h3Lr^0X9c!4T7N5Q3)J)k2^8w3@Q0L9Jh1$h7^6N!T4LQ3rJ2w0)5&8@X9*kcQ!J4t7^2N9)rQ@1Lh3*8J$T^0w)4cX2!5Jk1N$@7T8r*Q^3L9Q)0X6&J5h4w*2Q!@^N3Q8r0L5c9T4)J7*1D6h&3w$)J9NQ2rT^@L4v1*7X0)5Q3k&c$JhQ2D@r8N1!^Lw7Q*4X0)J5h3L9r^2c7@8T!1h$6@N0r7L5Q3T4)Q8c9^2*XJ$Jw3h@^6*L9QcD@1Q7N4r0)3T5X8*2J@k6Q$1Q^7J9L0rN8h4)Tc3w$5@Q3r2)X1k7^L9N@Jh4*Q8$J6T!0Q@5w7)c1rL3T8X9^4Jh2*";
		res.json(segredo);
	});
};

export const getDadosPerfil = (app, sequelize) => {
	app.get("/usuario_perfil/:matricula", async (req, res) => {
		const { matricula } = req.params;
		try {
			const [results] = await sequelize.query(
				`
            SELECT 
                u.nome,
								u.foto_url,
                u.sobrenome, 
                u.email, 
                u.curso, 
                u.matricula,
                COUNT(DISTINCT pau.cod_professor) AS quantidade_professores_avaliados,
                COUNT(DISTINCT mau.cod_materia) AS quantidade_materias_avaliadas
            FROM usuario u
            LEFT JOIN professor_avaliacao_usuario pau ON u.matricula = pau.matricula
            LEFT JOIN materia_avaliacao_usuario mau ON u.matricula = mau.matricula
            WHERE u.matricula = :matricula
            GROUP BY u.nome, u.sobrenome, u.email, u.curso, u.matricula
        `,
				{
					replacements: { matricula },
				}
			);
			res.json({ success: true, data: results });
		} catch (error) {
			console.error(error);
			res.status(500).send("Houve um erro ao buscar os dados");
		}
	});
};

export const editarDadosPerfil = (app, sequelize) => {
	app.put("/usuario_perfil", (req, res) => {
		const { matricula, nome, sobrenome, email, foto_url, curso } = req.body;
		sequelize
			.query(
				"UPDATE usuario SET nome = ?, sobrenome = ?, email = ?, foto_url = ?, curso = ? WHERE matricula = ?",
				{
					replacements: [nome, sobrenome, email, foto_url, curso, matricula],
					type: Sequelize.QueryTypes.UPDATE,
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
