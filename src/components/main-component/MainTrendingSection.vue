<template>
<!-- 지금 뜨는 영화 리스트 -->
<section class="content-section popular-section">
    <div class="section-inner">
        <h3 class="section-tit">Now Trending</h3>
        <div class="btn-wrap">
            <button type="button" :class="{ active: TrendingDays === 'days' }">Days</button>
            <button type="button" :class="{ active: TrendingDays === 'week' }">Weeks</button>
        </div>
        <div class="content-box">
            <div class="scr-box">
                <ul class="card-list">
                    <li
                    class="card"
                    v-for="(trendingMovie, i) in TrendingMovies"
                    :key="i">
                        <div class="poster-wrap">
                            <img
                                :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${trendingMovie.poster_path}`"
                                alt=""
                            />

                            <div class="vote-wrap">
                                <b>
                                {{ trendingMovie.vote_average }}
                                </b>
                            </div>
                        </div>
                        <div class="info-wrap">
                            <h4>
                                {{ trendingMovie.title }}
                            </h4>
                            <span>
                                {{ trendingMovie.release_date }}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
<!-- ...지금 뜨는 영화 리스트 -->
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: "MainTrending",
    computed: {
        ...mapState('MovieModule',["TrendingDays","TrendingMovies"]),
    },
    methods: {
        ...mapMutations('MovieModule',[]),
    }
}
</script>

<style>

</style>