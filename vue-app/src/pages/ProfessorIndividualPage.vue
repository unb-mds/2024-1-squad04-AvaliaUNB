<template>
  <div class="professores">
    <!-- <NavBar/> -->
    <InfoProfessor />
    <!-- <FooterBar/> -->
  </div>
</template>

<script>
import router from "../routes/index";
// import NavBar from '../components/Navegacao/NavBar.vue';
// import FooterBar from '../components/Navegacao/FooterBar.vue';
import InfoProfessor from "../components/Professores/InfoProfessorComponent.vue";

export default {
  components: {
    // NavBar,
    // FooterBar,
    InfoProfessor,
    // CardListagemProfessoresComponent,
    // BarraDePesquisaComponente,
  },

  name: "ProfessorIndividualPage",
  data() {
    return {
      professores: [],
      searchQuery: "",
    };
  },

  methods: {
    async HandleHome() {
      router.push({ name: "home" });
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
};
</script>

<style scoped>
.professores {
  height: 100vh;
}

@media only screen and (max-width: 1128px) {
  .professores{
    height: 100%;
  }
}
</style>
