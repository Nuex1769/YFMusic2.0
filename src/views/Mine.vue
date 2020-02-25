<template>
    <div class="mine">
        <div class="mine-header">
            <div class="header-left"><img src="../../public/img/icon/yun.png" alt=""></div>
            <div class="header-right"><img src="../../public/img/icon/yinleyanzou.png" alt=""></div>
        </div>
        <div class="mine-main">
            <div class="mine-user">
                <div class="user-img"><img :src="userData.avatarUrl" alt=""></div>
                <div class="username">{{userData.nickname}}</div>
                <div class="vip">开通VIP<i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="mine-list">
                <div class="mine-list-item">
                    <div class=""><img src="../../public/img/icon/xiazai.png" alt=""></div>
                    <div class="">本地音乐</div>
                </div>
                <div class="mine-list-item">
                    <div class=""><img src="../../public/img/icon/diantai.png" alt=""></div>
                    <div class="">我的电台</div>
                </div>
                <div class="mine-list-item"><i class="el-icon-star-off"></i>
                    <div class="">我的收藏</div>
                </div>
                <div class="mine-list-item"><i class="el-icon-loading"></i>
                    <div class="">关注新歌</div>
                </div>
            </div>
            <div class="myMusic">
                <div class="title">
                    <div class="title-text">我的音乐</div>
                    <div class="more"><i class="el-icon-arrow-right"></i></div>
                </div>
                <div class="music-box">
                    <swiper :options="swiperOption">
                        <swiper-slide>
                            <div class="music-list-item" @click="getSelect">
                                <div class="music-list-box">
                                    <div class="music-list-name-icon"><i class="el-icon-star-on"></i></div>
                                    <div class="music-list-name">我喜欢的音乐</div>
                                </div>
                                <div class="music-btn">
                                    <div class="btn"><i class="el-icon-caret-right"></i>心动模式</div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="music-list-item">

                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="music-list-item">

                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="music-list-item">

                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
        <Tabbar :ind="2"></Tabbar>
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
                swiperOption: {
                    spaceBetween: 10,
                    // slidesOffsetAfter : 30,
                    slidesPerView: 3.15,
                    freeMode: true
                }
            }
        },
        computed: {
            ...mapState({
                userData: state => state.userData,
                httpUrl: state => state.httpUrl
            })
        },
        methods: {
            ...mapActions(['getFavoriteSong','getPageName']),
            getSelect() {
                axios({
                    // headers: {
                    // 	'Content-Type': 'application/x-www-form-urlencoded',
                    // 	'X-Requested-With': 'xmlhttprequest'
                    // },
                    withCredentials: true,
                    url: this.httpUrl + '/likelist?uid=' + this.userData.userId
                }).then((res) => {
                    console.log(res)
                    if(res.data.code == 200){
                        let data = res.data.ids.join(',');
                        this.getFavoriteSong(data);
                        this.getPageName('歌单');
                        this.$router.push({
                            path: '/favoritesong'
                        });
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
    .mine {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, 0.8);
    }

    .mine .mine-main {
        width: 100%;
    }

    .mine-header {
        width: 100%;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 30px;
            height: 30px;
        }
    }

    .mine-user {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;

        .user-img {
            flex: 0 0 54px;

            img {
                width: 54px;
                height: 54px;
                border-radius: 50%;
            }
        }

        .username {
            flex: 1;
            text-align: left;
            margin-left: 10px;
            color: #fff;
            font-size: 18px;
        }

        .vip {
            flex: 0 0 60px;
            font-size: 12px;
            color: #787878;

            i {
                font-size: 16px;
            }
        }
    }

    .mine-main .mine-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex: 1;
        font-size: 13px;
        color: #fff;
        margin-top: 20px;
        padding: 0 20px;
        box-sizing: border-box;
        
        .mine-list-item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .mine-list-item i {
            margin-bottom: 5px;
            font-size: 30px;
        }
        
        .mine-list-item img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-bottom: 5px;
        }
    }
    
    .myMusic{
        margin-top: 20px;
        padding: 0 20px 30px 20px;
        box-sizing: border-box;
        background: #000000;
        border-radius: 25px 25px 0 0;
        
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            padding: 20px 0;
            color: #fff;
        }
    }

    .music-box .music-list-item {
        position: relative;
        height: 150px;
        border-radius: 10px;
        background-color: #F0F0F0;
        padding: 30px 0 10px 0;
        box-sizing: border-box;

        .music-list-box {
            width: 100%;
            text-align: center;

            .music-list-name-icon {
                font-size: 30px;
                color: red;
            }

            .music-list-name {
                font-size: 13px;
            }
        }

        .music-btn {
            width: 100%;
            position: absolute;
            bottom: 10px;
            text-align: center;

            .btn {
                display: inline-block;
                padding: 2px 5px;
                font-size: 12px;
                background-color: #ccc;
                border-radius: 20px;

                i {
                    font-size: 12px;
                }
            }
        }
    }
</style>
