<template>
    <div class="playList" v-show="showPlayList" @click.stop="showPL">
        <div class="main-box" @click.stop="">
            <div class="main">
                <div class="title">
                    当前播放<span>(280)</span>
                </div>
                <div class="btn-list">
                    <div class="play-order">列表循环</div>
                    <div class="collect">收藏全部</div>
                    <div class="del"><i class="el-icon-delete"></i></div>
                </div>
                <div class="play-list-song">
                    <div class="song" v-for="(item,i) in playList" :key="i" :class="{thisPlay : order == i}" @click="play(i)">
                        <div class="song-msg">{{item.name}}
                        <span v-if="item.ar">- {{item.ar[0].name}}</span>
                        <span v-if="item.artists">- {{item.artists[0].name}}</span>
                        </div>
                        <div class="del-icon" @click="del(i)">×</div>
                    </div>
                </div>
            </div>
            <div class="back" @click.stop="showPL">关闭</div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions,mapMutations} from 'vuex'
    export default{
        data(){
            return{
                
            }
        },
        computed:{
            ...mapState({
                showPlayList: state => state.showPlayList,
                playList: state => state.playList,
                order: state => state.order
            })
        },
        methods:{
            ...mapMutations(['setShowPlayList']),
            ...mapActions(['delPlayList','getOrder']),
            showPL(){
                this.setShowPlayList(false);
            },
            del(i){
                this.delPlayList(i);
            },
            play(ind){
                this.getOrder(ind);
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .playList {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 15px 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        background: rgba(7, 17, 27, 0.2);
        z-index: 9;

        .main-box {
            position: relative;
            width: 100%;
            height: 70%;
            border-radius: 20px;
            background-color: #272822;
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .main {
                flex: 1;
                width: 100%;
                padding: 15px 0 0 15px;
                box-sizing: border-box;
                overflow: hidden;
            }

            .back {
                flex: 0 0 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                color: #fff;
                border-top: 1px solid rgba(255,255,255,0.2);
            }
        }
    }

    .main {
        display: flex;
        flex-direction: column;
        position: relative;

        .title {
            flex: 0 0 30px;
            font-size: 18px;
            color: #fff;
            // padding-bottom: 10px;

            span {
                font-size: 14px;
                color: #333333;
            }
        }

        .btn-list {
            flex: 0 0 30px;
            display: flex;
            font-size: 14px;
            color: #fff;
            padding-right: 15px;
            box-sizing: border-box;

            .collect {
                flex: 0 0 80px;
                text-align: center;
            }

            .play-order {
                flex: 1;
            }

            .del {
                flex: 0 0 20px;
                text-align: right;
            }

            .del i {
                font-size: 15px;
                color: #ccc;
            }
        }

        .play-list-song {
            flex: 1;
            width: 100%;
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
        }
    }

    .play-list-song .song {
        display: flex;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        padding: 10px 15px 10px 0;
        box-sizing: border-box;
        color: #fff;

        .song-msg {
            flex: 1;
            font-size: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            
            span{
                font-size: 12px;
                color: #EEEEEE;
            }
        }

        .del-icon {
            flex: 0 0 20px;
            font-size: 20px;
            color: #EEEEEE;
        }
    }
    
    .play-list-song .thisPlay{
        color: red;
        
        .song-msg span{
            color: red;
        }
        
        .del-icon{
            color: #EEEEEE;
        }
    }
    
    .song:last-child{
        border-bottom: none;
    }
</style>
