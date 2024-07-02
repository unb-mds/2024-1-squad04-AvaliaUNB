<template>
	<div class="container-frame">
		<div class="container">
			<PopUp
				v-if="popupTrigger.buttonTrigger"
				:TogglePopup="() => TogglePopup('buttonTrigger')"
				:professor="professor"
			/>
			<!-- Sidebar -->
			<div id="sidebar">
				<div
					id="botao-voltar-professores"
					class="botao-voltar"
					@click="voltarPagina"
				>
					<img
						src="../../assets/icons/avaliacao/icon-voltar-professores.svg"
						alt=""
					/>
				</div>

				<div id="image-content">
					<img
						:src="verificarUrl(professor.foto_professor)"
						alt="Foto do Professor"
						class="profile-pic"
					/>
					<h2>{{ professor.nome_professor }}</h2>
					<h3>Faculdade do Gama</h3>
				</div>

				<button class="role-button" @click="() => TogglePopup('buttonTrigger')">
					Avaliar
				</button>

				<div class="selectdiv">
					<div>
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

				<div class="all-personal-info">
					<div class="academic-info, info">
						<div class="container-academic-info">
							<div class="personal-container">
								<h3>Personal</h3>

								<div class="local-professor">
									<div class="container-linha-info">
										<img
											class="icon-localizacao"
											src="../../assets/icons/avaliacao/icon-localizacao-sala-professor.svg"
											alt=""
										/>
										<p class="info-text" id="ajuste-localizacao-professor">
											Brasília, UnB Gama
										</p>
									</div>
								</div>

								<div class="graduacao-cursada">
									<div class="container-linha-info">
										<img
											src="../../assets/icons/avaliacao/icon-formacao-professor.svg"
											alt=""
										/>
										<p class="info-text">
											2003-2007: Ciência da Computação
											<br />
											Universidade de Brasília
										</p>
									</div>
								</div>
							</div>

							<div class="contato-info-container">
								<h3>Contato</h3>

								<div class="email-container">
									<div class="container-linha-info">
										<img
											src="../../assets/icons/avaliacao/icon-email-professor.svg"
											alt=""
										/>
										<p>daniel.sundfeld@unb.br</p>
									</div>
								</div>

								<div class="sala-professor-container">
									<div class="container-linha-info">
										<img
											class="icon-localizacao"
											src="../../assets/icons/avaliacao/icon-localizacao-sala-professor.svg"
											alt=""
										/>
										<p id="ajuste-sala-professor">FGA/UED36</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Content1 -->
			<div id="content1">
				<div class="section" id="general-reviews">
					<div class="avaliacoes-gerais-container">
						<div class="titulo-avaliacoes-gerais">
							<h3>Avaliações Gerais</h3>
						</div>

						<div v-if="professor.medias" class="five-estrelas">
							<img
								id="estrela-media-professor"
								v-for="(starClass, index) in getStarClassProfessor(
									professor.medias.media_nota_total / 2
								)"
								:key="index"
								src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
								alt=""
								class="estrela"
								:class="starClass"
							/>
						</div>

						<div class="estrelas-metricas-container">
							<div class="metricas-ajustes">
								<p>Acesso</p>
								<div
									v-if="professor.medias"
									class="five-estrelas estrelas-metricas"
								>
									<img
										id="ajuste-estrelas-metricas"
										v-for="(starClass, index) in getStarClassProfessor(
											professor.medias.media_nota_acesso / 2
										)"
										:key="index"
										src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
										alt=""
										class="estrela"
										:class="starClass"
									/>
								</div>
							</div>

							<div class="metricas-ajustes">
								<p>Didática</p>
								<div
									v-if="professor.medias"
									class="five-estrelas estrelas-metricas"
								>
									<img
										id="ajuste-estrelas-metricas"
										v-for="(starClass, index) in getStarClassProfessor(
											professor.medias.media_nota_didatica / 2
										)"
										:key="index"
										src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
										alt=""
										class="estrela"
										:class="starClass"
									/>
								</div>
							</div>

							<div class="metricas-ajustes">
								<p>Metodologia</p>
								<div
									v-if="professor.medias"
									class="five-estrelas estrelas-metricas"
								>
									<img
										id="ajuste-estrelas-metricas"
										v-for="(starClass, index) in getStarClassProfessor(
											professor.medias.media_nota_metodologia / 2
										)"
										:key="index"
										src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
										alt=""
										class="estrela"
										:class="starClass"
									/>
								</div>
							</div>

							<div class="metricas-ajustes">
								<p>Método de Ensino</p>
								<div
									v-if="professor.medias"
									class="five-estrelas estrelas-metricas"
								>
									<img
										id="ajuste-estrelas-metricas"
										v-for="(starClass, index) in getStarClassProfessor(
											professor.medias.media_nota_metodo_ensino / 2
										)"
										:key="index"
										src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
										alt=""
										class="estrela"
										:class="starClass"
									/>
								</div>
							</div>
						</div>
					</div>

					<!-- Example content for user environment -->
				</div>
				<div class="section" id="given-subjects">
					<div class="container-subjects-container">
						<div class="subjects_container">
							<div class="subjects-title">
								<img
									src="@/assets/icons/pagina_professor/purpose.png"
									alt=""
									id="subjects_icon"
								/>
								<h3>Disciplinas Ministradas</h3>
							</div>

							<p id="semestre-atual">2024.1</p>

							<ul
								id="materias_dadas"
								v-if="professor.materias && professor.materias.length > 0"
							>
								<div id="materias">
									<li
										v-for="materia in professor.materias"
										:key="materia.cod_materia"
									>
										{{ materia.nome_materia }}
									</li>
								</div>
								<div id="codigos-materias">
									<li
										v-for="materia in professor.materias"
										:key="materia.cod_materia"
									>
										{{ materia.cod_materia }}
									</li>
								</div>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- Content2 -->
			<div id="content2">
				<div class="section" id="teacher-review">
					<h3>Avaliações</h3>

					<div
						id="avaliacoes"
						v-if="professor.avaliacoes && professor.avaliacoes.length > 0"
					>
						<div
							v-for="avaliacao in professor.avaliacoes"
							:key="avaliacao.usuario.matricula"
							class="avaliacao"
						>
							<div class="container-avaliacao">
								<div id="foto-de-usuario-container">
									<div id="card-user-container">
										<div id="avaliacao-nome">
											<p>
												{{ avaliacao.usuario.nome_usuario }}
											</p>
										</div>
										<div id="avaliacao-codigo">
											<p>{{ avaliacao.cod_materia }}</p>
										</div>
									</div>
									<div id="foto-de-usuario">
										<img
											:src="verificarUrlUsuario(avaliacao.usuario.foto_url)"
											@error="carregarImgAlternativa"
											alt="Foto de Perfil"
										/>
									</div>
								</div>
								<div class="five-estrelas">
									<img
										v-for="n in 5"
										:key="n"
										src="../../assets/icons/avaliacao/icone-estrela-azul-pagina-individual-professores.svg"
										alt=""
										class="estrela"
										:class="getStarClass(n, avaliacao.nota_total)"
									/>
								</div>

								<div id="avaliacao-comentario">
									<p>{{ avaliacao.comentario }}</p>
								</div>

								<div id="avaliacao-icons">
									<div
										id="like-container"
										@click="
											handleLike(avaliacao.cod_comentario, avaliacao.num_likes)
										"
									>
										<div id="avaliacao-likes">
											<p>{{ avaliacao.num_likes }}</p>
										</div>
										<div
											id="like-icon"
											:class="{ liked: isLiked(avaliacao.cod_comentario) }"
										>
											<svg
												width="17"
												height="17"
												viewBox="0 0 17 17"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M5.94287 13.0973V5.90059C5.94287 5.61726 6.02787 5.34101 6.1837 5.10726L8.11745 2.23143C8.42204 1.77101 9.17995 1.44518 9.82454 1.68601C10.5187 1.91976 10.9791 2.69893 10.8304 3.39309L10.462 5.70934C10.4337 5.92184 10.4904 6.11309 10.6108 6.26184C10.7312 6.39643 10.9083 6.48143 11.0995 6.48143H14.0108C14.5704 6.48143 15.052 6.70809 15.3354 7.10476C15.6045 7.48726 15.6541 7.98309 15.477 8.48601L13.7345 13.7914C13.515 14.6698 12.5587 15.3852 11.6095 15.3852H8.84704C8.37245 15.3852 7.70662 15.2223 7.40204 14.9177L6.49537 14.2164C6.14829 13.9543 5.94287 13.5364 5.94287 13.0973Z"
													fill="#171717"
													fill-opacity="0.5"
												/>
												<path
													d="M3.6905 4.51953H2.96091C1.863 4.51953 1.41675 4.94453 1.41675 5.99286V13.1187C1.41675 14.167 1.863 14.592 2.96091 14.592H3.6905C4.78841 14.592 5.23466 14.167 5.23466 13.1187V5.99286C5.23466 4.94453 4.78841 4.51953 3.6905 4.51953Z"
													fill="#171717"
													fill-opacity="0.5"
												/>
											</svg>
										</div>
									</div>

									<div
										id="dislike-container"
										@click="handleDislike(avaliacao.cod_comentario)"
									>
										<div id="avaliacao-deslikes">
											<p>{{ avaliacao.num_dislikes }}</p>
										</div>
										<div
											id="dislike-icon"
											:class="{
												disliked: isDisliked(avaliacao.cod_comentario),
											}"
										>
											<svg
												width="17"
												height="17"
												viewBox="0 0 17 17"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g transform="scale(-1, -1) translate(-17, -20)">
													<path
														d="M5.94287 13.0973V5.90059C5.94287 5.61726 6.02787 5.34101 6.1837 5.10726L8.11745 2.23143C8.42204 1.77101 9.17995 1.44518 9.82454 1.68601C10.5187 1.91976 10.9791 2.69893 10.8304 3.39309L10.462 5.70934C10.4337 5.92184 10.4904 6.11309 10.6108 6.26184C10.7312 6.39643 10.9083 6.48143 11.0995 6.48143H14.0108C14.5704 6.48143 15.052 6.70809 15.3354 7.10476C15.6045 7.48726 15.6541 7.98309 15.477 8.48601L13.7345 13.7914C13.515 14.6698 12.5587 15.3852 11.6095 15.3852H8.84704C8.37245 15.3852 7.70662 15.2223 7.40204 14.9177L6.49537 14.2164C6.14829 13.9543 5.94287 13.5364 5.94287 13.0973Z"
														fill="#171717"
														fill-opacity="0.5"
													/>
													<path
														d="M3.6905 4.51953H2.96091C1.863 4.51953 1.41675 4.94453 1.41675 5.99286V13.1187C1.41675 14.167 1.863 14.592 2.96091 14.592H3.6905C4.78841 14.592 5.23466 14.167 5.23466 13.1187V5.99286C5.23466 4.94453 4.78841 4.51953 3.6905 4.51953Z"
														fill="#171717"
														fill-opacity="0.5"
													/>
												</g>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-else>
						<p>Nenhuma avaliação disponível.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getProfessoresByID } from "@/repositories/professor/obterProfessor.js";
import PopUp from "./PopupAvaliaProfessor.vue";
import { ref } from "vue";
import router from "@/routes/index";
import { verificacaoCurtida } from "@/service/comentario/comentarioProfessor";
import { descriptarDados } from "@/generals/descriptografarDados";
import { verificacaoDislike } from "@/service/comentario/descurtirComentarioProfessor";

export default {
	name: "UserProfile",

	components: {
		PopUp,
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
html,
body {
	height: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
.selectdiv {
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}
.selecionarmaterias {
	font-size: 1.6rem;
	font-family: "Inter", sans-serif;
}
.select-box {
	appearance: none;
	padding: 1rem 0 1rem 1rem;
	font-size: 1.6rem;
	width: 100%;
	min-width: 253px;
	border-radius: 1rem;
	background-color: #f5f5f5;
	color: #333;
	transition: all 0.3s ease;
	cursor: pointer;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	font-family: "Inter", sans-serif;
	outline: none;
}

.select-box:hover {
	transform: scale(1.02);
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

select option.opcao {
	background-color: #ffffff;
}

.container-frame {
	height: 100%;
	background-color: #f5f5f5;
	overflow: hidden;
}

.container-subjects-container {
	height: 100%;
}

.container {
	height: calc(100% - 60px);
	width: calc(100% - 60px);
	display: grid;
	grid-template-columns: 0.7fr 1fr 0.7fr;
	gap: 40px;
	padding: 40px;

	background: -webkit-linear-gradient(
		90deg,
		hsla(209, 63%, 17%, 1) 0%,
		hsla(183, 71%, 16%, 1) 100%
	);
}

#sidebar {
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	overflow: auto;
	padding-bottom: 0px;
	margin-bottom: 20px;
}

#sidebar h2 {
	margin-top: 10%;
}

#image-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	margin-bottom: 20px;
}

.icon-localizacao {
	margin-right: 12px;
}

#image-content h2 {
	text-align: center;
	font-size: 22px;
	padding-top: 10px;
}

#image-content h3 {
	font-size: 18px;
	font-weight: normal;
	margin-top: 0px;
}

.profile-pic {
	width: 50%;
	border-radius: 8px;
}

.role-button {
	background: -webkit-linear-gradient(
		90deg,
		hsla(209, 63%, 17%, 1) 0%,
		hsla(183, 71%, 16%, 1) 100%
	);
	color: white;
	border: none;
	height: 4.5rem;
	width: 15rem;
	padding: 10px 20px;
	border-radius: 08px;
	font-size: 1.5rem;
	font-family: Inter, sans-serif;
	cursor: pointer;
	align-self: center;
}

.quote {
	margin-top: 10px;
	font-style: italic;
}

.all-personal-info {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

.academic-info,
.professor-contact-info {
	margin-top: 20px;
	overflow: auto;
}

.container-academic-info {
	display: flex;
	justify-content: space-between;
}

.container-academic-info h3 {
	font-size: 1.4em;
}

.academic-info {
	height: 50%;
	background-color: #f5f5f5;
	border-radius: 10px;
}

.professor-contact-info {
	height: 50%;
	background-color: #f5f5f5;
	border-radius: 10px;
}
.academic-info ul {
	list-style: none;
	padding: 0;
}

.container-linha-info {
	display: flex;
}

.container-linha-info p {
	padding-left: 05%;
}

.traits button {
	background-color: #e0e0e0;
	border: none;
	padding: 5px 10px;
	margin: 5px;
	border-radius: 5px;
	cursor: pointer;
}

#content1,
#content2 {
	display: flex;
	flex-direction: column;
	gap: 40px;
	overflow: auto;
	margin-bottom: 20px;
}

.section {
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	overflow: auto;
}

#given-subjects {
	display: flex;
	justify-content: center;
	padding-bottom: 0px;
}

#estrela-media-professor {
	width: 125%;
	height: 125%;
}

.estrelas-metricas-container {
	padding-top: 20px;
}

.estrelas-metricas-container p {
	font-size: 1.3rem;
}

.metricas-ajustes {
	display: flex;
	flex-direction: column;
}

.estrelas-metricas {
	padding-left: 10%;
}

#ajuste-estrelas-metricas {
	width: 90%;
	height: 90%;
}

#given-subjects,
#general-reviews {
	background-color: #f5f5f5;
	height: 50%;
}

#general-reviews h3 {
	font-size: 2.17em;
}

#general-reviews {
	height: 60%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.avaliacoes-gerais-container {
	display: flex;
	flex-direction: column;
	justify-items: center;
	height: 100%;
}

.info-text {
	margin-left: 15%;
}

.titulo-avaliacoes-gerais {
	padding-top: 10px;
}

#given-subjects {
	height: 40%;
}

.subjects_container {
	max-width: 100%;
}

.subjects-title {
	display: flex;
	margin-bottom: 30px;
}

.subjects-title h3 {
	text-align: center;
	align-content: center;
	margin: 0;
	margin-left: 5px;
	font-size: 20px;
}

#subjects_icon {
	width: 40px;
}

#semestre-atual {
	padding-left: 30px;
	font-size: 1.2rem;
	font-weight: bold;
}

#materias_dadas {
	display: flex;
	width: 90%;
}

.subjects-title {
	padding: 30px;
	padding-top: 0px;
	padding-bottom: 0px;
	margin-bottom: 15px;
}

#given-subjects {
	display: flex;
	align-items: center;
}

#materias_dadas {
	list-style-type: none;
	padding-left: 30px;
}

#codigos-materias {
	padding-left: 20%;
}

#materias_dadas li {
	padding: 3px;
	font-size: 1.2rem;
}

#teacher-review {
	height: 100%;
	background-color: #f5f5f5;
	margin-right: 20px;
}

#teacher-review h3 {
	font-size: 2.17em;
	text-align: center;
}

#avaliacoes {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.container-avaliacao {
	padding-top: 10px;
}

.section {
	scrollbar-width: none;
	-ms-overflow-style: none;
}

.section::-webkit-scrollbar {
	display: none;
}

.avaliacao {
	background-color: rgb(235, 235, 235);
	margin-bottom: 2rem;
	height: fit-content;
	width: 90%;
	padding: 1.5rem;
	border-radius: 8px;
}

.avaliacao p {
	margin: 5px 0;
}

#avaliacao-codigo p {
	padding-top: 3px;
}

#avaliacao-nome {
	font-weight: bold;
	font-size: 2rem;
}

#avaliacao-icons {
	display: flex;
	justify-content: space-between;
}

#foto-de-usuario-container {
	display: flex;
	justify-content: space-between;
}

#card-user-container {
	display: flex;
	flex-direction: column;
}

#foto-de-usuario {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	height: fit-content;
}

#foto-de-usuario img {
	width: 5rem;
	height: 5rem;
	border-radius: 5rem;
}

#like-container,
#dislike-container {
	display: flex;
	width: 50%;
}

#like-icon,
#dislike-icon {
	padding-left: 5%;
}

#like-icon.liked path {
	fill: #013d2c;
}

#dislike-icon.disliked path {
	fill: #013d2c;
}

h3,
h2 {
	color: #4d4d4d;
	font-family: "Open Sans", sans-serif;
}

li,
p {
	font-family: Inter, sans-serif;
}

.full-star {
	filter: none;
}

.partial-star {
	filter: none;
	-webkit-mask-image: linear-gradient(to left, transparent 40%, black 60%);
	opacity: 1;
}

.botao-voltar {
	cursor: pointer;
}

.empty-star {
	filter: invert(50%) opacity(30%);
}

.five-estrelas {
	display: flex;
	width: 60%;
	height: 30px;
	justify-content: flex-start;
	gap: 2rem;
}

.estrela {
	width: 12%;
}

@media only screen and (max-width: 1128px) {
	.container {
		grid-template-columns: 1fr; /* Altera para uma única coluna */
		gap: 20px; /* Reduz o espaçamento entre os elementos */
		padding: 20px; /* Reduz o preenchimento */
		width: calc(100% - 40px);
	}

	.section {
		height: 100%;
	}

	#sidebar {
		margin-bottom: 0px; /* Remove a margem inferior */
		height: 100%;
	}

	#content1 {
		padding-top: 20px;
		height: 120vh;
		gap: 20px;
		margin-bottom: 0px;
	}
	#teacher-review {
		margin: 0;
	}

	#teacher-review p {
		font-size: 1.4rem;
	}

	.container-subjects-container {
		padding-top: 20%;
		height: 100%;
	}

	#general-reviews {
		height: 100%;
	}

	#given-subjects {
		height: 100%;
		overflow: hidden;
	}

	#content2 {
		height: 100%;
	}

	.all-personal-info p {
		font-size: 1.2rem;
	}

	.role-button {
		width: 100%;
		margin-top: 10px;
	}

	.profile-pic {
		width: 50%;
	}

	.academic-info,
	.professor-contact-info {
		margin-top: 10px;
	}

	.container-academic-info {
		padding-top: 20%;
	}

	.five-estrelas {
		width: 100%;
		justify-content: space-around;
		gap: 5px;
	}

	.estrela {
		width: 10%;
	}
}
</style>
