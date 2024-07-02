<template>
  <div class="card-top-rest" v-if="materia">
    <div class="profile-picture-name">
      <h3 class="number">{{ position }}</h3>
      <div class="picture-name">
        <h3 class="name">
          {{ materia.cod_materia }} - {{ materia.nome_materia }}
        </h3>
      </div>
    </div>

    <div class="rating">
      <img class="star" src="../../assets/icons/avaliacao/icone-estrela.svg" />
      <p class="rate">{{ materia.nota_media_total }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardMateriaRankingComponent",
  props: {
    materia: Object,
    position: Number,
  },
};
</script>

<style scoped>
.card-top-rest {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(153, 153, 153, 0.2) 100%
  );
  margin-bottom: 10px;
  border-radius: 10px;
}

.profile-picture-name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0 20px 0px;
  gap: 20px;
  padding-left: 40px;
  width: 90%;
}

.picture-name {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.name {
  font-family: "Open Sans", sans-serif;
  color: #f0f0f0;
  font-size: 1.8rem;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  width: 100%;
}

.number {
  font-family: "Open Sans", sans-serif;
  color: #f0f0f0;
  font-size: 2rem;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  padding-right: 40px;
  gap: 3%;
}

.star {
  width: 15%;
  height: auto;
}

.rate {
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  color: #c4c4c4;
  margin: 0;
}
</style>
