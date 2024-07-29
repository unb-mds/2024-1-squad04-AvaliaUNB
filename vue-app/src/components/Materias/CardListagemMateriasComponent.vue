<template>
  <div class="container">
    <PopUp
      v-if="popupTrigger.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
      :materia="materia"
    />
    <div class="card-materia" :class="{ flipped: isFlipped }">
      <div class="front">
        <div class="three-dots" @click="flipCard">
          <div class="dot-1"></div>
          <div class="dot-2"></div>
          <div class="dot-3"></div>
        </div>
        <div class="card-front" @click="materiaDetail(materia.cod_materia)">
          <div class="profile-picture-name">
            <div class="materia-name">
              {{ materia.nome_materia }}
            </div>
            <div class="name-details">
              {{ materia.cod_materia }}
            </div>
          </div>
          <div class="rating-and-number">
            <div class="rating">
              <p class="nota">
                {{ materia.contribuicoes.nota_total.toFixed(2) }}
              </p>
              <p class="de-cinco">/ 5</p>
            </div>
            <div class="total-reviews">
              Total reviews ({{ materia.qtd_avaliacoes }})
            </div>
          </div>
          <div class="five-estrelas">
            <img
              v-for="index in 5"
              :key="index"
              ref="estrelas"
              src="../../assets/icons/avaliacao/icone-estrela-azul.svg"
              alt=""
              class="estrela"
            />
          </div>
        </div>
      </div>
      <div class="back">
        <div class="review-breakdown">Review breakdown</div>

        <div class="details-list" @click="flipCard">
          <div class="details">
            <div class="number-stars">Experiência</div>
            <div class="barra-texto">
              <div class="barra-porcentagem">
                <div
                  class="barra-preenchida"
                  :style="{
                    width: materia.contribuicoes.contribuicao_experiencia + '%',
                  }"
                ></div>
              </div>

              <div class="porcentagem">
                {{ materia.contribuicoes.contribuicao_experiencia }}%
              </div>
            </div>
          </div>

          <div class="details">
            <div class="number-stars">Dificuldade</div>
            <div class="barra-texto">
              <div class="barra-porcentagem">
                <div
                  class="barra-preenchida"
                  :style="{
                    width: materia.contribuicoes.contribuicao_dificuldade + '%',
                  }"
                ></div>
              </div>

              <div class="porcentagem">
                {{ materia.contribuicoes.contribuicao_dificuldade }}%
              </div>
            </div>
          </div>
          <button class="avali" @click="() => TogglePopup('buttonTrigger')">
            Avaliar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from "vue";
import PopUp from "./PopupAvaliaMaterias.vue";
import { useRouter } from "vue-router";

export default {
  name: "CardListagemMateriasComponent",
  props: {
    materia: Object,
  },
  data() {
    return {
      isFlipped: false,
    };
  },
  components: {
    PopUp,
  },
  mounted() {
    nextTick(() => {
      this.handleEstrelasMateria();
    });
  },
  setup() {
    const router = useRouter();

    const materiaDetail = (cod) => {
      router.push({ name: "paginaMateria", params: { cod: cod } });
    };

    const popupTrigger = ref({
      buttonTrigger: false,
    });

    const TogglePopup = (trigger) => {
      popupTrigger.value[trigger] = !popupTrigger.value[trigger];
    };

    return {
      popupTrigger,
      TogglePopup,
      materiaDetail,
    };
  },
  watch: {
    materia: {
      handler() {
        nextTick(() => {
          this.handleEstrelasMateria();
        });
      },
      deep: true,
    },
  },
  methods: {
    handleEstrelasMateria() {
      const estrelas = this.$refs.estrelas;
      const media = this.materia.contribuicoes.nota_total;

      estrelas.forEach((estrela, index) => {
        // Remove todas as classes para garantir que começamos com uma estrela "limpa"
        estrela.classList.remove("full-star", "partial-star", "empty-star");

        if (media >= index + 1) {
          estrela.classList.add("full-star");
        } else if (media > index) {
          estrela.classList.add("partial-star");
        } else {
          estrela.classList.add("empty-star");
        }
      });
    },
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style scoped>
.full-star {
  filter: none;
}

.partial-star {
  filter: none;
  -webkit-mask-image: linear-gradient(to left, transparent 40%, black 60%);
  opacity: 1;
}

.empty-star {
  filter: invert(50%) opacity(30%);
}
.container {
  width: 100%;
  max-width: 350px;
  height: 400px;
  display: flex;
}
.container:last-of-type {
  margin-bottom: 5vh;
}
.front,
.back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  left: 0;
  /* Adiciona padding para que o conteúdo não saia da borda */
}

.card-materia.flipped {
  cursor: pointer;
  transform: rotateY(180deg);
}

.back {
  transform: rotateY(180deg);
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.three-dots {
  display: flex;
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 30;
  gap: 2px;
  cursor: pointer;
}

.dot-1,
.dot-2,
.dot-3 {
  width: 4px;
  height: 4px;
  background-color: #535353;
  border-radius: 100px;
}

.card-front {
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  gap: 30px;
}

.card-materia {
  width: 100%;
  max-width: 450px;
  border-radius: 14px;
  background-color: rgb(223, 223, 223);
  position: relative;
  transition: transform 1.5s;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
}

.profile-picture-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: auto;
}

.materia-name {
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 0.5px;
  color: rgb(32, 32, 32);
  margin-right: 10px;
}

.name-details {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  color: rgb(139, 139, 139);
}

.five-estrelas {
  display: flex;
  width: 60%;
  justify-content: flex-start;
  gap: 2rem;
}

.estrela {
  width: 12%;
}

.rating-and-number {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.rating {
  display: flex;
  align-items: flex-end;
}

.nota {
  font-family: "Open Sans", sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: rgb(31, 31, 31);
  margin: 0;
}

.de-cinco {
  font-family: "Open Sans", sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: rgb(36, 36, 36);
  margin: 0;
}

.total-reviews {
  font-family: "Open Sans", sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.3px;
  font-weight: 400;
  color: rgb(83, 83, 83);
}

.review-breakdown {
  font-family: "Open Sans", sans-serif;
  font-size: 1.8rem;
  letter-spacing: 0.3px;
  font-weight: 500;
  color: rgb(83, 83, 83);
  width: 100%;
  display: flex;
  justify-content: center;
}
.details {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
  gap: 10px;
}

.avali {
  width: 80%;
  padding: 10px 0px 10px 0;
  border: none;
  font-family: "Inter", sans-serif;
  background-color: #0a745b;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.avali:hover {
  background-color: #07493a;
}

.barra-texto {
  display: flex;
  width: 100%;
  gap: 10px;
}

.number-stars,
.porcentagem {
  font-family: "Open Sans", sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(36, 36, 36);
  margin: 0;
}

.details-list {
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 20px;
  align-items: center;
}

.barra-porcentagem {
  width: 100%;
  height: 12px;
  background-color: #ffffff;
  border-radius: 10px;
  max-width: 200px;

  display: flex;
  justify-content: flex-start;
}

.barra-preenchida {
  background-color: #0a745b;
  width: 50%;
  height: 12px;
  display: flex;
  border-radius: 10px;
}
@media screen and (max-width: 1000px) {
  .container {
    height: 400px;
  }
  .card-materia {
    padding-top: 0;
    padding-bottom: 0;
    width: 70%;
    height: 90%;
  }
}
</style>
