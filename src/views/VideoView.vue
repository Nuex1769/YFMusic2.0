<template>
    <div class="video-view">
        <div class="header">
            <div class="header-left"><i class="el-icon-s-operation"></i></div>
            <div class="header-input"><i class="el-icon-search"></i>一生所爱</div>
            <div class="header-right" @click="goPlayer"><i class="el-icon-s-data"></i></div>
        </div>
        <div class="main-box">
            <div class="mv-list">
                <div class="mv-list-scroll">
                    <div class="mv" v-for="(item,i) in mv" :key="i">
                        <div class="mv-itme">
                            <div class="play-icon" @click="playVideo(i)" v-show="mvIndex !== i">
                                <!-- <div class="fullScreen" @click="fullScreen(i)"></div> -->
                            </div>
                            <video :poster="item.data.picUrl" preload :src="item.url" ref='mvs' @click="ended(i)"></video>
                        </div>
                        <div class="mv-text">{{item.data.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <Tabbar :ind="1" />
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import axios from 'axios'
    import Tabbar from '../components/Tabbar.vue'
    export default {
        data() {
            return {
                mvIndex: ''
            }
        },
        created() {
            this.getmvList();
        },
        computed: {
            ...mapState({
                mv: state => state.mv,
                httpUrl: state => state.httpUrl
            })
        },
        methods: {
            ...mapActions(['getMV']),
            goPlayer() {
                this.$router.push({
                    path: '/musicplayer'
                })
            },
            playVideo(i) {
                this.mvIndex = i;
                let mv = this.$refs.mvs;
                for (let v in mv) {
                    mv[v].pause();
                }
                mv[i].play();
                mv[i].webkitRequestFullScreen();
            },
            // fullScreen(i){
            //     let mv = this.$refs.mvs;
            //     mv[i].webkitRequestFullScreen();
            // },
            ended(i) {
                let mv = this.$refs.mvs;
                mv[i].pause();
                this.mvIndex = '';
            },
            getmvList() {
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/personalized/mv'
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        for (let i in res.data.result) {
                            let url = this.getMvUrl(res.data.result[i]);
                        }
                        console.log(this.mv)
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            getMvUrl(item) {
                console.log(item)
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/mv/url?id=' + item.id
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        let mData = new Object;
                        let url = res.data.data.url;
                        mData.data = item;
                        mData.url = url;
                        this.getMV(mData);
                    }
                }).catch((error) => {
                    console.log(error)
                });
            }
        },
        components: {
            Tabbar
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .video-view {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        overflow: hidden;

        .main-box {
            width: 100%;
            height: 100%;
            margin-top: 60px;
        }
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

    .mv-list {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;

        .mv-list-scroll {
            padding-bottom: 148px;
        }

        .mv {
            margin-top: 10px;
            padding: 30px 20px 10px 20px;
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, 0.1);

            .mv-itme {
                position: relative;
            }

            .mv-itme .play-icon {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url(../../public/img/icon/zbofang.png) no-repeat center;
                background-size: 50px;
                z-index: 3;
                opacity: 0.8;
            }

            // .mv-itme .play-icon .fullScreen{
            //     position: absolute;
            //     bottom: 0;
            //     right: 0;
            // }

            .mv-text {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 14px;
                color: #fff;
                padding: 6px 0 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
        }

        .mv:last-child {
            border-bottom: none;
        }

        video {
            width: 100%;
            border-radius: 8px;
        }

    }
</style>
