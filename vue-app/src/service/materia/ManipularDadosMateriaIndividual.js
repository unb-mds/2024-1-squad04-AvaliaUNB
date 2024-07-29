import { getMateriaByID } from "@/repositories/materias/obterMaterias";

export async function obterMateriaByID(cod_materia) {
  //chama o repositories e obtem as informações da api
  try {
    const materia = await getMateriaByID(cod_materia);
    return materia;
  } catch (error) {
    console.error("Erro ao obter materia", error);
  }
}
