<template>
    <section class="detail-section" :style="{backgroundImage: `url(${DetailMainVisualBg})` }">
        <div class="section-inner">
            <div class="detail-content-wrap" v-if="DetailInfo">
                <div class="detail-poster">
                    <img :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${DetailInfo.poster_path}`" :alt="DetailInfo.title" />
                    <div class="link-box" v-if="DetailInfo.networks">
                        <a :href="DetailInfo.homepage" target="_blank" class="network-link">
                            <img :src="`https://www.themoviedb.org/t/p/original${DetailInfo.networks[0].logo_path}`" :alt="DetailInfo.networks[0].name" />
                            <p>
                                Now Playing!
                                <br />
                                <strong>
                                    {{ DetailInfo.networks[0].name }}
                                </strong>
                            </p>
                        </a>
                    </div>
                </div>

                <div class="detail-content">
                    <div class="tit-wrap">
                        <h2>
                            {{ (DetailInfo.title !== undefined) ? DetailInfo.title : DetailInfo.name }}
                        </h2>
                        <h3>
                            {{ (DetailInfo.original_title !== undefined) ? DetailInfo.original_title : DetailInfo.original_name }}
                        </h3>
                    </div>
                    <div class="content-wrap">
                        <h4>줄거리</h4>
                        <p>
                            {{ (DetailInfo.overview === "") ? "줄거리를 준비중입니다." : DetailInfo.overview }}
                        </p>
                    </div>
                    <div class="content-wrap">
                        <h4>장르</h4>
                        <ul class="genre-list">
                            <li v-for="genre in DetailInfo.genres" :key="genre">
                                {{ genre.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: "MovieDetail",

    computed: {
        ...mapState('DetailModule',['DetailInfo','DetailMainVisualBg']),
    },

    methods: {
        ...mapActions('DetailModule',['fetchMovieDetailInfo']),
    },

    async created() {
        const detailGenre = this.$route.params.genre;
        const detailId = this.$route.params.id;
        await this.fetchMovieDetailInfo({detailGenre, detailId});
    },
}
</script>

<style lang="scss">
.detail-section {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    max-width: 100%;
    position: relative;

    &::before {
        content: "";
        background-color: rgba(0, 0, 0 , 0.6);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

    }

    .section-inner {
        max-width: 1200px;
        padding: 65px 0;
        margin: 0 auto;
        position: relative;
        z-index: 2;
    }

    .detail-content-wrap {
        display: grid;
        grid-template-areas: ". .";
        grid-auto-columns: 300px 1fr;
        align-items: center;
        gap: 0 50px;

        .detail-poster {
            border-radius: 20px;
            width: 100%;
            height: 0;
            padding-bottom: calc(450 / 300 * 100%);
            position: relative;
            overflow: hidden;

            & > img {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                object-fit: cover;
                object-position: center;
            }
            

            .link-box {
                background-color: rgba(255, 255, 255, 0.8);
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                padding: 15px 0;

                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0 7px;

                    img {max-width: 65px;}

                    p {
                        font-size: 1.4rem;
                    }
                }
            }
        }

        .detail-content {
            h2,h3,h4,p {color: #fff;}

            .tit-wrap {
                margin-bottom: 20px;
                h2 {
                    font-size: 3rem;
                }

                h3{
                    font-size: 2.5rem;
                    font-weight: 500;
                }
            }

            .content-wrap {
                margin-bottom: 15px;

                &:last-child {margin-bottom: 0}

                h4 {
                    font-size: 1.8rem;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 1.6rem;
                    word-break: keep-all;
                    line-height: 1.6;
                }

                .genre-list {
                    display: flex;
                    gap: 0 30px;

                    li {
                        color: #fff;
                        font-size: 1.4rem;
                    }
                }
            }
        }
    }
}


</style>