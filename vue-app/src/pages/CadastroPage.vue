<template>
	<div class="container-fluid p-0">
		<div class="row m-0">
			<!-- Tela inicial branca ocupando a tela inteira -->
			<div class="col-lg-6 d-none d-lg-block"></div>
			<img
				src="../assets/images/images_cadastro_login/image-cadastro-login-section-1.svg"
				alt="Tela de Cadastro"
				class="custom-image"
			/>
			<!-- Frame para realizar o cadastro -->
			<div class="col-lg-6 px-4 py-5 bg-blue">
				<h1 class="title">Cadastre-se</h1>
				<div class="card">
					<p v-if="mensagemErro" class="erro">{{ mensagemErro }}</p>
					<form @submit.prevent="handleCadastro" class="form">
						<div class="inputs">
							<!-- Div para agrupar os campos Nome e CPF -->
							<div class="form-group">
								<!-- element agrupa a label e o input para o campo do forum-->
								<div class="element">
									<label for="nome" class="mr-flex"></label>
									<input
										id="nome"
										v-model="formData.nome"
										class="form-control"
										placeholder="Nome"
										required
									/>
								</div>
								<div class="element">
									<label for="sobrenome" class="mr-flex"></label>
									<input
										id="sobrenome"
										v-model="formData.sobrenome"
										class="form-control"
										placeholder="Sobrenome"
										required
									/>
								</div>
							</div>
							<!-- Fim do grupo Nome e Sobrenome -->

							<!-- Div para agrupar CPF e Email-->
							<div class="form-group">
								<div class="element">
									<label for="cpf" class="mr-flex"></label>
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
									<label for="email" class="d-flex"></label>
									<input
										id="email"
										v-model="formData.email"
										type="email"
										class="form-control"
										placeholder="E-mail"
										required
									/>
								</div>
							</div>
							<!-- Fim do grupo CPF e Email-->

							<!-- Div para agrupar os campos Senha e Confirmação de Senha -->
							<div class="form-group">
								<div class="element">
									<label for="senha" class="mr-2"></label>
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
									<label for="confirma_senha" class="mr-2"></label>
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
							<!-- Fim do grupo Senha e Confirmação de Senha -->

							<!-- Div para agrupar os campos Curso e Matrícula -->
							<div class="form-group">
								<div class="element">
									<label for="curso" class="mr-2"></label>
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
									<label for="matricula" class="mr-2"></label>
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
							</div>
							<!-- Fim do grupo Curso e Matrícula -->
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
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import router from "../routes/index";
//import  axios  from "axios";
import { getUsuarios } from "@/repositories/usuario/obterUsuarios";
import { cadastrarUsuarioDB } from "@/repositories/usuario/cadastrarUsuario";
import {
	verificarEmail,
	verificarCPF,
	verificarNomeSobrenome,
	verificarMatricula,
} from "@/generals/verificarInputs.js";
import LoadingComponent from "../components/Navegacao/LoadingComponent.vue";

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
				const usuarios = await getUsuarios();
				for (let i = 0; i < usuarios.length; i++) {
					if (usuarios[i].email === this.formData.email) {
						return "O e-mail já está cadastrado.";
					}

					if (usuarios[i].matricula.toString() === this.formData.matricula) {
						return "A matrícula já está cadastrada.";
					}

					if (usuarios[i].cpf === this.formData.cpf) {
						return "O CPF já está cadastrado.";
					}
				}
				return null;
			} catch (error) {
				console.log(error);
				return "Erro ao verificar cadastro."; // Mensagem de erro genérica
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

				cadastrarUsuarioDB(this.formData);
				this.formData.nome = "";
				this.formData.sobrenome = "";
				this.formData.email = "";
				this.formData.senha = "";
				this.formData.curso = "";
				this.formData.matricula = "";
				this.formData.cpf = "";
				this.confirmacao_senha = "";
				router.push("/login");
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
.container {
	display: flex;
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
	position: relative;
	top: 50%; /* Define o topo como 50% da altura da div pai */
	left: 50%; /* Define a margem esquerda como 50% da largura da div pai */
	transform: translate(
		-50%,
		-50%
	); /* Move o elemento de volta metade de sua largura e metade de sua altura */
	width: 55%; /* Largura do elemento */
	height: 45%;
	background: linear-gradient(
		rgba(255, 255, 255, 0.3),
		rgba(255, 255, 255, 0.1)
	);
	border-radius: 30px;
	padding: 6%;
	margin-bottom: 50px;
}

/* Estilos adicionais para o título "Cadastre-se" */
.title {
	position: absolute; /* Define o título como posição absoluta */
	top: calc(50% - 46%); /* Ajusta a posição vertical do topo do título */
	left: calc(
		50% - 36%
	); /* Ajusta a posição horizontal para alinhar com o card */
	font-family: "Open Sans", sans-serif;
	font-size: 400%;
	color: #fff; /* Cor branca */
	padding: 20px; /* Padding para todos os lados */
}

/* Estilos adicionais para os outros textos */
.text {
	font-family: "Inter", sans-serif;
	font-size: 14px;
	letter-spacing: 5%;
	color: #6d6b71; /* Cor cinza */
}

.inputs {
	margin-top: 9%;
	display: grid; /* Usar grid layout */
	grid-template-columns: repeat(3); /* Duas colunas com largura igual */
	grid-template-rows: repeat(2); /* Três linhas com altura automática */
	align-self: center; /* Centralizar verticalmente */
	justify-content: center;
	gap: 5%;
}

.form-group {
	display: flex; /* Use flexbox para organizar os elementos lado a lado */
	justify-content: center;
	margin-bottom: 5%;
}

.element {
	display: flex;
	justify-content: center;
	width: 150%;
	margin-right: 18%;
}

.form-group .element:last-child {
	margin-right: 0%;
}

.form-control {
	width: 100%;
	border-radius: 12px;
	border: none; /* Remove a sombra */
	padding: 8%;
	align-self: center; /* Centralizar verticalmente */
	justify-content: center;
	outline: none;
}

.form-group select {
	margin-right: 20px; /* Espaçamento entre os campos */
	border-radius: 12px;
	border: none; /* Remove a sombra */
	padding: 12px;
	color: #6d6b71;
}

.btn-cadastrar {
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

.btn-cadastrar:hover {
	background-color: #003366; /* Cor de fundo do botão ao passar o mouse sobre ele */
}

.btn-cancelar {
	width: 120px; /* Defina a largura desejada para o botão */
	height: fit-content; /* Defina a altura desejada para o botão */
	padding: 4%;
	background: linear-gradient(
		rgba(255, 255, 255, 0.3),
		rgba(255, 255, 255, 0.1)
	);
	color: white; /* Cor do texto do botão */
	border: none; /* Remove a borda do botão */
	border-radius: 12px; /* Raio da borda do botão */
	font-size: 14px; /* Tamanho da fonte do texto do botão */
	font-family: "Open Sans", sans-serif;
	cursor: pointer; /* Altera o cursor ao passar o mouse sobre o botão */
	transition: background-color 0.3s ease; /* Adiciona uma transição suave para a cor de fundo */
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

/* Estilos para telas menores que 1203px */
@media screen and (max-width: 1203px) {
	.container {
		flex-direction: column;
		align-items: center;
	}

	.bg-blue {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
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
		z-index: -1;
	}

	.card {
		position: relative;
		width: 50%;
		height: auto;
		border-radius: 12px;
		background: linear-gradient(
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.1)
		);
		z-index: 1;
		margin-left: 10px;
		margin-right: 20px;
		margin-top: 60px; /* Espaçamento superior */
		margin-bottom: 20px; /* Espaçamento inferior */
	}

	.title {
		text-align: center;
		font-size: 200%;
	}

	.inputs {
		display: grid;
		gap: 10px;
		margin-top: 20px;
		margin-right: 40px;
	}

	.form-group {
		display: flex;
		margin-bottom: 10px; /* Adicionar margem inferior para separar os grupos de inputs */
	}

	.element {
		width: 100%;
		margin-right: 10px; /* Adicionar espaçamento entre os inputs na mesma linha */
		padding: 2px;
	}

	.form-control {
		width: calc(100% - 20px); /* Ajusta a largura para 100% menos a margem */
		padding: 8px;
		font-size: 14px;
	}

	.btn-cadastrar,
	.btn-cancelar {
		width: 100%;
		margin-top: 5px;
		padding: 10px;
		font-size: 16px;
	}

	.custom-image {
		max-width: 100%;
		max-height: 100%;
		top: calc(100% + 20px); /* Posiciona a imagem abaixo do card */
		left: 50%;
		transform: translateX(-50%);
	}
}
/* Estilos para telas menores que 768px */
@media screen and (max-width: 768px) {
	.container {
		flex-direction: column;
		align-items: center;
	}

	.bg-blue {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
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
		z-index: -1;
	}

	.card {
		position: relative;
		width: 70%;
		padding: 6%;
		border-radius: 12px;
		background: linear-gradient(
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.1)
		);
		z-index: 1;
		margin-left: auto; /* Auto margem à esquerda */
		margin-right: 100px; /* Auto margem à direita */
		margin-top: 20px; /* Espaçamento superior */
		margin-bottom: 20px; /* Espaçamento inferior */
	}

	.title {
		text-align: center;
		font-size: 200%;
	}

	.inputs {
		display: grid;
		gap: 10px;
		margin-top: 20px;
	}

	.form-group {
		display: flex;
		margin-bottom: 10px; /* Adicionar margem inferior para separar os grupos de inputs */
	}

	.element {
		width: 100%;
		margin-right: 10px; /* Adicionar espaçamento entre os inputs na mesma linha */
		padding: 2px;
	}

	.form-control {
		width: calc(100% - 20px); /* Ajusta a largura para 100% menos a margem */
		padding: 8px;
		font-size: 14px;
	}

	.btn-cadastrar,
	.btn-cancelar {
		width: 100%;
		margin-top: 5px;
		padding: 10px;
		font-size: 16px;
	}

	.custom-image {
		max-width: 100%;
		max-height: 100%;
		top: calc(100% + 20px); /* Posiciona a imagem abaixo do card */
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
