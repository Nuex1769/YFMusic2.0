<template>
    <div class="banner">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item,i) in banner" :key="i"><img :src="item.pic" alt=""></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    loop: true,
                    autoplay: true,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        // bulletActiveClass: 'my-bullet-active'
                    }
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                }
            }
        },
        computed: {
            ...mapState({
                banner: state => state.banner
            })
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="scss">
    .banner {
        width: 100%;
        height: 120px;
        // padding: 0 20px;
        // box-sizing: border-box;

        .swiper-slide {
            padding: 0 20px;
            box-sizing: border-box;
        }

        img {
            width: 100%;
            border-radius: 8px;
        }

        .swiper-pagination-bullet-active{
            background: red;
            opacity: 1;
        }
    }
    
</style>