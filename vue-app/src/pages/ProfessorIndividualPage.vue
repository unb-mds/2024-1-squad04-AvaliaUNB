<template>
  <h1>{{ professor }}</h1>
</template>

<script>

// O que contem no objeto professor:
/*{ "nome_professor": "GABRIELA CUNHA POSSA", "cod_professor": "1018416", "foto_professor": "https://sigaa.unb.br/sigaa/img/no_picture.png", "materias": [ { "cod_materia": "FGA0254", "nome_materia": "CIÊNCIAS AEROESPACIAIS" }, { "cod_materia": "IFD0171", "nome_materia": "FISICA 1" } ], "avaliacoes": [ { "usuario": { "foto_url": "https://avatars.githubusercontent.com/u/110688069?v=4", "matricula": 222015060, "nome_usuario": "Ana Luiza" }, "num_likes": 2, "comentario": "sla", "nota_total": 10, "cod_materia": "IFD0171", "nota_acesso": 10, "nome_materia": "FISICA 1", "num_dislikes": 0, "nota_didatica": 10, "cod_comentario": "114", "nota_metodologia": 10, "nota_metodo_ensino": 10 }, { "usuario": { "foto_url": "https://avatars.githubusercontent.com/u/137011464?v=4", "matricula": 222006211, "nome_usuario": "Vitor Valerio" }, "num_likes": 0, "comentario": "", "nota_total": 6, "cod_materia": "IFD0171", "nota_acesso": 6, "nome_materia": "FISICA 1", "num_dislikes": 0, "nota_didatica": 6, "cod_comentario": "116", "nota_metodologia": 6, "nota_metodo_ensino": 6 }, { "usuario": { "foto_url": "https://avatars.githubusercontent.com/u/137011464?v=4", "matricula": 222006211, "nome_usuario": "Vitor Valerio" }, "num_likes": 0, "comentario": "", "nota_total": 6, "cod_materia": "FGA0254", "nota_acesso": 6, "nome_materia": "CIÊNCIAS AEROESPACIAIS", "num_dislikes": 0, "nota_didatica": 6, "cod_comentario": "117", "nota_metodologia": 6, "nota_metodo_ensino": 6 } ], "medias": { "media_nota_total": 7.333333333, "media_nota_acesso": 7.333333333, "media_nota_didatica": 7.333333333, "media_nota_metodologia": 7.333333333, "media_nota_metodo_ensino": 7.333333333 } }*/

import { getProfessoresByID } from "@/repositories/professor/obterProfessor.js";
import { ref } from "vue";
import router from "@/routes/index";
import { verificacaoCurtida } from "@/service/comentario/comentarioProfessor";
import { descriptarDados } from "@/generals/descriptografarDados";
import { verificacaoDislike } from "@/service/comentario/descurtirComentarioProfessor";

export default {
	name: "UserProfile",

	components: {
	},

	data() {
		return {
			professor: Object,
			materia: "",
			comentariosCurtidos: [],
		};
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
	methods: {
		async fetchProfessor(id, materia) {
			try {
				const data = await getProfessoresByID(id, materia);
				this.professor = data[0];
			} catch (error) {
				console.error("Erro ao obter professor", error);
			}
		},
		carregarImgAlternativa(event) {
			event.target.src =
				"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
		},
		verificarUrlUsuario(url_profile_picture) {
			if (!url_profile_picture) {
				return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
			}
			return url_profile_picture;
		},

		voltarPagina() {
			router.go(-1);
		},

		verificarUrl(urlProfessor) {
			if (urlProfessor === "https://sigaa.unb.br/sigaa/img/no_picture.png") {
				return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
			}
			return urlProfessor;
		},

		getStarClass(index, nota_total) {
			const notaPorEstrela = 2;
			const notaAtual = nota_total / notaPorEstrela;

			if (notaAtual >= index) {
				return "full-star";
			} else if (notaAtual > index - 1 && notaAtual < index) {
				return "partial-star";
			} else {
				return "empty-star";
			}
		},

		getStarClassProfessor(nota_total) {
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

		async handleDislike(cod_comentario) {
			const comentariosDescriptografados = await descriptarDados(
				sessionStorage.getItem("likes_dislikes_professores")
			);
			const result = await verificacaoDislike(
				comentariosDescriptografados,
				cod_comentario
			);
			const comentario = this.professor.avaliacoes.find(
				(avaliacao) => avaliacao.cod_comentario === cod_comentario
			);
			if (comentario) {
				comentario.num_likes += result.num_likes;
				comentario.num_dislikes += result.num_dislikes;
			}
			await this.getComentariosCurtidosPeloUsuario();
		},
		async handleLike(cod_comentario) {
			const comentariosDescriptografados = await descriptarDados(
				sessionStorage.getItem("likes_dislikes_professores")
			);
			const result = await verificacaoCurtida(
				comentariosDescriptografados,
				cod_comentario
			);
			const comentario = this.professor.avaliacoes.find(
				(avaliacao) => avaliacao.cod_comentario === cod_comentario
			);
			if (comentario) {
				comentario.num_likes += result.num_likes;
				comentario.num_dislikes += result.num_dislikes;
			}
			await this.getComentariosCurtidosPeloUsuario();
		},

		async getComentariosCurtidosPeloUsuario() {
			this.comentariosCurtidos = await descriptarDados(
				sessionStorage.getItem("likes_dislikes_professores")
			);
		},
		isLiked(cod_comentario) {
			let comentario = this.comentariosCurtidos.find(
				(comentario) =>
					comentario.cod_comentario == cod_comentario && comentario.like == 1
			);
			return !!comentario;
		},
		isDisliked(cod_comentario) {
			let comentario = this.comentariosCurtidos.find(
				(comentario) =>
					comentario.cod_comentario == cod_comentario && comentario.dislike == 1
			);
			return !!comentario;
		},
	},
	watch: {
		materia() {
			const cod_professor = this.$route.params.id;
			this.fetchProfessor(cod_professor, this.materia);
		},
	},
	async mounted() {
		const cod_professor = this.$route.params.id;
		this.fetchProfessor(cod_professor);
		this.getComentariosCurtidosPeloUsuario();
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
