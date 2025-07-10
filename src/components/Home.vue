<template>
  <div class="home-wrapper">
    <div class="home">
      <div class="home-container">
        <div class="hot-search-top">
          <router-link to="/hotSearch" class="hot-search-active">
            <span class="hot-search-s">热搜榜</span>
            <span class="hot-search-info">更多信息></span>
          </router-link>
          <div class="top-list" v-for="(item, index) in hotSearchData.slice(0, 10)" :key="index">
            <span class="item-index"> {{ index + 1 }} </span>
            <a :href="hotSearchUrl[index]">{{ hotSearchTitle[index] }}</a>
          </div>
        </div>
      </div>
      <div class="carousel-container">
        <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div class="slide" v-for="(slide, index) in slides" :key="index">
            <a :href="hotSearchUrl[index]" class="slide-img-a"><img :src="slide.image" :alt="slide.title"></a>
            <a :href="hotSearchUrl[index]">
              <h3 class="slide-caption">{{ hotSearchTitle[index] }}</h3>
            </a>
          </div>
        </div>

        <button @click="prevSlide" class="nav-button prev">❮</button>
        <button @click="nextSlide" class="nav-button next">❯</button>

        <div class="indicators">
          <span v-for="(slide, index) in slides" :key="index" @click="goToSlide(index)"
            :class="{ active: currentIndex === index }"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
export default {
  name: 'Home',
  props: {
    hotSearchData: Array,
    hotSearchImg: Array,
    hotSearchUrl: Array,
    hotSearchTitle: Array,
  },
  setup(props) {

    //      console.log(slides)   
    //       console.log(props)

    const slides = ref([]);

    watch(
      () => [props.hotSearchImg, props.hotSearchTitle], // 监听多个 props
      () => {
        if (props.hotSearchImg?.length > 0) {
          slides.value = [
            {
              image: props.hotSearchImg[0],
              title: props.hotSearchTitle?.[0] || '',
            },
            {
              image: props.hotSearchImg?.[1] || '',
              title: props.hotSearchTitle?.[1] || ''
            },
            {
              image: props.hotSearchImg?.[2] || '',
              title: props.hotSearchTitle?.[2] || ''
            },
            {
              image: props.hotSearchImg?.[3] || '',
              title: props.hotSearchTitle?.[3] || ''
            },
            {
              image: props.hotSearchImg?.[4] || '',
              title: props.hotSearchTitle?.[4] || ''
            },
          ];
        }
      },
      { immediate: true, deep: true } // 立即执行一次
    );


    const currentIndex = ref(0)
    let interval

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length
    }

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
    }

    const goToSlide = (index) => {
      currentIndex.value = index
    }

    const startAutoPlay = () => {
      interval = setInterval(nextSlide, 3000)
    }

    const stopAutoPlay = () => {
      clearInterval(interval)
    }

    onMounted(() => {
      startAutoPlay()
    })


    return {
      slides,
      currentIndex,
      nextSlide,
      prevSlide,
      goToSlide,
      startAutoPlay,
      stopAutoPlay,
      ...props
    }
  }
}
</script>

<style scoped>
.home-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
}

.home {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  gap: 20px;
  /* 两个区块之间的间距 */
  max-width: 1200px;
  width: 100%;
}

.home-container {
  width: 460px;
  /* 固定宽度 */
  padding: 30px;
  background-color: #fff;
  border-radius: 25px;
}

.hot-search-top {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  align-content: center;
  background-color: #fff;
  font-size: 20px;
}

.top-list {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  height: 20px;
  margin-bottom: 30px;
}

.top-list a:hover {
  color: #1a73e8;
}

.hot-search-active {
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
}

.hot-search-s {

  color: #f54545;
}

.hot-search-info {
  overflow: hidden;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-left: 250px;
}

.item-index {
  color: #f54545;
  width: 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-right: 10px;
}

/* 轮播图 */
.carousel-container {
  position: relative;
  width: 600px;
  /* 给轮播图固定宽度 */
  height: 400px;
  overflow: hidden;
  background-color: #fff;
  /* 可选，添加背景色 */
  border-radius: 25px;
  /* 可选，保持圆角一致 */
}


.carousel {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.slide {
  position: relative;
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slide img {
  width: 100%;
  height: 80%;
  object-fit: contain;
  object-position: center;
  margin-top: 40px;
}

.slide-img-a {
  display: block;
  width: 100%;
  height: 100%;
}

.slide-caption {
  position: absolute;
  font-size: 18px;
  left: 30px;
  /* 距离左侧距离 */
  bottom: 40px;
  /* 距离底部距离 */
  color: #fff;
  padding: 8px 12px;
  max-width: 80%;
  /* 防止文字过长溢出 */
  z-index: 2;
  /* 确保文字在图片上方 */
   text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.indicators {
  position: absolute;
  bottom: 58px;
  left: 86%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.indicators span.active {
  background: #1a73e8;
}
</style>