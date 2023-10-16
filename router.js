import { createWebHistory, createRouter } from "vue-router";
import Main from "@/components/Main.vue";
import Movies from "@/components/Movies.vue";
import MovieDetail from "@/components/MovieDetail.vue";
import Bookmark from "@/components/Bookmark.vue";

const routes = [
    {
        name: "main",
        path: "/",
        component: Main,
    },
    {
        name: "movies",
        path: "/movies",
        component: Movies,
    },
    {
        name: "movie-detail",
        path: "/detail",
        component: MovieDetail,
        query: {
            id: "",
        }
    },
    {
        name: "bookmark",
        path: "/bookmark",
        component: Bookmark,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;