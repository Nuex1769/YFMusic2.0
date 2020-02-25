import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import MusicPlayer from '../views/MusicPlayer.vue'
import Search from '../views/Seach.vue'
import Mine from '../views/Mine.vue'
import VideoView from '../views/VideoView.vue'
import FavoriteSong from '../components/FavoriteSong.vue'
import DailyRecommend from '../views/DailyRecommend.vue'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/musicplayer',
    name: 'MusicPlayer',
    component: MusicPlayer
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/favoritesong',
    name: 'FavoriteSong',
    component: FavoriteSong
  },
  {
    path: '/videoview',
    name: 'VideoView',
    component: VideoView
  },
  {
    path: '/recommend',
    name: 'DailyRecommend',
    component: DailyRecommend
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
