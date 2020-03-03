<template>
    <div class="favorite-song">
        <div class="player-bg" v-if="dailyRecommend" :style="{background:'url('+ dailyRecommend[0].album.picUrl +') no-repeat center top #000000'}"></div>
        <div class="player-color"></div>
        <div class="favorite-song-header">
            <PageHeader pageName="歌单"></PageHeader>
        </div>
        <div class="main-box">
            <div class="songList-box">
                <div class="songList-message-box" v-if="false">
                    <div class="songList-img">
                        <img src="../../public/img/user.jpg" alt="">
                    </div>
                    <div class="songList-message">
                        <div class="songList-name">每日推荐</div>
                        <div class="songList-user">
                            <img src="../../public/img/user.jpg" alt="">
                            <div class="name">虐心</div>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="songList-message-box" v-if="true">
                    <div class="day">
                        {{day}}<span>/{{month}}</span>
                    </div>
                </div>
                <div class="operate-list">
                    <div class="operate">
                        <i class="el-icon-chat-line-round"></i>
                        <div class="operate-name">评论</div>
                    </div>
                    <div class="operate">
                        <i class="el-icon-share"></i>
                        <div class="operate-name">99+</div>
                    </div>
                    <div class="operate">
                        <i class="el-icon-download"></i>
                        <div class="operate-name">下载</div>
                    </div>
                    <div class="operate">
                        <i class="el-icon-finished"></i>
                        <div class="operate-name">多选</div>
                    </div>
                </div>
                <div class="favorite-song-list">
                    <div class="play-all">
                        <i class="el-icon-video-play"></i>播放全部<span>(共298首)</span>
                    </div>
                    <div class="song" v-for="(item,index) in dailyRecommend" :key="index" @click="playSong(item)">
                        <div class="num">{{index+1}}</div>
                        <div class="song-msg">
                            <div class="song-msg-box">
                                <div class="song-name">{{item.name}}</div>
                                <div class="song-singer">{{item.artists[0].name}}-{{item.album.subType}}</div>
                            </div>
                        </div>
                        <div class="play-btn">
                            <div class="play"><i class="el-icon-video-play"></i></div>
                            <div class="more"><i class="el-icon-more"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import indexVf from '../../public/js/indexVf.js'
    import PageHeader from '../components/PageHeader.vue'
    import {
        mapState,
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                
            }
        },
        created() {
            this.getSongList();
        },
        computed: {
            ...mapState({
                favoriteSong: state => state.favoriteSong,
                httpUrl: state => state.httpUrl,
                dailyRecommend: state => state.dailyRecommend,
                playList: state => state.playList,
                order: state => state.order
            }),
            day(){
                let d = new Date().getDate();
                if(d < 10){
                    d = '0' + d
                }
                return d;
            },
            month(){
                let m = new Date().getMonth() + 1;
                if(m < 10){
                    m = '0' + m
                }
                return m;
            }
        },
        methods: {
            ...mapMutations(['setPlayStatus', 'setSongMessage']),
            ...mapActions(['getThisPlayUrl', 'getPageName', 'getLyric', 'getDailyRecommend', 'pushPlayList', 'getOrder']),
            getSongList() {
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/recommend/songs'
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getDailyRecommend(res.data.recommend);
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            playSong(item) {
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
        components: {
            PageHeader
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .favorite-song {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        // background-color: rgba(7, 17, 27, 0.8);
        overflow: hidden;

        .player-bg {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 100%;
            height: 100%;
            background: #000000;
            // background-size: 100%;
            background-size: 100% !important;
            // filter: blur(100px);
            z-index: -1;
            // opacity: 0.9;
        }

        .player-color {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000000;
            z-index: -2;
        }

        .favorite-song-header {
            flex: 0 0 60px;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
        }
    }

    .favorite-song .main-box {
        flex: 1;
        margin-top: 60px;
        width: 100%;
        overflow: hidden;
        overflow-y: auto;
    }

    .main-box .songList-box {
        width: 100%;
    }

    .songList-message-box {
        width: 100%;
        display: flex;
        padding: 20px 20px;
        box-sizing: border-box;

        .day {
            font-size: 46px;
            color: #fff;

            span {
                font-size: 20px;
            }
        }

        .songList-img {
            flex: 0 0 100px;

            img {
                width: 100px;
                height: 100px;
                border-radius: 10px;
            }
        }

        .songList-message {
            flex: 1;
            margin-left: 20px;

            .songList-name {
                text-align: left;
                font-size: 15px;
                color: #fff;
            }

            .songList-user {
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .songList-user img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }

            .songList-user .name {
                font-size: 14px;
                color: #CCCCCC;
                margin-left: 4px;
            }

            .songList-user i {
                font-size: 15px;
                color: #ccc;
            }
        }
    }

    .operate-list {
        width: 100%;
        display: flex;
        margin-top: 20px;

        .operate {
            flex: 1;
            text-align: center;
            font-size: 12px;
            color: #fff;

            i {
                font-size: 20px;
            }
        }
    }

    .favorite-song-list {
        margin-top: 20px;
        width: 100%;
        background-color: #000000;
        border-radius: 25px 25px 0 0;
        padding: 20px 0;

        .play-all {
            text-align: left;
            font-size: 16px;
            color: #fff;
            padding: 0 10px 20px 10px;
            box-sizing: border-box;

            i {
                margin-right: 10px;
            }

            span {
                font-size: 14px;
                color: #787878;
            }
        }

        .song {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;

            .num {
                flex: 0 0 50px;
                justify-content: flex-start;
                align-items: center;
                font-size: 15px;
                color: #787878;
            }

            .song-msg {
                flex: 1;
                height: 36px;
                text-align: left;
                position: relative;

                .song-msg-box {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .song-name {
                    width: 100%;
                    font-size: 15px;
                    color: #FFFFFF;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .song-singer {
                    width: 100%;
                    font-size: 12px;
                    color: #ccc;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .play-btn {
                flex: 0 0 60px;
                display: flex;
                align-items: center;
                color: #787878;


                .play {
                    flex: 1;
                }

                .play i {
                    font-size: 25px;
                }

                .more {
                    flex: 0 0 20px;
                    transform: rotateZ(90deg);
                }

                .more i {
                    font-size: 20px;
                }
            }
        }
    }
</style>
