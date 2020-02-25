<template>
    <div class="tabbar">
        <div class="tabbar-item" :class="{select : index == 0}" @click="onSelect(0)">
            <div class="tab-icon"><img src="../../public/img/icon/faxian.png" alt=""></div>
            <div class="tab-name">发现</div>
        </div>
        <div class="tabbar-item" :class="{select : index == 1}" @click="onSelect(1)">
            <div class="tab-icon"><img src="../../public/img/icon/zhongxinshipin.png" alt=""></div>
            <div class="tab-name">视频</div>
        </div>
        <div class="tabbar-item" :class="{select : index == 2}" @click="onSelect(2)">
            <div class="tab-icon"><img src="../../public/img/icon/yinyue.png" alt=""></div>
            <div class="tab-name">我的</div>
        </div>
        <div class="tabbar-item" :class="{select : index == 3}" @click="onSelect(3)">
            <div class="tab-icon"><img src="../../public/img/icon/yonghu.png" alt=""></div>
            <div class="tab-name">账号</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['ind'],
        data() {
            return {
                index:this.ind
            }
        },
        computed:{
            // index(){
            //     return this.ind
            // }
        },
        methods: {
            onSelect(i) {
                switch (i) {
                    case 0:
                        this.$router.push({
                            path: '/'
                        })
                        break;
                    case 1:
                        this.$router.push({
                            path: '/videoview'
                        })
                        break;
                    case 2:
                        this.$router.push({
                            path: '/mine'
                        })
                        break;
                    default:
                        this.$router.push({
                            path: '/'
                        })
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .tabbar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 68px;
        background: #000000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        z-index: 9;

        .tabbar-item {
            text-align: center;
            color: #787878;

            i {
                font-size: 30px;
            }
            
            .tab-icon img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
        }

        .select {
            color: #c20c0c;

            i {
                color: #c20c0c;
            }
            
            .tab-icon{
                width: 30px;
                height: 30px;
                background-color: #c20c0c;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .tab-icon img{
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
        }
    }
</style>
