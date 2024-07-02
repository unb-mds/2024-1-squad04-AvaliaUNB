import { getMateriasListagem } from "@/repositories/materias/obterMaterias";

export async function obterMaterias(){ //chama o repositories e obtem as informações da api
    try{
        const materias = await getMateriasListagem();
        return materias;

    } catch (error){
        console.error('Erro ao obter materias', error);
    }
}


function CalcularPesoCriteriosAvaliacaoSemFiltro(medias) {
    const {
        nota_total,
        nota_experiencia,
        nota_dificuldade,
    } = medias;

    let MediaTotal = 0;
    let ContribuicaoExperiencia = 0;
    let ContribuicaoDificuldade = 0;

    // Verifica se há avaliações disponíveis
    if (nota_total !== 0) {
        const SomaMedidas = nota_experiencia + nota_dificuldade;

        // Verifica se a soma das medidas é diferente de zero antes de calcular as contribuições
        if (SomaMedidas !== 0) {
            ContribuicaoExperiencia = Math.round((nota_experiencia / SomaMedidas) * 100);
            ContribuicaoDificuldade = Math.round((nota_dificuldade / SomaMedidas) * 100);
        }
        
        // Calcula a média total apenas se houver avaliações disponíveis
        MediaTotal = nota_total / 2;
    }

    return {
        nota_total: MediaTotal,
        contribuicao_experiencia: ContribuicaoExperiencia,
        contribuicao_dificuldade: ContribuicaoDificuldade
    };
}


export async function obterInformacoesMaterias() {
    try {
        const materias = await obterMaterias();
        const materiasComContribuicoes = materias.map(materia => {
            const contribuicoes = CalcularPesoCriteriosAvaliacaoSemFiltro(materia.avaliacoes);
            return {
                nome_materia: materia.nome_materia,
                cod_materia: materia.cod_materia,
                qtd_hrs: materia.qtd_horas_materia,
                qtd_avaliacoes: materia.avaliacoes.quantidade_avaliacoes,
                contribuicoes: contribuicoes
            };
        });
        return materiasComContribuicoes;
    } catch (error) {
        console.error('Erro ao obter informações das materias:', error);
    }
}