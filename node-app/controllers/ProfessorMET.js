export const getProfessoresAvaliados = (app, sequelize) => {
  app.get("/professores_avaliados", (req, res) => {
    const sqlQuery = `
            SELECT 
                p.nome AS nome_professor,
                p.foto_url AS foto_professor,
                COALESCE(ROUND(AVG(ap.nota_total), 1), 0) AS nota_media
            FROM 
                professor p
            LEFT JOIN 
                professor_avaliacao_usuario pau ON p.cod_professor = pau.cod_professor
            LEFT JOIN 
                avaliacao_professor ap ON pau.cod_avaliacao = ap.cod_avaliacao
            GROUP BY 
                p.nome, p.foto_url
            ORDER BY 
              nota_media DESC
            LIMIT 7;
        `;

    sequelize
      .query(sqlQuery, { type: sequelize.QueryTypes.SELECT })
      .then((result) => {
        console.log("Consulta realizada com sucesso");
        res.json({ success: true, data: result });
      })
      .catch((error) => {
        console.error("Erro ao consultar professores avaliados:", error);
        res.status(500).json({
          success: false,
          message: "Erro ao consultar professores avaliados",
        });
      });
  });
};

//professores para a página de pesquisa de professores
//essa função foi reformulada para lidar com filtro de materias, ou seja, quando eu quiser a informação por materia eu vou filtrar diretamente na consulta e trazer os elementos filtrados

export const getProfessores = (app, sequelize) => {
  app.get("/professores", async (req, res) => {
    const { materia } = req.query;

    try {
      const sqlQuery = `
        SELECT 
          p.nome AS nome_professor,
          p.cod_professor AS cod_professor,
          p.foto_url AS foto_professor,
          (
            SELECT JSON_ARRAYAGG(JSON_OBJECT(
                'cod_materia', m.cod_materia,
                'nome_materia', m.nome
              ))
            FROM professor_materia pm
            INNER JOIN materia m ON pm.cod_materia = m.cod_materia
            WHERE pm.cod_professor = p.cod_professor
            ${materia ? "AND m.cod_materia = :materia" : ""}
          ) AS materias,
          (
            SELECT JSON_OBJECT(
              'media_nota_total', AVG(COALESCE(ap.nota_total, 0)),
              'media_nota_didatica', AVG(COALESCE(ap.nota_didatica, 0)),
              'media_nota_metodo_ensino', AVG(COALESCE(ap.nota_metodo_ensino, 0)),
              'media_nota_metodologia', AVG(COALESCE(ap.nota_metodologia, 0)),
              'media_nota_acesso', AVG(COALESCE(ap.nota_acesso, 0))
            )
            FROM professor_avaliacao_usuario pau
            LEFT JOIN avaliacao_professor ap ON pau.cod_avaliacao = ap.cod_avaliacao
            WHERE pau.cod_professor = p.cod_professor
            ${materia ? "AND pau.cod_materia = :materia" : ""}
          ) AS medias,
          (
            SELECT COUNT(*)
            FROM professor_avaliacao_usuario pau
            WHERE pau.cod_professor = p.cod_professor
            ${materia ? "AND pau.cod_materia = :materia" : ""}
          ) AS quantidade_avaliacoes
        FROM 
          professor p
        ${
          materia
            ? `
          INNER JOIN professor_materia pmf ON pmf.cod_professor = p.cod_professor
          INNER JOIN materia mf ON pmf.cod_materia = mf.cod_materia
          WHERE mf.cod_materia = :materia
        `
            : ""
        }
        GROUP BY 
          p.cod_professor;
      `;

      const professores = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { materia },
      });

      res.json({ success: true, data: professores });
    } catch (error) {
      console.error("Erro ao consultar professores:", error);
      res
        .status(500)
        .json({ success: false, message: "Erro ao consultar professores" });
    }
  });
};

//pegaremos os professores pelo ID aqui

export const getProfessorById = (app, sequelize) => {
  app.get("/professor/:cod_professor", async (req, res) => {
    const { cod_professor } = req.params;
    const { materia } = req.query;

    try {
      const sqlQuery = `
        SELECT 
          p.nome AS nome_professor,
          p.email AS email_professor,
          p.sala AS sala_professor,
          p.cod_professor AS cod_professor,
          p.foto_url AS foto_professor,
          (
            SELECT JSON_ARRAYAGG(JSON_OBJECT(
                'cod_materia', m.cod_materia,
                'nome_materia', m.nome
              ))
            FROM professor_materia pm
            INNER JOIN materia m ON pm.cod_materia = m.cod_materia
            WHERE pm.cod_professor = p.cod_professor
          ) AS materias,
           (
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
            'cod_graduacao', gp.cod_graduacao,
            'graduacao', gp.graduacao
          ))
            FROM professor_graduacoes gp
            WHERE gp.cod_professor = p.cod_professor
        ) AS graduacoes,
          (
            SELECT JSON_ARRAYAGG(JSON_OBJECT(
              'cod_materia', pau.cod_materia,
              'nome_materia', m.nome,
              'nota_total', COALESCE(ap.nota_total, 0),
              'nota_didatica', COALESCE(ap.nota_didatica, 0),
              'nota_metodo_ensino', COALESCE(ap.nota_metodo_ensino, 0),
              'nota_metodologia', COALESCE(ap.nota_metodologia, 0), 
              'nota_acesso', COALESCE(ap.nota_acesso, 0),
              'cod_comentario', COALESCE(cp.cod_comentario, ''),
              'comentario', COALESCE(cp.comentario, ''),  
              'num_likes', COALESCE(cp.num_likes, 0),  
              'num_dislikes', COALESCE(cp.num_dislikes, 0),
              'usuario', JSON_OBJECT(
                'nome_usuario', u.nome,
                'matricula', u.matricula,
                'foto_url', u.foto_url
              )
            ))
            FROM materia m
            LEFT JOIN professor_avaliacao_usuario pau ON m.cod_materia = pau.cod_materia
            LEFT JOIN avaliacao_professor ap ON pau.cod_avaliacao = ap.cod_avaliacao
            LEFT JOIN comentario_professor cp ON pau.cod_comentario = cp.cod_comentario
            LEFT JOIN usuario u ON pau.matricula = u.matricula
            WHERE pau.cod_professor = p.cod_professor
            ${materia ? "AND pau.cod_materia = :materia" : ""}
          ) AS avaliacoes,
          (
            SELECT JSON_OBJECT(
              'media_nota_total', AVG(COALESCE(ap.nota_total, 0)),
              'media_nota_didatica', AVG(COALESCE(ap.nota_didatica, 0)),
              'media_nota_metodo_ensino', AVG(COALESCE(ap.nota_metodo_ensino, 0)),
              'media_nota_metodologia', AVG(COALESCE(ap.nota_metodologia, 0)),
              'media_nota_acesso', AVG(COALESCE(ap.nota_acesso, 0))
            )
            FROM professor_avaliacao_usuario pau
            LEFT JOIN avaliacao_professor ap ON pau.cod_avaliacao = ap.cod_avaliacao
            WHERE pau.cod_professor = p.cod_professor
            ${materia ? "AND pau.cod_materia = :materia" : ""}
          ) AS medias
        FROM 
          professor p
        WHERE
          p.cod_professor = :cod_professor
        ${
          materia
            ? `
          AND EXISTS (
            SELECT 1
            FROM professor_materia pmf
            WHERE pmf.cod_professor = p.cod_professor
            AND pmf.cod_materia = :materia
          )
        `
            : ""
        }
        GROUP BY 
          p.cod_professor;
      `;

      const replacements = { cod_professor };
      if (materia) {
        replacements.materia = materia;
      }

      const professor = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.SELECT,
        replacements: replacements,
      });

      res.json({ success: true, data: professor });
    } catch (error) {
      console.error("Erro ao consultar professor:", error);
      res
        .status(500)
        .json({ success: false, message: "Erro ao consultar professor" });
    }
  });
};
