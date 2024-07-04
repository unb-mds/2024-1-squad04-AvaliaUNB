<template>
  <div class="materia-wraper">
    <PopUp
      v-if="popupTrigger.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
      :materia="materia"
    />
    <div class="info-materia">
      <div class="materia-details-rating">
        <div class="voltar" @click="voltarPagina">
          <div class="icon">
            <svg
              width="22"
              height="39"
              viewBox="0 0 22 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3128 37.7848C19.8284 38.2535 20.6253 38.2066 21.094 37.691C21.5628 37.1754 21.5159 36.3785 21.0003 35.9098L2.85963 19.5035C2.39088 19.0816 2.39088 18.4723 2.85963 18.0504L21.0003 2.20664C21.5159 1.73789 21.5628 0.941015 21.1409 0.42539C20.6721 -0.0902346 19.8753 -0.137109 19.3596 0.284766L1.21901 16.1754C-0.374742 17.5816 -0.421616 19.9254 1.17213 21.3785L19.3128 37.7848Z"
                fill="#A4A4A4"
              />
            </svg>
          </div>
          <p class="voltar-text">Voltar</p>
        </div>
        <div class="details-rating">
          <div class="details">
            <div class="nome-codigo">
              <p class="nome-materia">
                {{ materia.nome_materia }}
              </p>
              <p class="materia-codigo">{{ materia.cod_materia }}</p>
              <p class="qtd-hora">
                Carga horária: {{ materia.quantidade_horas }}
              </p>
            </div>
            <p class="nota-geral-materia" v-if="materia.medias">
              {{ (materia.medias.media_nota_total / 2).toFixed(2) }}
              <span class="nota-total">/5</span>
            </p>
            <button class="avaliar" @click="() => TogglePopup('buttonTrigger')">
              Avaliar
            </button>
          </div>
          <div class="rating">
            <div class="criterio">
              <p class="nome-criterio">Geral:</p>
              <div class="stars-nota">
                <div class="stars" v-if="materia.medias">
                  <svg
                    v-for="(starClass, index) in getStarClassMateria(
                      materia.medias.media_nota_total / 2
                    )"
                    :key="index"
                    alt=""
                    class="estrela"
                    :class="starClass"
                    width="112"
                    height="104"
                    viewBox="0 0 112 104"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M63.7069 15.1759L71.8732 30.3947C72.9868 32.5132 75.9564 34.5453 78.462 34.9344L93.2634 37.2259C102.729
 38.6959 104.956 45.0947 98.1354 51.4071L86.6283 62.1294C84.6795 63.9453 83.6123 67.4474 84.2155 69.955L87.5099 
 83.2282C90.1083 93.7344 84.1227 97.7985 74.1468 92.3077L60.2733 84.655C57.7678 83.2715 53.6382 83.2715 51.0862
  84.655L37.2127 92.3077C27.2832 97.7985 21.2513 93.6912 23.8497 83.2282L27.144 69.955C27.7472 67.4474 26.68
   63.9453 24.7313 62.1294L13.2242 51.4071C6.44983 45.0947 8.63061 38.6959 18.0961 37.2259L32.8976 
   34.9344C35.3568 34.5453 38.3263 32.5132 39.4399 30.3947L47.6063 15.1759C52.0606 6.91794 59.2989
    6.91794 63.7069 15.1759Z"
                      fill="#0a745b"
                    />
                  </svg>
                </div>
                <div class="nota-criterio" v-if="materia.medias">
                  {{ (materia.medias.media_nota_total / 2).toFixed(2) }}
                  <span class="nota-total-criterio">/5</span>
                </div>
              </div>
            </div>
            <div class="criterio">
              <p class="nome-criterio">Experiência:</p>
              <div class="stars-nota">
                <div class="stars" v-if="materia.medias">
                  <svg
                    v-for="(starClass, index) in getStarClassMateria(
                      materia.medias.media_nota_experiencia / 2
                    )"
                    :key="index"
                    src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
                    alt=""
                    class="estrela"
                    :class="starClass"
                    width="112"
                    height="104"
                    viewBox="0 0 112 104"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M63.7069 15.1759L71.8732 30.3947C72.9868 32.5132 75.9564 34.5453 78.462 34.9344L93.2634 37.2259C102.729
 38.6959 104.956 45.0947 98.1354 51.4071L86.6283 62.1294C84.6795 63.9453 83.6123 67.4474 84.2155 69.955L87.5099 
 83.2282C90.1083 93.7344 84.1227 97.7985 74.1468 92.3077L60.2733 84.655C57.7678 83.2715 53.6382 83.2715 51.0862
  84.655L37.2127 92.3077C27.2832 97.7985 21.2513 93.6912 23.8497 83.2282L27.144 69.955C27.7472 67.4474 26.68
   63.9453 24.7313 62.1294L13.2242 51.4071C6.44983 45.0947 8.63061 38.6959 18.0961 37.2259L32.8976 
   34.9344C35.3568 34.5453 38.3263 32.5132 39.4399 30.3947L47.6063 15.1759C52.0606 6.91794 59.2989
    6.91794 63.7069 15.1759Z"
                      fill="#0a745b"
                    />
                  </svg>
                </div>
                <div class="nota-criterio" v-if="materia.medias">
                  {{ (materia.medias.media_nota_experiencia / 2).toFixed(2) }}
                  <span class="nota-total-criterio">/5</span>
                </div>
              </div>
            </div>
            <div class="criterio">
              <p class="nome-criterio">Dificuldade:</p>
              <div class="stars-nota">
                <div class="stars" v-if="materia.medias">
                  <svg
                    v-for="(starClass, index) in getStarClassMateria(
                      materia.medias.media_nota_dificuldade / 2
                    )"
                    :key="index"
                    src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
                    alt=""
                    class="estrela"
                    :class="starClass"
                    width="112"
                    height="104"
                    viewBox="0 0 112 104"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M63.7069 15.1759L71.8732 30.3947C72.9868 32.5132 75.9564 34.5453 78.462 34.9344L93.2634 37.2259C102.729
 38.6959 104.956 45.0947 98.1354 51.4071L86.6283 62.1294C84.6795 63.9453 83.6123 67.4474 84.2155 69.955L87.5099 
 83.2282C90.1083 93.7344 84.1227 97.7985 74.1468 92.3077L60.2733 84.655C57.7678 83.2715 53.6382 83.2715 51.0862
  84.655L37.2127 92.3077C27.2832 97.7985 21.2513 93.6912 23.8497 83.2282L27.144 69.955C27.7472 67.4474 26.68
   63.9453 24.7313 62.1294L13.2242 51.4071C6.44983 45.0947 8.63061 38.6959 18.0961 37.2259L32.8976 
   34.9344C35.3568 34.5453 38.3263 32.5132 39.4399 30.3947L47.6063 15.1759C52.0606 6.91794 59.2989
    6.91794 63.7069 15.1759Z"
                      fill="#0a745b"
                    />
                  </svg>
                </div>
                <div class="nota-criterio" v-if="materia.medias">
                  {{ (materia.medias.media_nota_dificuldade / 2).toFixed(2)
                  }}<span class="nota-total-criterio"> /5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="materias-professores-avaliacoes">
        <div class="materias-avaliacoes">
          <h2>Avaliações</h2>
          <div
            class="avaliacoes"
            v-if="materia.avaliacoes && materia.avaliacoes.length > 0"
          >
            <AvaliacaoMateria
              v-for="(avaliacao, index) in materia.avaliacoes"
              :key="index"
              :avaliacao="avaliacao"
            />
          </div>
          <p v-else class="qtd-hora">Não existem avaliações ainda.</p>
        </div>
        <div class="materias-professores">
          <h2>Professores</h2>
          <div v-if="professores.length > 0">
            <CardProfMateria
              v-for="(professor, index) in professores"
              :key="index"
              :professor="professor"
            />
          </div>
          <p v-else class="qtd-hora">
            Não existem professores ministrando a disciplina.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obterMateriaByID } from "@/service/materia/ManipularDadosMateriaIndividual";
import { ref } from "vue";
import { obterInformacoesProfessoresFiltrados } from "@/service/professor/ManipulaDadosProfessorCardListagem";
import CardProfMateria from "../components/Materias/ProfessorPorMateria.vue";
import PopUp from "../components/Materias/PopupAvaliaMaterias.vue";
import AvaliacaoMateria from "../components/Avaliacao/AvaliacaoMateriaComponent.vue";
import router from "@/routes/index";

export default {
  data() {
    return {
      materia: {},
      professores: [],
      comentariosCurtidos: [],
    };
  },

  components: {
    CardProfMateria,
    PopUp,
    AvaliacaoMateria,
  },

  methods: {
    getStarClassMateria(nota_total) {
      const notaPorEstrela = 1;
      const totalEstrelas = 5;
      let notaAtual = nota_total / notaPorEstrela;

      notaAtual = Math.round(notaAtual * 2) / 2;

      let estrelaClasses = [];

      for (let i = 1; i <= totalEstrelas; i++) {
        if (notaAtual >= i) {
          estrelaClasses.push("full-star");
        } else if (notaAtual > i - 1 && notaAtual < i) {
          estrelaClasses.push("partial-star");
        } else {
          estrelaClasses.push("empty-star");
        }
      }

      return estrelaClasses;
    },
    voltarPagina() {
      router.go(-1);
    },
  },

  setup() {
    const popupTrigger = ref({
      buttonTrigger: false,
    });

    const TogglePopup = (trigger) => {
      popupTrigger.value[trigger] = !popupTrigger.value[trigger];
    };

    return {
      popupTrigger,
      TogglePopup,
    };
  },
  mounted() {
    const cod_materia = this.$route.params.cod;
    obterMateriaByID(cod_materia)
      .then((materia) => {
        this.materia = materia;
      })
      .catch((erro) => {
        console.error("Erro ao obter matéria:", erro);
      });

    obterInformacoesProfessoresFiltrados(cod_materia)
      .then((professores) => {
        this.professores = professores;
      })
      .catch((erro) => {
        console.error("Erro ao obter professor: ", erro);
      });
  },
};
</script>

<style scoped>
.materia-wraper {
  background: -webkit-linear-gradient(
    90deg,
    hsla(209, 63%, 17%, 1) 0%,
    hsla(183, 71%, 16%, 1) 100%
  );
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.info-materia {
  width: 90%;
  height: 96%;
  max-width: 1200px;
  max-height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.materia-details-rating {
  width: 100%;
  height: 35%;
  background-color: rgba(236, 236, 236, 0.129);
  border-radius: 20px;
  position: relative;
  padding: 4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 360px;
}

.materias-professores-avaliacoes {
  width: 100%;
  height: 50%;
  display: flex;
  gap: 20px;
}

.materias-avaliacoes {
  height: 100%;
  width: 60%;
  background-color: rgba(236, 236, 236, 0.129);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.avaliacoes {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-family: "Open Sans", sans-serif;
  font-size: 2.4rem;
  margin: 0;
  font-weight: 600;
  color: rgb(242, 242, 242, 0.9);
  margin-bottom: 20px;
}

.materias-professores {
  height: 100%;
  width: 40%;
  background-color: rgba(236, 236, 236, 0.129);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.voltar {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-bottom: 10px;
  height: 20px;
  gap: 5px;
  cursor: pointer;
}

.icon svg {
  width: 1.4rem;
  height: 1.4rem;
}
.icon svg path {
  fill: rgb(242, 242, 242, 0.758);
}

.voltar-text {
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  margin: 0;
  color: rgb(242, 242, 242, 0.758);
}

.details-rating {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.details {
  height: 100%;
  width: 50%;
  gap: 20px;
  display: flex;
  flex-direction: column;
}
.nome-codigo {
  width: fit-content;
}
.nome-materia {
  font-family: "Open Sans", sans-serif;
  font-size: 2.4rem;
  margin: 0;
  font-weight: 600;
  color: rgb(242, 242, 242, 0.9);
}

.materia-codigo {
  font-family: "Open Sans", sans-serif;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 300;
  color: rgb(242, 242, 242, 0.6);
}

.qtd-hora {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  margin: 0;
  font-weight: 400;
  color: rgba(242, 242, 242, 0.438);
  margin-top: 10px;
}

.nota-geral-materia {
  font-family: "Open Sans", sans-serif;
  font-size: 3rem;
  margin: 0;
  font-weight: 600;
  color: rgb(242, 242, 242, 0.9);
  margin-top: 10px;
}

.nota-total {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  margin: 0;
  font-weight: 300;
  color: rgb(242, 242, 242, 0.6);
  margin-left: -2px;
}

svg {
  height: fit-content;
}

.avaliar {
  width: fit-content;
  padding: 10px 40px 10px 40px;
  font-size: 1.4rem;
  background-color: #ffffff1f;
  border: none;
  border-radius: 10px;
  color: white;
  font-family: "Inter", sans-serif;
  font-weight: 300;
  cursor: pointer;
}

.rating {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
}

.criterio {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: space-between;
}
.estrela {
  width: 3.4rem;
}

.nome-criterio {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  margin: 0;
  font-weight: 300;
  color: rgb(242, 242, 242, 0.6);
}
.nota-criterio {
  font-family: "Open Sans", sans-serif;
  font-size: 2rem;
  margin: 0;
  font-weight: 600;
  color: rgb(242, 242, 242, 0.9);
}

.nota-total-criterio {
  font-family: "Open Sans", sans-serif;
  font-size: 1.4rem;
  margin: 0;
  font-weight: 300;
  color: rgb(242, 242, 242, 0.6);
  margin-left: -2px;
}

.stars-nota {
  display: flex;
  gap: 10px;
  align-items: center;
}

.full-star {
  filter: none;
}

.full-star path {
  fill: rgb(245, 255, 112);
}

.partial-star {
  filter: none;
  -webkit-mask-image: linear-gradient(to left, transparent 40%, black 60%);
  opacity: 1;
}

.empty-star {
  filter: invert(50%) opacity(30%);
}

@media only screen and (max-height: 870px) {
  .info-materia {
    margin-top: 20px;
    margin-bottom: 20px;
    height: fit-content;
    max-height: fit-content;
  }

  .materia-details-rating {
    min-height: 320px;
  }
  .materia-wraper {
    height: 100vh;
  }
  .materias-avaliacoes {
    height: 40vh;
  }
  .materias-professores {
    height: 40vh;
  }
}

@media only screen and (max-width: 1000px) {
  .info-materia {
    height: fit-content;
    max-height: fit-content;
  }
  .materia-wraper {
    height: fit-content;
    padding: 30px;
    box-sizing: border-box;
  }
  .materias-professores-avaliacoes {
    flex-direction: column;
  }
  .materias-avaliacoes,
  .materias-professores {
    width: 100%;
    height: fit-content;
    overflow: hidden;
  }
}
@media only screen and (max-width: 950px) {
  .details-rating {
    flex-direction: column;
    height: fit-content;
    gap: 60px;
  }
  .rating {
    width: 100%;
  }
  .materia-details-rating {
    height: fit-content;
    width: 100%;
    padding: 7rem;
  }
  .details {
    width: 100%;
    align-items: center;
  }
  .nome-codigo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nome-materia {
    text-align: center;
  }
}

@media only screen and (max-width: 450px) {
  .criterio {
    flex-direction: column;
  }
}
</style>
