<template>
  <div class="profile-wraper">
    <div class="card-profile">
      <LoadingComponent class="loading" v-if="loading" :isLoading="loading" />
      <img
        v-if="!loading"
        src="../assets/icons/navegacao/back_arrow.svg"
        alt="back-arrow"
        class="back-arrow"
        @click="back"
      />
      <div v-if="!loading" class="profile-picture-and-profile-name">
        <div class="profile-picture-wraper">
          <img
            :src="verificarUrl(userInfo.foto_url)"
            @error="carregarImgAlternativa"
            alt="Profile-img"
            class="profile-picture"
          />
        </div>
        <div class="profile-name-and-profile-course">
          <h2 class="profile-name">{{ userInfo.nome }}</h2>
          <p class="profile-course">{{ userInfo.curso }}</p>
        </div>
      </div>
      <div v-if="!loading" class="quantity-avaliations">
        <div class="professor-avaliations">
          <h2 class="quantity-professor">
            {{ userInfo.quantidade_professores_avaliados }}
          </h2>
          <p>Professores avaliados</p>
        </div>
        <div class="course-avaliations">
          <h2 class="quantity-course">
            {{ userInfo.quantidade_materias_avaliadas }}
          </h2>
          <p>Matérias avaliadas</p>
        </div>
      </div>
      <div v-if="!loading" class="infos">
        <h2>Meus dados</h2>
        <div class="data">
          <p><span>Email:</span> {{ userInfo.email }}</p>
          <p><span>Matrícula:</span> {{ userInfo.matricula }}</p>
          <p><span>Universidade:</span> UNB Faculdade do Gama</p>
        </div>
      </div>
      <div v-if="!loading" class="log-out-and-edit">
        <button class="edit" @click="togglePopUpEdit">Editar</button>
        <button class="log-out" @click="handleLogOut">
          <img src="../assets/icons/perfil/log-out-icon.svg" alt="" />Log-out
        </button>
      </div>
    </div>
    <PopUpEdicaoPerfil
      v-if="togglePopUp"
      @close-popup="togglePopUpEdit"
      @dados-atualizados="atualizarDadosUsuario"
      :usuarioInfo="userInfo"
    />
  </div>
</template>

<script>
import { getInfoUserProfileService } from "@/service/usuario/getInfoUserProfile";
import PopUpEdicaoPerfil from "@/components/Usuario/PopUpEdicaoPerfil.vue";
import router from "../routes/index";
import LoadingComponent from "@/components/Navegacao/LoadingComponent.vue";

export default {
  components: {
    PopUpEdicaoPerfil,
    LoadingComponent,
  },
  name: "ProfilePage",
  data() {
    return {
      userInfo: {},
      togglePopUp: false,
      loading: true,
    };
  },

  methods: {
    back() {
      router.go(-1);
    },
    handleLogOut() {
      sessionStorage.removeItem("matricula");
      sessionStorage.removeItem("foto_perfil");
      sessionStorage.removeItem("professores_avaliados");
      sessionStorage.removeItem("materias_avaliadas");
      sessionStorage.removeItem("likes_dislikes_materias");
      sessionStorage.removeItem("likes_dislikes_professores");
      window.location.reload();
    },
    togglePopUpEdit() {
      this.togglePopUp = !this.togglePopUp;
    },
    verificarUrl(url_profile_picture) {
      if (url_profile_picture === "" || url_profile_picture === null) {
        return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
      }
      return url_profile_picture;
    },
    atualizarDadosUsuario(dadosAtualizados) {
      this.userInfo = { ...this.userInfo, ...dadosAtualizados };
    },
    carregarImgAlternativa(event) {
      event.target.src =
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
    },
  },
  mounted() {
    this.loading = true;
    getInfoUserProfileService()
      .then((userInfo) => {
        this.userInfo = userInfo;
        this.loading = false;
      })
      .catch((erro) => {
        console.error("Erro ao obter meus dados", erro);
      });
  },
};
</script>

<style scoped>
.loading {
  padding: 250px 0px 250px 0px;
}
.profile-wraper {
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: white;
  height: 100vh;
  min-height: fit-content;
}

.card-profile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  max-width: 700px;
  height: fit-content;
  background-color: rgb(245, 245, 245);
  border-radius: 40px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.055);
  gap: 5vh;
}

.back-arrow {
  cursor: pointer;
  position: absolute;
  top: 50px;
  left: 50px;
  width: 2rem;
}

.profile-picture-and-profile-name {
  width: 80%;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.profile-picture-wraper {
  padding: 2.4px;
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  background: rgb(8, 54, 80);
  background: linear-gradient(150deg, #1b5994 40%, #0a745b 60%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.profile-name-and-profile-course {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.profile-name {
  font-family: "Open Sans", sans-serif;
  font-size: 3.4rem;
  font-weight: 700;
  color: #0a745b;
  margin: 0;
}

.profile-course {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  color: #474747;
  margin: 5px;
}

.quantity-avaliations {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.professor-avaliations {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border-right: solid 1px #47474760;
}

.course-avaliations {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.quantity-professor,
.quantity-course {
  font-family: "Open Sans", sans-serif;
  font-size: 2.4rem;
  font-weight: 600;
  color: #0a745b;
  margin: 0;
}

.quantity-avaliations p {
  font-family: "Open Sans", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: #474747;
  margin: 5px;
}

.infos {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 3vh;
}

.data {
  display: flex;
  flex-direction: column;
}

.infos h2 {
  font-family: "Open Sans", sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #525252;
  margin: 0;
}

.infos span {
  font-family: "Open Sans", sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #8a8a8a;
  margin-top: 5px;
}

.infos p {
  font-family: "Open Sans", sans-serif;
  font-size: 1.8rem;
  font-weight: 500;
  color: #646464;
  margin-top: 5px;
}

.log-out-and-edit {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.log-out {
  width: 48%;
  display: flex;
  padding: 14px 0px 14px 0;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: #0a745b;
  gap: 10px;
  font-size: 1.8rem;
  font-family: "Open Sans", sans-serif;
  background: none;
  border: solid 1px #0a745b;
  cursor: pointer;
}

.log-out img {
  width: 2rem;
}

.edit {
  cursor: pointer;
  border: none;
  width: 48%;
  display: flex;
  padding: 14px 0px 14px 0;
  border-radius: 10px;
  background-color: #0a745b;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  font-family: "Open Sans", sans-serif;
}
</style>
