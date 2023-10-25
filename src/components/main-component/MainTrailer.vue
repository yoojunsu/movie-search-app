<template>
<!-- 추천 예고편 -->
<section class="trailer-section" :style="{ backgroundImage: NowPlayingMovies.length > 0 ? `url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,000,ff4300)${NowPlayingMovies[0].backdrop_path}')` : 'none' }">
    <div class="section-inner">
        <div class="tit-wrap">
            <h3>Recent Trailer</h3>
            <h4>
                {{ NowPlayingMovies.length > 0 ? NowPlayingMovies[0].title : "" }}
            </h4>
        </div>
        <div class="video-content-wrap">
            <div class="main-video-content">
                <iframe 
                :src="`https://www.youtube.com/embed/${(NowPlayingTrailers[ActiveTrailerIdx]) ? NowPlayingTrailers[ActiveTrailerIdx].key : ''}`" 
                frameborder="0"> </iframe>
                
                <h5>
                    {{ (NowPlayingTrailers[ActiveTrailerIdx]) ? NowPlayingTrailers[ActiveTrailerIdx].name : '' }}
                </h5>
            </div>
            <div class="content-box">
                <div class="scr-box">
                    <ul class="sub-video-list">
                        <li class="card" v-for="(trailer,i) in NowPlayingTrailers" :key="i" :class="{active: i === ActiveTrailerIdx}" @click="changeMainMovieTrailer(i)">
                            <div class="thumb">
                                <img :src="`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`" :alt="trailer.name">
                            </div>
                            <h5>
                                {{ trailer.name }}
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- ...추천 예고편 -->
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: "MainTrailer",
    computed: {
        ...mapState("MainModule",["NowPlayingMovies","NowPlayingTrailers","ActiveTrailerIdx"]),
    },
    methods: {
        ...mapMutations("MainModule",["changeMainMovieTrailer"]),
    }

}
</script>