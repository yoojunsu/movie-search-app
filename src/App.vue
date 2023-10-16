<template>
  <router-view />

  <Loading />
</template>

<script>
// loading 화면 컴포넌트 import
import Loading from "./components/Loading.vue";
export default {
  name: 'App',
  components: {
    Loading,
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>