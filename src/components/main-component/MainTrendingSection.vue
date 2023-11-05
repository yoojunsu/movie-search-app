<template>
<!-- 지금 뜨는 배우 -->
<section class="content-section popular-section">
    <div class="section-inner">
        <h3 class="section-tit">Popularity Of Week</h3>
        
        <ul class="trending-people-list">
            <li class="trending-people" v-for="(trendingPeople,i) in TrendingPeoples" :key="i">
                <router-link :to="`/detail/people/${trendingPeople.id}`">
                    <div class="profile-wrap">
                        <img :src="`https://image.tmdb.org/t/p/w440_and_h660_face${trendingPeople.profile_path}`" :alt="trendingPeople.name" />
                    </div>
                    <div class="info-wrap">
                        <h4>{{ trendingPeople.name }}</h4>
                        <div class="percentage" :style="{width: `${Math.floor(trendingPeople.popularity)}%`}"></div>
                        <span>
                            {{ `Score: ${Math.floor(trendingPeople.popularity)} Point` }}
                        </span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</section>
<!-- ...이번주 인기 배우 리스트 -->
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "MainTrending",
    computed: {
        ...mapState("MainModule",["TrendingPeoples"]),
    },
}
</script>