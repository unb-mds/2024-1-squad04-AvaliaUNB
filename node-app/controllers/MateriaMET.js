export const getMateriasAvaliadss = (app, sequelize) => {
  app.get("/materias_avaliadas", (req, res) => {
    const sqlQuery = `
        SELECT 
            m.nome AS nome_materia,
            m.cod_materia AS cod_materia,
            ROUND(AVG(am.nota_total), 1) AS nota_media_total
        FROM 
            materia m
        INNER JOIN 
            materia_avaliacao_usuario mau ON m.cod_materia = mau.cod_materia
        INNER JOIN 
            avaliacao_materia am ON mau.cod_avaliacao = am.cod_avaliacao
        GROUP BY 
            m.nome, m.cod_materia
        ORDER BY 
            nota_media_total DESC;
    `;

    sequelize
      .query(sqlQuery, { type: sequelize.QueryTypes.SELECT })
      .then((result) => {
        console.log("Consulta realizada com sucesso");
        res.json({ success: true, data: result });
      })
      .catch((error) => {
        console.error("Erro ao consultar materias avaliadas:", error);
        res.status(500).json({
          success: false,
          message: "Erro ao consultar materias avaliadas",
        });
      });
  });
};

export const getMaterias = (app, sequelize) => {
  app.get("/materias", async (req, res) => {
    try {
      const sqlQuery = `
          SELECT 
            m.nome AS nome_materia,
            m.cod_materia AS cod_materia,
            m.qtd_hrs_materia AS quantidade_horas,
            ROUND(COALESCE(AVG(COALESCE(am.nota_total, 0)), 0), 1) AS nota_media_total,
            (
            JSON_OBJECT(
              'nota_total', AVG(COALESCE(am.nota_total, 0)),
              'nota_experiencia', AVG(COALESCE(am.nota_experiencia, 0)),
              'nota_dificuldade', AVG(COALESCE(am.nota_dificuldade, 0)),
              'quantidade_avaliacoes', COUNT(am.cod_avaliacao)
            )) AS avaliacoes
          FROM 
            materia m
          LEFT JOIN 
            materia_avaliacao_usuario mau ON m.cod_materia = mau.cod_materia
          LEFT JOIN 
            avaliacao_materia am ON mau.cod_avaliacao = am.cod_avaliacao
          GROUP BY 
            m.cod_materia
          ORDER BY 
            nota_media_total DESC;
        `;

      const materias = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.SELECT,
      });

      res.json({ success: true, data: materias });
    } catch (error) {
      console.error("Erro ao consultar materias avaliadas:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao consultar materias avaliadas",
      });
    }
  });
};

export const getMateriasParaFiltragem = (app, sequelize) => {
  app.get("/materias_para_filtragem", async (req, res) => {
    try {
      const sqlQuery = `
          SELECT 
            nome,
            cod_materia
          FROM 
            materia m
        `;

      const materias = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.SELECT,
      });

      res.json({ success: true, data: materias });
    } catch (error) {
      console.error("Erro ao consultar materias :", error);
      res
        .status(500)
        .json({ success: false, message: "Erro ao consultar materias" });
    }
  });
};

export const getMateriaById = (app, sequelize) => {
  app.get("/materia/:cod_materia", async (req, res) => {
    const { cod_materia } = req.params;

    try {
      const sqlQuery = `
          SELECT 
            m.nome AS nome_materia,
            m.cod_materia AS cod_materia,
            m.qtd_hrs_materia AS quantidade_horas,
            (
              SELECT JSON_ARRAYAGG(JSON_OBJECT(
                  'cod_avaliacao', am.cod_avaliacao,
                  'nota_total', COALESCE(am.nota_total, 0),
                  'nota_experiencia', COALESCE(am.nota_experiencia, 0),
                  'nota_dificuldade', COALESCE(am.nota_dificuldade, 0),
                  'comentario', COALESCE(cam.comentario, ''),
                  'cod_comentario', cam.cod_comentario,
                  'num_likes', COALESCE(cam.num_likes, 0),
                  'num_dislikes', COALESCE(cam.num_dislikes, 0),
                  'usuario', JSON_OBJECT(
                    'nome_usuario', u.nome,
                    'matricula', u.matricula,
                    'foto_url', u.foto_url
                  )
                ))
              FROM materia_avaliacao_usuario mau
              LEFT JOIN avaliacao_materia am ON mau.cod_avaliacao = am.cod_avaliacao
              LEFT JOIN comentario_materia cam ON mau.cod_comentario = cam.cod_comentario
              LEFT JOIN usuario u ON mau.matricula = u.matricula
              WHERE mau.cod_materia = m.cod_materia
            ) AS avaliacoes,
            (
              SELECT JSON_OBJECT(
                'media_nota_total', AVG(COALESCE(am.nota_total, 0)),
                'media_nota_experiencia', AVG(COALESCE(am.nota_experiencia, 0)),
                'media_nota_dificuldade', AVG(COALESCE(am.nota_dificuldade, 0))
              )
              FROM materia_avaliacao_usuario mau
              LEFT JOIN avaliacao_materia am ON mau.cod_avaliacao = am.cod_avaliacao
              WHERE mau.cod_materia = m.cod_materia
            ) AS medias
          FROM 
            materia m
          WHERE
            m.cod_materia = :cod_materia
          GROUP BY 
            m.cod_materia;
        `;

      const materia = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { cod_materia },
      });

      res.json({ success: true, data: materia });
    } catch (error) {
      console.error("Erro ao consultar matéria:", error);
      res
        .status(500)
        .json({ success: false, message: "Erro ao consultar matéria" });
    }
  });
};
