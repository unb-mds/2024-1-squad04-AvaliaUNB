<template>
  <div class="card-top-rest" v-if="professor">
    <div class="profile-picture-name">
      <h3 class="number">{{ position }}</h3>
      <div class="picture-name">
        <img
          :src="verificarUrl(professor.foto_professor)"
          class="professor-picture"
          alt="Professor"
        />
        <h3 class="name">{{ getPrimeirosNomes(professor.nome_professor) }}</h3>
      </div>
    </div>

    <div class="rating">
      <img
        class="star"
        src="../../assets/icons/avaliacao/icone-estrela.svg"
        alt="icon-estrela"
      />
      <p class="rate">{{ professor.nota_media / 2 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardRankingProfessorComponent",

  props: {
    professor: Object,
    position: Number,
  },
  methods: {
    getPrimeirosNomes(nomeCompleto) {
      // Divide a string em partes utilizando o espaço como separador
      const partes = nomeCompleto.split(" ");

      // Pega os dois primeiros elementos do array resultante
      const primeirosNomes = partes.slice(0, 2);

      // Junta os dois primeiros nomes de volta em uma string
      return primeirosNomes.join(" ");
    },

    verificarUrl(urlProfessor) {
      if (urlProfessor === "https://sigaa.unb.br/sigaa/img/no_picture.png") {
        return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
      }

      return urlProfessor;
    },
  },
};
</script>

<style scoped>
.card-top-rest {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
}

.profile-picture-name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0 20px 0px;
  gap: 20px;
  padding-left: 40px;
  width: 90%;
}

.picture-name {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.professor-picture {
  width: 6rem;
  height: 6rem;
  border-radius: 100%;
  object-fit: cover;
}

.name {
  font-family: "Open Sans", sans-serif;
  color: #f0f0f0;
  font-size: 1.8rem;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  width: 100%;
}

.number {
  font-family: "Open Sans", sans-serif;
  color: #f0f0f0;
  font-size: 2rem;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  padding-right: 40px;
  gap: 3%;
}

.star {
  width: 15%;
  height: auto;
}

.rate {
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  color: #c4c4c4;
  margin: 0;
}
</style>
