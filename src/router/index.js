// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'
import HotSearch from '../components/HotSearch.vue'
import Weather from '../components/Weather.vue'

const routes = [
  { path: '/', redirect: '/home'}, 
  { path: '/home', component: Home ,props: true}, 
  { path: '/hotsearch', component: HotSearch ,props: true}, 
  { path: '/weather', component:  Weather ,props: true}, 
  
];

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 模式（需服务器支持）
  routes, // 路由配置   
});

export default router; // 导出路由实例