<template>
    <div class="index">
        <div class="header">
            <div class="header-left"><i class="el-icon-s-operation"></i></div>
            <div class="header-input" @click="goSearch"><i class="el-icon-search"></i>一生所爱</div>
            <div class="header-right" @click="goPlayer"><i class="el-icon-s-data"></i></div>
        </div>
        <div class="banner-box">
            <Banner></Banner>
        </div>
        <div class="nav">
            <div class="nav-item" @click="goRecommend">
                <div class="icon"><i class="el-icon-s-order"></i></div>
                <div class="text">每日推荐</div>
            </div>
            <div class="nav-item">
                <div class="icon"><i class="el-icon-s-unfold"></i></div>
                <div class="text">歌单</div>
            </div>
            <div class="nav-item">
                <div class="icon"><i class="el-icon-s-data"></i></div>
                <div class="text">排行榜</div>
            </div>
            <div class="nav-item">
                <div class="icon"><i class="el-icon-camera-solid"></i></div>
                <div class="text">电台</div>
            </div>
            <div class="nav-item">
                <div class="icon"><i class="el-icon-s-help"></i></div>
                <div class="text">直播</div>
            </div>
        </div>
        <div class="main">
            <div class="recommend">
                <div class="title">
                    <div class="title-text">推荐歌单</div>
                    <div class="title-msg">
                        <div class="msg">为你精挑细选</div>
                        <div class="more">查看更多</div>
                    </div>
                </div>
                <div class="list">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,i) in recommendSongListData" :key="i">
                            <div class="list-item" @click="getSongListDetail(item.id)">
                                <div class="song-img"><img :src="item.picUrl" alt=""></div>
                                <div class="song-text">{{item.name}}</div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="recommend">
                <div class="title">
                    <div class="title-text">歌曲推荐</div>
                    <div class="title-msg">
                        <div class="msg">好听的华语歌曲精选</div>
                        <div class="more play"><i class="el-icon-caret-right"></i>播放全部</div>
                    </div>
                </div>
                <div class="list">
                    <swiper :options="swiperOption1">
                        <swiper-slide v-for="index in 3" :key="index">
                            <div class="song-list-item" v-if="recommendSongData != {}" v-for="(song,i) in recommendSongData.slice((index-1)*3,index*3)" :key="i" @click="playSong(song)">
                                <div class="song-img"><img :src="song.picUrl" alt=""></div>
                                <div class="song-text">{{song.name + '-' + song.song.artists[0].name}}</div>
                                <div class="song-play">
                                    <div class="play"><i class="el-icon-caret-right"></i></div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <Tabbar :ind="0"></Tabbar>
    </div>
</template>

<script>
    import axios from 'axios'
    import {
        mapState,
        mapMutations,
        mapActions
    } from 'vuex'
    import indexVf from '../../public/js/indexVf.js'
    import Banner from '../components/Banner.vue'
    import Tabbar from '../components/Tabbar.vue'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    spaceBetween: 10,
                    // slidesOffsetAfter : 30,
                    slidesPerView: 3.2,
                    freeMode: true
                },
                swiperOption1: {
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    slidesPerView: 1.1,
                    slidesOffsetAfter: 30
                }
            }
        },
        computed: {
            ...mapState({
                httpUrl: state => state.httpUrl,
                recommendSongData: state => state.recommendSongData,
                recommendSongListData: state => state.recommendSongListData,
                playList: state => state.playList,
                order: state => state.order
            })
        },
        created() {
            this.getRecommendSongLists();
            this.getRecommendSongs();
        },
        mounted() {
            // this.getRecommendSongLists();
            // this.getRecommendSongs();
        },
        methods: {
            ...mapMutations(['setSongMessage']),
            ...mapActions(['getRecommendSongListData', 'getRecommendSongData','getSongListData','getOrder','getLyric','pushPlayList','getThisPlayUrl']),
            goPlayer() {
                this.$router.push({
                    path: '/musicplayer'
                })
            },
            goSearch(){
                this.$router.push({
                    path: '/search'
                })
            },
            goRecommend(){
                this.$router.push({
                    path: '/recommend'
                })
            },
            getRecommendSongLists() {
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/recommend/resource'
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getRecommendSongListData(res.data.recommend);
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            getRecommendSongs() {
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/personalized/newsong'
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getRecommendSongData(res.data.result);
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            getSongListDetail(id){
                this.getSongListData('');
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/playlist/detail?id=' + id
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getSongListData(res.data.playlist);
                    }
                }).catch((error) => {
                    console.log(error)
                });
                this.$router.push({
                    path: '/songlist'
                })
            },
            playSong(item) {
                console.log(item)
                //判断歌曲是否存在播放列表
                let ind = indexVf(this.playList, item);
                if (this.playList.length > 0 && ind != '') { //存在播放列表则播放列表内歌曲
                    this.getOrder(ind);
                } else { //不存在则添加歌曲到播放列表播放
                    this.pushPlayList(item);
                    this.getOrder(this.playList.length - 1);
                }
                this.$router.push({
                    path: '/musicplayer'
                });
            }
        },
        watch: {
            order() { //监听播放列表内播放序号改变 改变播放器数据
                this.setSongMessage();
                this.getLyric();
                this.getThisPlayUrl();
            }
        },
        components: {
            Banner,
            swiper,
            Tabbar,
            swiperSlide
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .index {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000000;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        padding: 15px 10px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        text-align: center;
        height: 60px;
        z-index: 9;
        background: #000000;

        .header-left,
        .header-right {
            flex: 0 0 48px;

            i {
                font-size: 30px;
                vertical-align: middle;
            }
        }

        .header-input {
            position: relative;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0px 40px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            font-size: 15px;
            color: #ccc;

            i {
                color: #FFFFFF;
                margin-right: 10px;
            }
        }
    }

    .banner-box {
        margin-top: 60px;
    }

    .nav {
        margin-top: 40px;
        width: 100%;
        display: flex;
        padding: 0 20px;
        box-sizing: border-box;

        .nav-item {
            flex: 1;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .text {
                margin-top: 5px;
                color: #ccc;
            }

            i {
                font-size: 26px;
                color: #C20C0C;
            }
        }
    }

    .main {
        margin-top: 20px;
        padding-bottom: 88px;
        background: #000000;
    }

    .recommend {
        margin-top: 10px;
    }

    .title {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: left;

        .title-text {
            font-size: 12px;
            color: #787878;
        }

        .title-msg {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #FFFFFF;

            .more {
                padding: 2px 8px;
                box-sizing: border-box;
                border: 1px solid #787878;
                border-radius: 25px;
                font-size: 12px;
                color: #ccc;
            }

            .play i {
                color: #fff;
            }
        }
    }

    .list {
        margin-top: 10px;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .list-item {

        .song-img {
            width: 100%;

            img {
                width: 100%;
                height: 100px;
                border-radius: 8px;
            }
        }
    }

    .song-list-item {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        align-items: center;

        .song-img {
            flex: 0 0 60px;

            img {
                width: 60px;
                height: 60px;
            }
        }

        .song-text {
            flex: 1;
            padding-left: 10px;
            text-align: left;
        }

        .song-play {
            flex: 0 0 40px;
            text-align: center;
        }

        .play {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #787878;

            i {
                font-size: 20px;
                color: #C20C0C;
            }
        }
    }
</style>
