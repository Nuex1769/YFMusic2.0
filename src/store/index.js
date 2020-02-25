import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        httpUrl: 'http://localhost:3000',
        userData: '', //用户信息
        favoriteSong: '', //喜欢的歌曲列表
        thisPlayUrl: '', //当前播放的歌曲url
        songMessage: '', //歌曲信息
        pageName: '', //头部信息
        lyric: '', //歌词
        playStatus: false, //播放状态
        thisSongTime: '', //歌曲当前播放位置事件
        banner: '',
        duration: '', //歌曲时长
        recommendSongListData: '', //推荐歌单
        recommendSongData: '', //推荐歌曲
        dailyRecommend: '', //每日推荐
        playList: [],
        order: ''
    },
    mutations: {
        setUserData(state, val) {
            state.userData = val
        },
        setThisPlayUrl(state, val) {
            state.thisPlayUrl = val
        },
        setFavoriteSong(state, val) {
            state.favoriteSong = val
        },
        setSongMessage(state) {
            state.songMessage = state.playList[state.order]
        },
        setPageName(state, val) {
            state.pageName = val
        },
        setLyric(state, val) {
            state.lyric = val
        },
        setPlayStatus(state, val) {
            state.playStatus = val
        },
        setSongTime(state, val) {
            state.thisSongTime = val
        },
        setBanner(state, val) {
            state.banner = val
        },
        setDuration(state, val) {
            state.duration = val
        },
        setRecommendSongListData(state, val) {
            state.recommendSongListData = val
        },
        setRecommendSongData(state, val) {
            state.recommendSongData = val
        },
        setDailyRecommend(state, val) {
            state.dailyRecommend = val
        },
        addPlayList(state, val) {
            state.playList.push(val)
        },
        subPlayList(state) {
            state.playList.shift();
        },
        setOrder(state, val) {
            state.order = val
        }
    },
    actions: {
        getUserData({
            commit
        }, val) {
            commit('setUserData', val)
        },
        getFavoriteSong({
            commit,
            state
        }, val) {
            axios({
                withCredentials: true,
                url: state.httpUrl + '/song/detail?ids=' + val
            }).then((res) => {
                console.log(res)
                commit('setFavoriteSong', res.data.songs)
            }).catch((error) => {
                console.log(error)
            });
        },
        getThisPlayUrl({
            commit,
            state
        }, val) {
            axios({
                withCredentials: true,
                url: state.httpUrl + '/song/url?id=' + state.songMessage.id
            }).then((res) => {
                console.log(res)
                if (res.data.code == 200) {
                    commit('setThisPlayUrl', res.data.data[0].url)
                    commit('setPlayStatus', true)
                }
            }).catch((error) => {
                console.log(error)
            });
        },
        getSongMessage({
            commit
        }) {
            commit('setSongMessage')
        },
        getPageName({
            commit
        }, val) {
            commit('setPageName', val)
        },
        getLyric({
            commit,
            state
        }, val) {
            axios({
                withCredentials: true,
                url: state.httpUrl + '/lyric?id=' + state.songMessage.id
            }).then((res) => {
                console.log(res)
                if (res.data.code == 200) {
                    if (res.data.lrc != undefined) {
                        let lrc = res.data.lrc.lyric
                        let lrcs = lrc.split('\n'); //用回车拆分成数组
                        let songLrcArr = []
                        for (let i in lrcs) {
                            lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
                            let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
                            let s = t.split(":"); //分离:前后文字
                            if (!isNaN(parseInt(s[0]))) { //是数值
                                let arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
                                let start = 0;
                                for (let k in arr) {
                                    start += arr[k].length; //计算歌词位置
                                }
                                if (lrcs[i].substring(start) != "") {
                                    let content = lrcs[i].substring(start); //获取歌词内容
                                    for (let k in arr) {
                                        let t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
                                        let s = t.split(":"); //分离:前后文字
                                        songLrcArr.push({ //对象{t:时间,c:歌词}加入ms数组
                                            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(
                                                3),
                                            c: content
                                        });
                                    }
                                }
                            }
                        }
                        commit('setLyric', songLrcArr)
                    }
                }
            }).catch((error) => {
                console.log(error)
            });
        },
        getSongTime({
            commit
        }, val) {
            commit('setSongTime', val)
        },
        getBanner({
            commit
        }, val) {
            commit('setBanner', val)
        },
        getDuration({
            commit
        }, val) {
            commit('setDuration', val)
        },
        getRecommendSongListData({
            commit
        }, val) {
            commit('setRecommendSongListData', val)
        },
        getRecommendSongData({
            commit
        }, val) {
            commit('setRecommendSongData', val)
        },
        getDailyRecommend({
            commit
        }, val) {
            commit('setDailyRecommend', val)
        },
        pushPlayList({
            commit
        }, val) {
            commit('addPlayList', val)
        },
        getOrder({
            commit
        }, val) {
            commit('setOrder', val)
        }
    },
    modules: {

    }
})
