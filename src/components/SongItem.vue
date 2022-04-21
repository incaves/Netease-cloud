<template>
  <div>
    <van-cell-group>
      <van-cell :title="name" :label="author + ' - ' + name" center :key="id">
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.5rem" @click="playFun" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    name: String, // 歌名
    author: String, // 作者姓名
    id: Number, // 歌曲ID
  },
  methods: {
    playFun() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id, // 歌曲id
        },
      });
    },
  },
};
</script>

<style></style>
