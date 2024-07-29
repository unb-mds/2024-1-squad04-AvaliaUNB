<template>
  <div class="main-container">
    <div
      class="card-inner"
      @click="goToProfessorDetail(professor.cod_professor)"
    >
      <div class="professor-card">
        <div class="profile-picture-div">
          <img
            :src="verificarUrl(professor.foto_professor)"
            alt="foto-professor"
            class="profile-picture"
          />
        </div>

        <div class="professor-info">
          <h4 class="nome-professor">{{ professor.nome_professor }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "CardProfMateria",
  props: {
    professor: Object,
  },

  methods: {
    verificarUrl(urlProfessor) {
      if (urlProfessor === "https://sigaa.unb.br/sigaa/img/no_picture.png") {
        return "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png";
      }
      return urlProfessor;
    },
  },

  setup() {
    const router = useRouter();

    const goToProfessorDetail = (id) => {
      // console.log(id)
      router.push({ name: "paginaProfessor", params: { id: id } });
    };
    return {
      goToProfessorDetail,
    };
  },
};
</script>

<style scoped>
.nome-professor {
  text-align: left;
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  white-space: normal;
  color: #ffffffcc;
  margin-left: 1.5rem;
  font-weight: 400;
}
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
  padding: 1rem;
  border-radius: 8rem;
}

.card-inner {
  flex: 1 1 calc(33.333% - 40px); /* Three columns layout */
  display: flex;
  justify-content: center;
}

.professor-card:hover {
  transform: scale(1.025);
}

.professor-card {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.122);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.247);
  width: 100%;
  height: fit-content;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.professor-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 5rem;
}

.profile-picture-div {
  width: fit-content;
  padding: 0.3rem;
  height: fit-content;
  border-radius: 5rem;
  background: rgb(8, 54, 80);
  background: linear-gradient(150deg, #1b5994 40%, #0a745b 60%);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
