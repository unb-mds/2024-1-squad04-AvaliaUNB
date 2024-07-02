<template>
  <div class="container">
    <div class="notas">
      <p class="tipo-nota">Experiencia:</p>
      <div class="rating">
        <input
          type="radio"
          name="notaExperiencia"
          id="star1-5"
          value="10"
          @change="emitirAvaliacao"
          v-model="rating.notaExperiencia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaExperiencia"
          id="star1-4"
          value="8"
          @change="emitirAvaliacao"
          v-model="rating.notaExperiencia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaExperiencia"
          id="star1-3"
          value="6"
          @change="emitirAvaliacao"
          v-model="rating.notaExperiencia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaExperiencia"
          id="star1-2"
          value="4"
          @change="emitirAvaliacao"
          v-model="rating.notaExperiencia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaExperiencia"
          id="star1-1"
          value="2"
          @change="emitirAvaliacao"
          v-model="rating.notaExperiencia"
          style="--c: #0a745b"
        />
      </div>
    </div>

    <div class="notas">
      <p class="tipo-nota">Dificuldade:</p>
      <div class="rating">
        <input
          type="radio"
          name="notaDificuldade"
          id="star2-5"
          value="10"
          @change="emitirAvaliacao"
          v-model="rating.notaDificuldade"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDificuldade"
          id="star2-2"
          value="8"
          @change="emitirAvaliacao"
          v-model="rating.notaDificuldade"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDificuldade"
          id="star2-4"
          value="6"
          @change="emitirAvaliacao"
          v-model="rating.notaDificuldade"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDificuldade"
          id="star2-3"
          value="4"
          @change="emitirAvaliacao"
          v-model="rating.notaDificuldade"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDificuldade"
          id="star2-1"
          value="2"
          @change="emitirAvaliacao"
          v-model="rating.notaDificuldade"
          style="--c: #0a745b"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ratingStars",
  data() {
    return {
      rating: {
        notaExperiencia: "",
        notaDificuldade: "",
      },
    };
  },
  methods: {
    emitirAvaliacao() {
      // Emitir evento com os dados de avaliação
      this.$emit("avaliacao-atualizada", this.rating);
    },
  },
};
</script>

<style scoped>
.tipo-nota {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
  padding-left: 1rem; /* Adiciona espaço entre as estrelas e o texto */
  flex: 1;
  text-align: left; /* Alinha o texto à esquerda */
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0;
}
.notas {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
}
.rating {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 10px;
}
.rating input {
  position: relative;
  width: 2.3vw;
  height: 5vh;
  margin: 0;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.rating input::before {
  content: "\f005";
  position: absolute;
  font-family: fontAwesome;
  font-size: 2.6rem;
  color: #b4b4b4a2;
  transition: 0.3s;
}

.rating input:hover ~ input::before,
.rating input:hover::before,
.rating input:checked ~ input::before,
.rating input:checked::before {
  color: var(--c);
}
@media (max-width: 650px) {
  .tipo-nota {
    font-size: 2rem;
  }
}
@media (max-width: 500px) {
  .rating {
    gap: 15px;
  }
}
@media (max-width: 350px) {
  .notas {
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: 0;
  }
  .tipo-nota {
    padding: 0;
  }
  .rating input {
    height: 5vh;
  }
}
</style>
