<template>
  <div class="home">
    <NavBar />
    <div class="section1">
      <div class="text-professor">
        <div class="title-subtitle">
          <div class="title">Sua jornada para o sucesso começa aqui!</div>
          <div class="subtitle">Explore nossas ferramentas de avaliação.</div>
        </div>

        <div class="card-professores">
          <div class="professores-image">
            <div v-if="!loading" class="professores">
              <Top3ProfessoresComponent
                :professor1="professores[0]"
                :professor2="professores[1]"
                :professor3="professores[2]"
              />
              <CardRankingProfessorComponent
                v-for="(professor, index) in professores.slice(3, 7)"
                :key="index"
                :professor="professor"
                :position="index + 4"
              />
            </div>
            <div v-if="!loading" class="image-1">
              <img
                src="../assets/images/images_home/home-section-1.svg"
                alt="home-section"
              />
            </div>
          </div>
          <LoadingComponent
            class="loading"
            v-if="loading"
            :isLoading="loading"
          />
          <button class="veja-mais" @click.prevent="HandleProfessors">
            Veja Mais
          </button>
        </div>
      </div>
    </div>

    <div class="section1">
      <div class="card-materias">
        <div class="materias-image">
          <div v-if="!loading" class="materias">
            <CardMateriaRankingComponent
              v-for="(materia, index) in materias.slice(0, 4)"
              :key="index"
              :materia="materia"
              :position="index + 1"
            />
          </div>

          <div v-if="!loading" class="image-title">
            <div class="title-subtitle">
              <div class="title">Top 4 Matérias</div>
              <div class="subtitle">Explore as favoritas dos estudantes.</div>
            </div>
            <div class="image-2">
              <img
                src="../assets/images/images_home/home-section-2.svg"
                alt="home-section"
              />
            </div>
          </div>
        </div>
        <LoadingComponent class="loading" v-if="loading" :isLoading="loading" />
        <button class="veja-mais" @click.prevent="HandleMaterias">
          Veja Mais
        </button>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from "../components/Navegacao/NavBar.vue";
import Top3ProfessoresComponent from "../components/RankingProfessores/Top3ProfessoresComponent.vue";
import CardRankingProfessorComponent from "../components/RankingProfessores/CardRankingProfessorComponent.vue";
import router from "../routes/index.js";
import FooterBar from "../components/Navegacao/FooterBar.vue";
import CardMateriaRankingComponent from "../components/RankingMaterias/CardMateriaRankingComponent.vue";
import { getProfessoresAvaliadosNotaTotal } from "@/repositories/professor/obterProfessor";
import { getMateriasAvaliadasNotaTotal } from "@/repositories/materias/obterMaterias";
import LoadingComponent from "../components/Navegacao/LoadingComponent.vue";

export default {
  name: "HomePage",

  components: {
    NavBar,
    Top3ProfessoresComponent,
    CardRankingProfessorComponent,
    FooterBar,
    CardMateriaRankingComponent,
    LoadingComponent,
  },

  data() {
    return {
      professores: [],
      materias: [],
      loading: true,
    };
  },
  mounted() {
    this.loading = true;
    getProfessoresAvaliadosNotaTotal()
      .then((professores) => {
        this.professores = professores;
        this.loading = false;
      })
      .catch((erro) => {
        console.error("Erro ao obter professores:", erro);
      });
    this.loading = true;
    getMateriasAvaliadasNotaTotal()
      .then((materias) => {
        this.materias = materias;
        this.loading = false;
      })
      .catch((erro) => {
        console.error("Erro ao obter materias:", erro);
      });
  },

  methods: {
    async HandleProfessors() {
      router.push({ name: "professor" });
    },

    async HandleMaterias() {
      router.push({ name: "materia" });
    },
  },
};
</script>
<style scoped>
.body {
  overflow-x: hidden;
}

.veja-mais {
  color: #e6e6e6;
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  font-weight: 300;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(153, 153, 153, 0.2) 100%
  );
  cursor: pointer;
}

.home {
  background: hsla(209, 63%, 17%, 1);
  background: linear-gradient(
    90deg,
    hsla(209, 63%, 17%, 1) 0%,
    hsla(183, 71%, 16%, 1) 100%
  );
  background: -moz-linear-gradient(
    90deg,
    hsla(209, 63%, 17%, 1) 0%,
    hsla(183, 71%, 16%, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    hsla(209, 63%, 17%, 1) 0%,
    hsla(183, 71%, 16%, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: auto;
  gap: 50px;
  overflow-x: hidden;
}
.section1 {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 2000px;
}

.text-professor {
  padding: 4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
}
.title-subtitle {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 20px;
  width: 85%;
}

.title {
  color: #e6e6e6;
  font-family: "Open Sans", sans-serif;
  font-size: 4rem;
  font-weight: 800;
}

.subtitle {
  color: #c4c4c4;
  font-family: "Inter", sans-serif;
  font-size: 2.2rem;
  font-weight: 300;
}

.card-professores {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(153, 153, 153, 0.2) 100%
  );
  padding: 4%;
  border-radius: 40px;
  gap: 4rem;
}

.professores-image {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.image-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
}

.image-1 img {
  width: 100%;
}

.professores {
  width: 60%;
  height: auto;
}

.card-materias {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(153, 153, 153, 0.2) 100%
  );
  padding: 4%;
  border-radius: 40px;
  gap: 4rem;
}

.materias-image {
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.materias {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.image-title {
  display: flex;
  flex-direction: column;
  width: 40%;
}
.image-2 {
  width: 100%;
  display: flex;
}
.image-2 img {
  width: 100%;
}

@media screen and (max-width: 850px) {
  .professores-image {
    flex-direction: column-reverse;
  }

  .materias-image {
    flex-direction: column-reverse;
    gap: 30px;
  }

  .materias {
    width: 100%;
    align-items: center;
  }
  .professores {
    width: 100%;
  }

  .image-1 {
    width: 80%;
  }

  .image-2 img {
    width: 80%;
  }

  .image-2 {
    justify-content: center;
  }

  .image-title {
    width: 100%;
  }

  .card-materias .title {
    text-align: center;
  }
  .card-materias .subtitle {
    text-align: center;
  }

  .card-materias .title-subtitle {
    align-items: center;
  }
}
</style>
