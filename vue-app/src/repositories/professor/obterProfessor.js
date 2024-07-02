export async function getProfessoresAvaliadosNotaTotal() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/professores_avaliados")
      .then((resposta) => resposta.json())
      .then((dados) => resolve(dados.data))
      .catch((erro) => reject(erro));
  });
}

//mudança na função para lidar com a mudança feita na requisição do backend

export async function getProfessores(materia) {
  return new Promise((resolve, reject) => {
    const url = materia
      ? `http://localhost:3000/professores?materia=${encodeURIComponent(
          materia
        )}`
      : "http://localhost:3000/professores";

    fetch(url)
      .then((resposta) => resposta.json())
      .then((dados) => resolve(dados.data))
      .catch((erro) => reject(erro));
  });
}

export async function getProfessoresByID(cod_professor, materia) {
  //função no service que irá retornar os dados do professor de acordo com o valor de codigo passado
  return new Promise((resolve, reject) => {
    const url = materia
      ? `http://localhost:3000/professor/${cod_professor}?materia=${encodeURIComponent(
          materia
        )}`
      : `http://localhost:3000/professor/${cod_professor}`;
    fetch(url)
      .then((resposta) => resposta.json())
      .then((dados) => resolve(dados.data))
      .catch((erro) => reject(erro));
  });
}
