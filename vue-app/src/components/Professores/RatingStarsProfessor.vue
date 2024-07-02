<template>
  <div class="container">
    <div class="notas">
      <p class="tipo-nota">Acesso:</p>
      <div class="rating">
        <input
          type="radio"
          name="notaAcesso"
          id="star1-5"
          value="10"
          @change="emitirAvaliacao"
          v-model="rating.notaAcesso"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaAcesso"
          id="star1-4"
          value="8"
          @change="emitirAvaliacao"
          v-model="rating.notaAcesso"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaAcesso"
          id="star1-3"
          value="6"
          @change="emitirAvaliacao"
          v-model="rating.notaAcesso"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaAcesso"
          id="star1-2"
          value="4"
          @change="emitirAvaliacao"
          v-model="rating.notaAcesso"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaAcesso"
          id="star1-1"
          value="2"
          @change="emitirAvaliacao"
          v-model="rating.notaAcesso"
          style="--c: #0a745b"
        />
      </div>
    </div>
    <div class="notas">
      <p class="tipo-nota">Didática:</p>
      <div class="rating">
        <input
          type="radio"
          name="notaDidatica"
          id="star2-5"
          value="10"
          @change="emitirAvaliacao"
          v-model="rating.notaDidatica"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDidatica"
          id="star2-4"
          value="8"
          @change="emitirAvaliacao"
          v-model="rating.notaDidatica"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDidatica"
          id="star2-3"
          value="6"
          @change="emitirAvaliacao"
          v-model="rating.notaDidatica"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDidatica"
          id="star2-2"
          value="4"
          @change="emitirAvaliacao"
          v-model="rating.notaDidatica"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaDidatica"
          id="star2-1"
          value="2"
          @change="emitirAvaliacao"
          v-model="rating.notaDidatica"
          style="--c: #0a745b"
        />
      </div>
    </div>
    <div class="notas">
      <p class="tipo-nota">Metodologia:</p>
      <div class="rating">
        <input
          type="radio"
          name="notaMetodologia"
          id="star3-5"
          value="10"
          @change="emitirAvaliacao"
          v-model="rating.notaMetodologia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaMetodologia"
          id="star3-4"
          value="8"
          @change="emitirAvaliacao"
          v-model="rating.notaMetodologia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaMetodologia"
          id="star3-3"
          value="6"
          @change="emitirAvaliacao"
          v-model="rating.notaMetodologia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaMetodologia"
          id="star3-2"
          value="4"
          @change="emitirAvaliacao"
          v-model="rating.notaMetodologia"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaMetodologia"
          id="star3-1"
          value="2"
          @change="emitirAvaliacao"
          v-model="rating.notaMetodologia"
          style="--c: #0a745b"
        />
      </div>
    </div>
    <div class="notas">
      <p class="tipo-nota">Carisma:</p>
      <div class="rating">
        <input
          type="radio"
          name="notaCarisma"
          id="star4-5"
          value="10"
          @change="emitirAvaliacao"
          v-model="rating.notaCarisma"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaCarisma"
          id="star4-4"
          value="8"
          @change="emitirAvaliacao"
          v-model="rating.notaCarisma"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaCarisma"
          id="star4-3"
          value="6"
          @change="emitirAvaliacao"
          v-model="rating.notaCarisma"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaCarisma"
          id="star4-2"
          value="4"
          @change="emitirAvaliacao"
          v-model="rating.notaCarisma"
          style="--c: #0a745b"
        />
        <input
          type="radio"
          name="notaCarisma"
          id="star4-1"
          value="2"
          @change="emitirAvaliacao"
          v-model="rating.notaCarisma"
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
        notaAcesso: "",
        notaDidatica: "",
        notaMetodologia: "",
        notaCarisma: "",
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
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}
.rating {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 15px;
}
.rating input {
  position: relative;
  width: 3rem;
  height: 5vh;
  margin: 0;
  padding: 0;
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
  font-size: 3rem;
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
    gap: 10px;
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
