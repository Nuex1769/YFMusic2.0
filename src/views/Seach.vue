<template>
    <div class="seach">
        <div class="header">
            <div class="header-input"><input type="text" v-model="keyword" autofocus></div>
            <div class="header-right" @click="bakc">取消</div>
        </div>
        <div class="main" v-if="showHotSearch">
            <div class="title">搜索历史</div>
            <div class="history">
                <div class="history-item" v-for="(item,i) in recordList" :key="i" @click="selKeyword(item)">
                    {{item}}
                </div>
            </div>
            <div class="title">热搜榜</div>
            <div class="hot">
                <div class="hot-item" v-for="(item,i) in hotSearch" :key="i" @click="selKeyword(item.first)">
                    <div class="num" :class="{hotClass : i < 4}">
                        {{i+1}}
                    </div>
                    <div class="hot-msg">
                        {{item.first}}
                    </div>
                </div>
            </div>
        </div>
        <div class="keyword-box" v-if="!showHotSearch">
            <div class="keyword">
                搜索"{{keyword}}"
            </div>
            <div class="keyword-msg" v-for="(k,i) in keywordList" :key="i" @click="selKeyword(k.keyword)">
                <i class="el-icon-search"></i>
                <div class="msg">{{k.keyword}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import axios from 'axios'
    export default {
        data() {
            return {
                hotSearch: '',
                keyword:'',
                keywordList:'',
                showHotSearch:true
            }
        },
        computed: {
            ...mapState({
                httpUrl: state => state.httpUrl,
                recordList: state => state.recordList
            })
        },
        created() {
            axios({
                withCredentials: true,
                url: this.httpUrl + '/search/hot/detail'
            }).then((res) => {
                console.log(res)
                if (res.data.code == 200) {
                    this.hotSearch = res.data.result.hots;
                }
            }).catch((error) => {
                console.log(error)
            });
        },
        methods: {
            ...mapActions(['getSearchData','getKeyword','getRecordList']),
            bakc() {
                this.getKeyword('');
                this.$router.go(-1);
            },
            selKeyword(key){
                this.keyword = key;
                this.getKeyword(key);
                this.getRecordList(key);
                this.$router.push({
                    path: '/searchresult'
                })
                axios({
                    withCredentials: true,
                    url: this.httpUrl + '/search?keywords=' + key + '&limit=15&offset=1'
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.getSearchData(res.data.result.songs);
                    }
                }).catch((error) => {
                    console.log(error)
                });
            }
        },
        watch:{
            keyword(){
                this.getKeyword(this.keyword);
                if(this.keyword == ''){
                    this.showHotSearch = true;
                }else{
                    this.showHotSearch = false;
                    axios({
                        withCredentials: true,
                        url: this.httpUrl + '/search/suggest?keywords=' + this.keyword + '&type=mobile'
                    }).then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            this.keywordList = res.data.result.allMatch;
                        }
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .seach {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #000000;
        overflow: hidden;
    }

    .header {
        flex: 0 0 60px;
        padding: 15px 20px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // border-bottom:1px solid #FFFFFF;

        .header-right {
            flex: 0 0 48px;
            font-size: 15px;
            color: #fff;
            text-align: center;
        }

        .header-input {
            position: relative;
            flex: 1;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 25px;

            input {
                // position: absolute;
                // top: 0;
                // left: 0;
                padding: 5px 40px;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                border: none;
                background: none;
                border-radius: 25px;
                outline: none;
                font-size: 15px;
                color: #FFFFFF;
                background: url(../../public/img/icon/search.png) no-repeat 10px center;
                background-size: 20px;
            }
        }
    }

    .main {
        flex: 1;
        padding: 0 20px;
        box-sizing: border-box;

        .title {
            font-size: 13px;
            color: #fff;
            padding: 20px 0;
        }

        .history {
            overflow: hidden;
            overflow-x: scroll;
            white-space: nowrap;

            .history-item {
                display: inline-block;
                margin-right: 10px;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 13px;
                color: #fff;
                background-color: #ccc;
            }

        }

        .history::-webkit-scrollbar {
            display: none
        }

        .hot {
            width: 100%;

            .hot-item {
                display: inline-block;
                width: 50%;
                height: 40px;
                margin-bottom: 30px;
                overflow: hidden;
                white-space: nowrap;
            }

            .hot-item .num {
                display: inline-block;
                width: 20px;
                height: 40px;
                line-height: 40px;
                font-size: 12px;
                color: #333;
                text-align: center;
                overflow: hidden;
            }

            .hot-item .hotClass {
                color: red;
            }

            .hot-item .hot-msg {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                font-size: 13px;
                color: #fff;
                overflow: hidden;
            }

            // .hot-item .hot-msg .name{
            //     font-size: 13px;
            //     color: #fff;
            // }

            // .hot-item .hot-msg .text{
            //     margin-top: 5px;
            //     font-size: 12px;
            //     color: #8C939D;
            //     overflow: hidden;
            //     text-overflow: ellipsis;
            // }
        }
    }
    
    .keyword-box{
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        
        .keyword{
            font-size: 14px;
            color: royalblue;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        
        .keyword-msg{
            font-size: 15px;
            color: #fff;
            display: flex;
            align-items: center;
            
            i{
                flex:  0 0 25px;
                font-size: 16px;
                color: #ccc;
            }
            
            .msg{
                padding: 10px 0;
                flex: 1;
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
        }
    }
</style>
