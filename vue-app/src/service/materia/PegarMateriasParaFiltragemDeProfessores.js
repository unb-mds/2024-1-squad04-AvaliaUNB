import { getMateriasParaFiltro } from "@/repositories/materias/obterMaterias";

export async function obterMateriasParaFiltragem() {
	//chama o repositories e obtem as informações da api
	try {
		const materias = await getMateriasParaFiltro();
		return materias;
	} catch (error) {
		console.error("Erro ao obter materias", error);
	}
}
