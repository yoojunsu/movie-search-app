// import axios from "axios";

// const key = process.env.VUE_APP_API_KEY;
// const apiUrl = "https://api.themoviedb.org/3";

const state = {
    DetailInfo: null,
}

const mutations = {
    setDetailInfo(state,DetailData) {
        state.DetailInfo = DetailData;
    }
}

const actions = {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}