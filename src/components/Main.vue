<template>
  <MainVisual />
  <MainNowPlaying />
  <MainTrailer />
  <MainPopular />
  <MainTrending />
  <MainTopRated />
</template>

<script>
//컴포넌트 import
import MainVisual from "./main-component/MainVisualSection.vue";
import MainTrending from "./main-component/MainTrendingSection.vue";
import MainNowPlaying from "./main-component/MainNowPlayingSection.vue";
import MainTrailer from "./main-component/MainTrailer.vue";
import MainPopular from "./main-component/MainPopularSection.vue";
import MainTopRated from "./main-component/MainTopRatedSection.vue";
import { mapActions } from 'vuex';
export default {
  name: "Main",
  components: {
    MainVisual,
    MainNowPlaying,
    MainTrending,
    MainTrailer,
    MainPopular,
    MainTopRated,
  },
  methods: {
    ...mapActions('MovieModule',["fetchMainMovies"]),
  },
  async created() {
    //Main 컴포넌트 컨텐츠 세팅 데이터 fetch
    await this.fetchMainMovies();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/main.scss";
</style>
