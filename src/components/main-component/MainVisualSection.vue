<template>
    <!-- 검색 영역 -->  
    <section class="main-search-section" :style="{ backgroundImage: `url('${MainRandomVisualBg}')` }">
        <div class="section-inner">
            <div class="tit-wrap">
                <h2>WELCOME</h2>
                <h3>Search for movies you want</h3>
            </div>
            <div class="search-wrap">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="영화,TV 프로그램 등 검색..."
                />
                <button type="button" id="searchBtn">
                    <i class="xi-search"></i>
                </button>
            </div>
        </div>
    </section>
    <!-- ...검색영역 -->
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
    name: "MainVisual",
    computed: {
        ...mapState('MovieModule',["PopularMovies","MainRandomVisualBg"]),
    },
    methods: {
        ...mapMutations('MovieModule',['setMainVisualRandomBg']),
        ...mapActions('MovieModule',['fetchMainMovies']),
        
        //메인 최상단 비주얼 bg 영화 backdrop random 출력
        async randomVisualBg() {
            await this.fetchMainMovies();
            const mainRandomVisualImagePath = this.PopularMovies[Math.floor(Math.random() * this.PopularMovies.length)].backdrop_path;
            const mainRandomVisualImageOptions ="w1920_and_h600_multi_faces_filter(duotone,000,00baff)";
            const mainRandomVisualImageUrl = `https://image.tmdb.org/t/p/${mainRandomVisualImageOptions}${mainRandomVisualImagePath}`;
            this.setMainVisualRandomBg(mainRandomVisualImageUrl);
        },
    },
    
    created() {
        this.randomVisualBg();
    }
}
</script>

<style scoped lang="scss">
</style>