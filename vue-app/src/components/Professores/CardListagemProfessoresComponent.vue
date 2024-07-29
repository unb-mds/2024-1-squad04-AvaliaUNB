<template>
  <div class="container">
    <!--o que esta na tag PopUp so aparece quando
        button Trigger for True-->

    <PopUp
      v-if="popupTrigger.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
      :professor="professor"
    />

    <div class="card-professor" :class="{ flipped: isFlipped }">
      <div class="front">
        <div class="three-dots" @click="flipCard">
          <div class="dot-1"></div>
          <div class="dot-2"></div>
          <div class="dot-3"></div>
        </div>
        <div
          class="card-front"
          @click="goToProfessorDetail(professor.cod_professor)"
        >
          <div class="profile-picture-name">
            <div class="profile-picture-div">
              <img
                :src="verificarUrl(professor.foto_professor)"
                alt=""
                class="profile-picture"
              />
            </div>
            <div class="professor-name">
              {{ professor.nome_professor }}
            </div>
            <div class="name-details">Professor</div>
          </div>
          <div class="rating-and-number">
            <div class="rating">
              <p class="nota">
                {{ professor.contribuicoes.media_nota_total.toFixed(2) }}
              </p>
              <p class="de-cinco">/ 5</p>
            </div>
            <div class="total-reviews">
              Total reviews ({{ professor.qtdavaliacoes }})
            </div>
          </div>
          <div class="five-estrelas">
            <img
              ref="estrelas"
              src="../../assets/icons/avaliacao/icone-estrela-azul.svg"
              alt=""
              class="estrela"
              v-for="n in 5"
              :key="n"
            />
          </div>
        </div>
      </div>
      <div class="back">
        <div class="review-breakdown">Review breakdown</div>

        <div class="details-list" @click="flipCard">
          <div class="details">
            <div class="number-stars">Acesso</div>
            <div class="barra-texto">
              <div class="barra-porcentagem">
                <div
                  class="barra-preenchida"
                  :style="{
                    width: professor.contribuicoes.contribuicao_acesso + '%',
                  }"
                ></div>
              </div>

              <div class="porcentagem">
                {{ professor.contribuicoes.contribuicao_acesso }}%
              </div>
            </div>
          </div>

          <div class="details">
            <div class="number-stars">Didática</div>
            <div class="barra-texto">
              <div class="barra-porcentagem">
                <div
                  class="barra-preenchida"
                  :style="{
                    width: professor.contribuicoes.contribuicao_didatica + '%',
                  }"
                ></div>
              </div>

              <div class="porcentagem">
                {{ professor.contribuicoes.contribuicao_didatica }}%
              </div>
            </div>
          </div>

          <div class="details">
            <div class="number-stars">Metodologia</div>
            <div class="barra-texto">
              <div class="barra-porcentagem">
                <div
                  class="barra-preenchida"
                  :style="{
                    width:
                      professor.contribuicoes.contribuicao_metodologia + '%',
                  }"
                ></div>
              </div>

              <div class="porcentagem">
                {{ professor.contribuicoes.contribuicao_metodologia }}%
              </div>
            </div>
          </div>

          <div class="details">
            <div class="number-stars">Carisma</div>
            <div class="barra-texto">
              <div class="barra-porcentagem">
                <div
                  class="barra-preenchida"
                  :style="{
                    width:
                      professor.contribuicoes.contribuicao_metodo_ensino + '%',
                  }"
                ></div>
              </div>

              <div class="porcentagem">
                {{ professor.contribuicoes.contribuicao_metodo_ensino }}%
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
import PopUp from "./PopupAvaliaProfessor.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    PopUp,
  },
  name: "CardListagemProfessoresComponent",
  props: {
    professor: Object,
  },
  data() {
    return {
      isFlipped: false,
    };
  },
  mounted() {
    nextTick(() => {
      this.handleEstrelasProfessor();
    });
  },

  setup() {
    const router = useRouter();

    const goToProfessorDetail = (id) => {
      // console.log(id)
      router.push({ name: "paginaProfessor", params: { id: id } });
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
      goToProfessorDetail,
    };
  },

  watch: {
    professor: {
      handler() {
        this.$nextTick(() => {
          this.handleEstrelasProfessor();
        });
      },
      deep: true,
    },
  },
  methods: {
    verificarUrl(urlProfessor) {
      if (urlProfessor === "https://sigaa.unb.br/sigaa/img/no_picture.png") {
        return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
      }
      return urlProfessor;
    },
    handleEstrelasProfessor() {
      const estrelas = this.$refs.estrelas;
      const media = this.professor.contribuicoes.media_nota_total;

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
  height: 500px;
  display: flex;
  justify-content: center;
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

.back {
  transform: rotateY(180deg);
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.card-front {
  display: flex;
  flex-direction: column;
  padding-left: 40px;
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

.card-professor.flipped {
  cursor: pointer;
  transform: rotateY(180deg);
}

.dot-1,
.dot-2,
.dot-3 {
  width: 4px;
  height: 4px;
  background-color: #535353;
  border-radius: 100px;
}

.card-professor {
  width: 100%;
  max-width: 450px;
  height: 100%;
  border-radius: 14px;

  background-color: rgb(243, 243, 243);
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

.profile-picture-div {
  padding: 2.4px;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: rgb(8, 54, 80);
  background: linear-gradient(150deg, #1b5994 40%, #0a745b 60%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.professor-name {
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 2.4rem;
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
    height: 450px;
  }
  .card-professor {
    padding-top: 0;
    padding-bottom: 0;
    width: 90%;
    height: 100%;
  }
}
</style>
