<template>
  <div class="professores">
    <NavBar />
    <div class="search-filter">
      <BarraDePesquisaComponente @search="handleSearch" />
      <FiltroProfessores @materiaSelecionada="handleMateriaSelecionada" />
    </div>

    <LoadingComponent v-if="loading" :isLoading="loading" />
    <div v-if="!loading" class="listagem-professores">
      <CardListagemProfessoresComponent
        v-for="(professor, index) in filteredProfessores.slice(0, 10)"
        :key="index"
        :professor="professor"
      />
    </div>
  </div>
</template>

<script>
import router from "../routes/index";
import NavBar from "../components/Navegacao/NavBar.vue";
import CardListagemProfessoresComponent from "@/components/Professores/CardListagemProfessoresComponent.vue";
import { obterInformacoesProfessoresFiltrados } from "@/service/professor/ManipulaDadosProfessorCardListagem";
import BarraDePesquisaComponente from "../components/Navegacao/BarraDePesquisaComponent.vue";
import { obterMateriasParaFiltragem } from "@/service/materia/PegarMateriasParaFiltragemDeProfessores";
import FiltroProfessores from "@/components/Navegacao/FiltroProfessoresPorMateriaComponent.vue";
import LoadingComponent from "@/components/Navegacao/LoadingComponent.vue";

export default {
  components: {
    NavBar,
    CardListagemProfessoresComponent,
    BarraDePesquisaComponente,
    FiltroProfessores,
    LoadingComponent,
  },

  name: "ProfessorPage",
  data() {
    return {
      professores: [],
      materia_para_filtragem: "",
      searchQuery: "",
      loading: true,
    };
  },

  computed: {
    filteredProfessores() {
      if (!this.searchQuery) {
        return this.professores;
      }
      const query = this.searchQuery.toLowerCase();
      const normalizedQuery = query
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return this.professores.filter((professor) => {
        const normalizedProfessor = professor.nome_professor
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedProfessor.includes(normalizedQuery);
      });
    },
  },
  methods: {
    async HandleHome() {
      router.push({ name: "home" });
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    handleMateriaSelecionada(materiaSelecionada) {
      this.loading = true;
      this.materia_para_filtragem = materiaSelecionada;

      obterInformacoesProfessoresFiltrados(this.materia_para_filtragem)
        .then((professores) => {
          this.professores = professores;
          this.loading = false;
        })
        .catch((erro) => {
          console.error("Erro ao obter professores:", erro);
        });
    },
  },
  mounted() {
    this.loading = true;
    obterInformacoesProfessoresFiltrados()
      .then((professores) => {
        this.professores = professores;
        this.loading = false;
      })
      .catch((erro) => {
        console.error("Erro ao obter professores:", erro);
      });
    this.loading = true;
    obterMateriasParaFiltragem()
      .then((materias) => {
        this.materias = materias;
        this.loading = false;
      })
      .catch((erro) => {
        console.error("Erro ao obter materias:", erro);
      });
  },
};
</script>

<style scoped>
.listagem-professores {
  margin-top: 30px;
  width: 100%;
  max-width: 2000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  min-height: fit-content;
  gap: 50px;
}

.professores {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 30px;
}

.element {
  display: flex;
  justify-content: center;
  width: 20%;
  height: fit-content;
}

.form-group .element:last-child {
  margin-right: 0%;
}

.form-control {
  width: 100%;
  border-radius: 12px;
  border: none; /* Remove a sombra */
  padding: 8%;
  align-self: center; /* Centralizar verticalmente */
  justify-content: center;
  outline: none;
}

.form-group select {
  margin-right: 20px; /* Espaçamento entre os campos */
  border-radius: 12px;
  border: none; /* Remove a sombra */
  padding: 12px;
  color: #6d6b71;
}

.search-filter {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 5vh;
  height: fit-content;
}
</style>
