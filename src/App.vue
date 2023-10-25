<template>
  <SearchBar />
  <main>
    <router-view />
  </main>

  <Loading v-if="IsLoading" />
</template>

<script>
import { mapState, mapActions } from "vuex";
// 컴포넌트 import
import SearchBar from "./components/SearchBar.vue";
import Loading from "./components/Loading.vue";
export default {
  name: "App",
  components: {
    SearchBar,
    Loading,
  },
  computed: {
    ...mapState("MainModule", ["IsLoading"]),
  },
  methods: {
    ...mapActions("MainModule", ["fetchSearchMovie"]),
  },
  mounted() {
    this.fetchSearchMovie();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  letter-spacing: -0.05em;
}

html {
  font-size: 62.5%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

section {
  max-width: 1300px;
  margin: 0 auto;
}

a,
button {
  color: #000;
}

button,
input,
select {
  box-sizing: border-box;
  border: 0;
}

input,
button {
  box-sizing: border-box;
}

input,
select {
  background-color: #fff;
  outline: none;
}

main {
  padding-top: 69px;
}

button {
  background-color: transparent;
  cursor: pointer;
}

.content-box {
  overflow: hidden;
}

.scr-box {
  padding: 40px 0 25px;
  overflow-x: auto;
}

.card-list {
  display: flex;
  gap: 0 25px;
}
</style>
