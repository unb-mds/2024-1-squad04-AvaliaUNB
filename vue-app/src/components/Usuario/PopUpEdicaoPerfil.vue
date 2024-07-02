<template>
  <div class="popup-wrapper">
    <div class="popup">
      <h2>Edite seu perfil</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="photoUrl">URL da Foto</label>
          <input
            maxlength="500"
            type="url"
            id="photoUrl"
            v-model="form.foto_url"
          />
        </div>
        <div class="form-group">
          <label for="firstName">Nome</label>
          <input
            maxlength="100"
            type="text"
            id="firstName"
            v-model="form.nome"
          />
        </div>
        <div class="form-group">
          <label for="lastName">Sobrenome</label>
          <input
            maxlength="100"
            type="text"
            id="lastName"
            v-model="form.sobrenome"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input maxlength="100" type="email" id="email" v-model="form.email" />
        </div>
        <div class="form-group">
          <label for="dropdown">Curso</label>
          <select id="dropdown" v-model="form.curso">
            <option value="" disabled selected>Escolha uma opção</option>
            <option value="Engenharia de Software">
              Engenharia de Software
            </option>
            <option value="Engenharia de Energia">Engenharia de Energia</option>
            <option value="Engenharia Eletrônica">Engenharia Eletrônica</option>
            <option value="Engenharia Aeroespacial">
              Engenharia Aeroespacial
            </option>
            <option value="Engenharia Automotiva">Engenharia Automotiva</option>
          </select>
        </div>
        <div class="buttons">
          <button type="submit">Salvar</button>
          <button class="cancelar" @click="closePopUp">Cancelar</button>
        </div>
        <div v-if="error_message" class="error-message">
          {{ error_message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { editarDadosPerfil } from "@/service/usuario/editarDadosPerfil";
import { getUsuarios } from "@/repositories/usuario/obterUsuarios.js";
import { verificarEmail, verificarUrl } from "@/generals/verificarInputs.js";
export default {
  name: "PopUpEdicaoPerfil",
  props: {
    usuarioInfo: Object,
  },
  data() {
    return {
      form: {
        foto_url: this.usuarioInfo.foto_url ? this.usuarioInfo.foto_url : "",
        nome: this.usuarioInfo ? this.usuarioInfo.nome : "",
        sobrenome: this.usuarioInfo ? this.usuarioInfo.sobrenome : "",
        email: this.usuarioInfo ? this.usuarioInfo.email : "",
        curso: this.usuarioInfo ? this.usuarioInfo.curso : "",
      },
      error_message: "",
    };
  },
  methods: {
    closePopUp() {
      this.$emit("close-popup");
    },

    async submitForm() {
      if (this.verificarInputs()) {
        if (!(await this.verificaExistencia(this.form.email))) {
          try {
            const usuarioAtualizado = {
              matricula: this.usuarioInfo.matricula,
              nome: this.form.nome,
              sobrenome: this.form.sobrenome,
              email: this.form.email,
              foto_url: this.form.foto_url,
              curso: this.form.curso,
            };
            await editarDadosPerfil(usuarioAtualizado);
            sessionStorage.setItem("foto_perfil", usuarioAtualizado.foto_url);
            this.$emit("dados-atualizados", usuarioAtualizado);
            this.closePopUp();
          } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
          }
        } else {
          this.error_message = "Esse email já existe! Escolha outro email.";
        }
      } else return;
    },

    async verificaExistencia(email) {
      const usuarios = await getUsuarios();
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email && this.usuarioInfo.email != email)
          return true;
      }
      return false;
    },

    verificarInputs() {
      if (!verificarEmail(this.form.email)) {
        this.error_message = "Insira um email válido.";
        return false;
      }
      if (!verificarUrl(this.form.foto_url)) {
        this.error_message = "Insira uma url de foto válida";
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-family: "Open Sans", sans-serif;
  font-size: 3rem;
  color: #0a745b;
}
.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding-top: 40px;
  padding-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}
form {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-group {
  width: 90%;
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-family: "Open Sans", sans-serif;
  font-size: 1.4rem;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: solid 1px #c9c9c9;
  border-radius: 10px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
}
.buttons {
  display: flex;
  width: 90%;
  justify-content: space-between;
}
button {
  cursor: pointer;
  border: none;
  width: 48%;
  display: flex;
  padding: 8px 0px 6px 0;
  border-radius: 6px;
  background-color: #0a745b;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4rem;
  font-family: "Open Sans", sans-serif;
  transition: 100ms;
}

.error-message {
  font-family: "Open Sans", sans-serif;
  margin-top: 20px;
  font-size: 1.6rem;
}

.cancelar {
  border: none;
  width: 48%;
  display: flex;
  padding: 8px 0px 6px 0;
  border-radius: 6px;
  background: none;
  align-items: center;
  justify-content: center;
  color: #0a745b;
  border: solid 1px #0a745b;
  font-size: 1.4rem;
  font-family: "Open Sans", sans-serif;
  transition: 100ms;
}
.cancelar:hover {
  background: none;
}
button:hover {
  background: #075543;
}
</style>
