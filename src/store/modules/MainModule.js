import axios from "axios";

const key = process.env.VUE_APP_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";

const state = {
    PopularGenre: "movie",
    TopRatedGenre: "movie",
    MovieType: "",
    PopularMovies: [],
    TopRatedMovies: [],
    NowPlayingMovies: [],
    NowPlayingTrailers: [],
    TrendingPeoples: [],
    ActiveTrailerIdx: 0,
    MainRandomVisualBg: "",
}

const mutations = {
    //메인화면 Movies 컨텐츠 Data 셋팅
    setMainMovies( state, { nowPlayingData, topRatedData, popularData, trendingData}) {
        state.NowPlayingMovies = nowPlayingData;
        state.PopularMovies = popularData;
        state.TopRatedMovies = topRatedData;
        state.TrendingPeoples = trendingData;
    },

    //메인화면 visual randomBg state셋팅
    setMainVisualRandomBg(state, randomBgData) {
        state.MainRandomVisualBg = randomBgData;
    },

    // popular 장르 변경을 위한 mutations
    setPopularGenre(state, payload) {
        state.PopularGenre = payload
    },

    // topRated 장르 변경을 위한 mutations
    setTopRatedGenre(state,payload) {
        state.TopRatedGenre = payload;
    },
    

    // 장르 변경 기능에서 movies api통신에 기입할 영화 종류 설정 mutations
    setMovieType(state,payload){
        state.MovieType = payload;
    },

    //버튼 클릭 동작으로 변경된 MovieType에 값에 따른 메인 무비 장르 데이터 변경하는 muatations
    setMainMovieListUpdate(state,payload) {
        if(state.MovieType === "top_rated") {
            state.TopRatedMovies = payload;
        } else if(state.MovieType === "popular") {
            state.PopularMovies = payload;
        }
    },

    //메인 영화 예고편 데이터 셋팅 mutations
    setMainMovieTrailers(state,trailersData) {
        state.NowPlayingTrailers = trailersData;
    },

    //메인 영화 예고편 상단 영상 idx state변경하는 mutations
    changeMainMovieTrailer(state,idx) {
        state.ActiveTrailerIdx = idx;
    },
}

const actions = {
    //Main화면에 최초 노출될 Movie api 통신 및 데이터 처리 actions
    async fetchMainMovies({ state, commit }) {
        try {
            const nowPlayingResponse = await axios.get(`${apiUrl}/movie/now_playing`,{
                params: {
                    api_key: key,
                    page: "1",
                    language: "ko",
                },
            });

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

            const trendingResponse = await axios.get(`${apiUrl}/trending/person/week`,{
                params: {
                    api_key: key,
                    page: "1",
                    language: "ko",
                }
            });


            //메인 영화 컨텐츠 최초 리스트 출력
            commit("setMainMovies", {
                nowPlayingData: nowPlayingResponse.data.results,
                topRatedData: topRatedResponse.data.results,
                popularData: popularResponse.data.results,
                trendingData: trendingResponse.data.results,
            });

            console.log(nowPlayingResponse.data.results);
            
            //main random bg 로직
            const mainRandomVisualImagePath = state.PopularMovies[Math.floor(Math.random() * state.PopularMovies.length)].backdrop_path;
            const mainRandomVisualImageOptions ="w1920_and_h600_multi_faces_filter(duotone,000,00baff)";
            const mainRandomVisualImageUrl = `https://image.tmdb.org/t/p/${mainRandomVisualImageOptions}${mainRandomVisualImagePath}`;
            commit('setMainVisualRandomBg',mainRandomVisualImageUrl)

            // 최신상영작 영화 예고편 비디오 리스트 출력
            const nowPlayingTrailerResponse = await axios.get(`${apiUrl}/movie/${state.NowPlayingMovies[0].id}/videos`, {
                params: {
                    api_key: key,
                },
            });

            commit('setMainMovieTrailers',nowPlayingTrailerResponse.data.results);
        } catch (err) {
            console.error(err);
        }
    },

    //Main Popular 장르 업데이트 후 API 통신 actions
    async fetchPopularGenreUpdate({state, commit}) {
        try {
            const updateResponse = await axios.get(`${apiUrl}/${state.PopularGenre}/${state.MovieType}`,{
                params: {
                    api_key: key,
                    page: "1",
                    language: "ko",
                }
            });
            commit("setMainMovieListUpdate",updateResponse.data.results);

        } catch(err) {
            console.error(err);
        }
    },

    //Main TopRated 장르 업데이트 후 API 통신 actions
    async fetchTopRatedGenreUpdate({state, commit}) {
        try {
            const updateResponse = await axios.get(`${apiUrl}/${state.TopRatedGenre}/${state.MovieType}`,{
                params: {
                    api_key: key,
                    page: "1",
                    language: "ko",
                }
            });
            
            commit("setMainMovieListUpdate",updateResponse.data.results);
        } catch(err) {
            console.error(err);
        }
    },


}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}