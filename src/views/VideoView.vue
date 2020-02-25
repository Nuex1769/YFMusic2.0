<template>
    <div class="video-view">
        <div class="header">
            <div class="header-left"><i class="el-icon-s-operation"></i></div>
            <div class="header-input"><i class="el-icon-search"></i>一生所爱</div>
            <div class="header-right" @click="goPlayer"><i class="el-icon-s-data"></i></div>
        </div>
        <div class="main-box">
            <div class="mv-list">
                <div class="mv">
                    <div class="mv-itme"><video poster="http://p1.music.126.net/w2vk2R-GjV5B9fMhfyQPjQ==/109951164718507151.jpg" controls="controls" src="http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=764923a713417eab29b429364eb18074&wsTime=1582132777"></video></div>
                    <div class="mv-text">邓紫棋《句号》</div>
                </div>
                <div class="mv">
                    <div class="mv-itme"><video controls="controls" src="http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=764923a713417eab29b429364eb18074&wsTime=1582132777"></video></div>
                    <div class="mv-text">邓紫棋《句号》</div>
                </div>
                <div class="mv">
                    <div class="mv-itme"><video controls="controls" src="http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=764923a713417eab29b429364eb18074&wsTime=1582132777"></video></div>
                    <div class="mv-text">邓紫棋《句号》</div>
                </div>
            </div>
        </div>
        <Tabbar :ind="1" />
    </div>
</template>

<script>
    import Tabbar from '../components/Tabbar.vue'
    export default {
        data() {
            return {

            }
        },
        methods: {
            goPlayer() {
                this.$router.push({
                    path: '/musicplayer'
                })
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

        .main-box {
            width: 100%;
            margin-top: 80px;
            padding: 0 20px;
            box-sizing: border-box;
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

    .mv-list {
        width: 100%;

        .mv {
            padding:10px 0px;
            border-bottom: 1px solid #B4BCCC;
            
            .mv-text{
                text-align: left;
                font-size: 14px;
                color: #fff;
            }
        }

        video {
            width: 100%;
        }
    }
</style>
