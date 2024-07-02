import { getProfessoresByID } from "@/repositories/professor/obterProfessor";

async function obterProfessoresByID(){ //chama o repositories e obtem as informações da api
    try{
        const professor = await getProfessoresByID(cod_professor);
        return professor;

    } catch (error){
        console.error('Erro ao obter professor', error);
    }
}
