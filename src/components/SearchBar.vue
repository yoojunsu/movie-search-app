<template>
<header>
    <div class="header-inner">
        <router-link to="/">
            <h1 class="logo">
                <span>TMDB</span>
                App
            </h1>
        </router-link>

        <div class="search-wrap" v-if="!$route.href === '/'">
            <input type="text" v-model="SearchQuery" />
            <button type="button">
                <i class="xi-search"></i>
            </button>
        </div>
    </div>
</header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "SearchBar",
    computed: {
        ...mapState('MovieModule',['SearchQuery']),
    }
}
</script>

<style scoped lang="scss">
header {
    background-color: #032541;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px 0;
    width: 100%;

    .header-inner {
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        color: #fff;
        font-size: 2.5rem;

        span {
            color: #fff200;
        }
    }
}
</style>