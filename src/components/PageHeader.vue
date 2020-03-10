<template>
    <div class="page-header">
        <div class="back" @click="goBack">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="title" v-if="pageName">
            <div class="name">{{pageName.name || pageName|| ''}}</div>
            <div class="singer" v-if="pageName.ar">{{pageName.ar[0].name || ''}}</div>
        </div>
        <div class="btn-box" @click="player">
            <i class="el-icon-platform-eleme"></i>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        props: {
            pageName:[Object,String]
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapState({showPlayer: state => state.showPlayer})
        },
        methods: {
            ...mapMutations(['setShowPlayer']),
            goBack() {
                if(this.showPlayer){
                    this.setShowPlayer();
                }else{
                    this.$router.go(-1);
                }
            },
            player() {
               this.setShowPlayer();
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .page-header {
        width: 100%;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-color: #000000;
        color: #ccc;

        .title {
            flex: 1;
            margin: 0 10px;
            position: relative;
            text-align: center;
            font-size: 15px;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            // .title-box{
            //     position: absolute;
            //     top: 0;
            //     left: 0;
            //     width: 100%;
            //     height: 100%;
            // }

            .name {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .singer {
                width: 100%;
                color: #ccc;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .back,
        .btn-box {
            flex: 0 0 20px;
        }

        .back i {
            font-size: 20px;
        }

        .btn-box i {
            font-size: 20px;
        }
    }
</style>
