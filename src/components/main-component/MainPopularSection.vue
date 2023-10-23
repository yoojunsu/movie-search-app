<template>
<!-- 인기영화 리스트 -->
<section class="content-section popular-section">
    <div class="section-inner">
        <h3 class="section-tit">What's Popular!</h3>
        <div class="btn-wrap">
            <button type="button" :class="{ active: PopularGenre === 'movie' }" @click="changeMovieGenre('movie','popular')">MOVIE</button>
            <button type="button" :class="{ active: PopularGenre === 'tv' }" @click="changeMovieGenre('tv','popular')">TV</button>
        </div>
        <div class="content-box">
            <div class="scr-box">
                <ul class="card-list">
                    <li
                    class="card"
                    v-for="(popularMovie, i) in PopularMovies"
                    :key="i">
                        <div class="poster-wrap">
                            <img
                                :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${popularMovie.poster_path}`"
                                alt=""
                            />

                            <div class="vote-wrap">
                                <b>
                                {{ popularMovie.vote_average }}
                                </b>
                            </div>
                        </div>
                        <div class="info-wrap">
                            <h4>
                                {{ (!popularMovie.title) ? popularMovie.name : popularMovie.title }}
                            </h4>
                            <span>
                                {{ (popularMovie.release_date) ? popularMovie.release_date : popularMovie.first_air_date }}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
<!-- ...인기영화 리스트 -->
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: "MainPopular",
    computed: {
        ...mapState('MovieModule',["PopularMovies","PopularGenre"]),
    },
    methods: {
        ...mapMutations('MovieModule',["setPopularGenre","setMovieType"]),
        ...mapActions('MovieModule', ["fetchPopularGenreUpdate"]),

        //메인 popular 영화 장르 바꾸는 함수
        async changeMovieGenre(genre,movieType) {
            this.setPopularGenre(genre);
            this.setMovieType(movieType);

            await this.fetchPopularGenreUpdate();
        }
    }
}
</script>

<style>

</style>