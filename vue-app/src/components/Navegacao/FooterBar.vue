<template>
  <div class="footer-div">
    <footer class="container">
      <div class="footer">
        <a href="/landingPage" class="footer-logo-a">AvaliaUnB</a>
        <a class="sub-texto">Avalie, inspire, aprimore.</a>
      </div>

      <img
        src="../../assets/images/logo_externa/logo_externa_github.svg"
        class="ghpage"
        href="https://unb-mds.github.io/2024-1-squad04/"
        alt="GitHubPage"
      />
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterBaar",
};
</script>

<style scoped>
.container {
  display: flex;
  flex: 1;
  justify-content: flex-start;
  max-width: 2000px;
}

.ghpage {
  margin-left: 5%;
  width: 3%;
  padding: 0;
}

.footer-div {
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: #f0f0f0;
  width: 100vw;
  height: auto;
  display: flex;
  align-items: center;
}
.footer {
  display: grid;
  margin-left: 3.7vw;
}
.footer-logo-a {
  font-size: 4rem;
  font-family: "Open Sans", sans-serif;
  color: #102c46;
  text-decoration: none;
  font-weight: 900;
}

.sub-texto {
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  color: #969696;
}

@media screen and (max-width: 800px) {
  .footer-div {
    display: none;
  }
}
</style>
