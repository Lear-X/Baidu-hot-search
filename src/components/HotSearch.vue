<template>
  <main class="main-content">
    <div class="hot-search-container">
      <div class="hot-search-header">
        <span>热搜榜</span>
        <span class="header-info">更新时间: {{ updateTime }}</span>
      </div>
      <div class="hot-search-list">
        <div class="hot-search-item" v-for="(item, index) in hotSearchData" :key="index">
          <span class="item-index"> {{ index + 1 }} </span>
          <img :src="hotSearchImg[index]" alt="" class="item-img">
          <div class="item-content">
            <a :href="hotSearchUrl[index]" class="item-title">
              {{ hotSearchTitle[index] }}
            </a>
            <span class="item-hot">热搜指数：{{ hotSearchHot[index] }}</span>
            <div>
              <span class="item-desc">{{ hotSearchDesc[index] }}</span>
              <a :href="hotSearchUrl[index]" class="item-more">更多信息></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'HotSearch',
  props: {
    hotSearchData: Array,
    hotSearchImg: Array,
    hotSearchUrl: Array,
    hotSearchTitle: Array,
    hotSearchHot: Array,
    hotSearchDesc: Array,
    updateTime: String
  },
  setup(props) {

    // console.log(props)
    return {
      ...props,
    }
  }
}
</script>

<style scoped>
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 30px;
}

.hot-search-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 16px 46px;
  padding-bottom: 0;
  color: #9195A3;

}

.hot-search-container {
  display: block;
  flex-wrap: wrap;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;

}

.hot-search-list {
  display: flex;
  flex-direction: column;
}

.hot-search-item {
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}

.hot-search-item:hover {
  background-image: linear-gradient(to bottom, #f5f5f6 0%, #fff 100%);
}

.item-index {
  color: #f54545;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 2px;
}

.item-img {
  width: 130px;
  height: 85px;
  margin: 0 16px;
  border-radius: 4px;
}

.item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-title {
  display: block;
  font-size: 18px;
  margin-bottom: 2px;
}

.item-title:hover {
  color: #315efb;
}

.item-hot {
  font-size: 13px;
  font-weight: bold;
  color: #f54545;
  padding: 4px 0;
}

.item-desc {
  overflow: hidden;
  font-size: 14px;
  color: #666;
  text-align: center;
  text-overflow: ellipsis;
}

.item-more {
  overflow: hidden;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>