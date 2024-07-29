<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <div class="popup-div">
        <div class="materia-nome">{{ materia.nome_materia }}</div>
      </div>

      <form class="form-items" @submit.prevent="SubmitAvaliacaoMaterias">
        <div class="inputs">
          <div class="rating-stars-div">
            <ratingStars @avaliacao-atualizada="handle" />
          </div>

          <div class="camp-txt">
            <textarea
              v-model="comentario"
              placeholder="Escreva seu comentário"
              maxlength="250"
              class="comentario"
            />
          </div>
        </div>
        <p v-if="erro" class="error-message">{{ erro }}</p>
        <div class="btn-container">
          <button type="submit" class="send-btn">
            <LoadingComponent
              class="loading"
              v-if="loading"
              :isLoading="loading"
            />
            <span v-if="!loading">Enviar</span>
          </button>
          <button
            type="button"
            class="close-btn"
            @click="() => TogglePopup('buttonTrigger')"
            required
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
let nota_exp, nota_dif;
import { enviarAvaliacaoMateria } from "@/repositories/materias/enviarAvaliacaoMateria";
import ratingStars from "./RatingStarsMaterias.vue";
import { getUsuarioLogado } from "@/generals/getUsuarioLogado";
import { getUsuarios } from "@/repositories/usuario/obterUsuarios";
import { descriptarDados } from "@/generals/descriptografarDados";
import { encriptarDados } from "@/generals/encripitarDados";
import LoadingComponent from "../Navegacao/LoadingComponent.vue";
import verificarPalvrao from "@/generals/verificarPalavrao";
//matricula-int, cod_prof-char, materia-char, resto-int

export default {
  name: "PopUp",
  components: {
    ratingStars,
    LoadingComponent,
  },
  props: {
    TogglePopup: Function,
    materia: Object,
  },
  methods: {
    async SubmitAvaliacaoMaterias() {
      this.loading = true;
      if (isNaN(nota_exp) || isNaN(nota_dif)) {
        this.loading = false;
        this.erro = "Preencha todas as avaliações antes de enviar!";
        return;
      }
      try {
        // carisma no banco vai ser metodo de ensino pq vai dar mt t  rabalho pra mudar o nome
        const matriculaLogadaStr = await getUsuarioLogado();
        const matriculaLogada = parseInt(matriculaLogadaStr, 10);
        const usuarios = await getUsuarios();
        this.erro = "";
        if (verificarPalvrao(this.comentario)) {
          this.erro = "Não insira palavrões em nenhum dos campos!";
          this.loading = false;
          return;
        }
        for (let i = 0; i < usuarios.length; i++) {
          if (matriculaLogada === usuarios[i].matricula) {
            let materiasAvaliadas = await descriptarDados(
              sessionStorage.getItem("materias_avaliadas")
            );
            for (let i = 0; i < materiasAvaliadas.length; i++) {
              if (
                materiasAvaliadas[i].cod_materia === this.materia.cod_materia
              ) {
                this.loading = false;
                return (this.erro = "Você ja avaliou essa materia");
              }
            }
            materiasAvaliadas = [
              ...materiasAvaliadas,
              { cod_materia: this.materia.cod_materia },
            ];
            sessionStorage.setItem(
              "materias_avaliadas",
              await encriptarDados(materiasAvaliadas)
            );
            await enviarAvaliacaoMateria(
              nota_dif,
              nota_exp,
              this.comentario,
              matriculaLogada,
              this.materia.cod_materia
            );
            this.loading = false;
            this.TogglePopup();
            location.reload();
            return;
          }
        }
        this.erro = "Você precisa logar para avaliar!";
      } catch (error) {
        this.erro = "Erro ao enviar avaliação, tente novamente!";
      }
    },
    handle(avaliacao) {
      nota_exp = parseInt(avaliacao.notaExperiencia);
      nota_dif = parseInt(avaliacao.notaDificuldade);
    },
  },
  data() {
    return {
      comentario: "",
      erro: "",
      loading: false,
    };
  },
};
</script>

<style scoped>
.loading {
  padding: 0 30px 0 0;
}
.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
}
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: hidden;
}
.popup-div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
}

.materia-nome {
  margin-left: 5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 3rem;
  color: rgb(32, 32, 32);
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  width: 100%;
}
.send-btn,
.close-btn {
  font-size: 1.8rem;
  color: #034939b9;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  border-radius: 10px;
  padding: 0.8rem 16% 0.8rem 16%;
  cursor: pointer;
  transition: all 0.4s;
  margin-right: 10px;
}
.send-btn {
  background-color: #034939b9;
  color: white;
  border: none;
}
.close-btn {
  border: 1px solid black;
  background-color: white;
}

.close-btn:hover,
.send-btn:hover {
  transform: scale(1.025);
}
.btn-container {
  margin-top: 3vh;
  margin-bottom: 1vh;
  display: flex;
  gap: 0.5vw;
  justify-content: center;
  width: 100%;
}

.rating-stars-div {
  display: flex;
  justify-content: center;
}

.popup-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 25px 25px 25px 25px;
  height: fit-content;
  width: 95vw;
  max-width: 500px;
  border-radius: 20px;
}

.comentario {
  width: 80vw;
  max-width: 350px;
  height: 6vh;
  font-size: 1.3rem;
  border-radius: 10px;
  background-color: #f5f5f5;
  margin-right: 10px;
  color: #333;
  padding: 1rem;
  font-family: "Inter", sans-serif;
  outline: none;
  resize: none;
  transition: 0.3s;
}

.comentario:hover {
  transition: 0.3s;
  border-color: #1b5994;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.comentario:focus {
  border-color: #1b5994;
}
</style>
