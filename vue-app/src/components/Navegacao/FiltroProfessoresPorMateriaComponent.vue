<template>
  <div class="container">
    <div class="icon-have">
      <img
        src="../../assets/icons/pagina_professor/filter.svg"
        class="icon"
        alt="filtro"
        @click="abrirFilterBox"
      />

      <div v-if="materiaSelecionada !== ''" class="have-filter">1</div>
    </div>

    <div v-if="isOpen" class="filter-box">
      <h1>Matérias</h1>
      <BarraDePesquisaComponente @search="handleSearch" />
      <div class="itens">
        <div
          class="item"
          v-for="(materia, index) in filteredMaterias.slice(0, 4)"
          :key="index"
          :value="materia.cod_materia"
          @click="selecionaMateria(materia.cod_materia)"
        >
          <div
            class="item-check"
            :class="{ checked: materiaSelecionada === materia.cod_materia }"
          ></div>
          <p class="item-name">
            {{ materia.nome }}
          </p>
        </div>
      </div>
      <div class="button-and-limpar">
        <button class="filtrar" @click="filtrar()">Filtrar</button>
        <p @click="limparFiltro()" class="limpar-filtro">Limpar Filtro</p>
      </div>
    </div>
  </div>
</template>

<script>
import BarraDePesquisaComponente from "./BarraDePesquisaComponent.vue";
import { obterMateriasParaFiltragem } from "@/service/materia/PegarMateriasParaFiltragemDeProfessores";

export default {
  name: "FiltroProfessores",
  components: {
    BarraDePesquisaComponente,
  },
  data() {
    return {
      isOpen: false,
      materias: [],
      searchQuery: "",
      materiaSelecionada: "",
    };
  },
  methods: {
    abrirFilterBox() {
      this.isOpen = !this.isOpen;
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    selecionaMateria(cod_materia) {
      if (this.materiaSelecionada === cod_materia) {
        this.materiaSelecionada = "";
      } else {
        this.materiaSelecionada = cod_materia;
      }
    },
    filtrar() {
      this.$emit("materiaSelecionada", this.materiaSelecionada);
      this.abrirFilterBox();
    },
    limparFiltro() {
      this.selecionaMateria("");
      this.filtrar();
    },
  },
  computed: {
    filteredMaterias() {
      if (!this.searchQuery) {
        return this.materias;
      }
      const query = this.searchQuery.toLowerCase();
      const normalizedQuery = query
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return this.materias.filter((materia) => {
        const normalizedMateria = materia.nome
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedMateria.includes(normalizedQuery);
      });
    },
  },

  mounted() {
    obterMateriasParaFiltragem()
      .then((materias) => {
        this.materias = materias;
      })
      .catch((erro) => {
        console.error("Erro ao obter materias:", erro);
      });
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 3rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.icon-have {
  display: flex;
  gap: 10px;
  height: 100%;
  position: relative;
}
.icon-have img {
  height: 3rem;
  cursor: pointer;
}

.have-filter {
  top: -8px;
  right: -8px;
  position: absolute;
  padding: 4px;
  background-color: #008e4a;
  width: 1rem;
  height: 1rem;
  border-radius: 20px;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
}

.filter-box {
  position: absolute;
  height: fit-content;
  background-color: rgb(248, 248, 248);
  width: 80vw;
  max-width: 400px;
  align-self: flex-end;
  margin-top: 20px;
  border-radius: 10px;
  z-index: 3;
  top: 30px;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
  padding: 40px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: "Inter", sans-serif;
  font-size: 2.6rem;
  color: #222222;
  margin: 0;
}

.itens {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}

.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;
}

.item-check {
  width: 1.5rem;
  height: 1.5rem;
  border: solid 1px #707070;
  border-radius: 2rem;
}

.item-check.checked {
  width: 1.5rem;
  height: 1.5rem;
  border: solid 1px #707070;
  background-color: #0a745b;
  border-radius: 2rem;
}

.item p {
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  color: rgb(44, 44, 44);
  width: 90%;
  margin: 0;
}

.filtrar {
  width: 100%;
  padding: 15px 0 15px 0;
  border: none;
  border-radius: 10px;
  background: #0a745b;
  color: white;
  font-family: "Inter", sans-serif;
  letter-spacing: 1px;
  font-size: 1.8rem;
}

.filtrar:hover {
  background: #01773e;
}
.limpar-filtro {
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  color: rgb(146, 146, 146);
  text-decoration: underline;
  cursor: pointer;
}

.limpar-filtro:hover {
  color: #01773e;
}

@media screen and (max-width: 600px) {
  .filter-box {
    max-width: 250px;
    height: fit-content;
  }
}
</style>
