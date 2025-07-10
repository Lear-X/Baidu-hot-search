<template>
  <div class="weather-page">
    <div class="weather-container">
      <!-- 搜索框 -->
      <div class="weather-search">
        <form @submit.prevent="handleSearch" style="display: flex;">
          <input type="text" v-model="searchQuery" placeholder="输入城市名称查询天气" class="search-input"
            v-on:input="filterNonChinese" />
          <button type="submit" class="search-button">搜索</button>
        </form>
      </div>


    </div>
    <div class="main-content" v-if="weatherData">
      <!-- 城市列表 -->
      <div class="popular-city">
        <div class="city-list">
          <div :class="{ 'active': selectedCity === (city || weatherData.city ||searchQuery) }" class="city-name"
            @click="selectCity(city)" v-for="(city, index) in cityList" :key="index">{{ city }}</div>
        </div>
      </div>

      <!-- 天气信息-今日 -->
      <div class="weather-info" v-if="weatherToday">
        <div class="weather-today">
          <div class="today-name">{{ weatherData.city }}</div>
          <div class="today-weather">
            <span>{{ weatherToday[1].temperature }}</span>
            <span>{{ weatherToday[1].weather }}</span>
          </div>
        </div>

        <!-- 天气信息-总体 -->
        <div class="city-weather">
          <div class="weather-detail" v-for="(day, index) in weatherToday" :key="index">
            <span class="weather-date">{{ day.date }}</span>
            <div class="weather-icon">
              <span v-if="day.weather.includes('阵雨')">🌦️</span>
              <span v-else-if="day.weather.includes('多云')">⛅</span>
              <span v-else-if="day.weather.includes('晴')">☀️</span>
              <span v-else-if="day.weather.includes('雨')">🌧️</span>
              <span v-else>🌤️</span>
              <span>{{ day.weather }}</span>
            </div>
            <span>{{ day.temperature }}</span>
            <span>{{ day.wind }}</span>
            <span :class="{'air_quality':day.air_quality=== '优','air_quality':day.air_quality=== '优'}">{{ day.air_quality }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  name: 'Weather',

  setup() {

    const searchQuery = ref('')
    const cityList = ref(['南宁', '北京', '上海', '广州', '深圳',
      '杭州', '成都', '重庆', '武汉', '西安'])
    const selectedCity = ref('南宁')
    const weatherData = ref([])
    const weatherToday = ref('')
    
    const filterNonChinese = (e) => {
      searchQuery.value = e.target.value.replace(/[^\u4e00-\u9fa5]/g, '');
    };

    const selectCity = (city) => {
      selectedCity.value = city
      searchQuery.value = city
      handleSearch(city)
      // console.log(city)
    }
    // console.log(weatherData)
    // const searchCity = city || searchQuery.value.trim();
    const handleSearch = async (city) => {
      if (!(searchQuery.value.trim() ||city)) {
        alert('请输入至少两个字！')
        return
      }

      try {
        // 发送请求到服务器
        const response = await axios.get('https://v2.xxapi.cn/api/weather', {
          params: {
            city: searchQuery.value || city
          }
        })
        if (response.data.code !== 200) {
          alert('未查询到该城市！')
          return
        }
        weatherData.value = response.data.data
        weatherToday.value = weatherData.value.data
        selectedCity.value = searchQuery.value;
        // console.log('搜索城市：', searchQuery.value)
        console.log('搜索结果：', weatherData.value)
      } catch (error) {
        weatherData.value = []
        console.error('搜索失败:', error);
      }

    }

    onMounted(() => {
      handleSearch(selectedCity.value)
    }
    )
    return {
      searchQuery,
      filterNonChinese,
      cityList,
      selectedCity,
      weatherData,
      weatherToday,
      handleSearch,
      selectCity,
    }
  }
}
</script>

<style scoped>
/* .weather-page{
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  width: 1400px;
  height: 560px;
  background-color: #fff;
} */
.weather-container {
  background-color: #fff;
}

.weather-search {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 25px;
  justify-content: center;
}

.weather-search form {
  margin-top: 15px;
}

.search-input {
  width: 550px;
  height: 46px;
  /* background-color: #f6f6f6; */
  border: 1px solid #1a73e8;
  border-radius: 10px 0 0 10px;
  font-size: 20px;
}

.search-button {
  height: 46px;
  width: 100px;
  font-size: 20px;
  color: #fff;
  background-color: #1a73e8;
  border-radius: 0 5px 5px 0;
  border: none;
  cursor: pointer;
}

.main-content {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  background-color: #fff;
  padding-top: 30px;
  padding-bottom: 50px;
}

.popular-city {
  display: flex;
  width: 200px;
  /* height: 470px; */
  background-color: #fff;
  margin-top: 10px;
  justify-content: center;
}

.city-list {
  width: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  border-right: 1px solid #eee;
  padding-right: 15px;
}

.city-list .active {
  color: #1a73e8;
  background-color: #e6f0ff;
}

.city-name {
  width: 100%;
  font-size: 20px;
  color: #333;
  border-radius: 6px;
  padding: 12px 10px;
  cursor: pointer;
  text-align: center;
  line-height: 100%;
}

.city-name:hover {
  background-image: linear-gradient(to bottom, #f5f5f6 0%, #fff 100%);
}

.weather-info {
  flex: 1;
  max-width: 1200px;
}

.weather-today {
  display: flex;
  justify-content: space-evenly;
  margin-top: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 14px;
}

.today-name {
  font-size: 22px;
}

.today-weather:first-child {
  font-size: 20px;
}

.today-weather:nth-child(2) {
  font-size: 16px;
}

.city-weather {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.weather-detail {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 25px;
  font-size: 18px;
  background-color: #f9f9f9;
  text-align: center;
}

.weather-icon{
  display: block;
}
.weather-icon :first-child{
  width: 36px;
}
.weather-icon :nth-child(2){
  width: 36px;
}
</style>