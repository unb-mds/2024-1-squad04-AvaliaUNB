<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
html {
  font-size: 65%;
}
body {
  margin: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

@media screen and (max-width: 1500px) {
  html {
    font-size: 58%;
  }
}

@media screen and (max-width: 1266px) {
  html {
    font-size: 55%;
  }
}

@media screen and (max-width: 900px) {
  html {
    font-size: 50%;
  }
}

@media screen and (max-width: 650px) {
  html {
    font-size: 40%;
  }
}
</style>
