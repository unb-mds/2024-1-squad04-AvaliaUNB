<template>
	<div class="header">
		<div class="nav-mobile">
			<ul class="itens-mobile">
				<li class="item">
					<img
						class="icons-mobile"
						src="../../assets/icons/menu_celular/icone-casa.svg"
						@click.prevent="HandleHome"
					/>
					<p class="name">Home</p>
				</li>

				<li class="item">
					<img
						class="icons-mobile"
						src="../../assets/icons/menu_celular/icone-professor.svg"
						@click.prevent="HandleProfessors"
					/>
					<p class="name">Professores</p>
				</li>

				<li class="item">
					<img
						@click.prevent="HandleMaterias"
						class="icons-mobile"
						src="../../assets/icons/menu_celular/icone-materias.svg"
					/>
					<p class="name">Matérias</p>
				</li>

				<li class="item">
					<img
						@click.prevent="HandleAvaliacao"
						class="icons-mobile"
						src="../../assets/icons/menu_celular/icone-avaliacao.svg"
					/>
					<p class="name">Avaliações</p>
				</li>
			</ul>
		</div>
		<div class="navbar">
			<div class="div-logo">
				<h1 class="logo-text">AvaliaUnb</h1>
			</div>

			<div class="nav">
				<ul class="nav-itens">
					<li class="item-web" @click="HandleHome">Home</li>
					<li class="item-web" @click.prevent="HandleProfessors">
						Professores
					</li>
					<li class="item-web" @click.prevent="HandleMaterias">Matérias</li>
					<li class="item-web" @click.prevent="HandleAvaliacao">
						Minhas Avaliações
					</li>
				</ul>
			</div>

			<div class="notification-picture" @click="HandleProfile">
				<img
					class="profile"
					:src="verificarUrl(foto)"
					@error="carregarImgAlternativa"
					alt="Foto de Perfil"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import router from "../../routes/index";

export default {
	name: "NavBar",
	data() {
		return {
			foto: sessionStorage.getItem("foto_perfil"),
		};
	},
	methods: {
		async HandleProfessors() {
			router.push({ name: "professor" });
		},
		async HandleHome() {
			router.push({ name: "home" });
		},
		async HandleMaterias() {
			router.push({ name: "materia" });
		},
		async HandleAvaliacao() {
			router.push({ name: "avaliacao" });
		},

		async HandleProfile() {
			router.push({ name: "profile" });
		},
		carregarImgAlternativa(event) {
			event.target.src =
				"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
		},
		verificarUrl(url_profile_picture) {
			if (!url_profile_picture) {
				return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
			}
			return url_profile_picture;
		},
	},
};
</script>

<style scoped>
.body {
	margin: 0;
}

.header {
	width: 100vw;
	height: auto;
	background-color: #f0f0f0;
	display: flex;
	justify-content: center;
}

.nav-mobile {
	display: none;
}

.navbar {
	display: flex;
	justify-content: space-around;
	width: 100vw;
	background-color: #f0f0f0;
	padding-top: 8px;
	padding-bottom: 8px;
	height: auto;
	align-items: center;
	max-width: 2000px;
	padding: 10px;
}

.logo-text {
	font-size: 4rem;
	font-weight: 900;
	font-family: "Open Sans", sans-serif;
	color: transparent;
	background-clip: text;
	cursor: pointer;
	background-image: linear-gradient(150deg, #1b5994 20%, #0a745b 60%);
}

.nav {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;
	width: 55%;
}

.nav-itens {
	display: flex;
	justify-content: space-around;
	list-style: none;
	align-items: center;
	width: 100%;
	padding: 0;
}

.item-web {
	font-family: "Inter", sans-serif;
	font-weight: lighter;
	color: #4d4d4d;
	font-size: 1.8rem;
	margin: 0;
	height: auto;
	font-weight: 300;
}

.item-web:hover {
	font-family: "Inter", sans-serif;
	font-weight: lighter;
	color: #102c46;
	font-size: 2rem;
	margin: 0;
	height: auto;
	cursor: pointer;
}

.notification-picture {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 16px;
	cursor: pointer;
}

.profile {
	width: 8rem;
	height: 8rem;
	border-radius: 8rem;
}

.itens-mobile {
	display: flex;
	justify-content: space-around;
	width: 100%;
	list-style: none;
	padding: 0;
	padding: 10px;
	margin-bottom: 10px;
}

.item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #616161;
	font-size: 2rem;
	font-family: "Inter", sans-serif;
	gap: 14px;
	font-weight: lighter;
}

.item:hover {
	font-size: 2rem;
	color: #102c46;
}

.icons-mobile:hover {
	width: 5.2rem;
}

.item p {
	margin: 0;
}

.icons-mobile {
	width: 5rem;
	height: auto;
}

@media screen and (max-width: 800px) {
	.nav {
		display: none;
	}

	.nav-mobile {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100vw;
		background-color: #f0f0f0;
		border-radius: 20px 20px 0px 0px;
		height: auto;
		padding-top: 10px;
		padding-bottom: 10px;
		overflow-y: none;
		z-index: 999;
	}
}

.navbar {
	justify-content: space-between;
}
.div-logo {
	margin-left: 10px;
}

.notification-picture {
	margin-right: 10px;
}

@media screen and (max-width: 650px) {
	.notification-picture {
		margin-right: 10px;
	}

	.profile {
		width: 8rem;
	}

	.logo-text {
		font-size: 4rem;
	}

	.notification {
		width: 18px;
	}
}
</style>
