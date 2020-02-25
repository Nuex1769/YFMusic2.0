<template>
        <audio id="audio" autoplay :src="thisPlayUrl" @timeupdate="getupdate"></audio>
</template>

<script>
    import {mapState} from 'vuex'
    export default{
        data(){
            return{
                
            }
        },
        computed:{
            ...mapState({thisPlayUrl: state => state.thisPlayUrl})
        },
        methods:{
            getupdate(){
            	this.$emit("time-update")
            }
        }
        
    }
</script>

<style>
    audio{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -9;
        opacity: 1;
    }
</style>
