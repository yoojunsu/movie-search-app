import axios from "axios";

const key = process.env.VUE_APP_API_KEY;

const state = {
    PopularMovies: [],
    TopRatedMovies: [],
    UpcomingMovies: [],
    SearchMovies: [],
    MovieId: "",
    SearchQuery: "슬램덩크",
    IsLoading: false,
}

const mutations = {
    //메인화면 Movies 셋팅
    setMainMovies(state, {popularData, topRatedData, upcomingData}) {
        state.PopularMovies = popularData;
        state.TopRatedMovies = topRatedData;
        state.UpcomingMovies = upcomingData;
    },

    //검색 Movies 셋팅
    setSearchMovies(state, SearchMovieData) {
        state.SearchMovies = SearchMovieData;
    }
};

const actions = {

    //Main화면에 노출될 Moviex 데이터 Main화면 컨텐츠 state에 기입
    async fetchMainMovies({commit}) {
        try {
            const popularResponce = await axios.get('https://api.themoviedb.org/3/movie/popular');
            const topRatedResponce = await axios.get('https://api.themoviedb.org/3/movie/top_rated');
            const upcomingResponce = await axios.get('https://api.themoviedb.org/3/movie/upcoming');

            commit('setMainMovies',{
                popularData: popularResponce.data.results,
                topRatedData: topRatedResponce.data.results,
                upcomingData: upcomingResponce.data.results,
            });
            
        } catch (err) {
            console.log(err);
        }
    },
    //SearchMovie 데이터 SearchMovies state에 기입
    async fetchSearchMovie({ state,commit }) {
        try {
            const responce = await axios.get('https://api.themoviedb.org/3/search/movie',{
                params: {
                    api_key: key,
                    query: state.SearchQuery
                }
            });

            commit('settingMovies',responce.data.results);
        } catch(err) {
            console.log(err);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}