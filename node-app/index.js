import { Sequelize } from "sequelize";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as User from "./controllers/UserMET.js";
import * as Professor from "./controllers/ProfessorMET.js";
import * as Materia from "./controllers/MateriaMET.js";
import * as Avaliacao from "./controllers/AvaliacaoMET.js";
import * as Comentario from "./controllers/ComentarioMET.js";

dotenv.config();

const corsOptions = {
  origin: process.env.URL_FRONT_END,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Conectado ao Banco de Dados");
  })
  .catch(function (erro) {
    console.log(erro);
  });

User.getDados(app, sequelize);
User.getDadosSessionStorage(app, sequelize);
User.postDados(app, sequelize);
User.getChave(app);
User.getDadosPerfil(app, sequelize);
User.editarDadosPerfil(app, sequelize);

Professor.getProfessoresAvaliados(app, sequelize);
Professor.getProfessores(app, sequelize);
Professor.getProfessorById(app, sequelize);

Materia.getMateriasAvaliadss(app, sequelize);
Materia.getMaterias(app, sequelize);
Materia.getMateriaById(app, sequelize);

Avaliacao.getProfessoresAvaliar(app, sequelize);
Avaliacao.getMateriasAvaliar(app, sequelize);
Materia.getMateriasParaFiltragem(app, sequelize);
Avaliacao.getAvaliacoesMateriaUsuario(app, sequelize);
Avaliacao.getAvaliacoesProfessorUsuario(app, sequelize);
Avaliacao.deleteAvaliacaoComentarioProfessor(app, sequelize);
Avaliacao.deleteAvaliacaoComentarioMateria(app, sequelize);

Comentario.curtirDescurtirComentarioProfessor(app, sequelize);
Comentario.usuarioCurteDescurteComentarioProfessor(app, sequelize);
Comentario.deletarRelacionamentoUsuarioComentarioProfessor(app, sequelize);
Comentario.editarRelacionamentoUsuarioComentarioProfessor(app, sequelize);
Comentario.curtirDescurtirComentarioMateria(app, sequelize);
Comentario.usuarioCurteDescurteComentarioMateria(app, sequelize);
Comentario.deletarRelacionamentoUsuarioComentarioMateria(app, sequelize);
Comentario.editarRelacionamentoUsuarioComentarioMateria(app, sequelize);

app.listen(3000, () => {
  console.log("API is running on port 3000");
});
