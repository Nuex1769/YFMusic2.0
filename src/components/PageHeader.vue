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
    import {mapState} from 'vuex'
    export default{
        props:['pageName'],
        data(){
            return{
                
            }
        },
        computed:{
            // ...mapState({pageName: state => state.pageName})
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            player(){
                this.$router.push({path:'/musicplayer'});
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .page-header{
        width: 100%;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-color: #000000;
        color: #ccc;
        
        .title{
            text-align: center;
            font-size: 15px;
            color: #fff;
            
            .singer{
                color: #ccc;
                font-size: 12px;
            }
        }
        
        .back i{
            font-size: 20px;
        }
        
        .btn-box i{
            font-size: 20px;
        }
    }
</style>
