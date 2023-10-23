<template>
<!-- 최고점수 영화 리스트 -->
<section class="content-section toprated-section">
    <div class="section-inner">
        <h3 class="section-tit">TopRated!</h3>
        <div class="btn-wrap">
            <button type="button" :class="{ active: TopRatedGenre === 'movie' }" @click="changeMovieGenre('movie','top_rated')">MOVIE</button>
            <button type="button" :class="{ active: TopRatedGenre === 'tv' }" @click="changeMovieGenre('tv','top_rated')">TV</button>
        </div>
        <div class="content-box">
            <div class="scr-box">
                <ul class="card-list">
                    
                    <li
                    class="card"
                    v-for="(topRatedMovie, i) in TopRatedMovies"
                    :key="i">
                        <div class="poster-wrap">
                            <img
                                :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${topRatedMovie.poster_path}`"
                                alt=""
                            />

                            <div class="vote-wrap">
                                <b>
                                {{ topRatedMovie.vote_average }}
                                </b>
                            </div>
                        </div>
                        <div class="info-wrap">
                            <h4>
                                {{ (!topRatedMovie.title) ? topRatedMovie.name : topRatedMovie.title }}
                            </h4>
                            <span>
                                {{ (!topRatedMovie.release_date) ? topRatedMovie.first_air_date : topRatedMovie.release_date }}
                            </span>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</section>
<!-- ...최고점수영화 리스트 -->
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: "MainTopRated",
    computed: {
        ...mapState('MovieModule',["TopRatedMovies","TopRatedGenre",]),
    },
    methods: {
        ...mapMutations('MovieModule',["setTopRatedGenre","setMovieType"]),
        ...mapActions('MovieModule', ["fetchTopRatedGenreUpdate"]),

        //메인 리스트 장르 바꾸는 기능
        async changeMovieGenre(genre,movieType) {
            this.setTopRatedGenre(genre);
            this.setMovieType(movieType);

            await this.fetchTopRatedGenreUpdate();
        }
    }
}
</script>

<style>

</style>