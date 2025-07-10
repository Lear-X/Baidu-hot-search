<template>
  <div id="app">
    <div class="app-container">
      <header class="header">
        <div class="header-content">
          <h1>百度热搜</h1>
          <nav class="header-tabs">
            <router-link class="tabs-item" active-class="tabs-active" to="/home"><span>首页</span></router-link>
            <router-link class="tabs-item" active-class="tabs-active" to="/hotSearch"><span>热搜</span></router-link>
            <router-link class="tabs-item" active-class="tabs-active" to="/weather"><span>天气</span></router-link>
          </nav>
        </div>
      </header>
      <router-view :updateTime="updateTime" :hotSearchData="hotSearchData" :hotSearchImg="hotSearchImg"
        :hotSearchTitle="hotSearchTitle" :hotSearchDesc="hotSearchDesc" :hotSearchHot="hotSearchHot"
        :hotSearchUrl="hotSearchUrl"></router-view>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import HotSearch from './components/HotSearch.vue';
import Weather from './components/Weather.vue';
import Home from './components/Home.vue';
export default {
  name: 'App',
  components: {
    Home,
    HotSearch,
    Weather,
  },
  setup() {

    const updateTime = ref('')
    const hotSearchData = ref([])
    const hotSearchImg = reactive([])
    const hotSearchTitle = reactive([])
    const hotSearchHot = reactive([])
    const hotSearchDesc = reactive([])
    const hotSearchUrl = reactive([])

    const getTime = (() => {
      updateTime.value = new Date().toLocaleString()
    })

    const extractTitles = (data) => {
      // 提取hotSearchData中的各项数据并添加到对应数组中
      data.forEach(item => {
        hotSearchImg.push(item.img)
      })
      data.forEach(item => {
        hotSearchTitle.push(item.title)
      })
      data.forEach(item => {
        hotSearchHot.push(item.hot)
      })
      data.forEach(item => {
        hotSearchDesc.push(item.desc)
      })
      data.forEach(item => {
        hotSearchUrl.push(item.url)
      })

    }

    // 获取百度热搜新闻榜单数据
    const fetchData = async () => {
      try {
        const response = await axios.get('https://v2.xxapi.cn/api/baiduhot')
        hotSearchData.value = response.data.data
        extractTitles(hotSearchData.value) // 提取数据
        console.log('获取数据成功')
      } catch (error) {
        console.error('获取数据失败:', error)
        hotSearchData.value = []
      }
    }

    onMounted(() => {
      getTime()
      fetchData()
      // fetchWeatherData()
      // console.log(updateTime)
    })

    return {
      updateTime,
      hotSearchData,
      hotSearchImg,
      hotSearchTitle,
      hotSearchDesc,
      hotSearchHot,
      hotSearchUrl,
      getTime,
      fetchData,
      extractTitles,
    }
  },

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  overflow: hidden;
  color: #222222;
  text-decoration: none;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f6f6f6;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  max-width: 1200px;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  color: #1a73e8;
  padding: 30px;
}

.header h1 {
  /* padding: 50px; */
  font-size: 24px;
}

.header-tabs {
  display: flex;
}

.tabs-item {
  font-size: 14px;
  margin-right: 10px;
  text-align: center;
  line-height: 25px;
  width: 54px;
  height: 26px;
}

.tabs-item:hover {
  border-radius: 20px;
  background-color: #1a73e8;
  color: #fff;
}

.tabs-active {
  border-radius: 20px;
  background-color: #1a73e8;
  color: #fff;
}
</style>