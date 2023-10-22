<template>
  <!-- 검색 영역 -->
  <section
    class="main-search-section"
    :style="{ backgroundImage: `url('${MainRandomVisualBg}')` }"
  >
    <div class="section-inner">
      <div class="tit-wrap">
        <h2>WELCOME</h2>
        <h3>Search for movies you want</h3>
      </div>
      <div class="search-wrap">
        <input
          type="text"
          name=""
          id=""
          placeholder="영화,TV 프로그램 등 검색..."
        />
        <button type="button" id="searchBtn">
          <i class="xi-search"></i>
        </button>
      </div>
    </div>
  </section>
  <!-- ...검색영역 -->

  <!-- 최신상영작 리스트 -->
  <section class="content-section nowplaying-section">
    <div class="section-inner">
      <h3 class="section-tit">Now Playing!</h3>
      <div class="content-box">
        <div class="scr-box">
          <ul class="card-list">
            <li
              class="card"
              v-for="(nowPlayingMovie, i) in NowPlayingMovies"
              :key="i"
            >
              <div class="poster-wrap">
                <img
                  :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${nowPlayingMovie.poster_path}`"
                  alt=""
                />

                <div class="vote-wrap">
                  <b>
                    {{ nowPlayingMovie.vote_average }}
                  </b>
                </div>
              </div>
              <div class="info-wrap">
                <h4>
                  {{ nowPlayingMovie.title }}
                </h4>
                <span>
                  {{ nowPlayingMovie.release_date }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- ...최신 상영작 리스트 -->

  <!-- 추천 예고편 -->
  <section 
  class="trailer-section" 
  :style="{ backgroundImage: NowPlayingMovies.length > 0 ? `url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,000,ff4300)${NowPlayingMovies[0].backdrop_path}')` : 'none' }">
    <div class="section-inner">
      <div class="tit-wrap">
        <h3>Recent Trailer</h3>
        <h4>
          {{ NowPlayingMovies.length > 0 ? NowPlayingMovies[0].title : "" }}
        </h4>
      </div>
      <div class="video-content-wrap">
        <div class="main-video-content">
          <iframe 
          :src="`https://www.youtube.com/embed/${(NowPlayingTrailers[ActiveTrailerIdx]) ? NowPlayingTrailers[ActiveTrailerIdx].key : ''}`" 
          frameborder="0"> </iframe>
          
          <h5>
            {{ (NowPlayingTrailers[ActiveTrailerIdx]) ? NowPlayingTrailers[ActiveTrailerIdx].name : '' }}
          </h5>
        </div>
        <div class="content-box">
          <div class="scr-box">
            <ul class="sub-video-list">
              <li class="card" v-for="(trailer,i) in NowPlayingTrailers" :key="i" :class="{active: i === ActiveTrailerIdx}" @click="changeMainMovieTrailer(i)">
                <div class="thumb">
                  <img :src="`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`" :alt="trailer.name">
                </div>
                <h5>
                  {{ trailer.name }}
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ...추천 예고편 -->

  <!-- 최고점수 영화 리스트 -->
  <section class="content-section toprated-section">
    <div class="section-inner">
      <h3 class="section-tit">TopRated!</h3>
      <div class="btn-wrap">
        <button type="button" :class="{ active: Genre === 'movie' }">MOVIE</button>
        <button type="button" :class="{ active: Genre === 'tv' }">TV</button>
      </div>
      <div class="content-box">
        <div class="scr-box">
          <ul class="card-list">
            <li
              class="card"
              v-for="(topRatedMovie, i) in TopRatedMovies"
              :key="i"
            >
              <div class="poster-wrap">
                <img
                  :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${topRatedMovie.poster_path}`"
                  alt=""
                />

                <div class="vote-wrap">
                  <b>
                    {{ topRatedMovie.vote_average }}
                  </b>
                </div>
              </div>
              <div class="info-wrap">
                <h4>
                  {{ topRatedMovie.title }}
                </h4>
                <span>
                  {{ topRatedMovie.release_date }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- ...최고점수영화 리스트 -->

  <!-- 인기영화 리스트 -->
  <section class="content-section popular-section">
    <div class="section-inner">
      <h3 class="section-tit">What's Popular!</h3>
      <div class="btn-wrap">
        <button type="button" :class="{ active: Genre === 'movie' }">MOVIE</button>
        <button type="button" :class="{ active: Genre === 'tv' }">TV</button>
      </div>
      <div class="content-box">
        <div class="scr-box">
          <ul class="card-list">
            <li
              class="card"
              v-for="(popularMovie, i) in PopularMovies"
              :key="i"
            >
              <div class="poster-wrap">
                <img
                  :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${popularMovie.poster_path}`"
                  alt=""
                />

                <div class="vote-wrap">
                  <b>
                    {{ popularMovie.vote_average }}
                  </b>
                </div>
              </div>
              <div class="info-wrap">
                <h4>
                  {{ popularMovie.title }}
                </h4>
                <span>
                  {{ popularMovie.release_date }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- ...인기영화 리스트 -->
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "Main",
  computed: {
    ...mapState("MovieModule", [
      "NowPlayingMovies",
      "PopularMovies",
      "TopRatedMovies",
      "NowPlayingTrailers",
      "ActiveTrailerIdx",
      "MainRandomVisualBg",
      "Genre",
    ]),
  },
  methods: {
    ...mapMutations("MovieModule", ["setMainVisualRandomBg","changeMainMovieTrailer"]),
    ...mapActions("MovieModule", ["fetchMainMovies"]),

    //메인 최상단 비주얼 bg 영화 backdrop random 출력
    randomVisualBg() {
      const mainRandomVisualImagePath = this.PopularMovies[Math.floor(Math.random() * this.PopularMovies.length)].backdrop_path;
      const mainRandomVisualImageOptions ="w1920_and_h600_multi_faces_filter(duotone,000,00baff)";
      const mainRandomVisualImageUrl = `https://image.tmdb.org/t/p/${mainRandomVisualImageOptions}${mainRandomVisualImagePath}`;
      this.setMainVisualRandomBg(mainRandomVisualImageUrl);
    },
  },

  async created() {
    //Main 컴포넌트 컨텐츠 세팅 데이터 fetch
    await this.fetchMainMovies();

    this.randomVisualBg();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/main.scss";
</style>
