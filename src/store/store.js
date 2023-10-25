import { createStore } from "vuex";
import MainModule from "./modules/MainModule";
import DetailModule from "./modules/DetailModule";

export default createStore({
    modules: {
        MainModule: MainModule,
        DetailModule: DetailModule,
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