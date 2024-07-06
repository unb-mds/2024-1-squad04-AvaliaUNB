<template>
  <div class="comment-card">
    <div class="card-header">
      <div class="professor-info">
        <img
          :src="verificarUrlUsuario(avaliacao.usuario.foto_url)"
          @error="carregarImgAlternativa"
          alt="Foto de Perfil"
          class="foto-user"
        />
        <p class="user-name">{{ avaliacao.usuario.nome_usuario }}</p>
      </div>
    </div>

    <div class="five-estrelas" v-if="avaliacao">
      <svg
        v-for="(starClass, index) in getStarClassMateria(
          avaliacao.nota_total / 2
        )"
        :key="index"
        alt=""
        class="estrela"
        :class="starClass"
        width="112"
        height="104"
        viewBox="0 0 112 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M63.7069 15.1759L71.8732 30.3947C72.9868 32.5132 75.9564 34.5453 78.462 34.9344L93.2634 37.2259C102.729
 38.6959 104.956 45.0947 98.1354 51.4071L86.6283 62.1294C84.6795 63.9453 83.6123 67.4474 84.2155 69.955L87.5099 
 83.2282C90.1083 93.7344 84.1227 97.7985 74.1468 92.3077L60.2733 84.655C57.7678 83.2715 53.6382 83.2715 51.0862
  84.655L37.2127 92.3077C27.2832 97.7985 21.2513 93.6912 23.8497 83.2282L27.144 69.955C27.7472 67.4474 26.68
   63.9453 24.7313 62.1294L13.2242 51.4071C6.44983 45.0947 8.63061 38.6959 18.0961 37.2259L32.8976 
   34.9344C35.3568 34.5453 38.3263 32.5132 39.4399 30.3947L47.6063 15.1759C52.0606 6.91794 59.2989
    6.91794 63.7069 15.1759Z"
          fill="#0a745b"
        />
      </svg>
    </div>

    <div class="comment-content" v-if="avaliacao.comentario !== ''">
      <p class="comment-text">"{{ avaliacao.comentario }}"</p>
    </div>
    <div class="reaction-buttons">
      <div
        class="reaction"
        @click="handleLike(avaliacao.cod_comentario, avaliacaoState.num_likes)"
      >
        <div
          class="like-button"
          :class="{ liked: isLiked(avaliacao.cod_comentario) }"
        >
          <svg
            width="20"
            height="20"
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
        <span class="like-count">{{ avaliacaoState.num_likes }}</span>
      </div>
      <div
        class="reaction"
        @click="
          handleDislike(avaliacao.cod_comentario, avaliacaoState.num_likes)
        "
      >
        <div
          class="deslike-button"
          :class="{
            disliked: isDisliked(avaliacao.cod_comentario),
          }"
        >
          <svg
            width="20"
            height="20"
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
        </div>
        <span class="deslike-count">{{ avaliacaoState.num_dislikes }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { descriptarDados } from "@/generals/descriptografarDados";
import { verificacaoCurtida } from "@/service/comentario/curtirComentarioMateria";
import { verificacaoDislike } from "@/service/comentario/descurtirComentarioMateria";
export default {
  name: "AvaliacaoMateria",
  props: {
    avaliacao: Object,
  },

  data() {
    return {
      avaliacaoState: this.avaliacao,
      comentariosCurtidos: [],
      isLikeDislikeInProgress: false,
    };
  },

  methods: {
    getStarClassMateria(nota_total) {
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
    async handleLike(cod_comentario) {
      if (this.isLikeDislikeInProgress) return;

      this.isLikeDislikeInProgress = true;

      try {
        const comentariosDescriptografados = await descriptarDados(
          sessionStorage.getItem("likes_dislikes_materias")
        );
        const result = await verificacaoCurtida(
          comentariosDescriptografados,
          cod_comentario
        );
        this.avaliacaoState.num_likes += result.num_likes;
        this.avaliacaoState.num_dislikes += result.num_dislikes;

        await this.getComentariosCurtidosPeloUsuario();
      } catch (error) {
        console.error("Erro ao processar like:", error);
      } finally {
        this.isLikeDislikeInProgress = false;
      }
    },
    async handleDislike(cod_comentario) {
      if (this.isLikeDislikeInProgress) return;

      this.isLikeDislikeInProgress = true;

      try {
        const comentariosDescriptografados = await descriptarDados(
          sessionStorage.getItem("likes_dislikes_materias")
        );
        const result = await verificacaoDislike(
          comentariosDescriptografados,
          cod_comentario
        );
        this.avaliacaoState.num_likes += result.num_likes;
        this.avaliacaoState.num_dislikes += result.num_dislikes;

        await this.getComentariosCurtidosPeloUsuario();
      } catch (error) {
        console.error("Erro ao processar dislike:", error);
      } finally {
        this.isLikeDislikeInProgress = false;
      }
    },

    async getComentariosCurtidosPeloUsuario() {
      return (this.comentariosCurtidos = await descriptarDados(
        sessionStorage.getItem("likes_dislikes_materias")
      ));
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
  mounted() {
    this.getComentariosCurtidosPeloUsuario();
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
  background-color: #ffffff21;
  border-radius: 14px;
  padding: 30px;
  margin-bottom: 20px;
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
}

.professor-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;
  gap: 20px;
}
.foto-user {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 5rem;
}

.professor-texts {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  flex-direction: column;
}

.professor {
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
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
  font-weight: 300;
  color: #f7f7f7a4;
}

.reaction-buttons {
  display: flex;
  justify-content: flex-start; /* Alterado para flex-start */
  align-items: center;
}
svg {
  height: fit-content;
}
.reaction {
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-right: 10px; /* Adicionando um espaço entre os botões */
}

.user-name {
  font-family: "Open Sans", sans-serif;
  font-size: 2.4rem;
  margin: 0;
  font-weight: 600;
  color: rgb(242, 242, 242, 0.9);
  text-transform: capitalize;
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

.like-button svg path,
.deslike-button svg path {
  fill: none;
  stroke: #ffffff8f;
}

.like-count,
.deslike-count {
  margin-left: 5px;
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  color: #ffffffa9;
  font-weight: lighter;
}

.full-star {
  filter: none;
}

.full-star path,
.partial-star path {
  fill: rgb(245, 255, 112);
}

.partial-star {
  filter: none;
  -webkit-mask-image: linear-gradient(to left, transparent 40%, black 60%);
  opacity: 1;
}

.empty-star {
  filter: invert(50%) opacity(30%);
}

.like-button.liked svg path {
  fill: #ffffff;
  stroke: none; /* Muda a cor do ícone de "like" para verde quando curtido */
}

.deslike-button.disliked svg path {
  fill: #ffffff;
  stroke: none; /* Muda a cor do ícone de "like" para verde quando curtido */
}

.rotated {
  transform: rotate(180deg);
}
</style>
