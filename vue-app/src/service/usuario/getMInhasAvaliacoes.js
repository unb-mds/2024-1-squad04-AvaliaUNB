import {
  getMinhasAvaliacoesDeProfessor,
  getMinhasAvaliacoesDeMaterias,
} from "@/repositories/usuario/obterAvaliacoesUsuario";
import { descriptarDados } from "@/generals/descriptografarDados";

export async function obterMinhasAvaliacoesProfessores() {
  try {
    const usuarioEncriptografado = sessionStorage.getItem("matricula");
    const usuarioDescriptografado = await descriptarDados(
      usuarioEncriptografado
    );

    const minhas_avaliacoes_professores = await getMinhasAvaliacoesDeProfessor(
      usuarioDescriptografado
    );

    const avaliacoesProfessores =
      minhas_avaliacoes_professores.avaliacoesProfessores || [];
    const qtd_avaliacoes = avaliacoesProfessores.length;

    const avaliacoes_professor = avaliacoesProfessores.map((avaliacao) => ({
      nome_professor: avaliacao.nome_professor,
      foto_professor: avaliacao.foto_professor,
      cod_materia: avaliacao.cod_materia,
      nota_total: avaliacao.nota_total / 2,
      comentario: avaliacao.comentario,
      num_likes: avaliacao.num_likes,
      num_dislikes: avaliacao.num_dislikes,
      cod_comentario: avaliacao.cod_comentario,
      cod_avaliacao: avaliacao.cod_avaliacao,
      cod_professor: avaliacao.cod_professor,
    }));

    return {
      qtd_avaliacoes,
      avaliacoes_professor,
    };
  } catch (error) {
    console.error("Erro ao buscar minhas avaliações de professores", error);
    throw error;
  }
}

export async function obterMinhasAvaliacoesMaterias() {
  try {
    const usuarioEncriptografado = sessionStorage.getItem("matricula");
    const usuarioDescriptografado = await descriptarDados(
      usuarioEncriptografado
    );
    // Obtendo as avaliações de matérias do usuário
    const minhasAvaliacoesMaterias = await getMinhasAvaliacoesDeMaterias(
      usuarioDescriptografado
    );

    // Mapeando as avaliações para o formato desejado
    const avaliacoesMaterias =
      minhasAvaliacoesMaterias.avaliacoesMaterias || [];
    const qtdAvaliacoes = avaliacoesMaterias.length;

    const avaliacoesMateria = avaliacoesMaterias.map((avaliacao) => ({
      nome_materia: avaliacao.nome_materia,
      cod_materia: avaliacao.cod_materia,
      nota_total: avaliacao.nota_total / 2,
      comentario: avaliacao.comentario,
      num_likes: avaliacao.num_likes,
      num_dislikes: avaliacao.num_dislikes,
      cod_avaliacao: avaliacao.cod_avaliacao,
      cod_comentario: avaliacao.cod_comentario,
    }));

    return {
      qtdAvaliacoes,
      avaliacoesMateria,
    };
  } catch (error) {
    console.error("Erro ao buscar minhas avaliações de matérias", error);
    throw error;
  }
}
