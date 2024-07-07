<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <div class="col-lg-6 d-none d-lg-block">
        <img
          src="../assets/images/images_cadastro_login/image-cadastro-login-section-1.svg"
          alt="Tela de Cadastro"
          class="custom-image"
        />
      </div>
      <div class="col-lg-6 px-4 py-5 bg-blue login">
        <h1 class="title">Entrar</h1>
        <div class="card">
          <form class="form" @submit.prevent="HandleLogin">
            <div class="inputs">
              <label class="email"></label>
              <input
                type="email"
                placeholder="Insira o seu e-mail"
                class="form-control"
                ref="emailInput"
              />
              <label class="senha"></label>
              <input
                type="password"
                placeholder="Insira sua senha"
                class="form-control"
                ref="senhaInput"
              />
              <p class="cadastrar-p" @click.prevent="HandleCadastro">
                Não possui conta? Cadastre-se aqui.
              </p>
              <button class="login-button" :disabled="loading">
                <LoadingComponent
                  class="loading"
                  v-if="loading"
                  :isLoading="loading"
                />
                <span v-else>Entrar</span>
              </button>
              <p class="login-error" v-if="erro">{{ erro }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authGuard } from "../guards/authGuard.js";
import router from "../routes/index";
import { getUsuarios } from "@/repositories/usuario/obterUsuarios.js";
import LoadingComponent from "../components/Navegacao/LoadingComponent.vue";

export default {
  name: "LoginPage",
  components: {
    LoadingComponent,
  },
  data() {
    return {
      erro: "",
      loading: false,
    };
  },
  methods: {
    async HandleCadastro() {
      router.push("/cadastro");
    },

    async autenticarLogin(emailEntrada, senhaEntrada) {
      try {
        const usuarios = await getUsuarios();

        for (let i = 0; i < usuarios.length; i++) {
          if (
            usuarios[i].email === emailEntrada &&
            usuarios[i].senha === senhaEntrada
          ) {
            authGuard(true, usuarios[i].matricula);
            return 1;
          }
        }

        authGuard(false);
        return 0;
      } catch (error) {
        console.log(error);
      }
    },

    async HandleLogin() {
      try {
        this.loading = true;
        this.erro = "";
        const response = await this.autenticarLogin(
          this.$refs.emailInput.value,
          this.$refs.senhaInput.value
        );
        if (response == 0) {
          this.erro =
            "Erro ao fazer login. Por favor, verifique suas credenciais.";
          this.loading = false;
        }
        setTimeout(() => {
          this.erro = "";
        }, 2000);
      } catch (error) {
        this.loading = false;
        console.error("Erro ao executar o login:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  background-color: white;
}

.bg-white {
  flex: 1; /* Ocupa todo o espaço restante */
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  text-align: left;
  width: 66%;
}

/* Estilos adicionais para os outros textos */
.text {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  letter-spacing: 5%;
  color: #6d6b71; /* Cor cinza */
}

.inputs {
  display: grid;
  gap: 10px;
}

.buttons-login {
  display: flex;
  margin-top: 10px;
}

.login-button {
  width: 160px; /* Defina a largura desejada para o botão */
  height: fit-content; /* Defina a altura desejada para o botão */
  padding: 3%;
  background-color: #102c46; /* Cor de fundo do botão */
  color: white; /* Cor do texto do botão */
  border: none; /* Remove a borda do botão */
  border-radius: 12px; /* Raio da borda do botão */
  font-size: 14px; /* Tamanho da fonte do texto do botão */
  font-family: "Inter", sans-serif;
  cursor: pointer; /* Altera o cursor ao passar o mouse sobre o botão */
  transition: background-color 0.3s ease; /* Adiciona uma transição suave para a cor de fundo */
}

.login-button:hover {
  background-color: #003366;
}

.cadastrar-p {
  cursor: pointer;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  font-weight: 100;
}

.form-control {
  margin-top: 2%;
  border-radius: 12px;
  padding: 12px;
  border: none;
  outline: none;
}

.login-error {
  color: red;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  margin-top: 10px;
}
.custom-image {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  letter-spacing: 5%;
  color: #6d6b71; /* Cor cinza */
}

.inputs {
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.inputs input {
  width: 25vw;
}

.buttons-login {
  display: flex;
  margin-top: 10px;
}

.login-button {
  width: 160px; /* Defina a largura desejada para o botão */
  height: fit-content; /* Defina a altura desejada para o botão */
  padding: 3%;
  background-color: #102c46; /* Cor de fundo do botão */
  color: white; /* Cor do texto do botão */
  border: none; /* Remove a borda do botão */
  border-radius: 12px; /* Raio da borda do botão */
  font-size: 14px; /* Tamanho da fonte do texto do botão */
  font-family: "Inter", sans-serif;
  cursor: pointer; /* Altera o cursor ao passar o mouse sobre o botão */
  transition: background-color 0.3s ease; /* Adiciona uma transição suave para a cor de fundo */
}

.login-button:hover {
  background-color: #003366;
}

.cadastrar-p {
  cursor: pointer;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  font-weight: 100;
}

.form-control {
  margin-top: 2%;
  border-radius: 12px;
  padding: 12px;
  border: none;
  outline: none;
}

.custom-image {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}

/* para telas menores do que 1203px*/
@media screen and (max-width: 1200px) {
  .inputs input {
    width: 40vw;
  }
  .login {
    width: 100%;
  }
  .custom-image {
    display: none;
  }
  .container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
