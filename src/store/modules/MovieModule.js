import axios from "axios";

const key = process.env.VUE_APP_API_KEY;
const apiUrl = 'https://api.themoviedb.org/3/movie/';
const state = {
    PopularMovies: [],
    TopRatedMovies: [],
    UpcomingMovies: [],
    NowPlayingMovies: [],
    MainRandomVisualBg: "",
    SearchMovies: [],
    MovieId: "",
    SearchQuery: "슬램덩크",
    IsLoading: false,
}

const mutations = {
    //메인화면 Movies 셋팅
    setMainMovies(state, {popularData, topRatedData, upcomingData, nowPlayingData}) {
        state.PopularMovies = popularData;
        state.TopRatedMovies = topRatedData;
        state.UpcomingMovies = upcomingData;
        state.NowPlayingMovies = nowPlayingData;
    },

    //메인화면 visual randomBg state셋팅
    setMainVisualRandomBg(state,randomBgData) {
        state.MainRandomVisualBg = randomBgData;
    },

    //검색 Movies 셋팅
    setSearchMovies(state, SearchMovieData) {
        state.SearchMovies = SearchMovieData;
    }
};

const actions = {

    //Main화면에 노출될 Movie 데이터 Main화면 컨텐츠 state에 기입
    async fetchMainMovies({commit}) {
        try {
            const popularResponce = await axios.get(`${apiUrl}/popular`,{
                params: {
                    api_key: key,
                }
            });
            const topRatedResponce = await axios.get(`${apiUrl}/top_rated`, {
                params: {
                    api_key: key,
                }
            });
            const upcomingResponce = await axios.get(`${apiUrl}/upcoming`, {
                params: {
                    api_key: key,
                }
            });

            const nowPlayingResponce = await axios.get(`${apiUrl}/now_playing`,{
                params: {
                    api_key: key,
                }
            });


            commit('setMainMovies',{
                popularData: popularResponce.data.results,
                topRatedData: topRatedResponce.data.results,
                upcomingData: upcomingResponce.data.results,
                nowPlayingData: nowPlayingResponce.data.results,
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

            commit('setSearchMovies',responce.data.results);
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