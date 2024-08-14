<template>
	<div class="container-fluid p-0">
		<div class="row m-0">
			<img
				src="../assets/images/images_cadastro_login/image-cadastro-login-section-1.svg"
				alt="Tela de Cadastro"
				class="custom-image"
			/>
			<!-- Frame para realizar o cadastro -->
			<div class="col-lg-6 px-4 py-5 bg-blue login">
				<h1 class="title">Cadastre-se</h1>
				<div class="card">
					<p v-if="mensagemErro" class="erro">{{ mensagemErro }}</p>
					<form @submit.prevent="handleCadastro" class="form">
						<div class="inputs">
							<div class="form-group">
								<div class="element">
									<p for="nome" class="mr-flex"></p>
									<input
										id="nome"
										v-model="formData.nome"
										class="form-control"
										placeholder="Nome"
										required
									/>
								</div>
								<div class="element">
									<p for="sobrenome" class="mr-flex"></p>
									<input
										id="sobrenome"
										v-model="formData.sobrenome"
										class="form-control"
										placeholder="Sobrenome"
										required
									/>
								</div>
							</div>

							<div class="element">
								<p for="email" class="d-flex"></p>
								<input
									id="email"
									v-model="formData.email"
									type="email"
									class="form-control"
									placeholder="E-mail"
									required
								/>
							</div>
							<div class="element">
								<p for="cpf" class="mr-flex"></p>
								<input
									:maxlength="14"
									:minlength="14"
									id="cpf"
									v-model="formData.cpf"
									@input="formatarCPF"
									class="form-control"
									placeholder="CPF"
									required
								/>
							</div>
							<div class="element">
								<p for="curso" class="mr-2"></p>
								<select
									id="curso"
									v-model="formData.curso"
									class="form-control"
									required
								>
									<option value="">Curso</option>
									<option value="Engenharia de Software">
										Engenharia de Software
									</option>
									<option value="Engenharia Aeroespacial">
										Engenharia Aeroespacial
									</option>
									<option value="Engenharia Automotiva">
										Engenharia Automotiva
									</option>
									<option value="Engenharia Eletrônica">
										Engenharia Eletrônica
									</option>
									<option value="Engenharia de Energia">
										Engenharia de Energia
									</option>
								</select>
							</div>
							<div class="element">
								<p for="matricula" class="mr-2"></p>
								<input
									:minlength="7"
									:maxlength="9"
									id="matricula"
									v-model="formData.matricula"
									class="form-control"
									placeholder="Matrícula"
									required
								/>
							</div>
							<div class="form-group">
								<div class="element">
									<p for="senha" class="mr-2"></p>
									<input
										id="senha"
										v-model="formData.senha"
										type="password"
										class="form-control"
										placeholder="Senha"
										required
									/>
								</div>

								<div class="element">
									<p for="confirma_senha" class="mr-2"></p>
									<input
										id="confirma_senha"
										v-model="confirmacao_senha"
										type="password"
										class="form-control"
										placeholder="Confirme sua senha"
										required
									/>
								</div>
							</div>
						</div>
						<div class="d-flex justify-content-between">
							<button
								type="submit"
								class="btn btn-primary btn-block btn-cadastrar"
							>
								<LoadingComponent
									class="loading"
									v-if="loading"
									:isLoading="loading"
								/>
								<span v-else>Cadastrar</span>
							</button>
							<button
								class="btn btn-secondary btn-block btn-cancelar"
								@click.prevent="HandleCancelar"
							>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import router from "../routes/index";
import { cadastrarUsuarioDB } from "@/repositories/usuario/cadastrarUsuario";
import {
	verificarEmail,
	verificarCPF,
	verificarNomeSobrenome,
	verificarMatricula,
} from "@/generals/verificarInputs.js";
import LoadingComponent from "../components/Navegacao/LoadingComponent.vue";
import verificarPalvrao from "@/generals/verificarPalavrao";

export default {
	name: "CadastroComponent",
	components: {
		LoadingComponent,
	},
	data() {
		return {
			mensagemErro: "",
			confirmacao_senha: "",
			formData: {
				matricula: "",
				cpf: "",
				nome: "",
				sobrenome: "",
				email: "",
				senha: "",
				curso: "",
			},
			loading: false,
		};
	},
	methods: {
		async verificarExistenciaEValidar() {
			try {
				if (
					!verificarNomeSobrenome(this.formData.nome, this.formData.sobrenome)
				) {
					return "Digite nome e sobrenome válido";
				}
				if (!verificarEmail(this.formData.email)) {
					return "Digite um email válido";
				}
				if (!verificarCPF(this.formData.cpf)) {
					return "Digite um CPF válido";
				}
				if (!verificarMatricula(this.formData.matricula)) {
					return "Digite uma matrícula válida";
				}

				return null;
			} catch (error) {
				console.log(error);
				return error; // Mensagem de erro genérica
			}
		},

		async HandleCancelar() {
			router.push("/login");
		},

		async handleCadastro() {
			try {
				this.loading = true;
				this.mensagemErro = "";

				const existe = await this.verificarExistenciaEValidar();
				if (existe) {
					this.mensagemErro = existe;
					this.loading = false;
					return;
				}

				if (this.formData.senha !== this.confirmacao_senha) {
					this.mensagemErro = "As senhas são diferentes! Confirme sua senha.";
					this.loading = false;
					return;
				}
				if (
					verificarPalvrao(this.formData.email) ||
					verificarPalvrao(this.formData.sobrenome) ||
					verificarPalvrao(this.formData.nome)
				) {
					this.mensagemErro = "Não insira palavrões em nenhum dos campos!";
					this.loading = false;
					return;
				}
				const response = await cadastrarUsuarioDB(this.formData);
				if (response.success) {
					this.formData.nome = "";
					this.formData.sobrenome = "";
					this.formData.email = "";
					this.formData.senha = "";
					this.formData.curso = "";
					this.formData.matricula = "";
					this.formData.cpf = "";
					this.confirmacao_senha = "";
					router.push("/login");
				} else {
					this.mensagemErro = response.message;
					this.loading = false;
				}
			} catch (error) {
				console.error("Erro ao cadastrar:", error);
			}
		},
		formatarCPF() {
			// Remove qualquer caractere que não seja número do CPF
			let cpfNumerico = this.formData.cpf.replace(/\D/g, "");

			// Formata o CPF (###.###.###-##)
			cpfNumerico = cpfNumerico.replace(/^(\d{3})(\d)/, "$1.$2");
			cpfNumerico = cpfNumerico.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
			cpfNumerico = cpfNumerico.replace(
				/^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
				"$1.$2.$3-$4"
			);

			// Atualiza o valor do campo de CPF
			this.formData.cpf = cpfNumerico;
		},
	},
};
</script>

<style scoped>
p {
	margin: 0;
	padding: 0;
}
.inputs {
	display: grid;
	gap: 15px;
	margin-bottom: 20px;
}
.login {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.bg-white {
	flex: 1; /* Ocupa todo o espaço restante */
}

.bg-blue {
	position: absolute;
	top: 0;
	right: 0;
	width: 50%; /* Largura do elemento */
	height: 100%;
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
}

.card {
	width: fit-content;
	height: fit-content;
	background: linear-gradient(
		rgba(255, 255, 255, 0.3),
		rgba(255, 255, 255, 0.1)
	);
	border-radius: 30px;
	padding: 6%;
}

.title {
	font-family: "Open Sans", sans-serif;
	font-size: 4rem;
	color: #fff;
	padding: 20px;
	width: 60%;
}

/* Estilos adicionais para os outros textos */
.text {
	font-family: "Inter", sans-serif;
	font-size: 14px;
	letter-spacing: 5%;
	color: #6d6b71; /* Cor cinza */
}
.form-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30px;
}

.form-control {
	width: 100%;
	border-radius: 12px;
	box-sizing: border-box;
	border: none; /* Remove a sombra */
	padding: 12px;
	align-self: center; /* Centralizar verticalmente */
	justify-content: center;
	outline: none;
}

.form-group select {
	border-radius: 12px;
	border: none;
	color: #6d6b71;
}

.btn-cadastrar,
.btn-cancelar {
	margin-right: 5%; /* Espaçamento entre os campos */
	width: 120px; /* Defina a largura desejada para o botão */
	height: fit-content; /* Defina a altura desejada para o botão */
	padding: 4%;
	background-color: #102c46; /* Cor de fundo do botão */
	color: white; /* Cor do texto do botão */
	border: none; /* Remove a borda do botão */
	border-radius: 12px; /* Raio da borda do botão */
	font-size: 14px; /* Tamanho da fonte do texto do botão */
	font-family: "Open Sans", sans-serif;
	cursor: pointer; /* Altera o cursor ao passar o mouse sobre o botão */
	transition: background-color 0.3s ease; /* Adiciona uma transição suave para a cor de fundo */
}
.btn-cancelar {
	background: linear-gradient(
		rgba(255, 255, 255, 0.3),
		rgba(255, 255, 255, 0.1)
	);
}
.btn-cadastrar:hover {
	background-color: #003366; /* Cor de fundo do botão ao passar o mouse sobre ele */
}

.btn-cancelar:hover {
	background-color: #bfbfbf; /* Cor de fundo do botão ao passar o mouse sobre ele */
}
.custom-image {
	position: absolute;
	top: 50%;
	left: 25%;
	transform: translate(-50%, -50%);
	max-width: 100%;
	max-height: 100%;
}

.erro {
	color: white;
	font-family: "Inter", sans-serif;
}
@media screen and (max-width: 1200px) {
	.login {
		width: 100%;
	}
	.custom-image {
		display: none;
	}
}
@media screen and (max-width: 650px) {
	.title {
		font-size: 5rem;
	}
}
</style>
