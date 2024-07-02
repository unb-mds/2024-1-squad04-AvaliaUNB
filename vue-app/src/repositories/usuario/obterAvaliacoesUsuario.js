export async function getMinhasAvaliacoesDeProfessor(matricula){  //função que irá retornar as avaliações do usuário
    return new Promise((resolve, reject) =>{
        fetch(`http://localhost:3000/avaliacoes_professor/${matricula}`)
        .then(resposta=>resposta.json())
        .then(dados=>resolve(dados.data))
        .catch(erro => reject(erro));
    });
}
export async function getMinhasAvaliacoesDeMaterias(matricula) {  
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/avaliacoes_materia/${matricula}`)
            .then(resposta => resposta.json())
            .then(dados => resolve(dados.data))
            .catch(erro => reject(erro));
    });
}
