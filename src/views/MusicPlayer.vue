<template>
    <div class="player">
        <div class="player-bg" v-if="songMessage.album" :style="{background:'url('+ songMessage.album.picUrl +') no-repeat center #000000'}"></div>
        <div class="player-bg" v-if="songMessage.al" :style="{background:'url('+ songMessage.al.picUrl +') no-repeat center #000000'}"></div>
        <div class="player-color"></div>
        <div class="player-header">
            <PageHeader :pageName="songMessage"></PageHeader>
        </div>
        <div class="player-main">
            <div class="main-box">
                <!-- 唱片动画 -->
                <div class="pattern-record" v-show="lyr" @click="showLyr">
                    <div class="needle">
                        <div class="needle-img" :class="playStatus ? 'endNeedle' : 'playNeedle'">
                            <img src="../../public/img/needle2.png" alt=""> 
                        </div>
                    </div>
                    <div class="record">
                        <div class="song-img" v-if="playList">
                            <img v-if="songMessage.picUrl" :src="songMessage.picUrl || ''" alt="">
                            <img v-if="songMessage.album" :src="songMessage.album.picUrl || album.picUrl || ''" alt="">
                            <img v-if="songMessage.al" :src="songMessage.al.picUrl || ''" alt="">
                        </div>
                    </div>
                    <div class="operation-list">
                        <div class="operation-item"><img src="../../public/img/icon/shoucang-on.png" alt=""></div>
                        <div class="operation-item"><img src="../../public/img/icon/xiazai.png" alt=""></div>
                        <div class="operation-item"><img src="../../public/img/icon/yinxiao.png" alt=""></div>
                        <div class="operation-item"><i class="el-icon-chat-line-round"></i></div>
                        <div class="operation-item"><i class="el-icon-more"></i></div>
                    </div>
                </div>
                <!-- 歌词 -->
                <div class="pattern-lyrics" :class="{hidebox : lyr}" @click="showLyr">
                    <div class="lyr-box">
                        <div class="volume-box">
                            <div class="volume-icon"><i class="el-icon-bell"></i></div>
                            <div class="volume">
                                <div class="volume-progress"></div>
                                <div class="dot"></div>
                            </div>
                            <div class="volume-icon"><i class="el-icon-monitor"></i></div>
                        </div>
                        <div class="lyrics-box">
                            <div class="lyrics-list" ref="wrapper">
                                <ul class="lyrics">
                                    <li class="lyrics-item" v-for="(l,i) in lyric" :key="i" :class="{colorur : i == indexline}">{{l.c}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 控件 -->
            <div class="control">
                <div class="progress">
                    <div class="time">{{thisTime}}</div>
                    <div class="progress-box">
                        <div class="progress-box-p">
                            <div class="total"></div>
                            <div class="past" :style="{left:'-' + (100 - linear) + '%'}"></div>
                            <div class="dot" :style="{left:linear + '%'}" @touchstart.stop="drag" @touchmove.stop="move"
                                @touchend.stop="end"></div>
                        </div>
                    </div>
                    <div class="time">{{getDuration}}</div>
                </div>
                <div class="control-list">
                    <div class="control-item"><img src="../../public/img/icon/xunhuan.png" alt=""></div>
                    <div class="control-item" @click="prev"><img src="../../public/img/icon/shangyishoushangyige.png" alt=""></div>
                    <div class="control-item play" @click="setStatus"><img v-if="!playStatus" src="../../public/img/icon/zbofang.png"
                            alt=""><img v-if="playStatus" src="../../public/img/icon/bofangzanting.png" alt=""></div>
                    <div class="control-item" @click="next"><img src="../../public/img/icon/xiayigexiayishou.png" alt=""></div>
                    <div class="control-item" @click="showPL"><img src="../../public/img/icon/PlayListbofangliebiao.png" alt=""></div>
                </div>
            </div>
        </div>
        <playlist></playlist>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations,
        mapActions
    } from 'vuex'
    import BScroll from 'better-scroll'
    import PageHeader from '../components/PageHeader.vue'
    import playlist from '../components/PlayList.vue'
    export default {
        data() {
            return {
                lyr: true,
                linear: 0,
                indexline: 0,
                curHeight: 0,
                longClick: 0,
                timeOutEvent:''
            }
        },
        created() {
            this.$nextTick(() => { // 使用 this.$nextTick 为了确保组件已经渲染完毕
                let wrapper = document.querySelector('.lyrics-list')
                if (!this.scroll && this.$refs.wrapper) {
                    this.scroll = new BScroll(wrapper, {
                        click: true, // 允许点击
                        momentum: true,
                        scrollY: true
                    });
                    console.log(this.scroll)
                    console.log(this.$refs.wrapper)
                }
            })
        },
        beforeMount() {
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            this.curHeight = parseInt(h * 0.25);
            console.log(h + '-' + this.curHeight)
        },
        computed: {
            ...mapState({
                songMessage: state => state.songMessage,
                lyric: state => state.lyric,
                playStatus: state => state.playStatus,
                thisSongTime: state => state.thisSongTime,
                duration: state => state.duration,
                playList: state => state.playList,
                order: state => state.order,
                album: state => state.album
            }),
            getDuration() {
                if(this.duration){
                    let min = Math.floor(this.duration / 60) + "";
                    let s = Math.floor(this.duration % 60) + "";
                    if (min.length == 1) {
                        min = "0" + min;
                    }
                    if (s.length == 1) {
                        s = "0" + s;
                    }
                    let times = min + ":" + s;
                    return times;
                    console.log(times)
                }
            },
            thisTime() {
                if(this.thisSongTime){
                    let times = '0:00';
                    let min = Math.floor(this.thisSongTime / 60) + "";
                    let s = Math.floor(this.thisSongTime % 60) + "";
                    if (min.length == 1) {
                        min = "0" + min;
                    }
                    if (s.length == 1) {
                        s = "0" + s;
                    }
                    times = min + ":" + s;
                    return times;
                    console.log(times)
                }
            },
            getlinear() {
                return this.indexline;
            },
        },
        methods: {
            ...mapMutations(['setPlayStatus','setShowPlayList']),
            ...mapActions(['getSongMessage','getOrder']),
            showLyr() {
                this.lyr = !this.lyr
            },
            showPL(){
                this.setShowPlayList(true);
            },
            setStatus() {
                let aStatus = this.playStatus;
                this.setPlayStatus(!aStatus);
                this.$emit('getAudioState');
            },
            drag() {
                this.timeOutEvent = setTimeout(function() {
                    //此处为长按事件-----在此显示遮罩层及删除按钮
                    this.longClick = 1; //假如长按，则设置为1
                    console.log('长按')
                }, 500);
            },
            move() {
                clearTimeout(this.timeOutEvent);
                this.timeOutEvent = 0;
                e.preventDefault();
            },
            end() {
                clearTimeout(this.timeOutEvent);
                if (this.timeOutEvent != 0 && this.longClick == 0) { //点击
                    //此处为点击事件----在此处添加跳转详情页
                }
                return false;
            },
            prev(){
                if(this.order > 0){
                    this.getOrder(this.order-1)
                }
            },
            next(){
                if(this.order < this.playList.length - 1){
                    this.getOrder(this.order+1)
                }
            }
        },
        watch: {
            thisSongTime(val) {
                let value = val.toFixed(3);
                let time = Number(value);
                if (this.lyric.length != 0) {
                    for (let i = 0; i < this.lyric.length; i++) {
                        let timer = Number(this.lyric[i].t);
                        if (timer - time < 0.5) {
                            this.indexline = i;
                        }
                    }
                }
                if (this.duration) {
                    let plan = (this.thisSongTime / this.duration) * 100;
                    plan = Number(plan.toFixed(3));
                    this.linear = plan;
                    let h = this.linear * this.duration / 100;
                    let planTime = Number(h.toFixed(3));
                    // console.log(planTime)
                };
            },
            getlinear(val) {
                console.log(-this.curHeight)
                let colorur = document.querySelector('.colorur');
                this.scroll.scrollToElement(colorur, 500, false, -this.curHeight);
            }
        },
        components: {
            PageHeader,
            playlist
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .player {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
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
            background-size: cover;
            filter: blur(100px);
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

        .player-header {
            flex: 0 0 60px;
        }

        .player-main {
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;

            .main-box {
                position: relative;
                flex: 1;
                margin-bottom: 10px;
            }

            .control {
                flex: 0 0 120px;
            }
        }
    }

    .main-box .pattern-record {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .main-box .pattern-record .needle {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        z-index: 2;
        
        .needle-img{
            width: 100%;
            display: flex;
            justify-content: center;
            
            img {
                width: 444px;
                height: 345px;
                zoom: 0.4;
                transform: rotate(-30deg);
                transform-origin: 50% 5%;
            }
        }
        
        .playNeedle img{
            animation: close 0.5s linear forwards;
        }
        
        .endNeedle img{
            animation: play 1s linear forwards;
        }

        @keyframes close {
            0% {
                // transform: rotate(0deg);
                // transform-origin: 50% 5%;
                // transform: rotateZ(0deg);
                // transform: rotate(0deg);
                // transform-origin: 94px 12px;
            }

            100% {
                // transform: rotateZ(-30deg);
                transform: rotate(-30deg);
                transform-origin: 50% 5%;
            }
        }
        
        @keyframes play {
            0% {
                // transform: rotate(-30deg);
                // transform-origin: 50% 5%;
                // transform-origin: 94px 12px;
            }
        
            100% {
                // transform: rotateZ(-30deg);
                transform: rotate(0deg);
                transform-origin: 50% 5%;
            }
        }
    }

    .main-box .pattern-record .record {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 90px;
        width: 100%;
        height: 280px;
        background: url(../../public/img/record.png) no-repeat center;
        background-size: 280px;
        animation: rotate 12s linear infinite;

        .song-img {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 188px;
            height: 188px;
            background-color: #000000;
            border: 1px solid #000000;
            border-radius: 50%;
            overflow: hidden;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        @keyframes rotate {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
    }

    .main-box .pattern-record .operation-list {
        position: absolute;
        bottom: 0;
        left: 0;
        margin-top: 18%;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 40px;

        .operation-item {
            color: #ccc;

            i {
                font-size: 30px;
            }

            img {
                width: 35px;
                height: 35px;
            }
        }

        .operation-item:last-child {
            transform: rotateZ(90deg);
        }
    }

    .control {
        margin-top: 30px;
    }

    .progress {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .time {
            flex: 0 0 60px;
            text-align: center;
            font-size: 12px;
            color: #787878;
        }

        .progress-box {
            padding-right: 6px;
            box-sizing: border-box;
            flex: 1;
            width: 100%;
            height: 6px;
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .progress-box .dot {
            position: absolute;
            top: 0px;
            left: -6px;
            width: 6px;
            height: 6px;
            background-color: #FFFFFF;
            border-radius: 50%;
        }

        .progress-box .progress-box-p {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .total {
            width: 100%;
            height: 2px;
            background-color: #CCCCCC;
            border-radius: 2px;
        }

        .past {
            position: absolute;
            top: 2px;
            left: -80%;
            width: 100%;
            height: 3px;
            background-color: #FFFFFF;
            border-radius: 2px;
            z-index: 3;
        }
    }

    .control-list {
        margin-top: 30px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .control-item {

            img {
                width: 34px;
                height: 34px;
            }
        }

        .play {
            padding: 10px;
            border: 1px solid #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 30px;
                height: 30px;
            }
        }
    }

    .main-box .pattern-lyrics {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .lyr-box {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .volume-box {
            flex: 0 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .volume-icon {
                flex: 0 0 40px;
                text-align: center;
            }

            .volume-icon i {
                font-size: 20px;
                color: #ccc;
            }

            .volume {
                position: relative;
                flex: 1;
                height: 2px;
                background-color: #ccc;
                border-radius: 1px;
            }

            .volume .dot {
                position: absolute;
                left: 0;
                top: -3px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #fff;
            }
        }

        .lyrics-box {
            flex: 1;
            position: absolute;
            top: 20px;
            left: 0;
            width: 100%;
            height: 100%;

            .lyrics-list {
                position: absolute;
                top: 0px;
                left: 0;
                height: 100%;
                width: 100%;
                text-align: center;
                overflow: hidden;
            }

            .lyrics-list .lyrics {
                padding: 50% 0 45% 0;
                list-style: none;
                width: 100%;
            }

            .lyrics .lyrics-item {
                color: #c1c1c1;
                font-size: 14px;
                padding: 8px 0;
            }

            .lyrics .colorur {
                font-size: 15px;
                color: #fff !important;
            }
        }
    }

    .hidebox {
        opacity: 0;
    }
</style>
