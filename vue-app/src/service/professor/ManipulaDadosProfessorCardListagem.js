import { getProfessores } from "@/repositories/professor/obterProfessor";

//duas funções a serem exportadas, uma para o card sem filtro de materia e outra para o card com filtro de matéria

//para o card sem filtro as informações serão: nome_professor, foto_professor, cod_professor, media_nota_total / 2 (pois são 5 estrelas) OK, o peso de media_nota_acesso, media_nota_didatica, media_nota_metodologia, media_nota_metodo_ensino, que influencia na nota media_nota_total OK

async function obterProfessores(materia) {
  //chama o repositories e obtem as informações da api
  try {
    const professores = await getProfessores(materia);
    return professores;
  } catch (error) {
    console.error("Erro ao obter professores", error);
  }
}

function CalcularPesoCriteriosAvaliacaoSemFiltro(medias) {
  const {
    media_nota_total,
    media_nota_acesso,
    media_nota_didatica,
    media_nota_metodologia,
    media_nota_metodo_ensino,
  } = medias;

  let MediaTotal = 0;
  let ContribuicaoAcesso = 0;
  let ContribuicaoDidatica = 0;
  let ContribuicaoMetodologia = 0;
  let ContribuicaoMetodoEnsino = 0;

  // Verifica se há avaliações disponíveis
  if (media_nota_total !== 0) {
    const SomaMedidas =
      media_nota_acesso +
      media_nota_didatica +
      media_nota_metodologia +
      media_nota_metodo_ensino;

    // Verifica se a soma das medidas é diferente de zero antes de calcular as contribuições
    if (SomaMedidas !== 0) {
      ContribuicaoAcesso = Math.round((media_nota_acesso / SomaMedidas) * 100);
      ContribuicaoDidatica = Math.round(
        (media_nota_didatica / SomaMedidas) * 100
      );
      ContribuicaoMetodologia = Math.round(
        (media_nota_metodologia / SomaMedidas) * 100
      );
      ContribuicaoMetodoEnsino = Math.round(
        (media_nota_metodo_ensino / SomaMedidas) * 100
      );
    }

    // Calcula a média total apenas se houver avaliações disponíveis
    MediaTotal = media_nota_total / 2;
  }

  return {
    media_nota_total: MediaTotal,
    contribuicao_acesso: ContribuicaoAcesso,
    contribuicao_didatica: ContribuicaoDidatica,
    contribuicao_metodologia: ContribuicaoMetodologia,
    contribuicao_metodo_ensino: ContribuicaoMetodoEnsino,
  };
}

export async function obterInformacoesProfessoresFiltrados(materia) {
  try {
    const professores = await obterProfessores(materia);
    const professoresComContribuicoes = professores.map((professor) => {
      const contribuicoes = CalcularPesoCriteriosAvaliacaoSemFiltro(
        professor.medias
      );
      return {
        nome_professor: professor.nome_professor,
        cod_professor: professor.cod_professor,
        foto_professor: professor.foto_professor,
        materias: professor.materias,
        qtdavaliacoes: professor.quantidade_avaliacoes,
        contribuicoes: contribuicoes,
      };
    });
    return professoresComContribuicoes;
  } catch (error) {
    console.error("Erro ao obter informações dos professores:", error);
  }
}
