<template>
	<div class="materias">
		<NavBar />
		<div class="search">
			<BarraDePesquisaComponente @search="handleSearch" />
		</div>
		<LoadingComponent v-if="loading" :isLoading="loading" />
		<div v-if="!loading" class="listagem-materias">
			<CardListagemMateriasComponente
				v-for="(materia, index) in filteredMaterias.slice(0, 10)"
				:key="index"
				:materia="materia"
			/>
		</div>
	</div>
</template>

<script>
import NavBar from "../components/Navegacao/NavBar.vue";
import { obterInformacoesMaterias } from "@/service/materia/ManipularDadosMateriaListagem";
import CardListagemMateriasComponente from "../components/Materias/CardListagemMateriasComponent.vue";
import BarraDePesquisaComponente from "../components/Navegacao/BarraDePesquisaComponent.vue";
import LoadingComponent from "@/components/Navegacao/LoadingComponent.vue";

export default {
	components: {
		NavBar,
		CardListagemMateriasComponente,
		BarraDePesquisaComponente,
		LoadingComponent,
	},

	name: "MateriasPage",

	data() {
		return {
			materias: [],
			searchQuery: "",
			loading: true,
		};
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
				const normalizedMateria = materia.nome_materia
					.toLowerCase()
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "");
				return normalizedMateria.includes(normalizedQuery);
			});
		},
	},
	methods: {
		handleSearch(query) {
			this.searchQuery = query;
		},
	},

	mounted() {
		this.loading = true;
		obterInformacoesMaterias()
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
.listagem-materias {
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

.materias {
	min-height: 100vh;
	position: relative;
	flex: 1;
	gap: 30px;
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
	height: 100%;
}

.search {
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	margin-top: 5vh;
	height: fit-content;
}
</style>
