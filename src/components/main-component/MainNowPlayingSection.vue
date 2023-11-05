<template>
    <!-- 최신상영작 리스트 -->
    <section class="content-section nowplaying-section">
        <div class="section-inner">
            <h3 class="section-tit">Now Playing!</h3>
            <div class="content-box">
                <div class="scr-box">
                    <ul class="card-list">
                        <li
                            class="card"
                            v-for="(nowPlayingMovie, i) in NowPlayingMovies"
                            :key="i">
                            <router-link :to="`/detail/movie/${nowPlayingMovie.id}`">
                                <div class="poster-wrap">
                                    <img
                                    :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${nowPlayingMovie.poster_path}`"
                                    alt=""/>

                                    <div class="vote-wrap">
                                        <b>
                                            {{ nowPlayingMovie.vote_average }}
                                        </b>
                                    </div>
                                </div>

                                <div class="info-wrap">
                                    <h4>
                                        {{ nowPlayingMovie.title }}
                                    </h4>
                                    <span>
                                        {{ nowPlayingMovie.release_date }}
                                    </span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <!-- ...최신 상영작 리스트 -->
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "MainNowPlaying",
    computed: {
        ...mapState("MainModule",["NowPlayingMovies",]),
    }
}
</script>

<style>

</style>