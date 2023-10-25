import { createStore } from "vuex";
import MainModule from "./modules/MainModule";

export default createStore({
    modules: {
        MainModule: MainModule,
    },

    state() {
        return {
            IsLoading: false,
            SearchQuery: "슬램덩크",
        }
    },

    mutations: {
        loadingActive(state, payload) {
            state.IsLoading = payload
        },
    }
});