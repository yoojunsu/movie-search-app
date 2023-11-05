import { createWebHistory, createRouter } from "vue-router";
import Main from "@/components/Main.vue";
import Movies from "@/components/Movies.vue";
import MovieDetail from "@/components/MovieDetail.vue";
import PeopleDetail from "@/components/PeopleDetail.vue";
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
        name: "detail",
        path: "/detail/:genre/:id",
        component: MovieDetail,
    },
    {
        name: "people-detail",
        path: "/detail/people/:id",
        component: PeopleDetail,
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