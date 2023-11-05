import axios from "axios";

const key = process.env.VUE_APP_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";

const state = {
    DetailInfo: null,
    DetailMainVisualBg: "",
}

const mutations = {
    setDetailInfo(state,detailInfoData) {
        state.DetailInfo = detailInfoData;
        state.DetailMainVisualBg = `https://image.tmdb.org/t/p/w1920_and_h600_face${detailInfoData.backdrop_path}`;
    }
}

const actions = {
    async fetchMovieDetailInfo({commit},{detailGenre, detailId}){
        try {
            const detailResponse = await axios.get(`${apiUrl}/${detailGenre}/${detailId}`,{
                params: {
                    api_key: key,
                    language: "ko",
                }
            });
            commit('setDetailInfo',detailResponse.data);
            console.log(detailResponse.data);
        } catch(err) {
            console.log(err);
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}