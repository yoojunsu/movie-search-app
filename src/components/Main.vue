<template>
    <!-- 검색 영역 -->
    <section class="main-search-section" :style="{backgroundImage: `url('${MainRandomVisualBg}')`}">
        <div class="section-inner">
            <div class="tit-wrap">
                <h2>WELCOME</h2>
                <h3>Search for movies you want</h3>
            </div>
            <div class="search-wrap">
                <input type="text" name="" id="" placeholder="영화,TV 프로그램 등 검색..."/>
                <button type="button" id="searchBtn">
                    <i class="xi-search"></i>
                </button>
            </div>
        </div>
    </section>
    <!-- ...검색영역 -->

    <!-- 최신상영작 리스트 -->
    <section class="content-section nowplaying-section">
        <div class="section-inner">
            <h3 class="section-tit">Now Playing!</h3>
            <div class="scr-box">
                <div v-for="(nowPlayingMovie,i) in NowPlayingMovies" :key="i">
                    <a :href="`https://www.youtube.com/watch?v=${nowPlayingMovie}`">
                        {{ nowPlayingMovie.original_title }}
                        
                    </a>
                </div>
                <ul class="nowplaying-list"></ul>
            </div>
        </div>
    </section>
    <!-- ...최신 상영작 리스트 -->
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: "Main",
    computed: {
        ...mapState('MovieModule',['NowPlayingMovies','PopularMovies','TopRatedMovies', 'MainRandomVisualBg']),
    },
    methods: {
        ...mapMutations('MovieModule',['setMainVisualRandomBg']),
        ...mapActions('MovieModule',['fetchMainMovies']),

        //메인 최상단 비주얼 bg 영화 backdrop random 출력
        randomVisualBg() {
            const mainRandomVisualImagePath = this.PopularMovies[Math.floor(Math.random() * this.PopularMovies.length)].backdrop_path;
            const mainRandomVisualImageOptions = 'w1920_and_h600_multi_faces_filter(duotone,000,00baff)';
            const mainRandomVisualImageUrl = `https://image.tmdb.org/t/p/${mainRandomVisualImageOptions}${mainRandomVisualImagePath}`;

            this.setMainVisualRandomBg(mainRandomVisualImageUrl)
        }
    },

    async created() {
        //Main 컴포넌트 컨텐츠 세팅 데이터 fetch
        await this.fetchMainMovies();

        this.randomVisualBg();
    }, 
}
</script>

<style scoped lang="scss">
.main-search-section {
    background-color: #00baff;
    background-size: cover;
    background-position: center;
    max-width: 1300px;
    height: 350px;
    margin: 0 auto;
    transition: background-image 0.3s;

    .section-inner {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        padding: 0 25px;
    }

    h2,h3 {
        color: #fff;
    }

    .tit-wrap {
        margin-bottom: 30px;

        h2 {
            font-size: 4rem;
        }

        h3 {
            font-size: 3rem;
        }

    }

    .search-wrap {
        border-radius: 50px;
        box-shadow: 0 7px 8px rgba(0, 0, 0, 0.4);
        width: 100%;
        position: relative;
        overflow: hidden;

        input {
            padding: 15px 125px 15PX 25PX;
            width: 100%;
        }

        button {
            background: linear-gradient(90deg, rgba(255,242,0,1) 0%, rgba(255,255,255,1) 87%);
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            max-width: 100px;

            i {font-size: 2.3rem}
        }
    }
}

.content-section {
    padding: 60px 0;
}

.section-tit {
    font-size: 4rem; color: #000;
    margin-bottom: 30px;    
}
</style>