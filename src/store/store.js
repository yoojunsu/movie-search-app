import { createStore } from "vuex";
import MovieModule from "./modules/MovieModule";

export default createStore({
    modules: {
        MovieModule: MovieModule,
    }
});