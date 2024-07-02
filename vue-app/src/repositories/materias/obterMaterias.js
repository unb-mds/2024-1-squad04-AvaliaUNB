// essa função obtém as matérias com sua nota total - ranking geral de matérias
export async function getMateriasAvaliadasNotaTotal() {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:3000/materias_avaliadas")
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}

export async function getMateriasListagem() {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:3000/materias")
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}

export async function getMateriasParaFiltro() {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:3000/materias_para_filtragem")
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}

export async function getMateriaByID(cod_materia) {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:3000/materia/${cod_materia}`)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data[0]))
			.catch((erro) => reject(erro));
	});
}
