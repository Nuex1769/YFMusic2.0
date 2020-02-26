<template>
    <div class="seachResult">
        <div class="Sheader">
            <div class="back" @click="bakc"><i class="el-icon-arrow-left"></i></div>
            <div class="inp">
                <input type="text">
            </div>
        </div>
        <div class="bar">
            <div class="bar-item" :class="{selBar:true}">
                单曲
            </div>
            <div class="bar-item">
                视频
            </div>
        </div>
        <div class="song-list">
            <div class="song" v-for="(item,i) in searchData">
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
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default{
        computed:{
            ...mapState({searchData: state => state.searchData})
        },
        methods:{
            bakc() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .seachResult{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        display: flex;
        flex-direction: column;
        
        .Sheader{
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
            
            .back{
                flex: 0 0 30px;
            }
            
            .back i{
                font-size: 20px;
                color: #fff;
            }
            
            .inp{
                flex: 1;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 20px;
            }
            
            .inp input{
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
        
        .bar{
            position: fixed;
            top: 0px;
            left: 0;
            flex: 0 0 35px;
            margin-top: 60px;
            padding: 0 20px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            z-index: 9;
            background-color: #000000;
            
            .bar-item{
                padding-bottom: 10px;
                font-size: 15px;
                color: #fff;
                margin-right: 40px;
            }
            
            .selBar{
                color: red;
                border-bottom: 2px solid red;
            }
        }
        
        .song-list{
            margin-top: 95px;
            flex: 1;
            padding: 0 20px;
            box-sizing: border-box;
            overflow: hidden;
            overflow-y: scroll;
        }
        
        .song {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        
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
        
        .song:last-child{
            border-bottom: none;
        }
    }
</style>
