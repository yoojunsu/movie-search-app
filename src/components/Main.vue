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

  <!-- 최신상영작 추천 예고편 -->
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
          
        </div>
        <ul class="sub-video-list">
          <li></li>
        </ul>
      </div>
    </div>
  </section>
  <!-- ...최신상영작 추천 예고편 -->

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
      "NowPlayingTopTrailer",
      "MainRandomVisualBg",
      "Genre",
    ]),
  },
  methods: {
    ...mapMutations("MovieModule", ["setMainVisualRandomBg"]),
    ...mapActions("MovieModule", ["fetchMainMovies"]),

    //메인 최상단 비주얼 bg 영화 backdrop random 출력
    randomVisualBg() {
      const mainRandomVisualImagePath =
        this.PopularMovies[
          Math.floor(Math.random() * this.PopularMovies.length)
        ].backdrop_path;
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
.main-search-section {
  background-color: #00baff;
  background-size: cover;
  background-position: center;
  max-width: 1300px;
  height: 350px;
  margin: 0 auto;
  transition: background-image 0.3s;

  .section-inner {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    padding: 0 25px;
  }

  h2,
  h3 {
    color: #fff;
  }

  .tit-wrap {
    margin-bottom: 30px;

    h2 {
      font-size: 4rem;
    }

    h3 {
      font-size: 3rem;
    }
  }

  .search-wrap {
    border-radius: 50px;
    box-shadow: 0 7px 8px rgba(0, 0, 0, 0.4);
    width: 100%;
    position: relative;
    overflow: hidden;

    input {
      padding: 15px 125px 15px 25px;
      width: 100%;
    }

    button {
      background: linear-gradient(
        90deg,
        rgba(255, 242, 0, 1) 0%,
        rgba(255, 255, 255, 1) 87%
      );
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      max-width: 100px;

      i {
        font-size: 2.3rem;
      }
    }
  }
}

.content-section {
  padding: 60px 0;

  .btn-wrap {
    display: flex;
    border: 1px solid #000;
    border-radius: 50px;
    max-width: 230px;
    overflow: hidden;

    button {
      font-size: 1.5rem;
      width: 100%;
      padding: 7px 0;
      text-align: center;

      &.active {
        background-color: #00baff;
        color: #fff;
        font-weight: 600;
      }
    }
  }
}

.trailer-section {
  padding: 50px 0;
  background-size: cover;
  background-position: center;
  
}

.section-tit {
  font-size: 4rem;
  color: #000;
  margin-bottom: 30px;
}

.card {
  min-width: 200px;
  text-align: center;

  .info-wrap {
    h4 {
      font-size: 1.8rem;
      letter-spacing: -0.05em;
      margin: 20px 0 10px;
    }

    span {
      font-size: 1.6rem;
      color: #ccc;
    }
  }

  .vote-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
    border: 2px solid #00baff;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    position: absolute;
    top: -15px;
    right: -10px;

    b {
      color: #fff;
      font-size: 1.3rem;
    }
  }
}

.poster-wrap {
  width: 100%;
  height: 0;
  padding-bottom: calc(270 / 200 * 100%);
  position: relative;

  img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
  }
}
</style>
