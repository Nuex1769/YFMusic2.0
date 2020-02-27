<template>
    <div class="seachResult">
        <div class="Sheader">
            <div class="back" @click="back"><i class="el-icon-arrow-left"></i></div>
            <div class="inp">
                <input type="text" :value="keyword" @focus="back">
            </div>
        </div>
        <div class="bar">
            <div class="bar-item" :class="{selBar:bar == 1}" @click="selBar(1)">
                单曲
            </div>
            <div class="bar-item" :class="{selBar:bar == 2}" @click="selBar(2)">
                视频
            </div>
        </div>
        <div class="song-list" v-if="bar == 1">
            <div class="song" v-for="(item,i) in searchData" @click="playSong(item)">
                <div class="song-msg">
                    <div class="song-msg-box">
                        <div class="song-name">{{item.name}}</div>
                        <div class="song-singer">{{item.artists[0].name}}-{{item.album.name}}</div>
                    </div>
                </div>
                <div class="play-btn">
                    <div class="play"><i class="el-icon-video-play"></i></div>
                    <div class="more"><i class="el-icon-more"></i></div>
                </div>
            </div>
        </div>
        <div class="song-list" v-if="bar == 2">
            <div class="video" v-for="(item,i) in searchVideoData" :key="i">
                <div class="img">
                    <div class="count">{{getCount(item.playTime)}}万</div>
                    <img :src="item.coverUrl" alt="">
                    </div>
                <div class="msg">
                    <div class="msg-title">{{item.title}}</div>
                    <div class="msg-text">{{getDuration(item.durationms)}}, {{item.creator[0].userName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import indexVf from '../../public/js/indexVf.js'
    import {
        mapState,
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                bar: 1
            }
        },
        computed: {
            ...mapState({
                searchData: state => state.searchData,
                playList: state => state.playList,
                order: state => state.order,
                httpUrl: state => state.httpUrl,
                keyword: state => state.keyword,
                searchVideoData: state => state.searchVideoData
            })
        },
        methods: {
            ...mapActions(['getOrder', 'pushPlayList', 'getLyric', 'getThisPlayUrl', 'getAlbum','getSearchVideoData']),
            ...mapMutations(['setSongMessage']),
            back() {
                this.$router.go(-1);
            },
            playSong(item) {
                this.getAlbums(item.album.id);
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
            },
            getAlbums(id) {
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/album?id=' + id
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getAlbum(res.data.album)
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            selBar(i){
                this.bar = i;
                if(i == 2){
                    axios({
                        withCredentials: true,
                        url: this.httpUrl + '/search?keywords=' + this.keyword + '&type=1014&limit=15&offset=1'
                    }).then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            this.getSearchVideoData(res.data.result.videos);
                        }
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            },
            getDuration(time) {
                let min = Math.floor(time / 60000);
                let s = Math.floor(time % 60000) + '';
                if (min < 10) {
                    min = "0" + min;
                }
                if (s.length < 2) {
                    s = "0" + s;
                }else{
                    s = s.substr(0,2);
                }
                let times = min + ":" + s;
                return times;
                console.log(times)
            },
            getCount(c){
                let count = '';
                if(c > 100000){
                    count = parseInt(c / 10000);
                }else{
                    count = c;
                }
                return count;
            }
        },
        watch: {
            order() { //监听播放列表内播放序号改变 改变播放器数据
                this.setSongMessage();
                this.getLyric();
                this.getThisPlayUrl();
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .seachResult {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        display: flex;
        flex-direction: column;

        .Sheader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            padding: 15px 20px;
            box-sizing: border-box;
            background-color: #000000;
            z-index: 9;

            .back {
                flex: 0 0 30px;
            }

            .back i {
                font-size: 20px;
                color: #fff;
            }

            .inp {
                flex: 1;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 20px;
            }

            .inp input {
                width: 100%;
                height: 100%;
                outline: none;
                border: none;
                color: #fff;
                padding: 5px 40px;
                box-sizing: border-box;
                background: url(../../public/img/icon/search.png) no-repeat 10px center;
                background-size: 20px;
            }
        }

        .bar {
            position: fixed;
            top: 0px;
            left: 0;
            flex: 0 0 35px;
            margin-top: 60px;
            padding: 0 20px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 9;
            background-color: #000000;

            .bar-item {
                padding-bottom: 10px;
                font-size: 15px;
                color: #fff;
                margin-right: 40px;
            }

            .selBar {
                color: red;
                border-bottom: 2px solid red;
            }
        }

        .song-list {
            margin-top: 95px;
            flex: 1;
            padding: 0 20px;
            box-sizing: border-box;
            overflow: hidden;
            overflow-y: scroll;
        }

    }

    .song-list .song {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);

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

    .song:last-child {
        border-bottom: none;
    }

    .song-list .video {
        display: flex;
        align-items: center;
        padding: 5px 0;

        .img {
            flex: 0 0 80px;
            position: relative;
            
            .count{
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 10px;
                color: #fff;
                text-shadow: 0 0 1px #000000;
            }
        }

        img {
            width: 110px;
            height: 65px;
            border-radius: 5px;
        }

        .msg {
            flex: 1;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            
            .msg-title{
                font-size: 14px;
                color: #fff;
                max-height: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .msg-text{
                margin-top: 5px;
                font-size: 10px;
                color: rgba(255,255,255,0.2);
            }
        }
    }
</style>
