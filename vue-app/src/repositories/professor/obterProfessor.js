/* eslint-disable */
const apiUrl = process.env.VUE_APP_API_URL;
export async function getProfessoresAvaliadosNotaTotal() {
	return new Promise((resolve, reject) => {
		fetch(`${apiUrl}/professores_avaliados`)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}

//mudança na função para lidar com a mudança feita na requisição do backend

export async function getProfessores(materia) {
	return new Promise((resolve, reject) => {
		const url = materia
			? `${apiUrl}/professores?materia=${encodeURIComponent(materia)}`
			: `${apiUrl}/professores`;

		fetch(url)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}

export async function getProfessoresByID(cod_professor, materia) {
	const apiUrl = process.env.VUE_APP_API_URL;

	//função no service que irá retornar os dados do professor de acordo co
	return new Promise((resolve, reject) => {
		const url = materia
			? `${apiUrl}/professor/${cod_professor}?materia=${encodeURIComponent(
					materia
			  )}`
			: `${apiUrl}/professor/${cod_professor}`;
		fetch(url)
			.then((resposta) => resposta.json())
			.then((dados) => resolve(dados.data))
			.catch((erro) => reject(erro));
	});
}
