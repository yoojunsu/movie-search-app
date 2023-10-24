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
import { mapState } from 'vuex'
export default {
    name: "MainVisual",
    computed: {
        ...mapState('MovieModule',["MainRandomVisualBg"]),
    },
}
</script>