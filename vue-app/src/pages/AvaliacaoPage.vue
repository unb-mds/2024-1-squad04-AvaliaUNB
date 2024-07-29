<template>
  <div class="avaliacoes">
    <NavBar />
    <h1 class="titulo-avaliacao">Avaliações</h1>

    <div class="professores-materias">
      <div
        class="professores"
        :class="{ toggle: isToggled, 'bg-transition': isToggled }"
        @click="toggleProfessores"
      >
        <h2 class="professores-text">Professores</h2>
      </div>
      <div
        class="materias"
        :class="{ toggle: !isToggled, 'bg-transition': !isToggled }"
        @click="toggleMaterias"
      >
        <h2 class="materias-text">Materias</h2>
      </div>
    </div>
    <p class="reviews">{{ reviews }} Avaliações</p>
    <LoadingComponent v-if="loading" :isLoading="loading" />
    <div v-if="isToggled && !loading">
      <div class="listagem-avaliacoes-professores">
        <CardMinhaAvaliacaoProfessor
          v-for="(
            avaliacao, index
          ) in avaliacoes_professores.avaliacoes_professor"
          :key="index"
          :avaliacao="avaliacao"
          @deleteProfessor="deletarAvaliacaoProfessor"
        />
      </div>
    </div>
    <div v-if="!isToggled && !loading">
      <LoadingComponent v-if="loading" :isLoading="loading" />
      <div v-if="!loading" class="listagem-avaliacoes-materias">
        <CardMinhaAvaliacao
          v-for="(avaliacao, index) in avaliacoes_materia.avaliacoesMateria"
          :key="index"
          :avaliacao="avaliacao"
          @deleteMateria="deletarAvaliacaoMateria"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Navegacao/NavBar.vue";
import CardMinhaAvaliacao from "@/components/Avaliacao/CardMinhaAvaliacao.vue";
import CardMinhaAvaliacaoProfessor from "@/components/Avaliacao/CardMinhaAvaliacaoProfessor.vue";
import {
  obterMinhasAvaliacoesProfessores,
  obterMinhasAvaliacoesMaterias,
} from "@/service/usuario/getMInhasAvaliacoes";
import { encriptarDados } from "@/generals/encripitarDados";
import LoadingComponent from "@/components/Navegacao/LoadingComponent.vue";

export default {
  name: "AvaliacaoPage",
  components: {
    NavBar,
    CardMinhaAvaliacao,
    CardMinhaAvaliacaoProfessor,
    LoadingComponent,
  },
  data() {
    return {
      isToggled: true,
      avaliacoes_professores: [],
      avaliacoes_materia: [],
      loading: true,
    };
  },

  methods: {
    toggleProfessores() {
      this.isToggled = true;
    },
    toggleMaterias() {
      this.isToggled = false;
    },
    async deletarAvaliacaoProfessor(cod_avaliacao) {
      //essa função atualiza a listagem de avaliações de professores e a quantidade de avaliações sem a necessidade de carregamento da página
      const avaliacoesDoSession =
        this.avaliacoes_professores.avaliacoes_professor
          .filter((avaliacao) => avaliacao.cod_avaliacao !== cod_avaliacao)
          .map((avaliacao) => ({
            cod_professor: avaliacao.cod_professor,
            cod_materia: avaliacao.cod_materia,
          }));
      this.avaliacoes_professores.avaliacoes_professor =
        this.avaliacoes_professores.avaliacoes_professor.filter(
          (avaliacao) => avaliacao.cod_avaliacao !== cod_avaliacao
        );
      sessionStorage.setItem(
        "professores_avaliados",
        await encriptarDados(avaliacoesDoSession)
      );
      this.avaliacoes_professores.qtd_avaliacoes--;
    },

    async deletarAvaliacaoMateria(cod_avaliacao) {
      //essa função atualiza a listagem de avaliações de professores e a quantidade de avaliações sem a necessidade de carregamento da página

      const avaliacoesDoSession =
        this.avaliacoes_professores.avaliacoes_professor
          .filter((avaliacao) => avaliacao.cod_avaliacao !== cod_avaliacao)
          .map((avaliacao) => ({
            cod_materia: avaliacao.cod_materia,
          }));

      this.avaliacoes_materia.avaliacoesMateria =
        this.avaliacoes_materia.avaliacoesMateria.filter(
          (avaliacao) => avaliacao.cod_avaliacao !== cod_avaliacao
        );
      sessionStorage.setItem(
        "materias_avaliadas",
        await encriptarDados(avaliacoesDoSession)
      );
      this.avaliacoes_materia.qtdAvaliacoes--;
    },
  },

  computed: {
    reviews() {
      return this.isToggled
        ? this.avaliacoes_professores.qtd_avaliacoes
        : this.avaliacoes_materia.qtdAvaliacoes;
    },
  },

  mounted() {
    this.loading = true;
    obterMinhasAvaliacoesProfessores()
      .then((avaliacoes_professores) => {
        this.avaliacoes_professores = avaliacoes_professores;
        this.loading = false;
      })
      .catch((erro) => {
        console.error("Erro ao obter avaliação de professores:", erro);
      });

    this.loading = true;
    obterMinhasAvaliacoesMaterias() // Chame a função correta
      .then((avaliacoes_materia) => {
        this.avaliacoes_materia = avaliacoes_materia;
        this.loading = false;
      })
      .catch((erro) => {
        console.error("Erro ao obter avaliações de matérias:", erro);
      });
  },
};
</script>

<style scoped>
.avaliacoes {
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
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: white;
  min-height: 100vh; /* altura mínima da página */
}

.titulo-avaliacao {
  color: #e0e0e0;
  font-family: "Open Sans", sans-serif;
  font-size: 4rem;
  font-weight: bold;
  margin-top: 5vh;
}

.professores-materias {
  display: flex;
  width: 100%;
  max-width: 500px;
  justify-content: center;
}

.professores {
  padding: 10px 20px 10px 20px;
  border-radius: 20px 0 0 20px;
  border: solid 2px aliceblue;
  border-right: none;
  cursor: pointer;
  transition: background-color 01s ease;
}

.professores.toggle {
  padding: 10px 20px 10px 20px;
  background-color: aliceblue;
  border-radius: 20px 0 0 20px;
  cursor: pointer;
  transition: background-color 01s ease;
}

.professores.toggle .professores-text {
  color: #2e2e2e;
}

.bg-transition {
  transition: background-color 0.5s ease-in;
}

.professores-text {
  color: #ffffff;
  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.materias {
  padding: 10px 20px 10px 20px;
  border-radius: 0px 20px 20px 0;
  border: solid 2px aliceblue;
  cursor: pointer;
}

.materias.toggle {
  padding: 10px 20px 10px 20px;
  background-color: aliceblue;
  border-radius: 0px 20px 20px 0;
  cursor: pointer;
}

.materias.toggle .materias-text {
  color: #2e2e2e;
}

.materias-text {
  color: #ffffff;
  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.reviews {
  color: #bfbfbf;
  font-family: "Inter", sans-serif;
  font-size: 16px;
}

.listagem-avaliacoes-professores,
.listagem-avaliacoes-materias {
  margin-top: 30px;
  width: 100%;
  min-width: 90vw;
  max-width: 834px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding-bottom: 100px; /* espaço para o FooterBar */
  box-sizing: border-box; /* incluir padding na altura */
}

.FooterBar {
  margin-top: auto; /* empurrar para a parte inferior */
}
</style>
