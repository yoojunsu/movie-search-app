import axios from "axios";

const key = process.env.VUE_APP_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";
const state = {
  Genre: "movie",
  PopularMovies: [],
  TopRatedMovies: [],
  NowPlayingMovies: [],
  NowPlayingTrailers: [],
  ActiveTrailerIdx: 0,
  MainRandomVisualBg: "",
  SearchMovies: [],
  MovieId: "",
  SearchQuery: "슬램덩크",
  IsLoading: false,
};

const mutations = {
  // 최초 장르 셋팅
  setGenre(state, payload) {
    state.Genre = payload;
  },
  //메인화면 Movies Data 셋팅
  setMainMovies( state, { nowPlayingData, topRatedData, popularData}) {
    state.NowPlayingMovies = nowPlayingData;
    state.PopularMovies = popularData;
    state.TopRatedMovies = topRatedData;
  },

  //메인화면 visual randomBg state셋팅
  setMainVisualRandomBg(state, randomBgData) {
    state.MainRandomVisualBg = randomBgData;
  },

  //메인 영화 예고편 데이터 셋팅 
  setMainMovieTrailers(state,trailersData) {
    state.NowPlayingTrailers = trailersData;
  },

  //메인 영화 예고편 상단 영상 idx state변경
  changeMainMovieTrailer(state,idx) {
    state.ActiveTrailerIdx = idx;
  },

  //검색 Movies 셋팅
  setSearchMovies(state, SearchMovieData) {
    state.SearchMovies = SearchMovieData;
  },
};

const actions = {
  //Main화면에 최초 노출될 Movie 데이터 Main화면 컨텐츠 state에 기입
  async fetchMainMovies({ commit }) {
    try {
      
      const nowPlayingResponse = await axios.get(`${apiUrl}/movie/now_playing`,{
        params: {
          api_key: key,
          page: "1",
          language: "ko",
        },
      }
    );

      const popularResponse = await axios.get(`${apiUrl}/movie/popular`, {
        params: {
          api_key: key,
          page: "1",
          language: "ko",
        },
      });

      const topRatedResponse = await axios.get(`${apiUrl}/movie/top_rated`, {
        params: {
          api_key: key,
          page: "1",
          language: "ko",
        },
      });

      //메인 영화 컨텐츠 최초 리스트 출력
      commit("setMainMovies", {
        nowPlayingData: nowPlayingResponse.data.results,
        topRatedData: topRatedResponse.data.results,
        popularData: popularResponse.data.results,
      });


      // 최신상영작 영화 예고편 비디오 리스트 출력
      const nowPlayingTrailerResponse = await axios.get(`${apiUrl}/movie/${state.NowPlayingMovies[0].id}/videos`, {
        params: {
          api_key: key,
        },
      });

      commit('setMainMovieTrailers',nowPlayingTrailerResponse.data.results);
      console.log(nowPlayingTrailerResponse.data.results);
    } catch (err) {
      console.log(err);
    }
  },

  //Main 화면 장르변경 후 API 통신 actions - 추가작업 시작점
  async fetchGenreUpdate() {
    
  },

  //SearchMovie 데이터 SearchMovies state에 기입
  async fetchSearchMovie({ state, commit }) {
    try {
      const responce = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: key,
            query: state.SearchQuery,
          },
        }
      );

      commit("setSearchMovies", responce.data.results);
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
