<template>
	<div class="overlay">
		<div class="header-div">
			<header class="header">
				<div class="header-logo-div">
					<a href="/landingpage" class="header-logo-a">AvaliaUnB</a>
				</div>

				<div class="header-entrar-div">
					<button v-on:click="HandleLogin" class="header-entrar-button">
						ENTRAR
					</button>
				</div>
			</header>
		</div>

		<div class="container-1">
			<div class="sub-container-1">
				<div class="sub-container-1-div">
					<div>
						<h1 class="sub-container-1-div-titulo">
							Excelência Educacional: Avaliando Docentes na Universidade de
							Brasília
						</h1>
						<a class="sub-container-1-div-texto"
							>Descubra como a comunidade acadêmica da Universidade de Brasília
							está comprometida com a excelência educacional. Nossa plataforma
							oferece uma oportunidade única para avaliar e reconhecer o
							desempenho dos docentes, contribuindo para o aprimoramento
							contínuo do ensino superior.
						</a>
					</div>
					<img
						class="sub-container-1-img"
						src="../assets/images/images_landing_page/langin-page-section-1.svg"
					/>
				</div>
			</div>
		</div>

		<div class="container-2">
			<div class="container-2-div">
				<img
					class="container-2-div-img"
					src="../assets/images/logo/logo-avalia-unb.svg"
				/>
				<a class="container-2-div-texto"
					>Junte-se a nós e faça parte da transformação educacional, onde cada
					avaliação é um passo rumo à excelência acadêmica e ao crescimento
					coletivo
				</a>
				<button v-on:click="HandleCadastro" class="container-2-div-button">
					Cadastre-se
				</button>
			</div>
		</div>

		<div class="container-3">
			<div class="container-3-div">
				<div class="container-3-div-text1">
					<a class="container-3-div-text1-1">1</a>
					<a class="container-3-div-text1-2">Avaliações Detalhadas</a>
					<a class="container-3-div-text1-3"
						>Avalie docentes e disciplinas com critérios específicos como
						didática, metodologia, métodos de ensino e acesso para dúvidas,
						garantindo uma avaliação abrangente e justa.
					</a>
				</div>

				<div class="container-3-div-text2">
					<a class="container-3-div-text2-1">2</a>
					<a class="container-3-div-text2-2">Explore a comunidade e Avalie</a>
					<a class="container-3-div-text2-3"
						>Encontre os professores e disciplinas da UnB, explore avaliações
						detalhadas e contribua para uma comunidade acadêmica mais informada
						e engajada.
					</a>
				</div>

				<div class="container-3-div-text3">
					<a class="container-3-div-text3-1">3</a>
					<a class="container-3-div-text3-2">Avaliações e Estatísticas</a>
					<a class="container-3-div-text3-3"
						>Visualize as avaliações de professores e disciplinas, veja as notas
						médias, e contribua para uma comunidade acadêmica mais informada e
						engajada.
					</a>
				</div>

				<div class="container-3-div-text4">
					<a class="container-3-div-text4-1">4</a>
					<a class="container-3-div-text4-2">Avaliações Identificadas</a>
					<a class="container-3-div-text4-3"
						>Avalie os professores de forma identificada, garantindo
						transparência e confiabilidade no processo de avaliação.
					</a>
				</div>
			</div>
		</div>

		<div class="footer-div">
			<footer class="footer">
				<a href="/landingpage" class="footer-logo-a">AvaliaUnB</a>
				<a class="sub-texto">Avalie, inspire, aprimore.</a>
			</footer>
		</div>
	</div>
</template>

<script>
import router from "../routes/index";
export default {
	name: "LandingPage",
	data() {
		return {};
	},
	methods: {
		async HandleCadastro() {
			router.push({ name: "cadastro" });
		},
		async HandleLogin() {
			router.push({ name: "login" });
		},
	},
};
</script>

<style scoped>
.footer-div {
	padding-top: 10px;
	padding-bottom: 10px;

	background-color: #f0f0f0;
	width: 100vw;
	height: auto;
	display: flex;
	align-items: center;
}
.footer {
	display: grid;
	margin-left: 3.7vw;
}
.footer-logo-a {
	font-size: 4rem;
	font-family: "Open Sans", sans-serif;
	color: #102c46;
	text-decoration: none;
	font-weight: 900;
}
.sub-texto {
	font-family: "Inter", sans-serif;
	font-weight: lighter;
	font-size: 2rem;
	color: #7a7a7a;
}
.container-3 {
	background-color: #102c46;
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container-3-div {
	display: flex;
	justify-content: center;
	gap: 10%;
	padding: 80px;
	max-width: 2000px;
}

.container-3-div-text1,
.container-3-div-text2,
.container-3-div-text3,
.container-3-div-text4 {
	color: #f0f0f0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: baseline;
}
.container-3-div-text1-1,
.container-3-div-text2-1,
.container-3-div-text3-1,
.container-3-div-text4-1 {
	font-family: "Open Sans", sans-serif;
	font-size: 18rem;
	font-weight: bolder;
}
.container-3-div-text1-2,
.container-3-div-text2-2,
.container-3-div-text3-2,
.container-3-div-text4-2 {
	font-family: "Open Sans", sans-serif;
	font-size: 2.5rem;
	line-height: 4rem;
}
.container-3-div-text1-3,
.container-3-div-text2-3,
.container-3-div-text3-3,
.container-3-div-text4-3 {
	font-family: "Inter", sans-serif;
	font-weight: lighter;
	font-size: 1.8rem;
	line-height: 2.5rem;
	margin-top: 20px;
}
.container-2 {
	background-color: #f0f0f0;
	width: 100%;
	height: auto;
	padding-top: 40px;
	padding-bottom: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container-2-div {
	display: grid;
	justify-items: center;
	gap: 40px;
	height: auto;
	padding: 40px;
}
.container-2-div-img {
	width: 15%;
}
.container-2-div-texto {
	font-family: "Inter", sans-serif;
	font-weight: 300;
	font-size: 2.5rem;
	line-height: 5rem;
	text-align: center;
}
.container-2-div-button {
	font-size: 2.3rem;
	background-color: #f0f0f0;
	border-width: 1;
	border-radius: 10px;
	padding-right: 38px;
	padding-left: 38px;
	padding-top: 8px;
	padding-bottom: 8px;
	color: #102c46;
	font-weight: 400;
	font-family: "Inter", sans-serif;
	transition: 0.3s;
}
.container-2-div-button:hover {
	background-color: rgb(224, 224, 224);
	transition: 0.3s;
	cursor: pointer;
}
.header-div {
	background-color: #f0f0f0;
	width: 100%;
}
.header {
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	height: auto;
	margin-left: 80px;
	margin-right: 80px;
}
.header-logo-a {
	font-size: 4rem;
	font-weight: 900;
	font-family: "Open Sans", sans-serif;
	color: transparent;
	background-clip: text;
	cursor: pointer;
	background-image: linear-gradient(150deg, #1b5994 20%, #0a745b 60%);
}
.header-entrar-button {
	font-size: 1.6rem;
	background-color: white;
	border-width: 0;
	box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	padding-right: 40%;
	padding-left: 40%;
	padding-top: 20%;
	padding-bottom: 20%;
	color: #008e4a;
	font-weight: bold;
	font-family: "Inter", sans-serif;
	transition: 0.3s;
}
.header-entrar-button:hover {
	background-color: rgb(224, 224, 224);
	transition: 0.3s;
	cursor: pointer;
}
.container-1 {
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
	justify-content: center;
	align-items: center;
	width: 100;
	height: auto;
	padding: 4%;
}
.sub-container-1 {
	border-radius: 40px;
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0.2) 0%,
		rgba(153, 153, 153, 0.2) 100%
	);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 60px;
	height: auto;
	max-width: 2000px;
}
.sub-container-1-div {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 70px;
}
.sub-container-1-div-titulo {
	color: white;
	font-family: "Open Sans", sans-serif;
	font-size: 4rem;
}
.sub-container-1-div-texto {
	color: #c4c4c4;
	font-family: "Inter", sans-serif;
	font-size: 2rem;
	font-weight: lighter;
}
.sub-container-1-img {
	width: 50%;
	height: auto;
}
@media screen and (max-width: 1150px) {
	.sub-container-1-div {
		flex-wrap: wrap-reverse;
	}
	.sub-container-1-img {
		width: 80%;
	}
	.sub-container-1-div-titulo {
		text-align: center;
	}
	.sub-container-1-div-texto {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.container-2-div {
		gap: 40px;
	}

	.container-2 {
		height: auto;
		padding-top: 20px;
		padding-bottom: 20px;
	}
}
@media screen and (max-width: 600px) {
	.sub-container-1-div {
		gap: 20px;
	}

	.container-2-div-img {
		width: 40%;
		height: auto;
	}
	.sub-container-1 {
		padding: 30px;
	}
}
@media screen and (max-width: 950px) {
	.container-3-div {
		padding: 30px;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
}
</style>
