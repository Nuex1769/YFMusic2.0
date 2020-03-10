<template>
    <div id="app">
        <div class="guide" v-if="!banner && !showIndex"></div>
        <keep-alive>
            <router-view @getAudioState="setAudio" />
        </keep-alive>
        <MusicPlayer></MusicPlayer>
        <Audio ref="player" @time-update="timeUpdate" />
    </div>
</template>

<script>
    import axios from 'axios'
    import Audio from './components/Audio.vue'
    import MusicPlayer from './views/MusicPlayer.vue'
    import {
        mapState,
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                showIndex: false
            }
        },
        created() {
            this.login()
            this.loadBanner()
        },
        mounted() {
            // this.login()
            // this.loadBanner()
        },
        computed: {
            ...mapState({
                httpUrl: state => state.httpUrl,
                thisPlayUrl: state => state.thisPlayUrl,
                playList: state => state.playList,
                order: state => state.order,
                songMessage: state => state.songMessage,
                banner: state => state.banner,
                showPlayer: state => state.showPlayer
            })
        },
        methods: {
            ...mapMutations(['subPlayList']),
            ...mapActions(['getUserData', 'getSongTime', 'getBanner', 'getDuration', 'getThisPlayUrl', 'getOrder',
                'getSongMessage', 'getLyric'
            ]),
            login() {
                axios({
                    // headers: {
                    // 	'Content-Type': 'application/x-www-form-urlencoded',
                    // 	'X-Requested-With': 'xmlhttprequest'
                    // },
                    withCredentials: true,
                    url: this.httpUrl + '/login/cellphone?phone=18813795037&password=520025'
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getUserData(res.data.profile)
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            loadBanner() {
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/banner?type=2'
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getBanner(res.data.banners)
                        setTimeout(() => {
                            this.showIndex = true
                        }, 500);
                    }
                }).catch((error) => {
                    console.log(error)
                });
            },
            setAudio() {
                let audio = this.$refs.player.$el;
                if (this.thisPlayUrl != '') {
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                }
            },
            getSongDuration() {
                let audio = this.$refs.player.$el;
                this.getDuration(audio.duration); //获取歌曲时长
            },
            timeUpdate() {
                let audio = this.$refs.player.$el;
                if (!audio.ended) {
                    this.getSongTime(audio.currentTime);
                    this.getDuration(audio.duration);
                } else {
                    // this.subPlayList();
                    if (this.playList.length - 1 > this.order) {
                        this.getOrder(this.order + 1);
                    } else {
                        console.log("播放结束")
                    }
                }
            }
        },
        watch: {
            thisPlayUrl() {
                this.getSongDuration();
            },
            order() {
                this.getSongMessage();
                this.getThisPlayUrl();
                this.getLyric();
            }
        },
        components: {
            Audio,
            MusicPlayer
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;

        .guide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(../public/img/guide.jpg) no-repeat center #000000;
            background-size: cover;
            z-index: 999;
        }
    }
</style>
