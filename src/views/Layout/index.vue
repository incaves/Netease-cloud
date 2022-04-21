<template>
  <div>
    <van-nav-bar :title="activeTitle" fixed />

    <div class="main">
      <!-- 二级路由入口 -->
      <router-view></router-view>
    </div>
    <!-- TabBar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >Home</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >Search</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0,
      // 默认显示
      activeTitle: this.$route.meta.title, // 顶部导航显示的标题
    };
  },
  // 路由切换
  watch: {
    $route() {
      // 如果路由变化,获取最新的title值
      this.activeTitle = this.$route.meta.title;
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
