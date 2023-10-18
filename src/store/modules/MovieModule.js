import axios from "axios";

const key = process.env.VUE_APP_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";
const state = {
  Genre: "movie",
  PopularMovies: [],
  TopRatedMovies: [],
  UpcomingMovies: [],
  NowPlayingMovies: [],
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
  //메인화면 Movies 셋팅
  setMainMovies(
    state,
    { popularData, topRatedData, upcomingData, nowPlayingData }
  ) {
    state.PopularMovies = popularData;
    state.TopRatedMovies = topRatedData;
    state.UpcomingMovies = upcomingData;
    state.NowPlayingMovies = nowPlayingData;
  },

  //메인화면 visual randomBg state셋팅
  setMainVisualRandomBg(state, randomBgData) {
    state.MainRandomVisualBg = randomBgData;
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
      const popularResponce = await axios.get(`${apiUrl}/movie/popular`, {
        params: {
          api_key: key,
          page: "1",
        },
      });
      const topRatedResponce = await axios.get(`${apiUrl}/movie/top_rated`, {
        params: {
          api_key: key,
          page: "1",
        },
      });
      const upcomingResponce = await axios.get(`${apiUrl}/movie/upcoming`, {
        params: {
          api_key: key,
          page: "1",
        },
      });

      const nowPlayingResponce = await axios.get(
        `${apiUrl}/movie/now_playing`,
        {
          params: {
            api_key: key,
            page: "1",
          },
        }
      );

      commit("setMainMovies", {
        popularData: popularResponce.data.results,
        topRatedData: topRatedResponce.data.results,
        upcomingData: upcomingResponce.data.results,
        nowPlayingData: nowPlayingResponce.data.results,
      });
      console.log(popularResponce.data.results);
    } catch (err) {
      console.log(err);
    }
  },

  //Main 화면 장르변경 후 API 통신 actions - 추가작업 시작점
  async fetchGenreUpdate() {},
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
