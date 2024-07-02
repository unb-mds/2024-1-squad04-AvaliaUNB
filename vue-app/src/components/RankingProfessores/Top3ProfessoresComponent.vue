<template>
  <div class="card-total">
    <div class="top3">
      <div class="second-third" v-if="professor2">
        <div class="picture-position">
          <div class="position">2</div>
          <img
            :src="verificarUrl(professor2.foto_professor)"
            class="professor-picture"
            alt="First Professor"
          />
        </div>
        <div class="name-rating">
          <h3 class="name">
            {{ getPrimeirosNomes(professor2.nome_professor) }}
          </h3>
          <div class="rating">
            <img
              class="star"
              src="../../assets/icons/avaliacao/icone-estrela.svg"
            />
            <p class="rate">{{ professor2.nota_media / 2 }}</p>
          </div>
        </div>
      </div>
      <div class="first" v-if="professor1">
        <div class="picture-position">
          <div class="position">1</div>
          <img
            :src="verificarUrl(professor1.foto_professor)"
            class="professor-picture"
            alt="First Professor"
          />
        </div>
        <div class="name-rating">
          <h3 class="name">
            {{ getPrimeirosNomes(professor1.nome_professor) }}
          </h3>
          <div class="rating">
            <img
              class="star"
              src="../../assets/icons/avaliacao/icone-estrela.svg"
            />
            <p class="rate">{{ professor1.nota_media / 2 }}</p>
          </div>
        </div>
      </div>

      <div class="second-third" v-if="professor3">
        <div class="picture-position">
          <div class="position">3</div>
          <img
            :src="verificarUrl(professor3.foto_professor)"
            class="professor-picture"
            alt="First Professor"
          />
        </div>
        <div class="name-rating">
          <h3 class="name">
            {{ getPrimeirosNomes(professor3.nome_professor) }}
          </h3>
          <div class="rating">
            <img
              class="star"
              src="../../assets/icons/avaliacao/icone-estrela.svg"
            />
            <p class="rate">{{ professor3.nota_media / 2 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top3ProfessoresComponent",
  props: {
    professor1: Object,
    professor2: Object,
    professor3: Object,
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
.card-total {
  width: 100%;
  height: auto;
}

.top3 {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  align-items: flex-end;
}

.first {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  order: 0;
  width: 33%;
}

.second-third {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  order: 0;
  width: 33%;
}

.star {
  width: 15px;
  height: auto;
}

.picture-position {
  display: flex;
  flex-direction: column-reverse;
  height: auto;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.name {
  font-family: "Open Sans", sans-serif;
  font-size: 1.8rem;
  color: #f0f0f0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.first .position {
  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  color: #505050;
  font-weight: 800;
  background-color: rgb(240, 240, 240);
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  text-align: center;
  padding: 1rem;
  line-height: 1rem;
  margin-top: -6%;
}

.second-third .position {
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
  color: #505050;
  font-weight: 800;
  background-color: rgb(240, 240, 240);
  border-radius: 100%;
  width: 0.8rem;
  height: 0.8rem;
  text-align: center;
  padding: 0.8rem;
  line-height: 0.8rem;
  margin-top: -6%;
}

.rating {
  display: flex;
  gap: 5px;
}

.rate {
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  color: #c4c4c4;
  margin: 0;
}

.name-rating {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  align-items: center;
}

.first .professor-picture {
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  object-fit: cover;
}

.second-third .professor-picture {
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  object-fit: cover;
}
</style>
