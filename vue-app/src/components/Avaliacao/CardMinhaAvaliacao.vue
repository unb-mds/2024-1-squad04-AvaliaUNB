<template>
	<div class="comment-card">
		<div class="card-header">
			<div class="materia-info">
				<span class="materia">{{ avaliacao.nome_materia }}</span>
			</div>
			<button class="trash-button" @click="onDelete">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						class="trash-icon"
						d="M21.07 5.23C19.46 5.07 17.85 4.95 16.23 4.86V4.85L16.01 3.55C15.86 2.63 15.64 1.25 13.3 1.25H10.68C8.35004 1.25 8.13003 2.57 7.97004 3.54L7.76004 4.82C6.83004 4.88 5.90004 4.94 4.97004 5.03L2.93004 5.23C2.51004 5.27 2.21004 5.64 2.25004 6.05C2.29004 6.46 2.65004 6.76 3.07004 6.72L5.11004 6.52C10.35 6 15.63 6.2 20.93 6.73C20.96 6.73 20.98 6.73 21.01 6.73C21.39 6.73 21.72 6.44 21.76 6.05C21.79 5.64 21.49 5.27 21.07 5.23Z"
						fill="#171717"
						fill-opacity="0.5"
					/>
					<path
						class="trash-icon"
						d="M19.23 8.14C18.99 7.89 18.66 7.75 18.32 7.75H5.67999C5.33999 7.75 4.99999 7.89 4.76999 8.14C4.53999 8.39 4.40999 8.73 4.42999 9.08L5.04999 19.34C5.15999 20.86 5.29999 22.76 8.78999 22.76H15.21C18.7 22.76 18.84 20.87 18.95 19.34L19.57 9.09C19.59 8.73 19.46 8.39 19.23 8.14ZM13.66 17.75H10.33C9.91999 17.75 9.57999 17.41 9.57999 17C9.57999 16.59 9.91999 16.25 10.33 16.25H13.66C14.07 16.25 14.41 16.59 14.41 17C14.41 17.41 14.07 17.75 13.66 17.75ZM14.5 13.75H9.49999C9.08999 13.75 8.74999 13.41 8.74999 13C8.74999 12.59 9.08999 12.25 9.49999 12.25H14.5C14.91 12.25 15.25 12.59 15.25 13C15.25 13.41 14.91 13.75 14.5 13.75Z"
						fill="#171717"
						fill-opacity="0.5"
					/>
				</svg>
			</button>
		</div>
		<div class="codMateria-info">
			<span class="codMateria">{{ avaliacao.cod_materia }}</span>
		</div>
		<div class="five-estrelas">
			<img
				v-for="index in 5"
				:key="index"
				ref="estrelas"
				src="../../assets/icons/avaliacao/icone-estrela-azul.svg"
				alt=""
				class="estrela"
			/>
		</div>

		<div class="comment-content">
			<p class="comment-text">{{ avaliacao.comentario }}</p>
		</div>
		<div class="reaction-buttons">
			<div class="reaction">
				<button class="like-button">
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
				</button>
				<span class="like-count">{{ avaliacao.num_likes }}</span>
			</div>
			<div class="reaction">
				<button class="deslike-button">
					<svg
						width="17"
						height="17"
						viewBox="0 0 17 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="rotated"
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
				</button>
				<span class="deslike-count">{{ avaliacao.num_dislikes }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { deletarAvaliacaoMateria } from "@/service/avaliacao/deletarAvaliacao";
import { nextTick } from "vue";

export default {
	name: "CardMinhaAvaliacao",
	props: {
		avaliacao: {
			type: Object,
			required: true,
		},
	},

	methods: {
		handleEstrelasProfessor() {
			const estrelas = this.$refs.estrelas;
			const media = this.avaliacao.nota_total;

			estrelas.forEach((estrela, index) => {
				// Remove todas as classes para garantir que começamos com uma estrela "limpa"
				estrela.classList.remove("full-star", "partial-star", "empty-star");

				if (media >= index + 1) {
					estrela.classList.add("full-star");
				} else if (media > index) {
					estrela.classList.add("partial-star");
				} else {
					estrela.classList.add("empty-star");
				}
			});
		},
		onDelete() {
			deletarAvaliacaoMateria(
				this.avaliacao.cod_avaliacao,
				this.avaliacao.cod_comentario
			);

			this.$emit("deleteMateria", this.avaliacao.cod_avaliacao); //emite o código de avaliação para que o elemento pai, a página, consiga fiiltrar o array e atuaçliozar ele sem necessidade de recarregamento da página
		},
	},

	watch: {
		professor: {
			handler() {
				this.$nextTick(() => {
					this.handleEstrelasProfessor();
				});
			},
			deep: true,
		},
	},
	mounted() {
		nextTick(() => {
			this.handleEstrelasProfessor();
		});
	},
};
</script>

<style scoped>
.full-star {
	filter: none;
}

.partial-star {
	filter: none;
	-webkit-mask-image: linear-gradient(to left, transparent 40%, black 60%);
	opacity: 1;
}

.empty-star {
	filter: invert(50%) opacity(30%);
}

.comment-card {
	background-color: #f3f3f3;
	border: 1px solid #ccc;
	border-radius: 14px;
	padding: 30px;
	margin-bottom: 20px;
	width: 100%;
	max-width: 600px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.materia-info {
	display: flex;
	align-items: center;
}

.materia {
	font-weight: bold;
	font-family: "Inter", sans-serif;
	font-size: 2.6rem;
	color: rgb(41, 41, 41);
	margin-bottom: 10px;
}

.codMateria-info {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.codMateria {
	font-weight: 500;
	font-family: "Inter", sans-serif;
	font-size: 1.6rem;
	color: #555555;
}

.flex-container {
	display: flex;
	align-items: center;
}

.five-estrelas {
	display: flex;
	justify-content: flex-start;
	gap: 1rem; /* Reduzindo o espaço entre as estrelas */
}

.estrela {
	width: 4rem;
}

.comment-text {
	margin-bottom: 10px;
	font-family: "Inter", sans-serif;
	font-size: 1.8rem;
	font-weight: 500;
	color: #333333;
}

.trash-button {
	background-color: transparent;
	border: none;
	cursor: pointer;
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.trash-icon {
	transition: fill 0.3s ease;
}

.trash-button:hover .trash-icon {
	fill: #858585;
}

.reaction-buttons {
	display: flex;
	justify-content: flex-start; /* Alterado para flex-start */
	align-items: center;
}

.reaction {
	display: flex;
	align-items: center;
	margin-right: 10px; /* Adicionando um espaço entre os botões */
}

.like-button,
.deslike-button {
	background-color: transparent;
	border: none;
	cursor: pointer;
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.like-count,
.deslike-count {
	margin-left: 5px;
	font-family: "Inter", sans-serif;
	font-size: 14px;
	color: #333333;
	font-weight: lighter;
}

.rotated {
	transform: rotate(180deg);
}
</style>
