<template>
  <div class="materia-wrapper">
    <PopUp
			v-if="popupTrigger.buttonTrigger"
			:TogglePopup="() => TogglePopup('buttonTrigger')"
			:materia="materia"
		/>
    <div class="info-materia">
      <div class="wrapper">
        <div class="materia-details-rating2">
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
          <div class="professor-content">
            <img
						:src="verificarUrl(professor.foto_professor)"
						alt="Foto do Professor"
					/>
            <h1>{{ professor.nome_professor }}</h1>
            <h3>Faculdade do Gama</h3>
            <div class="selectdiv">
              <label class="selecionarmaterias">Selecione uma matéria</label>
                <select v-model="materia" class="select-box">
                  <option class="opcao" value="">TODAS</option>
                  <option
                    v-for="materia in professor.materias"
                    :key="materia.cod_materia"
                    :value="materia.cod_materia"
                  >
                  {{ materia.nome_materia }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="materia-details-rating3">
          <div class="materias-ministradas">
            <svg width="50" height="50" viewBox="0 0 367 367" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M299.005 367H65.3151C56.9006 367 50.0781 360.178 50.0781 351.763V15.237C50.0781 6.82176 56.8999 0 65.3151 0H299.005C318.609 0 334.558 15.9487 334.558 35.5524V331.448C334.558 351.051 318.609 367 299.005 367Z" fill="#102C46"/>
            <path d="M299.005 0H192.319V367H299.005C318.609 367 334.558 351.051 334.558 331.448V35.5524C334.558 15.9487 318.609 0 299.005 0Z" fill="#008E4A"/>
            <path d="M192.319 198.541C155.916 198.541 126.301 168.925 126.301 132.523C126.301 96.121 155.916 66.5051 192.319 66.5051C228.721 66.5051 258.337 96.1203 258.337 132.523C258.336 168.925 228.72 198.541 192.319 198.541Z" fill="#E8E8E8"/>
            <path d="M237.506 259.371H147.131C138.717 259.371 131.895 252.55 131.895 244.135C131.895 235.72 138.716 228.898 147.131 228.898H237.506C245.92 228.898 252.743 235.719 252.743 244.135C252.743 252.55 245.921 259.371 237.506 259.371Z" fill="#E8E8E8"/>
            <path d="M237.506 300.495H147.131C138.717 300.495 131.895 293.673 131.895 285.258C131.895 276.843 138.716 270.021 147.131 270.021H237.506C245.92 270.021 252.743 276.843 252.743 285.258C252.743 293.672 245.921 300.495 237.506 300.495Z" fill="#E8E8E8"/>
            <path d="M82.9522 77.08H47.6793C39.2649 77.08 32.4424 70.2582 32.4424 61.843C32.4424 53.4278 39.2641 46.6061 47.6793 46.6061H82.9522C91.3667 46.6061 98.1891 53.4278 98.1891 61.843C98.1891 70.2582 91.3667 77.08 82.9522 77.08Z" fill="#A9C5FC"/>
            <path d="M82.9522 137.909H47.6793C39.2649 137.909 32.4424 131.087 32.4424 122.672C32.4424 114.257 39.2641 107.435 47.6793 107.435H82.9522C91.3667 107.435 98.1891 114.257 98.1891 122.672C98.1891 131.087 91.3667 137.909 82.9522 137.909Z" fill="#A9C5FC"/>
            <path d="M82.9522 198.736H47.6793C39.2649 198.736 32.4424 191.914 32.4424 183.499C32.4424 175.084 39.2641 168.262 47.6793 168.262H82.9522C91.3667 168.262 98.1891 175.084 98.1891 183.499C98.1891 191.915 91.3667 198.736 82.9522 198.736Z" fill="#A9C5FC"/>
            <path d="M82.9522 259.564H47.6793C39.2649 259.564 32.4424 252.742 32.4424 244.327C32.4424 235.913 39.2641 229.09 47.6793 229.09H82.9522C91.3667 229.09 98.1891 235.912 98.1891 244.327C98.1891 252.742 91.3667 259.564 82.9522 259.564Z" fill="#A9C5FC"/>
            <path d="M82.9522 320.392H47.6793C39.2649 320.392 32.4424 313.571 32.4424 305.155C32.4424 296.74 39.2641 289.918 47.6793 289.918H82.9522C91.3667 289.918 98.1891 296.74 98.1891 305.155C98.1891 313.571 91.3667 320.392 82.9522 320.392Z" fill="#A9C5FC"/>
            <path d="M192.319 66.5051V198.54C228.721 198.54 258.337 168.925 258.337 132.522C258.336 96.1203 228.72 66.5051 192.319 66.5051Z" fill="#E8E8E8"/>
            <path d="M237.506 228.898H192.319V259.371H237.506C245.92 259.371 252.743 252.55 252.743 244.135C252.743 235.72 245.921 228.898 237.506 228.898Z" fill="#E8E8E8"/>
            <path d="M237.506 270.021H192.319V300.494H237.506C245.92 300.494 252.743 293.672 252.743 285.257C252.743 276.843 245.921 270.021 237.506 270.021Z" fill="#E8E8E8"/>
            </svg>
            <p>Matérias Ministradas</p>
            <p v-if="professor.medias">{{ (professor.medias.media_nota_total / 2).toFixed(2) }}/5</p>
          </div>
          <p
            v-for="materia in professor.materias"
            :key="materia.cod_materia"
            :value="materia.cod_materia"
            class="p-materia"
          >
            {{ materia.nome_materia }} {{ materia.cod_materia }}
          </p>
        </div>

        <div class="contato">
          <div class="materia-details-rating4">
            <div>
              <h2>CONTATOS</h2>
              <p>E-mail: danielsundfeld@gmail.com</p>
              <p>Sala: FGA/UED 36</p>
              <button>Entre em contato</button>
            </div>
          </div>
          <div class="materia-details-rating4">
            <div>
              <p>GRADUAÇÕES</p>
              <p>Graduação 1</p>
              <p>Graduação 2</p>
            </div>
          </div>
        </div>

      </div>
			<div class="wrapper">
        <div class="materia-details-rating5">
          5
        </div>
        <div class="materia-details-rating6">
          6
        </div>
      </div>
    </div>
  </div>
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
.materias-ministradas{
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-materia{
  padding: 20px;
  background-color: white
}
.selectdiv {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.selecionarmaterias {
	font-size: 1.4rem;
	font-family: "Inter", sans-serif;
  color: white;
  font-weight: 100;
  margin-bottom: 2px;
}
.select-box {
	appearance: none;
	padding: 1rem 0 1rem 1rem;
	font-size: 1.4rem;
	width: 20vw;
	border-radius: 1.3rem;
	background-color: rgba(236, 236, 236, 0.129);
	color: #fff;
	transition: all 0.3s ease;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	font-family: "Open Sans", sans-serif;
	outline: none;
}

.select-box:hover {
	transform: scale(1.02);
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

select option {
	background-color: #ffffff;
  color: #000;
}
.professor-content img{
  width: 90px; 
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
}
.professor-content h1{
  color: white;
  font-family: "Open Sans", sans-serif;
  font-size: 1.8rem
}
.professor-content h3{
  color: #ffffff;
  font-weight: 200;
  opacity: .6;
  font-family: "Inter", sans-serif;
  font-size: 1.2rem
}
.materia-wrapper {
	background: -webkit-linear-gradient(
		90deg,
		hsla(209, 63%, 17%, 1) 0%,
		hsla(183, 71%, 16%, 1) 100%
	);
	width: 100%;
	height: 100%;
  padding: 20px 0 20px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.contato{
  display: flex;
  flex-direction: column;
  width: 20vw;
  gap: 20px;
}
.wrapper{
  display: flex;
  width: 100%;
  gap: 20px;
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
.materia-details-rating5 {
	width: 53vw;
	height: 40.5vh;
	background-color: rgba(236, 236, 236, 0.129);
	border-radius: 20px;
	position: relative;
	padding: 4rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.materia-details-rating6 {
	width: 100%;
	height: 40.5vh;
	background-color: rgba(236, 236, 236, 0.129);
	border-radius: 20px;
	position: relative;
	padding: 4rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.materia-details-rating2{
  width: 39%;
	height: 50vh;
	background-color: rgba(236, 236, 236, 0.129);
	border-radius: 20px;
	position: relative;
	padding: 4rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
  justify-content: center;
}
.materia-details-rating3{
  width: 39%;
	height: 50vh;
	background-color: rgba(236, 236, 236, 0.129);
	border-radius: 20px;
	position: relative;
	padding: 4rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.materia-details-rating4{
  width: 100%;
	height: 100%;
	background-color: rgba(236, 236, 236, 0.129);
	border-radius: 20px;
	position: relative;
	padding: 4rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
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
.voltar-text {
	font-family: "Inter", sans-serif;
	font-size: 1.4rem;
	margin: 0;
	color: rgb(242, 242, 242, 0.758);
}

.icon svg {
	width: 1.4rem;
	height: 1.4rem;
}
.icon svg path {
	fill: rgb(242, 242, 242, 0.758);
}

</style>
