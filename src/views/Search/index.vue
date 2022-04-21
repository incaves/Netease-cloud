<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      shape="round"
      v-model="value"
      placeholder="Please enter a song title"
      @input="inputSongs"
    />
    <!-- 热门推荐 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">Top search</p>
      <!-- 热搜词 -->
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(item, index) in hotList"
          :key="index"
          @click="hotClick(item.first)"
          >{{ item.first }}</span
        >
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">The best match</p>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="item in resultList"
          :key="item.id"
          :name="item.name"
          :author="item.ar[0].name"
          :id="item.id"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchApi, SearchListApi } from '@/api';
import SongItem from '@/components/SongItem.vue';
export default {
  name: 'Search',
  data() {
    return {
      value: '', // 搜索关键词
      hotList: [], //热搜关键词
      resultList: [], // 搜索结果
      loading: false, // 加载中(只有为false,才能出触底后自动触发onload)
      finished: false, // 未加载(如果设置为true,表示全部加载完成)
      page: 1, // 当前搜索结果的页码
      timer: null, // 输入框防抖的定时器
    };
  },
  components: {
    SongItem,
  },
  created() {
    this.hotKeywords();
  },
  methods: {
    // 获取热搜关键词
    async hotKeywords() {
      const { data: res } = await hotSearchApi();
      this.hotList = res.result.hots;
    },
    // 获取搜索列表
    async SearchSong() {
      return await SearchListApi({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, //固定公式 页码
      });
    },
    // 点击关键词 触发搜索
    async hotClick(val) {
      this.finished = false; // 点击新关键词 可能有新的数据
      this.value = val;
      const { data: res } = await this.SearchSong();
      console.log(res);
      this.resultList = res.result.songs;
    },
    // 输入框搜索
    async inputSongs() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.page = 1; // 点击重新获取第一页数据
        this.finished = false; // 输入框改变 可能有更多数据
        // 搜索关键词如果为空 就把搜索数组情况
        if (this.value.length === 0) {
          this.resultList = [];
          return;
        }
        const { data: res } = await this.SearchSong();
        if (res.result.songs === undefined) {
          // 没有数据了
          this.resultList = [];
          return;
        }
        this.resultList = res.result.songs;
      }, 900);
    },
    // 触底加载
    async onLoad() {
      this.page++; // 每次加1
      const { data: res } = await this.SearchSong();
      if (res.result.songs === undefined) {
        // 没有更多数据了
        this.finished = true;
        this.loading = false; // 加载完成
        return;
      }
      this.resultList = [...this.resultList, ...res.result.songs];
      this.loading = false; // 数据加载完毕,保证下一次出发onload
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>
